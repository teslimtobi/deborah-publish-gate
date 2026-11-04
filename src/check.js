const fs = require('node:fs');

//1. Read the manifest file named on the command line
const file = process.argv[2];
const manifest = JSON.parse(fs.readFileSync(file, 'utf8'));

let failures = 0;

// 2. Check every item in the manifest
for (const item of manifest.items) {
  if (item.status === 'approved') {
    console.log(`PASS  ${item.itemId} [${item.language}]`);
  } else {
    console.log(`FAIL  ${item.itemId} [${item.language}]: status is "${item.status}", only approved content can be published`);
    failures++;
  }
}

// 3. Stop the pipeline if anything failed
if (failures > 0) {
  console.log(`BLOCKED: ${failures} item(s) failed. Nothing will be published.`);
  process.exit(1);
}
console.log('READY: publish can proceed.');