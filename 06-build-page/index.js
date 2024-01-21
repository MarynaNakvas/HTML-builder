const fs = require('fs');
const path = require('path');

async function makeMainDirectory() {
  const mainFolder = path.join(__dirname, 'project-dist');
  await fs.promises.mkdir(mainFolder, { recursive: true });

  const assetsFolder = path.join(__dirname, 'project-dist', 'assets');
  await fs.promises.mkdir(assetsFolder, { recursive: true });

  await fs.promises.writeFile(
    path.join(__dirname, 'project-dist', 'index.html'),
    '',
  );
}
makeMainDirectory().catch((err) => console.error('Error:', err));

fs.readdir('06-build-page/styles', { withFileTypes: true }, (err, files) => {
  if (err) {
    console.error('Error:', err);
  } else {
    fs.writeFile(
      path.join(__dirname, 'project-dist', 'style.css'),
      '',
      (err) => {
        if (err) throw err;
      },
    );
    for (const file of files) {
      if (file.isFile() && path.extname(file.name) == '.css') {
        fs.readFile(
          path.join(__dirname, 'styles', file.name),
          'utf-8',
          (err, data) => {
            if (err) throw err;
            fs.appendFile(
              path.join(__dirname, 'project-dist', 'style.css'),
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

fs.readdir('06-build-page/assets', { withFileTypes: true }, (err, folders) => {
  if (err) {
    console.error('Error:', err);
  } else {
    for (const folder of folders) {
      if (folder.isDirectory()) {
        fs.promises.mkdir(
          path.join(__dirname, 'project-dist', 'assets', folder.name),
          {
            recursive: true,
          },
        );
        fs.readdir(
          `06-build-page/assets/${folder.name}`,
          { withFileTypes: true },
          (err, files) => {
            if (err) {
              console.error('Error:', err);
            } else {
              for (const file of files) {
                if (file.isFile()) {
                  fs.readFile(
                    path.join(__dirname, `assets/${folder.name}`, file.name),
                    'utf-8',
                    (err, data) => {
                      if (err) throw err;
                      fs.writeFile(
                        path.join(
                          __dirname,
                          `project-dist/assets/${folder.name}`,
                          file.name,
                        ),
                        data,
                        (err) => {
                          if (err) throw err;
                        },
                      );
                    },
                  );
                }
              }
            }
          },
        );
      }
    }
  }
});

fs.readFile(
  path.join(__dirname, 'template.html'),
  'utf-8',
  (err, templateData) => {
    if (err) throw err;
    let regex = /{{(.*?)}}/g;
    let match;
    let newData = templateData;
    while ((match = regex.exec(newData)) !== null) {
      const component = match[1];
      fs.readFile(
        path.join(__dirname, 'components', `${component}.html`),
        'utf-8',
        (err, data) => {
          if (err) throw err;
          newData = newData.replace(`{{${component}}}`, data);
          fs.writeFile(
            path.join(__dirname, 'project-dist', 'index.html'),
            newData,
            (err) => {
              if (err) throw err;
            },
          );
        },
      );
    }
  },
);
