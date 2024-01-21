const fs = require('fs');
const path = require('path');

fs.readdir(
  '03-files-in-folder/secret-folder',
  { withFileTypes: true },
  (err, files) => {
    if (err) {
      console.error('Error:', err);
    } else {
      for (const file of files) {
        const name = path.parse(file.name).name;
        const extname = path.extname(file.name).slice(1);

        fs.stat(
          `03-files-in-folder/secret-folder/${file.name}`,
          (err, stats) => {
            if (err) {
              console.error('Error:', err);
            } else if (stats.isFile()) {
              console.log(`${name} - ${extname} - ${stats.size}b`);
            }
          },
        );
      }
    }
  },
);
