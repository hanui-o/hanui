import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname replacement for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  widths: [640, 768, 1024, 1280],
  quality: 80,
  formats: ['webp'], // 'avif' can be added if needed
  extensions: ['.jpg', '.jpeg', '.png'],
};

async function optimizeImages() {
  // Check if sharp is installed
  let sharp;
  try {
    sharp = (await import('sharp')).default;
  } catch (e) {
    console.error(
      '\x1b[31m%s\x1b[0m',
      'Error: "sharp" library is not installed.'
    );
    console.log('Please install it using: pnpm add -D sharp');
    process.exit(1);
  }

  // Get input/output directories from args or defaults
  const args = process.argv.slice(2);
  const inputDir = args[0]
    ? path.resolve(process.cwd(), args[0])
    : path.resolve(process.cwd(), 'public/images');
  const outputDir = args[1] ? path.resolve(process.cwd(), args[1]) : inputDir;

  if (!fs.existsSync(inputDir)) {
    console.error(`Input directory does not exist: ${inputDir}`);
    process.exit(1);
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log(`Optimizing images from: ${inputDir}`);
  console.log(`Output to: ${outputDir}`);

  // Find all images
  const files = fs.readdirSync(inputDir);
  const images = files.filter(
    (file) =>
      CONFIG.extensions.includes(path.extname(file).toLowerCase()) &&
      !file.includes('-opt') // Avoid re-optimizing already optimized files if in same dir
  );

  if (images.length === 0) {
    console.log('No images found to optimize.');
    return;
  }

  console.log(`Found ${images.length} images.`);

  for (const file of images) {
    const filePath = path.join(inputDir, file);
    const fileName = path.parse(file).name;
    const ext = path.extname(file);

    console.log(`Processing: ${file}`);

    const imageBuffer = fs.readFileSync(filePath);
    const metadata = await sharp(imageBuffer).metadata();

    // 1. Generate resized versions (WebP)
    for (const width of CONFIG.widths) {
      if (metadata.width && metadata.width < width) continue; // Skip if original is smaller

      for (const format of CONFIG.formats) {
        const outName = `${fileName}-${width}.${format}`;
        const outPath = path.join(outputDir, outName);

        await sharp(imageBuffer)
          .resize(width)
          .toFormat(format, { quality: CONFIG.quality })
          .toFile(outPath);

        console.log(`  -> Generated: ${outName}`);
      }
    }

    // 2. Generate original size in WebP
    for (const format of CONFIG.formats) {
      const outName = `${fileName}.${format}`;
      const outPath = path.join(outputDir, outName);

      // Skip if input is already same format and we are outputting to same dir
      if (inputDir === outputDir && ext.toLowerCase() === `.${format}`)
        continue;

      await sharp(imageBuffer)
        .toFormat(format, { quality: CONFIG.quality })
        .toFile(outPath);

      console.log(`  -> Converted: ${outName}`);
    }
  }

  console.log('\n✨ Optimization complete!');
}

optimizeImages().catch((err) => {
  console.error('Optimization failed:', err);
  process.exit(1);
});
