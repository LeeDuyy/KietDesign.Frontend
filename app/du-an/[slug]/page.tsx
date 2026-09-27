import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { getSiteContent } from "@/lib/site-content";
import type { Project } from "@/lib/projects";

// Danh sách dự án đến từ trang quản trị nên có thể đổi bất cứ lúc nào: dựng lại nền sau mỗi 60 giây,
// slug mới (chưa có lúc build) được render khi có người truy cập đầu tiên.
export const revalidate = 60;

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
	const { projects } = await getSiteContent();
	return projects.map((p) => ({ slug: p.slug }));
}

async function findProject(slug: string) {
	const content = await getSiteContent();
	const index = content.projects.findIndex((p) => p.slug === slug);
	return { content, index, project: index >= 0 ? content.projects[index] : null };
}

function describe(project: Project) {
	return (
		project.desc ??
		`${project.title} — dự án ${project.category?.toLowerCase() ?? "kiến trúc và nội thất"} do ${SITE_NAME} thiết kế tại TP. Hồ Chí Minh.`
	);
}

/** Ảnh chia sẻ: đi qua trình tối ưu ảnh để nhẹ (ảnh gốc 2–8 MB làm Facebook/Zalo không hiện xem trước). */
function shareImage(src: string) {
	return `${SITE_URL}/_next/image?url=${encodeURIComponent(src)}&w=1200&q=75`;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
	const { slug } = await params;
	const { project } = await findProject(slug);
	if (!project) return { title: "Không tìm thấy dự án" };

	const title = `${project.title} | ${SITE_NAME}`;
	const description = describe(project);
	const path = `/du-an/${project.slug}`;
	return {
		title,
		description,
		alternates: { canonical: path },
		openGraph: {
			type: "article",
			locale: "vi_VN",
			url: path,
			siteName: SITE_NAME,
			title,
			description,
			images: [{ url: shareImage(project.slides[0].src), alt: project.slides[0].alt }],
		},
		twitter: { card: "summary_large_image", title, description },
	};
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
	const { slug } = await params;
	const { content, index, project } = await findProject(slug);
	if (!project) notFound();

	const { projects, media } = content;
	const prev = projects.length > 1 ? projects[(index - 1 + projects.length) % projects.length] : null;
	const next = projects.length > 1 ? projects[(index + 1) % projects.length] : null;
	const [cover, ...rest] = project.slides;
	const path = `/du-an/${project.slug}`;

	const jsonLd = [
		{
			"@context": "https://schema.org",
			"@type": "BreadcrumbList",
			itemListElement: [
				{ "@type": "ListItem", position: 1, name: "Trang chủ", item: SITE_URL },
				{ "@type": "ListItem", position: 2, name: "Dự án", item: `${SITE_URL}/#du-an` },
				{ "@type": "ListItem", position: 3, name: project.title, item: `${SITE_URL}${path}` },
			],
		},
		{
			"@context": "https://schema.org",
			"@type": "CreativeWork",
			name: project.title,
			description: describe(project),
			url: `${SITE_URL}${path}`,
			image: project.slides.map((s) => shareImage(s.src)),
			creator: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
			...(project.year && { dateCreated: project.year }),
		},
	];

	return (
		<>
			<div className="ruler" />
			<SiteHeader logo={media.logoHeader} current="projects" />

			<main className="project-page">
				<nav className="crumbs" aria-label="Breadcrumb">
					<Link href="/">Trang chủ</Link>
					<span aria-hidden="true">/</span>
					<Link href="/#du-an">Dự án</Link>
					<span aria-hidden="true">/</span>
					<span aria-current="page">{project.title}</span>
				</nav>

				<header className="pp-head">
					<p className="mono pz-code">{[project.code, project.year].filter(Boolean).join(" · ")}</p>
					<h1>{project.title}</h1>
					{(project.location ?? project.category) && <p className="pz-loc">{project.location ?? project.category}</p>}
				</header>

				<div className="pp-cover">
					<Image src={cover.src} alt={cover.alt} fill priority sizes="(max-width: 1200px) 100vw, 1200px" />
				</div>

				{(project.desc || project.stat1 || project.chips) && (
					<div className="pp-body">
						{project.desc && <p className="pp-desc">{project.desc}</p>}
						{project.stat1 && project.stat2 && (
							<div className="pz-stats">
								{[project.stat1, project.stat2].map((stat) => (
									<div key={stat.label}>
										<span className="mono label">{stat.label}</span>
										<span>{stat.value}</span>
									</div>
								))}
							</div>
						)}
						{project.chips && project.chips.length > 0 && (
							<ul className="pp-chips">
								{project.chips.map((chip) => (
									<li key={chip}>{chip}</li>
								))}
							</ul>
						)}
					</div>
				)}

				{rest.length > 0 && (
					<div className="pp-gallery">
						{rest.map((slide) => (
							<figure key={slide.src}>
								<Image src={slide.src} alt={slide.alt} fill sizes="(max-width: 860px) 100vw, 50vw" />
							</figure>
						))}
					</div>
				)}

				<div className="pp-cta">
					<div>
						<h2>Muốn có không gian như thế này?</h2>
						<p>Đặt lịch khảo sát miễn phí — đội thiết kế liên hệ trong 24 giờ.</p>
					</div>
					<Link className="btn btn-primary" href="/#dat-lich">Đặt lịch khảo sát</Link>
				</div>

				{prev && next && (
					<nav className="pp-pager" aria-label="Dự án khác">
						<Link href={`/du-an/${prev.slug}`} rel="prev">
							<span className="mono">← Dự án trước</span>
							<b>{prev.title}</b>
						</Link>
						<Link href={`/du-an/${next.slug}`} rel="next">
							<span className="mono">Dự án sau →</span>
							<b>{next.title}</b>
						</Link>
					</nav>
				)}
			</main>

			<SiteFooter content={content} />

			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
		</>
	);
}
