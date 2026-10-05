import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getSiteContent } from "@/lib/site-content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const { projects } = await getSiteContent();
	const lastModified = new Date();
	return [
		{ url: SITE_URL, lastModified, changeFrequency: "monthly", priority: 1 },
		...projects.map((p) => ({ url: `${SITE_URL}/du-an/${p.slug}`, lastModified, changeFrequency: "monthly" as const, priority: 0.8 })),
	];
}
