"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Hero photo that stays hidden until it has actually decoded, then fades/settles in.
 * A plain CSS animation runs on paint whether or not the (multi-MB) JPEG has arrived,
 * so the image used to pop in abruptly mid-animation — gating on load removes the flash.
 */
export default function HeroImage({ src, alt }: { src: string; alt: string }) {
	const ref = useRef<HTMLImageElement>(null);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		// Cached / already-decoded image: onLoad fired before hydration and won't fire again.
		if (ref.current?.complete) setLoaded(true);
		// Safety net so a failed load can never leave the hero permanently blank.
		const fallback = window.setTimeout(() => setLoaded(true), 4000);
		return () => window.clearTimeout(fallback);
	}, []);

	return (
		<Image
			ref={ref}
			src={src}
			alt={alt}
			fill
			priority
			sizes="100vw"
			className={`hero-img${loaded ? " hero-img-in" : ""}`}
			onLoad={() => setLoaded(true)}
		/>
	);
}
