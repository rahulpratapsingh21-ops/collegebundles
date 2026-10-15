# ABS Digital Solutions

Digital Accessibility & AI SEO Agency Web Application.

## Live Website
- Production: [https://absdigitalsolution.com/](https://absdigitalsolution.com/)

## Project Structure
- `src/`: React source code (Navbar with mega-menu, Services, Accessibility, AI SEO & LLMO, Web Development, Supabase Lead Capture, WhatsApp integration)
- `public/`: Static assets, branding graphics, blog images, icons, and `.htaccess`
- `deploy.mjs`: Automated FTP deployment script to cPanel Pure-FTPd (`/public_html`)

## Development & Deployment
```bash
# Install dependencies
npm install

# Run local development server
npm run dev

# Build for production
npm run build

# Deploy to absdigitalsolution.com cPanel host
node deploy.mjs
```
