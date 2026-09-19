"use client";

import Image from "next/image";
import { useState } from "react";
import type { Slide } from "@/lib/projects";

export default function ProjectSlider({ slides, priority = false }: { slides: Slide[]; priority?: boolean }) {
	const [index, setIndex] = useState(0);

	function go(next: number) {
		setIndex(((next % slides.length) + slides.length) % slides.length);
	}

	return (
		<div
			className="slider"
			tabIndex={0}
			onKeyDown={(e) => {
				if (e.key === "ArrowLeft") go(index - 1);
				if (e.key === "ArrowRight") go(index + 1);
			}}
		>
			<div className="slider-track" style={{ transform: `translateX(-${index * 100}%)` }}>
				{slides.map((slide, i) => (
					<div className="slider-slide" key={slide.src}>
						<Image
							src={slide.src}
							alt={slide.alt}
							fill
							sizes="(max-width: 860px) 100vw, 60vw"
							style={{ objectFit: "cover" }}
							priority={priority && i === 0}
						/>
					</div>
				))}
			</div>
			<button className="slider-nav slider-prev" type="button" aria-label="Ảnh trước" onClick={() => go(index - 1)}>
				‹
			</button>
			<button className="slider-nav slider-next" type="button" aria-label="Ảnh sau" onClick={() => go(index + 1)}>
				›
			</button>
			<div className="slider-dots">
				{slides.map((slide, i) => (
					<button
						key={slide.src}
						type="button"
						aria-label={`Xem ảnh ${i + 1}`}
						className={i === index ? "active" : ""}
						onClick={() => go(i)}
					/>
				))}
			</div>
		</div>
	);
}
