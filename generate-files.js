const fs = require('fs');
const path = require('path');

const REGISTRY_OUTPUT = path.join('js', 'registry.js');

try {
  function getAllHtmlFiles(dir) {
    let files = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
        files = files.concat(getAllHtmlFiles(fullPath));
      } else if (entry.isFile() && entry.name.endsWith('.html')) {
        files.push(fullPath);
      }
    }
    return files;
  }

  const htmlFiles = getAllHtmlFiles(process.cwd());
  const folderMap = {};

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
  });

  // We are NOT extracting dentists anymore to prevent the syntax error
  let registryContent = `window.SITE_REGISTRY = {
    version: "2026.04.11-MenuFixed",
    folders: ${JSON.stringify(folderMap, null, 2)},
    dentists: [], 
    getAllPages: function() {
        let all = [];
        Object.keys(this.folders).forEach(f => {
            this.folders[f].files.forEach(file => all.push(file));
        });
        return all;
    }
};`;

  if (!fs.existsSync('js')) fs.mkdirSync('js');
  fs.writeFileSync(REGISTRY_OUTPUT, registryContent);
  console.log('✅ registry.js fixed (Dentist extraction disabled).');

} catch (err) {
  console.error('💥 ERROR:', err.message);
  process.exit(1);
}
