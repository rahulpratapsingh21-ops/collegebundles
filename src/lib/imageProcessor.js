/**
 * CollegeBundles Image Processing & WebP Conversion Engine
 */

export const CATEGORY_FALLBACK_IMAGES = {
  medical: '/medical-news.jpg',
  engineering: '/engineering-news.jpg',
  management: '/management-news.jpg',
  online: '/online-degree-news.jpg',
};

/**
 * Returns fallback image based on category
 */
export function getCategoryFallbackImage(category) {
  const cat = (category || '').toLowerCase();
  if (cat.includes('med') || cat.includes('neet') || cat.includes('mbbs')) return CATEGORY_FALLBACK_IMAGES.medical;
  if (cat.includes('eng') || cat.includes('jee') || cat.includes('tech')) return CATEGORY_FALLBACK_IMAGES.engineering;
  if (cat.includes('man') || cat.includes('mba') || cat.includes('cat') || cat.includes('business')) return CATEGORY_FALLBACK_IMAGES.management;
  if (cat.includes('onl') || cat.includes('distance') || cat.includes('ugc')) return CATEGORY_FALLBACK_IMAGES.online;
  return CATEGORY_FALLBACK_IMAGES.engineering;
}

/**
 * Converts a given image URL or file to WebP Data URL format using HTML5 Canvas
 */
export async function convertToWebP(imageUrl, maxWidth = 1200, quality = 0.85) {
  if (!imageUrl) return null;

  // If already a local image asset, return directly
  if (imageUrl.startsWith('/') || imageUrl.startsWith('data:image/webp')) {
    return imageUrl;
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    const timer = setTimeout(() => {
      // Timeout fallback if remote image blocks CORS
      resolve(imageUrl);
    }, 4000);

    img.onload = () => {
      clearTimeout(timer);
      try {
        const canvas = document.createElement('canvas');
        let width = img.naturalWidth || img.width;
        let height = img.naturalHeight || img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        const webpDataUrl = canvas.toDataURL('image/webp', quality);
        resolve(webpDataUrl);
      } catch (e) {
        console.warn('Canvas WebP conversion fallback to original URL:', e);
        resolve(imageUrl);
      }
    };

    img.onerror = () => {
      clearTimeout(timer);
      resolve(imageUrl);
    };

    img.src = imageUrl;
  });
}

/**
 * Generates an SEO friendly filename from a title/slug
 */
export function generateImageFilename(slug) {
  const cleanSlug = (slug || 'collegebundles-news')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '')
    .slice(0, 50);
  return `${cleanSlug}.webp`;
}

/**
 * Generates descriptive image ALT text following SEO standards
 */
export function generateImageAltText(title, category) {
  if (!title) return 'CollegeBundles Education News and Admissions Update';
  const clean = title.replace(/[^\w\s-]/gi, '').trim();
  const catLabel = category ? ` - ${category} admissions update` : '';
  return `${clean}${catLabel}`.slice(0, 100);
}
