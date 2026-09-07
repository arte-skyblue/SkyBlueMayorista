import fs from 'fs';

const html = fs.readFileSync('data/ipn_dump/notifications.asp.html', 'utf8');
const inputs = html.match(/<input[^>]+>/gi) || [];
console.log('Inputs found:', inputs);

const formTag = html.match(/<form[^>]+>/gi) || [];
console.log('Form tags:', formTag);

// Check if there are other forms or links
const allHrefs = html.match(/href=["'][^"']+["']/gi) || [];
console.log('All hrefs:', allHrefs);
