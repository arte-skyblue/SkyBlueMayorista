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

// Subir imagen a hosting público para que Meta pueda descargarla
async function uploadToPublicHost(filePath) {
    console.log(`📤 Subiendo archivo ${path.basename(filePath)} a hosting público temporal...`);
    const buffer = fs.readFileSync(filePath);
    const blob = new Blob([buffer]);
    const form = new FormData();
    form.append("reqtype", "fileupload");
    form.append("fileToUpload", blob, path.basename(filePath));

    const res = await fetch("https://catbox.moe/user/api.php", { method: "POST", body: form });
    const publicUrl = (await res.text()).trim();

    if (!publicUrl.startsWith("http")) {
        throw new Error(`Error al subir archivo público: ${publicUrl}`);
    }
    console.log(`🌐 URL pública lista: ${publicUrl}`);
    return publicUrl;
}

// Wait for media container processing
async function waitForContainerFinished(creationId, accessToken) {
    console.log(`⏳ Procesando contenedor Meta CDN (ID: ${creationId})...`);
    for (let attempt = 1; attempt <= 12; attempt++) {
        await new Promise(r => setTimeout(r, 3000));
        const statusRes = await fetch(`https://graph.facebook.com/v21.0/${creationId}?fields=status_code,status&access_token=${accessToken}`);
        const statusData = await statusRes.json();
        console.log(`   [Intento ${attempt}/12] Estado: ${statusData.status_code || 'PROCESANDO'}...`);

        if (statusData.status_code === 'FINISHED') {
            return true;
        }
        if (statusData.status_code === 'ERROR' || statusData.status_code === 'EXPIRED') {
            throw new Error(`El contenedor falló con estado: ${statusData.status}`);
        }
    }
    throw new Error(`Timeout esperando contenedor ID: ${creationId}`);
}

/**
 * Publica un Post de Feed en Instagram (Single Image, Carousel o Reel)
 */
export async function publishInstagramFeed({ igUserId, accessToken, caption, mediaUrls, postType = 'FEED_IMAGE', dryRun = false }) {
    if (dryRun) {
        console.log(`[DRY-RUN] Instagram ${postType} listo para publicar/programar.`);
        console.log(`Caption preview: ${caption.substring(0, 80)}...`);
        return "DRY_RUN_IG_ID";
    }

    console.log(`📸 Creando contenedor Instagram (${postType})...`);
    let creationId = null;

    if (postType === 'CAROUSEL' && mediaUrls.length > 1) {
        // 1. Crear contenedores hijos para cada foto del carrusel
        const itemIds = [];
        for (const url of mediaUrls) {
            const itemRes = await fetch(`https://graph.facebook.com/v21.0/${igUserId}/media`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    image_url: url,
                    is_carousel_item: true,
                    access_token: accessToken
                })
            });
            const itemData = await itemRes.json();
            if (itemData.error) throw new Error(`Error en ítem del carrusel: ${JSON.stringify(itemData.error)}`);
            await waitForContainerFinished(itemData.id, accessToken);
            itemIds.push(itemData.id);
        }

        // 2. Crear contenedor padre del carrusel
        const parentRes = await fetch(`https://graph.facebook.com/v21.0/${igUserId}/media`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                caption: caption,
                media_type: 'CAROUSEL',
                children: itemIds,
                access_token: accessToken
            })
        });
        const parentData = await parentRes.json();
        if (parentData.error) throw new Error(`Error creando contenedor Carrusel: ${JSON.stringify(parentData.error)}`);
        creationId = parentData.id;

    } else if (postType === 'REELS') {
        const reelRes = await fetch(`https://graph.facebook.com/v21.0/${igUserId}/media`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                video_url: mediaUrls[0],
                caption: caption,
                media_type: 'REELS',
                access_token: accessToken
            })
        });
        const reelData = await reelRes.json();
        if (reelData.error) throw new Error(`Error creando contenedor Reel: ${JSON.stringify(reelData.error)}`);
        creationId = reelData.id;

    } else {
        // Single Image
        const singleRes = await fetch(`https://graph.facebook.com/v21.0/${igUserId}/media`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                image_url: mediaUrls[0],
                caption: caption,
                access_token: accessToken
            })
        });
        const singleData = await singleRes.json();
        if (singleData.error) throw new Error(`Error creando contenedor Single Image: ${JSON.stringify(singleData.error)}`);
        creationId = singleData.id;
    }

    await waitForContainerFinished(creationId, accessToken);

    // Publicar contenedor
    console.log("🚀 Publicando en Instagram Feed...");
    const publishRes = await fetch(`https://graph.facebook.com/v21.0/${igUserId}/media_publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            creation_id: creationId,
            access_token: accessToken
        })
    });
    const publishData = await publishRes.json();
    if (publishData.error) throw new Error(`Error publicando IG Feed: ${JSON.stringify(publishData.error)}`);

    console.log(`🎉 Post publicado en Instagram (ID: ${publishData.id})`);
    return publishData.id;
}

/**
 * Publica un Post en la Fanpage de Facebook
 */
export async function publishFacebookFeed({ pageId, accessToken, caption, mediaUrls, dryRun = false }) {
    if (dryRun) {
        console.log(`[DRY-RUN] Facebook Post listo para publicar.`);
        return "DRY_RUN_FB_ID";
    }

    console.log(`📘 Publicando Post en Fanpage de Facebook (${pageId})...`);
    const res = await fetch(`https://graph.facebook.com/v21.0/${pageId}/feed`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            message: caption,
            link: mediaUrls[0],
            access_token: accessToken
        })
    });
    const data = await res.json();
    if (data.error) throw new Error(`Error publicando FB Post: ${JSON.stringify(data.error)}`);

    console.log(`🎉 Post publicado en Facebook (ID: ${data.id})`);
    return data.id;
}

// Ejecución directa si se invoca desde la CLI
if (process.argv[1] && process.argv[1].endsWith('publish_feed_meta.mjs')) {
    const env = loadEnv();
    console.log("ℹ️ Módulo de publicación en Meta Feed inicializado.");
    console.log("Credenciales detectadas:", {
        pageId: env.META_PAGE_ID || 'NO_SET',
        igId: env.META_INSTAGRAM_ID || 'NO_SET'
    });
}
