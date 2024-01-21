const fs = require('fs');
const path = require('path');

fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), '', (err) => {
  if (err) throw err;
});

fs.readdir('05-merge-styles/styles', { withFileTypes: true }, (err, files) => {
  if (err) {
    console.error('Error:', err);
  } else {
    for (const file of files) {
      if (file.isFile() && path.extname(file.name) == '.css') {
        fs.readFile(
          path.join(__dirname, 'styles', file.name),
          'utf-8',
          (err, data) => {
            if (err) throw err;
            fs.appendFile(
              path.join(__dirname, 'project-dist', 'bundle.css'),
              `${data}\n`,
              (err) => {
                if (err) throw err;
              },
            );
          },
        );
      }
    }
  }
});
