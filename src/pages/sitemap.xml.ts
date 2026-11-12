import type { APIRoute } from "astro";
import { categories } from "../data/catalog";
import { lp } from "../i18n";

const paths = ["/", "/about/", "/products/", "/retailers/", "/manufacturers/", "/contact/", ...categories.map((c) => `/products/${c.slug}/`)];

export const GET: APIRoute = ({ site }) => {
  const urls = paths
    .map((p) => {
      const en = new URL(lp("en", p), site).toString();
      const kn = new URL(lp("kn", p), site).toString();
      const alts = `<xhtml:link rel="alternate" hreflang="en-IN" href="${en}"/><xhtml:link rel="alternate" hreflang="kn-IN" href="${kn}"/>`;
      return `<url><loc>${en}</loc>${alts}</url><url><loc>${kn}</loc>${alts}</url>`;
    })
    .join("");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`,
    { headers: { "Content-Type": "application/xml" } },
  );
};
