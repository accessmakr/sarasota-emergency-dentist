// generate-files.js
const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://www.sarasotaemergencydentist.com';
const MAIN_HTML = 'index.html';   // ← homepage is now index.html

console.log('🚀 Starting auto-generation (full subfolder + title support)...');

// ===================== RECURSIVE HTML FINDER =====================
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
console.log(`Found ${htmlFiles.length} HTML files (including /guide/, /location/, etc.)`);

// ===================== BUILD PAGES.JSON + SITEMAP =====================
const pages = [];
const sitemapUrls = [];

htmlFiles.forEach(file => {
  const relativePath = path.relative('.', file).replace(/\\/g, '/');
  const content = fs.readFileSync(file, 'utf8');
  const titleMatch = content.match(/<title>(.*?)<\/title>/i);
  const title = titleMatch 
    ? titleMatch[1].trim().replace(/&amp;/g, '&') 
    : relativePath.replace('.html', '').replace(/-/g, ' ');

  const slug = relativePath === MAIN_HTML ? '/' : `/${relativePath}`;

  pages.push({ path: slug, title: title, lastmod: new Date().toISOString().split('T')[0] });

  sitemapUrls.push({
    loc: `${DOMAIN}${slug}`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: relativePath === MAIN_HTML ? 'daily' : 'weekly',
    priority: relativePath === MAIN_HTML ? '1.0' : '0.8'
  });
});

// Title map for registry (real <title> tags)
const titleMap = {};
pages.forEach(page => {
  let key = page.path === '/' ? MAIN_HTML : page.path.substring(1);
  titleMap[key] = page.title;
});

// Generate pages.json
fs.writeFileSync('pages.json', JSON.stringify(pages, null, 2));
console.log('✅ pages.json generated');

// ===================== BUILD DYNAMIC REGISTRY.JS =====================
let registryContent = `// ================================================
// AUTO-GENERATED REGISTRY.JS — fully dynamic
// Generated on ${new Date().toISOString()}
// Supports index.html + /guide/ + /location/ + any subfolder
// ================================================

window.SITE_REGISTRY = {
    version: "2026.04.11-v6",
    lastUpdated: new Date().toISOString(),
    
    folders: {},

    getAllPages: function() {
        let all = [];
        Object.keys(this.folders).forEach(folder => {
            this.folders[folder].files.forEach(file => {
                all.push({ folder: folder, ...file });
            });
        });
        return all;
    }
};

// Build folder structure from actual files
const folderMap = {};

htmlFiles.forEach(file => {
    const relative = path.relative('.', file).replace(/\\\\/g, '/');
    const dir = path.dirname(relative) === '.' ? 'Root' : relative.split('/')[0];
    const filename = path.basename(relative);
    
    if (!folderMap[dir]) {
        folderMap[dir] = {
            icon: dir === 'Root' || dir === 'guide' ? '🦷' : dir === 'location' ? '📍' : '📁',
            files: []
        };
    }
    
    let label = titleMap[relative] || filename.replace('.html', '').replace(/-/g, ' ').replace(/\\//g, ' › ');
    
    folderMap[dir].files.push({
        name: relative,
        label: label,
        description: ''
    });
});

// Special homepage handling
if (folderMap['Root']) {
    const homepage = folderMap['Root'].files.find(f => f.name === 'index.html');
    if (homepage) {
        homepage.label = "Main Homepage";
        homepage.name = '/';                    // clean root link
    }
}

window.SITE_REGISTRY.folders = folderMap;

// Extract dentists (unchanged)
`;

const mainContent = fs.readFileSync(MAIN_HTML, 'utf8');
const dentistsMatch = mainContent.match(/const\s+dentists\s*=\s*(\[[\s\S]*?\])\s*;?/i);

if (dentistsMatch && dentistsMatch[1]) {
  registryContent += `const dentists = ${dentistsMatch[1]};\n\n`;
  console.log(`✅ Extracted dentists array`);
} else {
  registryContent += `const dentists = [];\n`;
  console.log('⚠️ No dentists array found in index.html');
}

fs.writeFileSync('registry.js', registryContent);
console.log('✅ registry.js generated (dynamic folders + real titles + index.html homepage)');

// ===================== SITEMAP =====================
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

console.log('\n🎉 DONE! index.html is homepage, /guide/ and /location/ are fully supported, search-ready.');
