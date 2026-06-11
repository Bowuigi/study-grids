// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import remarkPikchr from './remark-pikchr';
import { unified } from '@astrojs/markdown-remark';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx({
    syntaxHighlight: 'shiki',
    shikiConfig: { theme: 'dracula' },
    processor: unified({
      remarkPlugins: [remarkPikchr],
    }),
  })]
});
