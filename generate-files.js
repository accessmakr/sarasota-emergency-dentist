// generate-files.js — V7 (METICULOUS EDITION)
const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://www.sarasotaemergencydentist.com';
const MAIN_HTML = 'index.html';
const REGISTRY_OUTPUT = path.join('js', 'registry.js');

console.log('🚀 Starting A-to-Z surgical generation...');

try {
  function getAllHtmlFiles(dir) {
    let files = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules' && entry.name !== 'js') {
        files = files.concat(getAllHtmlFiles(fullPath));
      } else if (entry.isFile() && entry.name.endsWith('.html')) {
        files.push(fullPath);
      }
    }
    return files;
  }

  const htmlFiles = getAllHtmlFiles(process.cwd());
  const folderMap = {};
  const pages = [];

  htmlFiles.forEach(file => {
    const relativePath = path.relative(process.cwd(), file).replace(/\\/g, '/');
    const content = fs.readFileSync(file, 'utf8');
    const titleMatch = content.match(/<title>(.*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : relativePath;

    const dir = path.dirname(relativePath) === '.' ? 'Root' : relativePath.split('/')[0];

    if (!folderMap[dir]) {
      folderMap[dir] = { icon: (dir === 'Root' ? '🦷' : '📁'), files: [] };
    }
    
    folderMap[dir].files.push({ name: relativePath, label: title });
    pages.push({ path: relativePath, title: title });
  });

  // 1. WRITE pages.json
  fs.writeFileSync('pages.json', JSON.stringify(pages, null, 2));

  // 2. WRITE sitemap.xml (CLEAN URLS + REAL LASTMOD)
  let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  pages.forEach(page => {
    let cleanPath = page.path.replace('.html', '');
    if (cleanPath === 'index') cleanPath = ''; 

    // Get true file modification time
    const stats = fs.statSync(page.path);
    const lastMod = stats.mtime.toISOString().split('T')[0];

    sitemapContent += `  <url>\n`;
    sitemapContent += `    <loc>${DOMAIN}/${cleanPath}</loc>\n`;
    sitemapContent += `    <lastmod>${lastMod}</lastmod>\n`;
    sitemapContent += `    <changefreq>weekly</changefreq>\n`;
    sitemapContent += `    <priority>${cleanPath === '' ? '1.0' : '0.8'}</priority>\n`;
    sitemapContent += `  </url>\n`;
  });
  sitemapContent += `</urlset>`;
  fs.writeFileSync('sitemap.xml', sitemapContent);

  // 3. WRITE js/registry.js
  let registryContent = `window.SITE_REGISTRY = {
    version: "2026.04.18-Surgical",
    folders: ${JSON.stringify(folderMap, null, 2)},
    dentists: [],
    getAllPages: function() {
        let all = [];
        Object.keys(this.folders).forEach(f => {
            this.folders[f].files.forEach(file => all.push(file));
        });
        return all;
    }
};\n\n`;

  // EXTRACT DENTISTS
  if (fs.existsSync(MAIN_HTML)) {
    const mainContent = fs.readFileSync(MAIN_HTML, 'utf8');
    const dentistsMatch = mainContent.match(/const\s+dentists\s*=\s*([\s\S]*?);\s*\/\/\s*\{\{DYNAMIC_NEW_PROVIDERS_INSERT\}\}/i);
    if (dentistsMatch && dentistsMatch[1]) {
      registryContent += `window.SITE_REGISTRY.dentists = ${dentistsMatch[1]};`;
      console.log('✅ Success: All files and dentist data synced.');
    }
  }

  if (!fs.existsSync('js')) fs.mkdirSync('js');
  fs.writeFileSync(REGISTRY_OUTPUT, registryContent);

} catch (err) {
  console.error('💥 Error:', err.message);
  process.exit(1);
}
