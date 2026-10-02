import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    /** Optional shorter <title> (≤ 60 characters) when the H1 is long. */
    seoTitle: z.string().max(65).optional(),
    description: z.string(),
    category: z.enum(["photo-editing", "web-development", "apparel-design"]),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
