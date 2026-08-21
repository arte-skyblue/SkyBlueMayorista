import fs from 'fs';

const html = fs.readFileSync('scripts/home_page.html', 'utf8');

// Find sections, images, brands, pastillas
console.log('Searching for brands or pills in home_page.html:');
const matches = [...html.matchAll(/<div[^>]*class=["'][^"']*(?:brand|pill|marca|pastilla|category|family|banner|slide)[^"']*["'][^>]*>([\s\S]*?)<\/div>/gi)];
console.log('Matches with brand/pill/marca:', matches.length);

// Let's print all images and their alt/surrounding tags
const imgContainers = [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?<img[\s\S]*?>[\s\S]*?)<\/a>/gi)];
imgContainers.forEach((ic, i) => {
  console.log(`\nLink/Image ${i}: href=${ic[1]}`);
  console.log(ic[2].trim());
});
