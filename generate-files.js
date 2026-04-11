// generate-files.js
const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://www.sarasotaemergencydentist.com';
const MAIN_HTML = 'index.html';
const REGISTRY_OUTPUT = path.join('js', 'registry.js');

console.log('🚀 Starting auto-generation (Collision-Free Version)...');
console.log(`📍 Registry target: ${REGISTRY_OUTPUT}`);

try {
  // 1. RECURSIVE HTML FINDER
  function getAllHtmlFiles(dir) {
    let files = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules' && entry.name !== '.git') {
        files = files.concat(getAllHtmlFiles(fullPath));
      } else if (entry.isFile() && entry.name.endsWith('.html') && !entry.name.startsWith('.')) {
        files.push(fullPath);
      }
    }
    return files;
  }

  const htmlFiles = getAllHtmlFiles('.');
  console.log(`✅ Found ${htmlFiles.length} HTML files`);

  // 2. DATA COLLECTION
  const pages = [];
  const sitemapUrls = [];
  const titleMap = {};
  const folderMap = {}; // FIXED: Defined as a real object here

  htmlFiles.forEach(file => {
    const relativePath = path.relative('.', file).replace(/\\/g, '/');
    const content = fs.readFileSync(file, 'utf8');
    
    // Extract Title
    const titleMatch = content.match(/<title>(.*?)<\/title>/i);
    const title = titleMatch 
      ? titleMatch[1].trim().replace(/&amp;/g, '&') 
      : relativePath.replace('.html', '').replace(/-/g, ' ');

    const slug = relativePath === MAIN_HTML ? '/' : `/${relativePath}`;
    const filename = path.basename(relativePath);
    const dir = path.dirname(relativePath) === '.' ? 'Root' : relativePath.split('/')[0];

    // Build Internal Title Map
    titleMap[relativePath] = title;

    // Build Sitemap Data
    pages.push({ path: slug, title: title, lastmod: new Date().toISOString().split('T')[0] });
    sitemapUrls.push({
      loc: `${DOMAIN}${slug}`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: relativePath === MAIN_HTML ? 'daily' : 'weekly',
      priority: relativePath === MAIN_HTML ? '1.0' : '0.8'
    });

    // Sort into Folder Map for the Menu
    if (!folderMap[dir]) {
      folderMap[dir] = {
        icon: (dir === 'Root' || dir === 'guide') ? '🦷' : (dir === 'location' ? '📍' : '📁'),
        files: []
      };
    }
    
    folderMap[dir].files.push({
      name: relativePath,
      label: title,
      description: ''
    });
  });

  // 3. GENERATE REGISTRY.JS CONTENT
  let registryContent = `// ================================================
// AUTO-GENERATED REGISTRY.JS — Collision-Free
// Generated on ${new Date().toISOString()}
// ================================================

window.SITE_REGISTRY = {
    version: "2026.04.11-Fixed",
    lastUpdated: new Date().toISOString(),
    folders: ${JSON.stringify(folderMap, null, 2)},
    dentists: [],
    getAllPages: function() {
        let all = [];
        Object.keys(this.folders).forEach(folder => {
            this.folders[folder].files.forEach(file => {
                all.push({ folder: folder, ...file });
            });
        });
        return all;
    }
};\n\n`;

  // 4. EXTRACT DENTISTS FROM INDEX.HTML
  if (fs.existsSync(MAIN_HTML)) {
    const mainContent = fs.readFileSync(MAIN_HTML, 'utf8');
    const dentistsMatch = mainContent.match(/const\s+dentists\s*=\s*(\[[\s\S]*?\])\s*;?/i);
    if (dentistsMatch && dentistsMatch[1]) {
      registryContent += `window.SITE_REGISTRY.dentists = ${dentistsMatch[1]};\n`;
      console.log(`✅ Extracted dentists array from ${MAIN_HTML}`);
    }
  }

  // 5. WRITE FILES
  if (!fs.existsSync('js')) fs.mkdirSync('js', { recursive: true });
  fs.writeFileSync(REGISTRY_OUTPUT, registryContent);
  fs.writeFileSync('pages.json', JSON.stringify(pages, null, 2));

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  sitemapUrls.forEach(url => {
    sitemap += `  <url>\n    <loc>${url.loc}</loc>\n    <lastmod>${url.lastmod}</lastmod>\n    <changefreq>${url.changefreq}</changefreq>\n    <priority>${url.priority}</priority>\n  </url>\n`;
  });
  sitemap += `</urlset>`;
  fs.writeFileSync('sitemap.xml', sitemap);

  console.log('✅ All files (registry.js, pages.json, sitemap.xml) generated successfully!');

} catch (err) {
  console.error('💥 CRITICAL ERROR during generation:', err.stack);
  process.exit(1);
}
