import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://fatahmr.my.id',
  build: {
    format: 'directory'
  },
  integrations: [sitemap()]
});
