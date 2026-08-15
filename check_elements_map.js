const fs = require('fs');

const js = fs.readFileSync('public/app.js', 'utf8');
const html = fs.readFileSync('public/index.html', 'utf8');

// Find all elements.<prop>
const elementPropMatches = [...js.matchAll(/elements\.([a-zA-Z0-9_]+)/g)].map(m => m[1]);
const uniqueProps = [...new Set(elementPropMatches)];

console.log(`Total elements.<prop> accesses: ${elementPropMatches.length}, Unique props: ${uniqueProps.length}`);

// Extract elements map definition from app.js
const elementsDefMatch = js.match(/const elements = \{([\s\S]*?)\n  \};/);
if (elementsDefMatch) {
  const lines = elementsDefMatch[1].split('\n');
  const mappedIds = {};
  for (const line of lines) {
    const m = line.match(/([a-zA-Z0-9_]+):\s*document\.getElementById\(['"]([^'"]+)['"]\)/);
    if (m) {
      mappedIds[m[1]] = m[2];
    }
  }

  const missingFromHtml = [];
  for (const [prop, id] of Object.entries(mappedIds)) {
    if (!html.includes(`id="${id}"`) && !html.includes(`id='${id}'`)) {
      missingFromHtml.push({ prop, id });
    }
  }

  console.log('Props mapped to missing HTML IDs:', missingFromHtml);
}
