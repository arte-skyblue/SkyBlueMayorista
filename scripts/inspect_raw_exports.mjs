import fs from 'fs';
import path from 'path';

function inspectExports() {
  const dir = path.resolve('./data/real_ipn_export');
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const filePath = path.join(dir, f);
    const content = fs.readFileSync(filePath, 'utf8');
    console.log(`File: ${f}, Size: ${content.length} chars`);
    
    // Look for tables or select options
    const tableMatches = content.match(/<table[\s\S]*?<\/table>/gi) || [];
    console.log(`  Tables count in ${f}: ${tableMatches.length}`);
    if (tableMatches.length > 0) {
      console.log(`  First 300 chars of first table:`, tableMatches[0].slice(0, 300).replace(/\s+/g, ' '));
    }
  }
}

inspectExports();
