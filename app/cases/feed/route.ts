import { readPosts } from "@/lib/work-posts";
export async function GET() {
  const { posts } = await readPosts();
  const urls = posts
    .map(
      (p) =>
        `<url><loc>https://xn--ob0b34v1qg.kr/cases/${p.id}</loc><lastmod>${p.publishedAt}</lastmod></url>`,
    )
    .join("");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
}
