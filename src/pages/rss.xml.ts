import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getCollection, getEntry } from "astro:content";

export const GET: APIRoute = async (context) => {
  const posts = (await getCollection("blog"))
    .sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf())
    .filter(({ data }) => data.publishDate.valueOf() <= new Date().valueOf())
    .slice(0, 2);

  return rss({
    // `<title>` field in output xml
    title: "Piotr Sochacz - Software Developer",
    // `<description>` field in output xml
    description:
      "Piotr Sochacz - Professional Software Developer & Hobbyst Artist",
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#site
    site: context.site!,
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: await Promise.all(
      posts.map(async (post) => ({
        link: `${post.data.publishDate.getFullYear().toString()}/${post.data.publishDate.toLocaleDateString(
          "en-GB",
          {
            month: "2-digit",
          },
        )}/${post.id}`,
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.publishDate,
        author: (await getEntry("authors", post.data.author))!.data.email,
      })),
    ),
    // (optional) inject custom xml
    customData: `<language>en-gb</language>`,
    stylesheet: "/rss/styles.xsl",
  });
};
