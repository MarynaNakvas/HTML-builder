const path = require('path');
const fs = require('fs');

const { stdout } = process;

const file = path.join(__dirname, 'text.txt');

const stream = fs.createReadStream(file, 'utf-8');

let data = '';
stream.on('data', (chunk) => (data += chunk));
stream.on('end', () => stdout.write(data));
