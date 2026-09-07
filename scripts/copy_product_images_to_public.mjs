import fs from 'fs';
import path from 'path';

const SRC_DIR = path.resolve('data/images/por_producto');
const DEST_DIR = path.resolve('public/product-images');

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

console.log('Copiando fotos de productos de data/images/por_producto a public/product-images...');
if (fs.existsSync(SRC_DIR)) {
  copyRecursiveSync(SRC_DIR, DEST_DIR);
  console.log('¡Fotos copiadas con éxito a public/product-images!');
} else {
  console.log('No se encontró el directorio fuente:', SRC_DIR);
}
