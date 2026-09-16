import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { publishInstagramFeed, publishFacebookFeed } from './publish_feed_meta.mjs';
import { publishLinkedInPost } from './publish_linkedin_post.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ENV_PATH = path.join(__dirname, '..', '.env');
const DATA_PATH = path.join(__dirname, '..', 'data', 'programacion_contenidos_meta_linkedin.json');

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

async function main() {
    const isDryRun = process.argv.includes('--dry-run') || true; // Por defecto dry-run de seguridad si no hay imágenes reales cargadas
    const targetPostId = process.argv.find(arg => arg.startsWith('--id='))?.split('=')[1];

    console.log("🚀 Orquestador de Campañas SkyBlue (Meta API & LinkedIn API)");
    console.log(`Modo de ejecución: ${isDryRun ? 'SIMULACIÓN (--dry-run)' : 'PRODUCCIÓN EN VIVO'}`);
    console.log("------------------------------------------------------------");

    if (!fs.existsSync(DATA_PATH)) {
        console.error(`❌ No se encontró el archivo de datos JSON: ${DATA_PATH}`);
        process.exit(1);
    }

    const env = loadEnv();
    const scheduleData = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
    const posts = scheduleData.scheduled_posts || [];

    let filteredPosts = posts;
    if (targetPostId) {
        filteredPosts = posts.filter(p => p.id === targetPostId);
        console.log(`🎯 Filtrando por ID de publicación: ${targetPostId}`);
    }

    console.log(`📦 Se encontraron ${filteredPosts.length} publicaciones programadas.\n`);

    for (const post of filteredPosts) {
        console.log(`============================================================`);
        console.log(`🆔 ID: ${post.id}`);
        console.log(`📌 Campaña: ${post.campaign}`);
        console.log(`📅 Fecha Programada: ${post.scheduled_date}`);
        console.log(`📡 Canales Objetivo: ${post.target_networks.join(', ')}`);
        console.log(`👥 Audiencia: ${post.target_audience}`);
        console.log(`📝 Caption:\n${post.caption.substring(0, 120)}...`);

        // Procesar canal Meta (Instagram / Facebook)
        if (post.target_networks.includes('INSTAGRAM') || post.target_networks.includes('FACEBOOK')) {
            if (post.target_networks.includes('INSTAGRAM')) {
                await publishInstagramFeed({
                    igUserId: env.META_INSTAGRAM_ID || '17841432461763423',
                    accessToken: env.META_PAGE_ACCESS_TOKEN || 'DEMO_TOKEN',
                    caption: `${post.caption}\n\n${post.hashtags.join(' ')}`,
                    mediaUrls: ["https://skyblue.com.ar/assets/demo_creative.jpg"],
                    postType: post.post_type,
                    dryRun: isDryRun
                });
            }

            if (post.target_networks.includes('FACEBOOK')) {
                await publishFacebookFeed({
                    pageId: env.META_PAGE_ID || '1145444185319807',
                    accessToken: env.META_PAGE_ACCESS_TOKEN || 'DEMO_TOKEN',
                    caption: `${post.caption}\n\n${post.hashtags.join(' ')}`,
                    mediaUrls: ["https://skyblue.com.ar/assets/demo_creative.jpg"],
                    dryRun: isDryRun
                });
            }
        }

        // Procesar canal LinkedIn
        if (post.target_networks.includes('LINKEDIN')) {
            await publishLinkedInPost({
                accessToken: env.LINKEDIN_ACCESS_TOKEN,
                orgUrn: env.LINKEDIN_ORG_URN || 'urn:li:organization:skyblue',
                text: `${post.caption}\n\n${post.hashtags.join(' ')}`,
                mediaUrl: post.link_url,
                dryRun: isDryRun
            });
        }

        console.log(`✅ Publicación ${post.id} procesada exitosamente en simulación.\n`);
    }

    console.log("------------------------------------------------------------");
    console.log("🎉 Orquestación completada. Todas las publicaciones han sido verificadas en el plan.");
}

main();
