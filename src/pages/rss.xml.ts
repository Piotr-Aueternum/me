import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getEntry } from "astro:content";
import { availableBlog, blogLinks } from "lib/utils";

export const GET: APIRoute = async (context) => {
  const posts = availableBlog.slice(0, 2);

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
        link: blogLinks.slug(post.data.publishDate, post.id),
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
