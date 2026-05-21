/*
  Site développé par phomsay pour zaki.
  Contact Discord : @phomsay671.
  Dev web : phomsay. Admin : sauci.
  Recherche et édition : Zaki & B.
*/

import { mkdir, readFile, rm } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const rootDir = process.cwd();
const indexPath = path.join(rootDir, 'index.html');
const cssPath = path.join(rootDir, 'accueil-css', 'accueil.css');
const outputDir = path.join(rootDir, 'assets', 'personnages', 'responsive');
const variants = [
  { folder: 'normal', width: 520, aspectRatio: 384 / 520 },
  { folder: '2k', width: 840, aspectRatio: 420 / 520 },
  { folder: 'ultrawide', width: 1200, aspectRatio: 420 / 320 }
];

const slugify = (value) => {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
};

const parsePositionPart = (value, total, cropSize) => {
  if (!value || value === 'center') {
    return Math.round((total - cropSize) / 2);
  }

  if (value === 'left' || value === 'top') {
    return 0;
  }

  if (value === 'right' || value === 'bottom') {
    return Math.round(total - cropSize);
  }

  const percentMatch = value.match(/^(-?\d+(?:\.\d+)?)%$/);
  if (percentMatch) {
    const percent = Number(percentMatch[1]) / 100;
    return Math.round((total * percent) - (cropSize * percent));
  }

  return Math.round((total - cropSize) / 2);
};

const parseObjectPosition = (value = 'center center') => {
  const parts = value.trim().split(/\s+/);
  const x = parts[0] || 'center';
  const y = parts[1] || 'center';
  return { x, y };
};

const getCoverCrop = ({ sourceWidth, sourceHeight, aspectRatio, objectPosition }) => {
  const sourceAspectRatio = sourceWidth / sourceHeight;
  const cropWidth = sourceAspectRatio > aspectRatio
    ? Math.round(sourceHeight * aspectRatio)
    : sourceWidth;
  const cropHeight = sourceAspectRatio > aspectRatio
    ? sourceHeight
    : Math.round(sourceWidth / aspectRatio);
  const position = parseObjectPosition(objectPosition);

  return {
    left: Math.max(0, Math.min(sourceWidth - cropWidth, parsePositionPart(position.x, sourceWidth, cropWidth))),
    top: Math.max(0, Math.min(sourceHeight - cropHeight, parsePositionPart(position.y, sourceHeight, cropHeight))),
    width: cropWidth,
    height: cropHeight
  };
};

const extractObjectPositions = async () => {
  const css = await readFile(cssPath, 'utf8');
  const matches = css.matchAll(/\.rail-character\[href="([^"]+)"\]\s+img\s*\{\s*object-position:\s*([^;]+);/g);
  return new Map([...matches].map((match) => [match[1], match[2].trim()]));
};

const extractRailImages = async () => {
  const html = await readFile(indexPath, 'utf8');
  const matches = html.matchAll(/\{\s*href:\s*'([^']+)',\s*image:\s*'([^']+)'/g);
  return [...matches].map((match) => ({ href: match[1], imagePath: match[2] }));
};

const generateVariant = async ({ href, imagePath, objectPosition }, variant) => {
  const sourcePath = path.join(rootDir, imagePath);
  const characterSlug = slugify(path.basename(href, '.html'));
  const outputName = `${characterSlug}-${variant.width}.webp`;
  const outputPath = path.join(outputDir, variant.folder, outputName);
  const metadata = await sharp(sourcePath).metadata();
  const crop = getCoverCrop({
    sourceWidth: metadata.width,
    sourceHeight: metadata.height,
    aspectRatio: variant.aspectRatio,
    objectPosition
  });
  const height = Math.round(variant.width / variant.aspectRatio);

  await sharp(sourcePath)
    .extract(crop)
    .resize({ width: variant.width, height })
    .webp({ quality: 82 })
    .toFile(outputPath);
};

await rm(outputDir, { recursive: true, force: true });

const images = await extractRailImages();
const objectPositions = await extractObjectPositions();

for (const variant of variants) {
  await mkdir(path.join(outputDir, variant.folder), { recursive: true });
}

for (const image of images) {
  for (const variant of variants) {
    await generateVariant({
      href: image.href,
      imagePath: image.imagePath,
      objectPosition: objectPositions.get(image.href) || 'center center'
    }, variant);
  }
}

console.log(`Variantes generees: ${images.length * variants.length}`);
