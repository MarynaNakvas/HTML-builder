const fs = require('fs');
const path = require('path');

async function clearFolder() {
  await fs.readdir('04-copy-directory/files-copy', (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join('04-copy-directory/files-copy', file), (err) => {
        if (err) throw err;
      });
    }
  });
}

async function makeDirectory() {
  const projectFolder = path.join(__dirname, 'files-copy');
  await fs.promises.mkdir(projectFolder, { recursive: true });
}
makeDirectory().catch((err) => console.error('Error:', err));

async function filesCopy() {
  await clearFolder();
  await makeDirectory();
  try {
    const files = await fs.promises.readdir('04-copy-directory/files');
    for (const file of files) {
      fs.readFile(path.join(__dirname, 'files', file), 'utf-8', (err, data) => {
        if (err) throw err;
        fs.writeFile(path.join(__dirname, 'files-copy', file), data, (err) => {
          if (err) throw err;
        });
      });
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

filesCopy();
