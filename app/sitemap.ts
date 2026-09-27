import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getSiteContent } from "@/lib/site-content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const { projects } = await getSiteContent();
	return [
		{ url: SITE_URL, changeFrequency: "monthly", priority: 1 },
		...projects.map((p) => ({ url: `${SITE_URL}/du-an/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
	];
}
