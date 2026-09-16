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

/**
 * Publica un Post B2B Corporativo en la API de LinkedIn
 */
export async function publishLinkedInPost({ accessToken, orgUrn, text, mediaUrl = null, dryRun = false }) {
    if (dryRun) {
        console.log(`[DRY-RUN] LinkedIn Post B2B Corporativo listo para publicar.`);
        console.log(`Contenido preview: ${text.substring(0, 100)}...`);
        return "DRY_RUN_LINKEDIN_ID";
    }

    if (!accessToken || !orgUrn) {
        console.warn("⚠️ Faltan credenciales de LinkedIn (LINKEDIN_ACCESS_TOKEN o LINKEDIN_ORG_URN) en .env.");
        console.log("ℹ️ Simulando publicación corporativa en LinkedIn para Casas de Deportes...");
        return "LINKEDIN_SIMULATED_SUCCESS";
    }

    console.log(`💼 Publicando Post B2B en LinkedIn para ${orgUrn}...`);

    const payload = {
        author: orgUrn,
        lifecycleState: "PUBLISHED",
        specificContent: {
            "com.linkedin.ugc.ShareContent": {
                shareCommentary: {
                    text: text
                },
                shareMediaCategory: mediaUrl ? "ARTICLE" : "NONE",
                media: mediaUrl ? [
                    {
                        status: "READY",
                        originalUrl: mediaUrl,
                        title: {
                            text: "SkyBlue Mayorista - Oportunidad B2B para Casas de Deportes"
                        }
                    }
                ] : []
            }
        },
        visibility: {
            "com.linkedin.ugc.ShareVisibility": "PUBLIC"
        }
    };

    const res = await fetch("https://api.linkedin.com/v2/ugcPosts", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            "X-Restli-Protocol-Version": "2.0.0"
        },
        body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (!res.ok) {
        throw new Error(`Error al publicar en LinkedIn: ${JSON.stringify(data)}`);
    }

    console.log(`🎉 Post publicado exitosamente en LinkedIn (ID: ${data.id})`);
    return data.id;
}

if (process.argv[1] && process.argv[1].endsWith('publish_linkedin_post.mjs')) {
    const env = loadEnv();
    console.log("ℹ️ Módulo de publicación en LinkedIn API inicializado.");
    console.log("Credenciales detectadas:", {
        hasToken: !!env.LINKEDIN_ACCESS_TOKEN,
        orgUrn: env.LINKEDIN_ORG_URN || 'urn:li:organization:skyblue'
    });
}
