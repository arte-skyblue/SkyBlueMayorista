import fs from 'fs';

function findDetailsScripts() {
  const html = fs.readFileSync('data/real_ipn_export/sample_product_details.html', 'utf8');
  const scripts = Array.from(html.matchAll(/<script[^>]*src="([^"]+)"/gi), m => m[1]);
  console.log('Scripts in details.asp:', scripts);

  const inlineScripts = Array.from(html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi), m => m[1]);
  console.log(`Found ${inlineScripts.length} inline scripts`);
  for (let i = 0; i < inlineScripts.length; i++) {
    const scr = inlineScripts[i];
    if (scr.includes('.asp') || scr.includes('ajax') || scr.includes('post') || scr.includes('load')) {
      console.log(`Inline script ${i}:`, scr.slice(0, 300));
    }
  }
}

findDetailsScripts();
