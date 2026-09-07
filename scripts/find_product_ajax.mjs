import fs from 'fs';

const html = fs.readFileSync('data/ipn_dump/core_modules/products_main.html', 'utf8');

const scripts = html.matchAll(/<script[\s\S]*?>([\s\S]*?)<\/script>/gi);
const ajaxCalls = [];

for (const s of scripts) {
  const content = s[1];
  const matches = content.matchAll(/\$\.(?:ajax|get|post|getJSON)\s*\(\s*['"`]([^'"`]+)['"`]/gi);
  for (const m of matches) {
    ajaxCalls.push(m[1]);
  }
  const urlMatches = content.matchAll(/url\s*:\s*['"`]([^'"`]+)['"`]/gi);
  for (const m of urlMatches) {
    ajaxCalls.push(m[1]);
  }
  const fetchMatches = content.matchAll(/fetch\s*\(\s*['"`]([^'"`]+)['"`]/gi);
  for (const m of fetchMatches) {
    ajaxCalls.push(m[1]);
  }
}

console.log('Discovered AJAX / API Endpoints in products_main:');
console.log(Array.from(new Set(ajaxCalls)));

// Also let's search for any data arrays or JSON assigned to variables in script tags
for (const s of html.matchAll(/<script[\s\S]*?>([\s\S]*?)<\/script>/gi)) {
  const content = s[1];
  if (content.includes('season') || content.includes('trademark') || content.includes('provider') || content.includes('flexselect')) {
    console.log('\n--- Script snippet ---');
    console.log(content.slice(0, 1500));
  }
}
