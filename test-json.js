const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data/globe.json', 'utf8'));
console.log('Keys:', Object.keys(data));
console.log('Features length:', data.features ? data.features.length : 'undefined');
