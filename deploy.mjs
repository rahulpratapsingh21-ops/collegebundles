import * as ftp from 'basic-ftp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function deploy() {
  const client = new ftp.Client();
  client.ftp.verbose = true;
  // Set timeout to 30 seconds
  client.ftp.timeout = 30000;

  const credentials = {
    host: 'absdigitalsolution.com',
    user: 'absdigitalsol',
    password: 'FyQbWPVTn5wmqbgRHHuH',
    port: 21,
    secure: false,
  };

  const maxRetries = 5;
  let connected = false;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`[Attempt ${attempt}/${maxRetries}] Connecting to ${credentials.host}...`);
      await client.access(credentials);
      connected = true;
      console.log('Successfully authenticated with Pure-FTPd server!');
      break;
    } catch (err) {
      console.warn(`Connection attempt ${attempt} failed: ${err.message}`);
      if (attempt < maxRetries) {
        console.log('Waiting 3 seconds before retrying...');
        await new Promise(r => setTimeout(r, 3000));
      } else {
        throw err;
      }
    }
  }

  try {
    console.log('Checking current directory...');
    const pwd = await client.pwd();
    console.log('Remote current directory:', pwd);

    // List remote files in root
    const rootList = await client.list();
    console.log('Remote root entries count:', rootList.length);

    // Check public_html
    const hasPublicHtml = rootList.some(f => f.name === 'public_html');
    const targetDir = hasPublicHtml ? '/public_html' : '/';
    console.log(`Target deployment directory: ${targetDir}`);

    // Navigate to target directory
    await client.cd(targetDir);
    console.log('Now in:', await client.pwd());

    const existingFiles = await client.list();
    console.log(`Files currently in ${targetDir}:`, existingFiles.map(f => f.name));

    // Upload dist folder to target directory
    const distPath = path.resolve(__dirname, 'dist');
    if (!fs.existsSync(distPath)) {
      throw new Error(`dist directory not found at ${distPath}. Run 'npm run build' first.`);
    }

    console.log(`\nStarting upload from ${distPath} to ${targetDir}...`);
    await client.uploadFromDir(distPath, targetDir);

    // Explicitly verify .htaccess upload
    const htaccessLocal = path.join(distPath, '.htaccess');
    if (fs.existsSync(htaccessLocal)) {
      console.log('Ensuring .htaccess is uploaded...');
      await client.uploadFrom(htaccessLocal, `${targetDir}/.htaccess`);
    }

    console.log('\nDeployment completed successfully!');
    const finalFiles = await client.list();
    console.log(`Updated files in ${targetDir}:`, finalFiles.map(f => f.name));

  } catch (err) {
    console.error('Deployment error:', err);
    process.exitCode = 1;
  } finally {
    client.close();
    console.log('FTP session cleanly closed.');
  }
}

deploy();
