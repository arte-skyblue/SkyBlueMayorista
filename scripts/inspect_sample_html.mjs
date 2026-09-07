import fs from 'fs';

const html = fs.readFileSync('data/sample_article_page.html', 'utf8');

// Look for script tags or ajax URLs
const scripts = html.match(/<script[\s\S]*?<\/script>/gi) || [];
console.log('Total scripts on page:', scripts.length);

scripts.forEach((s, idx) => {
  if (s.includes('fetch') || s.includes('$.ajax') || s.includes('$.post') || s.includes('$.get') || s.includes('.asp') || s.includes('load') || s.includes('article')) {
    console.log(`Script ${idx} snippet:`, s.slice(0, 300));
  }
});

// Look for links / frames / iframes / forms
const iframes = html.match(/<iframe[\s\S]*?<\/iframe>/gi) || [];
console.log('Iframes found:', iframes);

// Look for all .asp URLs in the HTML
const aspMatches = html.match(/[\w\/\.\-]+\.asp[^\s"'>]*/gi) || [];
const uniqueAsp = [...new Set(aspMatches)];
console.log('Unique .asp URLs found:', uniqueAsp);
