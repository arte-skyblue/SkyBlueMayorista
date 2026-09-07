import fs from 'fs';

function findAjaxParams() {
  const js = fs.readFileSync('data/real_ipn_export/productDefault.js', 'utf8');
  const lines = js.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('ws/productDefault.asp')) {
      console.log('--- Found ws/productDefault.asp at line', i, '---');
      console.log(lines.slice(Math.max(0, i - 15), Math.min(lines.length, i + 35)).join('\n'));
    }
  }
}

findAjaxParams();
