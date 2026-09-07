import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ENV_PATH = path.join(__dirname, '..', '.env');

const APP_ID = '1333667918692213';
const APP_SECRET = '6ec14a5c6366f182e8bade35b8276dad';

async function setupToken(inputToken) {
  if (!inputToken) {
    console.error("❌ Por favor proporciona el token de Graph API Explorer.");
    console.log("Uso: node scripts/setup_meta_token.mjs <TU_ACCESS_TOKEN>");
    process.exit(1);
  }

  console.log("🔍 1. Verificando y canjeando por Long-Lived Token...");

  // 1. Canjear token por uno de larga duración (60 días)
  const exchangeUrl = `https://graph.facebook.com/v21.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${APP_ID}&client_secret=${APP_SECRET}&fb_exchange_token=${inputToken.trim()}`;
  const exchangeRes = await fetch(exchangeUrl);
  const exchangeData = await exchangeRes.json();

  let userToken = inputToken.trim();
  if (exchangeData.access_token) {
    console.log("✅ Token de larga duración obtenido con éxito.");
    userToken = exchangeData.access_token;
  } else if (exchangeData.error) {
    console.warn("⚠️ Aviso al canjear token (puede ser ya un token de página):", exchangeData.error.message);
  }

  // 2. Obtener las páginas del usuario
  console.log("🔍 2. Consultando Páginas de Facebook vinculadas...");
  const accountsRes = await fetch(`https://graph.facebook.com/v21.0/me/accounts?access_token=${userToken}`);
  const accountsData = await accountsRes.json();

  if (!accountsData.data || accountsData.data.length === 0) {
    // Si el token ingresado ya era un Page Token directo
    console.log("ℹ️ Intentando consultar página directa con el token ingresado...");
    const pageRes = await fetch(`https://graph.facebook.com/v21.0/me?fields=id,name,instagram_business_account&access_token=${userToken}`);
    const pageData = await pageRes.json();
    
    if (pageData.id) {
      return saveCredentials(pageData.id, pageData.name, userToken, pageData.instagram_business_account?.id);
    }
    console.error("❌ No se encontraron páginas con este token:", accountsData);
    process.exit(1);
  }

  console.log(`📋 Se encontraron ${accountsData.data.length} página(s):`);
  accountsData.data.forEach((p, idx) => {
    console.log(`   [${idx + 1}] ${p.name} (ID: ${p.id})`);
  });

  // Tomamos la primera o buscamos SkyBlue
  const targetPage = accountsData.data.find(p => p.name.toLowerCase().includes('skyblue')) || accountsData.data[0];
  console.log(`🎯 Seleccionada página: ${targetPage.name} (ID: ${targetPage.id})`);

  const pageToken = targetPage.access_token;
  const pageId = targetPage.id;

  // 3. Obtener la cuenta de Instagram conectada a esa página
  console.log("🔍 3. Consultando cuenta de Instagram Business conectada...");
  const igRes = await fetch(`https://graph.facebook.com/v21.0/${pageId}?fields=instagram_business_account&access_token=${pageToken}`);
  const igData = await igRes.json();

  const igId = igData.instagram_business_account?.id;
  if (igId) {
    console.log(`✅ Cuenta de Instagram encontrada (ID: ${igId})`);
  } else {
    console.warn("⚠️ No se detectó cuenta de Instagram vinculada directamente en la página.");
    console.warn("Respuesta:", igData);
  }

  saveCredentials(pageId, targetPage.name, pageToken, igId);
}

function saveCredentials(pageId, pageName, pageToken, igId) {
  let envContent = fs.existsSync(ENV_PATH) ? fs.readFileSync(ENV_PATH, 'utf8') : '';

  // Actualizar o agregar variables
  const varsToSet = {
    META_APP_ID: APP_ID,
    META_APP_SECRET: APP_SECRET,
    META_PAGE_ID: pageId,
    META_PAGE_NAME: pageName,
    META_PAGE_ACCESS_TOKEN: pageToken,
    META_INSTAGRAM_ID: igId || ''
  };

  for (const [key, value] of Object.entries(varsToSet)) {
    const regex = new RegExp(`^${key}=.*$`, 'm');
    if (regex.test(envContent)) {
      envContent = envContent.replace(regex, `${key}=${value}`);
    } else {
      envContent += `\n${key}=${value}`;
    }
  }

  fs.writeFileSync(ENV_PATH, envContent.trim() + '\n', 'utf8');
  console.log("\n🎉 ¡Credenciales de Meta guardadas exitosamente en .env!");
  console.log(`📄 Fanpage: ${pageName} (${pageId})`);
  console.log(`📸 Instagram ID: ${igId || 'Pendiente de vincular'}`);
  console.log("🔑 Page Token permanente listo para publicar historias.");
}

const input = process.argv[2];
setupToken(input);
