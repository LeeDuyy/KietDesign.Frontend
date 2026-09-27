"use client";

import { useCallback, useEffect, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import type { Project } from "@/lib/projects";

export default function ProjectsList({ projects }: { projects: Project[] }) {
	const [openIndex, setOpenIndex] = useState<number | null>(null);
	const [slideIndex, setSlideIndex] = useState(0);
	const [dir, setDir] = useState(1);

	const activeProject = openIndex !== null ? projects[openIndex] : null;

	const close = useCallback(() => setOpenIndex(null), []);

	const next = useCallback(() => {
		setDir(1);
		setSlideIndex((i) => {
			if (openIndex === null) return i;
			return (i + 1) % projects[openIndex].slides.length;
		});
	}, [openIndex, projects]);

	const prev = useCallback(() => {
		setDir(-1);
		setSlideIndex((i) => {
			if (openIndex === null) return i;
			const len = projects[openIndex].slides.length;
			return (i - 1 + len) % len;
		});
	}, [openIndex, projects]);

	const goTo = useCallback((i: number) => {
		setDir(i >= slideIndex ? 1 : -1);
		setSlideIndex(i);
	}, [slideIndex]);

	useEffect(() => {
		if (openIndex === null) return;
		function onKey(e: KeyboardEvent) {
			if (e.key === "Escape") close();
			if (e.key === "ArrowRight") next();
			if (e.key === "ArrowLeft") prev();
		}
		window.addEventListener("keydown", onKey);
		const prevOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			window.removeEventListener("keydown", onKey);
			document.body.style.overflow = prevOverflow;
		};
	}, [openIndex, close, next, prev]);

	return (
		<div className="project-zigzag">
			{projects.map((project, i) => {
				const cover = project.slides[0];
				return (
					<ScrollReveal key={project.code}>
						<article className={`pz-row${i % 2 === 1 ? " reverse" : ""}`}>
							<button
								type="button"
								className="pz-media"
								onClick={() => {
									setOpenIndex(i);
									setSlideIndex(0);
								}}
								aria-label={`Xem lớn ảnh dự án ${project.title}`}
							>
								<Image src={cover.src} alt={cover.alt} fill sizes="(max-width: 860px) 100vw, 50vw" priority={i === 0} />
								<span className="pz-media-hint" aria-hidden="true">
									<span>Xem {project.slides.length} ảnh</span>
								</span>
							</button>
							<div className="pz-content">
								<p className="mono pz-code">{[project.code, project.year].filter(Boolean).join(" · ")}</p>
								<h3><Link href={`/du-an/${project.slug}`}>{project.title}</Link></h3>
								{(project.location ?? project.category) && <p className="pz-loc">{project.location ?? project.category}</p>}
								{project.desc && <p className="pz-desc">{project.desc}</p>}
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
								<Link className="pz-more" href={`/du-an/${project.slug}`}>
									Xem chi tiết dự án <span aria-hidden="true">→</span>
								</Link>
							</div>
						</article>
					</ScrollReveal>
				);
			})}

			{activeProject && (
				<div className="lightbox" role="dialog" aria-modal="true" aria-label={activeProject.title} onClick={close}>
					<button type="button" className="lightbox-close" onClick={close} aria-label="Đóng">
						×
					</button>
					<div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
						<button type="button" className="lightbox-nav prev" onClick={prev} aria-label="Ảnh trước">
							‹
						</button>
						<div className="lightbox-media" style={{ "--dir": dir } as CSSProperties}>
							<Image
								key={activeProject.slides[slideIndex].src}
								src={activeProject.slides[slideIndex].src}
								alt={activeProject.slides[slideIndex].alt}
								fill
								sizes="90vw"
								priority
							/>
						</div>
						<button type="button" className="lightbox-nav next" onClick={next} aria-label="Ảnh sau">
							›
						</button>
					</div>
					<div className="lightbox-caption" onClick={(e) => e.stopPropagation()}>
						<span className="mono">{activeProject.code} · {activeProject.location}</span>
						<h4>{activeProject.title}</h4>
						<div className="lightbox-dots">
							{activeProject.slides.map((slide, i) => (
								<button
									type="button"
									key={slide.src}
									className={i === slideIndex ? "active" : ""}
									onClick={() => goTo(i)}
									aria-label={`Ảnh ${i + 1}/${activeProject.slides.length}`}
								/>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
