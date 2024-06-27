const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

// Function to extract the 'd' attribute from SVG path elements
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
				const url = filePath.replace('public', '');

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

// Function to scan the folder and process SVG files
async function scanFolder(folderPath) {
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

// Usage example
const folderPath = './public/assets/masks'; // Replace with the path to your SVG folder
scanFolder(folderPath)
	.then(result => {
		const output = `//Auto-generated file, do not edit it \nexport const svgPathData = ${JSON.stringify(result, null, 2)};`;
		fs.writeFileSync('./src/shared/svg-masks.js', output, 'utf8');
	})
	.catch(err => {
		console.error('Error scanning folder:', err);
	});
