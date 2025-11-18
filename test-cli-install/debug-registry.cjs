const path = require('path');
const fs = require('fs');

const cwd = process.cwd();
console.log('CWD:', cwd);

const possiblePaths = [
  path.resolve(cwd, '../../packages/registry/registry.json'),
  path.resolve(cwd, '../registry/registry.json'),
  path.resolve(cwd, './packages/registry/registry.json'),
];

possiblePaths.forEach((p, i) => {
  console.log(`\nPath ${i + 1}: ${p}`);
  console.log(`  Exists: ${fs.existsSync(p)}`);
  if (fs.existsSync(p)) {
    const registry = JSON.parse(fs.readFileSync(p, 'utf8'));
    console.log(
      `  Has section-heading-system: ${!!registry['section-heading-system']}`
    );
  }
});
