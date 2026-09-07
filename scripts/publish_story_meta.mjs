import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ENV_PATH = path.join(__dirname, '..', '.env');

function loadEnv() {
  if (!fs.existsSync(ENV_PATH)) return {};
  const content = fs.readFileSync(ENV_PATH, 'utf8');
  const env = {};
  content.split('\n').forEach(line => {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      env[match[1].trim()] = match[2].trim();
    }
  });
  return env;
}

// Subir imagen a hosting público para que Meta pueda acceder
async function uploadToPublicHost(imagePath) {
  console.log(`📤 Subiendo imagen ${path.basename(imagePath)} a hosting público temporal...`);
  const buffer = fs.readFileSync(imagePath);
  const blob = new Blob([buffer]);
  const form = new FormData();
  form.append("reqtype", "fileupload");
  form.append("fileToUpload", blob, path.basename(imagePath));

  const res = await fetch("https://catbox.moe/user/api.php", { method: "POST", body: form });
  const publicUrl = (await res.text()).trim();
  
  if (!publicUrl.startsWith("http")) {
    throw new Error(`Error al subir imagen pública: ${publicUrl}`);
  }
  console.log(`🌐 URL pública lista: ${publicUrl}`);
  return publicUrl;
}

// Publicar en Instagram Stories
async function publishInstagramStory(igUserId, accessToken, imageUrl) {
  console.log(`📸 1. Creando contenedor de Story en Instagram (${igUserId})...`);
  
  const containerUrl = `https://graph.facebook.com/v21.0/${igUserId}/media`;
  const containerRes = await fetch(containerUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      image_url: imageUrl,
      media_type: 'STORIES',
      access_token: accessToken
    })
  });
  const containerData = await containerRes.json();
  
  if (containerData.error) {
    throw new Error(`Error creando Story IG: ${JSON.stringify(containerData.error)}`);
  }
  
  const creationId = containerData.id;
  console.log(`⏳ Contenedor creado (ID: ${creationId}). Esperando procesamiento de Meta CDN...`);

  // Esperar a que Meta termine de descargar y procesar la imagen (status_code: FINISHED)
  let ready = false;
  for (let attempt = 1; attempt <= 10; attempt++) {
    await new Promise(r => setTimeout(r, 2500));
    const statusRes = await fetch(`https://graph.facebook.com/v21.0/${creationId}?fields=status_code,status&access_token=${accessToken}`);
    const statusData = await statusRes.json();
    console.log(`   [Intento ${attempt}/10] Estado: ${statusData.status_code || 'PROCESANDO'}...`);
    
    if (statusData.status_code === 'FINISHED') {
      ready = true;
      break;
    }
    if (statusData.status_code === 'ERROR' || statusData.status_code === 'EXPIRED') {
      throw new Error(`El contenedor falló con estado: ${statusData.status}`);
    }
  }

  if (!ready) {
    throw new Error(`Timeout esperando que el contenedor ${creationId} esté listo.`);
  }

  // Publicar contenedor
  console.log("🚀 Publicando historia oficial en Instagram...");
  const publishUrl = `https://graph.facebook.com/v21.0/${igUserId}/media_publish`;
  const publishRes = await fetch(publishUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      creation_id: creationId,
      access_token: accessToken
    })
  });
  const publishData = await publishRes.json();

  if (publishData.error) {
    throw new Error(`Error publicando Story IG: ${JSON.stringify(publishData.error)}`);
  }

  // Obtener enlace permanente
  const infoRes = await fetch(`https://graph.facebook.com/v21.0/${publishData.id}?fields=id,permalink,timestamp&access_token=${accessToken}`);
  const infoData = await infoRes.json();

  console.log(`🎉 ¡Historia de Instagram publicada con éxito!`);
  console.log(`🔗 Enlace en vivo: ${infoData.permalink || 'https://www.instagram.com/stories/skyblue.mayorista/'}`);
  return publishData.id;
}

// Publicar en Facebook Page Stories
async function publishFacebookStory(pageId, accessToken, imageUrl) {
  console.log(`📘 2. Publicando Story en Fanpage de Facebook (${pageId})...`);
  
  // 1. Subir foto oculta a la página
  const photoUrl = `https://graph.facebook.com/v21.0/${pageId}/photos`;
  const photoRes = await fetch(photoUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      url: imageUrl,
      published: false,
      access_token: accessToken
    })
  });
  const photoData = await photoRes.json();

  if (photoData.error) {
    console.warn(`⚠️ Aviso al subir foto para Facebook Story: ${photoData.error.message}`);
    return null;
  }

  // 2. Crear photo story
  const storyUrl = `https://graph.facebook.com/v21.0/${pageId}/photo_stories`;
  const storyRes = await fetch(storyUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      photo_id: photoData.id,
      access_token: accessToken
    })
  });
  const storyData = await storyRes.json();

  if (storyData.error) {
    console.warn(`⚠️ Aviso al publicar en Facebook Story: ${storyData.error.message}`);
    return null;
  }

  console.log(`🎉 ¡Historia de Facebook publicada con éxito! (Story ID: ${storyData.id || photoData.id})`);
  return storyData.id || photoData.id;
}

async function main() {
  const env = loadEnv();
  const pageToken = env.META_PAGE_ACCESS_TOKEN;
  const pageId = env.META_PAGE_ID;
  const igId = env.META_INSTAGRAM_ID;

  if (!pageToken || !pageId) {
    console.error("❌ Faltan credenciales en .env.");
    console.error("Ejecutá primero: node scripts/setup_meta_token.mjs <TU_ACCESS_TOKEN>");
    process.exit(1);
  }

  const imageArg = process.argv[2] || path.join(__dirname, '..', 'public', 'stories_auto_batch', 'story_promo_minimo_6.jpg');
  
  if (!fs.existsSync(imageArg)) {
    console.error(`❌ El archivo de imagen no existe: ${imageArg}`);
    process.exit(1);
  }

  try {
    const publicUrl = await uploadToPublicHost(imageArg);

    // Publicar en Instagram si está vinculado
    if (igId) {
      await publishInstagramStory(igId, pageToken, publicUrl);
    } else {
      console.warn("⚠️ META_INSTAGRAM_ID no está definido en .env. Omitiendo Instagram.");
    }

    // Publicar en Facebook
    await publishFacebookStory(pageId, pageToken, publicUrl);

    console.log("\n🚀 ¡Proceso de publicación completado exitosamente!");
  } catch (err) {
    console.error("\n❌ Error en la publicación:", err.message);
  }
}

main();
