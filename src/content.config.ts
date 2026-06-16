// src/content.config.ts
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const notes = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    // Add other fields as needed:
    // description: z.string().optional(),
    // tags: z.array(z.string()).optional(),
  }),
});

export const collections = { notes };
