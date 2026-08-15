const fs = require('fs');

const html = fs.readFileSync('public/index.html', 'utf8');
const js = fs.readFileSync('public/app.js', 'utf8');

// 1. Find all document.getElementById('...') in app.js
const idMatches = [...js.matchAll(/document\.getElementById\(['"]([^'"]+)['"]\)/g)].map(m => m[1]);
const uniqueJsIds = [...new Set(idMatches)];

console.log(`Total getElementById calls: ${idMatches.length}, Unique IDs: ${uniqueJsIds.length}`);

const missingIds = [];
for (const id of uniqueJsIds) {
  const inHtml = html.includes(`id="${id}"`) || html.includes(`id='${id}'`);
  if (!inHtml) {
    missingIds.push(id);
  }
}

console.log('Missing IDs in index.html (getElementById in JS but NOT in HTML):', missingIds);

// 2. Check all event listener calls in initEventListeners
const initListenerMatch = js.match(/function initEventListeners\(\) \{([\s\S]*?)\n  \}/);
if (initListenerMatch) {
  console.log('Found initEventListeners');
  const body = initListenerMatch[1];
  // Check any lines that don't have if guards
  const rawLines = body.split('\n');
  const potentialUnguarded = [];
  for (const line of rawLines) {
    const trimmed = line.trim();
    if (trimmed.includes('.addEventListener(') && !trimmed.startsWith('if (') && !trimmed.startsWith('document.querySelectorAll') && !trimmed.startsWith('card.addEventListener') && !trimmed.startsWith('th.addEventListener') && !trimmed.startsWith('cd.addEventListener') && !trimmed.startsWith('fc.addEventListener') && !trimmed.startsWith('btn.addEventListener')) {
      potentialUnguarded.push(trimmed);
    }
  }
  console.log('Unguarded addEventListener calls:', potentialUnguarded);
}
