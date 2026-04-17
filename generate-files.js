// generate-files.js — V5 (SITEMAP, JSON, AND REGEX FIXES)
const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://www.sarasotaemergencydentist.com';
const MAIN_HTML = 'index.html';
const REGISTRY_OUTPUT = path.join('js', 'registry.js');

console.log('🚀 Starting auto-generation...');

try {
  function getAllHtmlFiles(dir) {
    let files = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      // Skip hidden folders, node_modules, and the js folder
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

  // 1. GENERATE AND SAVE pages.json
  fs.writeFileSync('pages.json', JSON.stringify(pages, null, 2));
  console.log('✅ pages.json written successfully.');

  // 2. GENERATE AND SAVE sitemap.xml
  let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  pages.forEach(page => {
    let urlPath = page.path === 'index.html' ? '' : page.path;
    sitemapContent += `  <url>\n    <loc>${DOMAIN}/${urlPath}</loc>\n    <changefreq>weekly</changefreq>\n  </url>\n`;
  });
  sitemapContent += `</urlset>`;
  fs.writeFileSync('sitemap.xml', sitemapContent);
  console.log('✅ sitemap.xml written successfully.');

  // 3. GENERATE js/registry.js
  let registryContent = `window.SITE_REGISTRY = {
    version: "2026.04.11-Fixed",
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
      console.log('✅ Successfully extracted full dentist array.');
    } else {
      console.error('❌ Could not find dentists with the DYNAMIC_NEW_PROVIDERS_INSERT marker in index.html.');
      registryContent += `window.SITE_REGISTRY.dentists = [];`;
    }
  }

  if (!fs.existsSync('js')) fs.mkdirSync('js');
  fs.writeFileSync(REGISTRY_OUTPUT, registryContent);
  console.log('✅ registry.js written successfully.');

} catch (err) {
  console.error('💥 ERROR:', err.message);
  process.exit(1);
}
