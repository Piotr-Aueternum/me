import { glob } from "astro/loaders";
import { defineCollection, reference, z } from "astro:content";

const categories = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "src/content/category" }),
  schema: () =>
    z.object({
      name: z.string(),
    }),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.mdoc", base: "src/content/blog" }),
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
      hero: z.string(),
      publishDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      author: z.string(),
      categories: z.array(reference("categories")),
    }),
});

const authors = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "src/content/authors" }),
  schema: () =>
    z.object({
      name: z.string(),
      title: z.string().optional(),
      image: z.string().optional(),
    }),
});

export const collections = { blog, authors, categories };
