import { config, fields, collection } from "@keystatic/core";

export default config({
  storage: {
    kind: "local",
  },
  collections: {
    authors: collection({
      label: "Authors",
      slugField: "name",
      path: "src/content/authors/*",
      schema: {
        name: fields.slug({ name: { label: "Name" } }),
        title: fields.text({ label: "Title" }),
        image: fields.image({
          label: "Image URL",
          directory: "public/images/authors",
          publicPath: "/public/images/authors",
          validation: { isRequired: false },
        }),
      },
    }),
    categories: collection({
      label: "Categories",
      slugField: "name",
      path: "src/content/category/*",
      schema: {
        name: fields.slug({ name: { label: "Name" } }),
      },
    }),
    blog: collection({
      label: "Posts",
      slugField: "title",
      path: "src/content/blog/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({
          name: { label: "Title", validation: { isRequired: true } },
        }),
        description: fields.text({
          label: "Description",
          validation: { isRequired: true },
        }),
        hero: fields.image({
          label: "Hero image",
          directory: "public/images/blog",
          publicPath: "/public/images/blog",
          validation: { isRequired: true },
        }),
        publishDate: fields.date({
          label: "Publish Date",
          validation: { isRequired: true },
        }),
        updatedDate: fields.date({
          label: "Updated Date",
        }),
        author: fields.relationship({
          label: "Author",
          collection: "authors",
        }),
        categories: fields.multiRelationship({
          collection: "categories",
          label: "Category",
        }),
        content: fields.markdoc({
          label: "Content",
          extension: "mdoc",
          options: {
            image: {
              directory: "public/images/blog",
              publicPath: "/images/blog",
            },
          },
        }),
      },
    }),
    gallery: collection({
      label: "Gallery",
      slugField: "title",
      path: "src/content/gallery/*",
      schema: {
        title: fields.slug({
          name: { label: "Title", validation: { isRequired: true } },
        }),
        description: fields.text({
          label: "Description",
          validation: { isRequired: true },
        }),
        picture: fields.image({
          label: "Hero image",
          directory: "public/images/gallery",
          publicPath: "/public/images/gallery",
          validation: { isRequired: true },
        }),
        publishDate: fields.date({
          label: "Publish Date",
          validation: { isRequired: true },
        }),
      },
    }),
  },
});
