const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'public', 'assets');
const destDir = path.join(__dirname, 'dist', 'assets');

// Function to copy files and directories
const copyDirectory = (src, dest) => {
  // Create destination directory if it doesn't exist
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  // Read items in the source directory
  const items = fs.readdirSync(src);

  items.forEach(item => {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);

    if (fs.lstatSync(srcPath).isDirectory()) {
      // Recursively copy subdirectories
      copyDirectory(srcPath, destPath);
    } else {
      // Copy files
      fs.copyFileSync(srcPath, destPath);
    }
  });
};

// Start the copy process
copyDirectory(srcDir, destDir);
