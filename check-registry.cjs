const fs = require('fs');
const registry = JSON.parse(
  fs.readFileSync('./packages/registry/registry.json', 'utf8')
);
const allKeys = Object.keys(registry);
console.log('All keys:', allKeys.length);
console.log(
  'Has section-heading-system:',
  allKeys.includes('section-heading-system')
);
console.log('\nSection-related keys:');
allKeys
  .filter((k) => k.includes('section'))
  .forEach((k) => console.log(`  -  ${k}`));
