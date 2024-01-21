const fs = require('fs');

const output = fs.createWriteStream('02-write-file/text.txt');

const { stdin, stdout } = process;

stdout.write('Hello! What is your name?\n');
stdin.on('data', (data) => {
  const text = data.toString();

  if (text.trim() === 'exit') {
    stdout.write('Nice to meet you! Good bye!');
    process.exit();
  } else {
    output.write(text);
  }
});

process.on('SIGINT', () => {
  stdout.write('Nice to meet you! Good bye!');
  process.exit();
});
