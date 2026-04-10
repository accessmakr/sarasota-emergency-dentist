const fs = require('fs');
const path = require('path');

// ========================= CONFIG =========================
const DOMAIN = 'https://www.sarasotaemergencydentist.com';
const MAIN_HTML = 'index.html';           // change to 'index.html' if you rename it
// =======================================================

console.log('🚀 Starting auto-generation of pages.json, registry.js, sitemap.xml...');

// ===================== RECURSIVE HTML FINDER =====================
function getAllHtmlFiles(dir) {
  let files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Skip hidden folders and common junk
      if (!entry.name.startsWith('.') && entry.name !== 'node_modules' && entry.name !== '.git') {
        files = files.concat(getAllHtmlFiles(fullPath));
      }
    } 
    else if (entry.isFile() && entry.name.endsWith('.html') && !entry.name.startsWith('.')) {
      // fullPath is already the correct relative path (e.g. "guide/page.html")
      files.push(fullPath);
    }
  }
  return files;
}

// Get ALL .html files recursively
const htmlFiles = getAllHtmlFiles('.');
console.log(`Found ${htmlFiles.length} HTML files (including subfolders)`);

// 2. Build pages.json + sitemap data
const pages = [];
const sitemapUrls = [];

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');

  // Extract <title> if exists
  const titleMatch = content.match(/<title>(.*?)<\/title>/i);
  const title = titleMatch 
    ? titleMatch[1].trim().replace(/&amp;/g, '&') 
    : file.replace('.html', '').replace(/-/g, ' ');

  // Slug: root index.html → '/', everything else keeps full path + .html
  let slug = file === MAIN_HTML ? '/' : `/${file}`;

  pages.push({
    path: slug,
    title: title,
    lastmod: new Date().toISOString().split('T')[0]
  });

  sitemapUrls.push({
    loc: `${DOMAIN}${slug}`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: file === MAIN_HTML ? 'daily' : 'weekly',
    priority: file === MAIN_HTML ? '1.0' : '0.8'
  });
});

// 3. Generate pages.json
fs.writeFileSync('pages.json', JSON.stringify(pages, null, 2));
console.log('✅ pages.json generated');

// 4. Extract dentists array from index.html and create registry.js
const mainContent = fs.readFileSync(MAIN_HTML, 'utf8');
const dentistsMatch = mainContent.match(/const dentists = (\[[\s\S]*?\]);/);

let registryContent = `// ================================================
// AUTO-GENERATED REGISTRY.JS
// Generated on ${new Date().toISOString()}
// Extracted from ${MAIN_HTML}
// ================================================


`;

if (dentistsMatch && dentistsMatch[1]) {
  registryContent += `const dentists = ${dentistsMatch[1]};\n\n`;
  registryContent += `// Shared across all pages (pd.html, odo.html, etc.)\n`;
  registryContent += `// Usage: <script src="/registry.js"></script>\n`;
  registryContent += `// Then: window.dentists or just dentists (global)\n`;
  console.log(`✅ Extracted ${JSON.parse(dentistsMatch[1]).length} dentists`);
} else {
  registryContent += `// WARNING: Could not extract dentists array from ${MAIN_HTML}\n`;
  registryContent += `const dentists = [];\n`;
  console.log('⚠️  Could not find dentists array');
}

fs.writeFileSync('registry.js', registryContent);
console.log('✅ registry.js generated');

// 5. Generate sitemap.xml
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

sitemapUrls.forEach(url => {
  sitemap += `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>
`;
});

sitemap += `</urlset>`;

fs.writeFileSync('sitemap.xml', sitemap);
console.log('✅ sitemap.xml generated');

console.log('\n🎉 ALL FILES GENERATED SUCCESSFULLY!');
console.log('   → pages.json');
console.log('   → registry.js');
console.log('   → sitemap.xml');
