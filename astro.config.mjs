import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://fatahmr.my.id',
  build: {
    format: 'directory'
  },
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date(),
      serialize(item) {
        if (item.url === 'https://fatahmr.my.id/') {
          item.priority = 1.0;
        }
        item.links = [
          { lang: 'id', url: item.url },
          { lang: 'en', url: item.url },
          { lang: 'x-default', url: item.url }
        ];
        return item;
      }
    })
  ]
});
