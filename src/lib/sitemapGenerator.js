/**
 * CollegeBundles Dynamic XML Sitemap Generator
 */

export function generateSitemapXml(articles = []) {
  const domain = 'https://collegebundles.in';
  const today = new Date().toISOString().split('T')[0];

  const staticRoutes = [
    { loc: `${domain}/`, priority: '1.0', changefreq: 'daily' },
    { loc: `${domain}/medical`, priority: '0.9', changefreq: 'daily' },
    { loc: `${domain}/engineering`, priority: '0.9', changefreq: 'daily' },
    { loc: `${domain}/management`, priority: '0.9', changefreq: 'daily' },
    { loc: `${domain}/online`, priority: '0.9', changefreq: 'daily' },
  ];

  const publishedArticles = articles.filter(
    (a) => a.status === 'published' || !a.status // includes initial seeds
  );

  const articleRoutes = publishedArticles.map((a) => {
    const cat = a.categorySlug || (a.category ? a.category.toLowerCase() : 'news');
    const slug = a.slug || a.id;
    const lastMod = a.publishedAt ? a.publishedAt.split('T')[0] : today;

    return {
      loc: `${domain}/${cat}/${slug}`,
      lastmod: lastMod,
      priority: '0.8',
      changefreq: 'weekly',
    };
  });

  const allUrls = [...staticRoutes, ...articleRoutes];

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (u) => `  <url>
    <loc>${escapeXml(u.loc)}</loc>
    <lastmod>${u.lastmod || today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return xmlContent;
}

function escapeXml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Triggers browser download for sitemap.xml
 */
export function downloadSitemapFile(articles = []) {
  const xml = generateSitemapXml(articles);
  const blob = new Blob([xml], { type: 'application/xml;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'sitemap.xml';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
