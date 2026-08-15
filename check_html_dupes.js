const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');
const idRegex = /id=["']([^"']+)["']/g;
let match;
const counts = {};
const dupes = [];

while ((match = idRegex.exec(html)) !== null) {
  const id = match[1];
  counts[id] = (counts[id] || 0) + 1;
  if (counts[id] === 2) {
    dupes.push(id);
  }
}

console.log('Duplicate IDs found in index.html:', dupes.length ? dupes : 'NONE (100% clean)');
