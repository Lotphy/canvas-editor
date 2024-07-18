const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');
const { Image } = require('canvas');

function extractPathData(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return reject(err);
      }

      xml2js.parseString(data, (err, result) => {
        if (err) {
          return reject(err);
        }

        const paths = [];
        const url = filePath.replace('public\\', '').replace('public/', '').replaceAll('\\', '/');

        if (result.svg) {
          const path = result.svg.g ? result.svg.g[0].path : result.svg.path;
          path?.forEach(pathObj => {
            if (pathObj.$ && pathObj.$.d) {
              paths.push({ url, path2D: pathObj.$.d });
            }
          });
        }

        resolve(paths);
      });
    });
  });
}

async function extractImageData(filePath) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ url: filePath.replace('public\\', '').replace('public/', '').replaceAll('\\', '/'), originalWidth: img.width, originalHeight: img.height });
    img.onerror = reject;
    img.src = filePath;
  });
}

async function scanSvgFolder(folderPath) {
  const files = fs.readdirSync(folderPath);
  const svgFiles = files.filter(file => path.extname(file).toLowerCase() === '.svg');

  const result = [];

  for (const file of svgFiles) {
    const filePath = path.join(folderPath, file);
    try {
      const paths = await extractPathData(filePath);
      result.push(...paths);
    } catch (err) {
      console.error(`Error processing file ${filePath}:`, err);
    }
  }

  return result;
}

function scanSampleImagesFolder(folderPath) {
  const files = fs.readdirSync(folderPath);
  const result = [];

  files.forEach(async (file) => {
    const fileExtension = path.extname(file).toLowerCase().replace('.', '');
    if (fileExtension === 'jpeg' || fileExtension === 'jpg' || fileExtension === 'png') {
      const filePath = path.join(folderPath, file);
      const imageData = await extractImageData(filePath);
      result.push(imageData);
    }
  });

  return result;
}

const svgMasksFolder = './public/assets/masks';
const svgExports = scanSvgFolder(svgMasksFolder)

const sampleImagesFolder = './public/assets/samples/img';
const imagesExports = scanSampleImagesFolder(sampleImagesFolder)

Promise.all([imagesExports, svgExports]).then(result => {
  const exportedVariables = `// Auto-generated file, do not edit it \n// scan-sample-images-folder.js
		\nexport const sampleImagesUrls = ${JSON.stringify(result[0], null, 2)};
		\nexport const svgPathData = ${JSON.stringify(result[1], null, 2)};`;
  fs.writeFileSync('./src/shared/sample-resources.js', exportedVariables, 'utf8');
});
