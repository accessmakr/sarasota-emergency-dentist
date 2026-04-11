
const fs = require('fs');
const path = require('path');

// ========================= CONFIG =========================
const DOMAIN = 'https://www.sarasotaemergencydentist.com';
const MAIN_HTML = 'index.html';
// =======================================================

console.log('🚀 Starting auto-generation of pages.json, registry.js, sitemap.xml...');

// ===================== RECURSIVE HTML FINDER =====================
function getAllHtmlFiles(dir) {
  let files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (!entry.name.startsWith('.') && entry.name !== 'node_modules' && entry.name !== '.git') {
        files = files.concat(getAllHtmlFiles(fullPath));
      }
    } 
    else if (entry.isFile() && entry.name.endsWith('.html') && !entry.name.startsWith('.')) {
      files.push(fullPath);
    }
  }
  return files;
}

const htmlFiles = getAllHtmlFiles('.');
console.log(`Found ${htmlFiles.length} HTML files (including subfolders)`);

// 2. Build pages.json + sitemap data
const pages = [];
const sitemapUrls = [];

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');

  const titleMatch = content.match(/<title>(.*?)<\/title>/i);
  const title = titleMatch 
    ? titleMatch[1].trim().replace(/&amp;/g, '&') 
    : file.replace('.html', '').replace(/-/g, ' ').replace(/\//g, ' › ');

  const slug = file === MAIN_HTML ? '/' : `/${file}`;

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

// 4. FIXED: Extract dentists array (no more JSON.parse crash)
const mainContent = fs.readFileSync(MAIN_HTML, 'utf8');

// Robust regex: handles missing semicolon, extra whitespace, different formatting
const dentistsMatch = mainContent.match(/const\s+dentists\s*=\s*(\[[\s\S]*?\])\s*;?/i);

let registryContent = `// ================================================
// AUTO-GENERATED REGISTRY.JS
// Generated on ${new Date().toISOString()}
// Extracted from ${MAIN_HTML}
// ================================================


`;

if (dentistsMatch && dentistsMatch[1]) {
  const arrayContent = dentistsMatch[1].trim();
  // Safe count without JSON.parse (counts each dentist object)
  const numDentists = (arrayContent.match(/\{\s*id\s*:/gi) || []).length;

  registryContent += `const dentists = ${dentistsMatch[1]};\n\n`;
  registryContent += `// Shared across all pages (pd.html, odo.html, etc.)\n`;
  registryContent += `// Usage: <script src="/registry.js"></script>\n`;
  registryContent += `// Then: window.dentists or just "dentists" (global)\n`;

  console.log(`✅ Extracted ${numDentists} dentists`);
} else {
  registryContent += `// WARNING: Could not extract dentists array from ${MAIN_HTML}\n`;
  registryContent += `const dentists = [];\n`;
  console.log('⚠️  Could not find dentists array — check index.html');
}

fs.writeFileSync('registry.js', registryContent);
console.log('✅ registry.js generated (with full dentists array)');

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
console.log('   → registry.js  ← now contains the full dentists array');
console.log('   → sitemap.xml');
