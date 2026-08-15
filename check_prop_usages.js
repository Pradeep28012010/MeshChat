const fs = require('fs');

const js = fs.readFileSync('public/app.js', 'utf8');

const missingProps = [
  'btnOpenEncryption',
  'btnSidebarToolsHub',
  'btnOpenTimer',
  'btnOpenExpenses',
  'btnToggleRedMode',
  'btnOpenNotes',
  'btnOpenNetwork',
  'btnOpenCamera',
  'btnOpenStarred',
  'btnOpenEvents',
  'btnOpenGames',
  'btnToggleDisappearing',
  'disappearingBadge',
  'btnOpenWallpapers',
  'btnOpenAi',
  'btnOpenGeofence',
  'btnOpenMorse',
  'btnOpenRadar',
  'btnOpenGuide',
  'btnStartRollcall'
];

for (const prop of missingProps) {
  const regex = new RegExp(`elements\\.${prop}[^a-zA-Z0-9_]`, 'g');
  const matches = [...js.matchAll(regex)];
  console.log(`Prop "${prop}": used ${matches.length} times`);
}
