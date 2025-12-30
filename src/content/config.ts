import { defineCollection, reference, z } from "astro:content";

const categories = defineCollection({
  type: "data",
  schema: () =>
    z.object({
      name: z.string(),
    }),
});

const blog = defineCollection({
  type: "content",
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
      publishDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      author: z.string(),
      categories: z.array(reference("categories")),
    }),
});

const authors = defineCollection({
  type: "data",
  schema: () =>
    z.object({
      name: z.string(),
      title: z.string().optional(),
      image: z.string().optional(),
    }),
});

export const collections = { blog, authors, categories };
