import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import site from "../data/site.js";

export async function GET(context) {
  const posts = (await getCollection("blog", (p) => !p.data.draft)).sort((a, b) => b.data.publishDate - a.data.publishDate);
  return rss({
    title: "Harinda Fernando — Blog",
    description: "Guides for photographers, small business owners and apparel brands.",
    site: context.site ?? site.url,
    items: posts.map((p) => ({ title: p.data.title, description: p.data.description, pubDate: p.data.publishDate, link: `/blog/${p.id}/`, categories: [p.data.category] })),
  });
}
