import fs from 'fs';
import path from 'path';
import pages from './data/pages.json' assert { type: 'json' };

console.log('🚀 Starting Sarasota Emergency Dentist page generator...');

pages.forEach(page => {
  const templatePath = path.join(process.cwd(), `${page.template || 'content'}.html`);
  let content = `<h1>${page.title}</h1><p>Generated page for ${page.slug}</p>`;
  
  // In real production this would load real templates
  fs.writeFileSync(path.join(process.cwd(), `${page.slug}.html`), content, 'utf8');
  console.log(`✅ Generated: ${page.slug}.html`);
});

console.log('🎉 All pages generated successfully – April 7, 2026');
