"use client";

import { useEffect, useRef, useState } from "react";

/** Vùng nét vẽ thật của logo, tính theo tỉ lệ (0–1) so với toàn ảnh. */
type Crop = { x: number; y: number; w: number; h: number };

const SAMPLE_WIDTH = 480;
const ALPHA_MIN = 16; // dưới ngưỡng này coi là trong suốt
const WHITE_MIN = 246; // pixel đặc gần trắng cũng coi là nền (logo JPG/PNG nền trắng)
const MARGIN = 0.012; // chừa một chút để không cắt sát nét

/**
 * Logo do chủ studio tải lên thường có viền trong suốt rất rộng, nên logo trông nhỏ và mờ trong header.
 * Component đo vùng có nét vẽ trên canvas rồi cắt khung theo đúng vùng đó (mọi kích thước/tỉ lệ đều chạy).
 * Không đo được (ảnh khác origin không cho CORS, SVG không có kích thước...) thì hiển thị nguyên ảnh.
 */
function measureCrop(img: HTMLImageElement): Crop | null {
	const nw = img.naturalWidth;
	const nh = img.naturalHeight;
	if (!nw || !nh) return null;

	const scale = Math.min(1, SAMPLE_WIDTH / nw);
	const cw = Math.max(1, Math.round(nw * scale));
	const ch = Math.max(1, Math.round(nh * scale));
	const canvas = document.createElement("canvas");
	canvas.width = cw;
	canvas.height = ch;
	const ctx = canvas.getContext("2d", { willReadFrequently: true });
	if (!ctx) return null;
	ctx.drawImage(img, 0, 0, cw, ch);

	const { data } = ctx.getImageData(0, 0, cw, ch); // ném SecurityError nếu canvas bị "taint"
	let minX = cw;
	let minY = ch;
	let maxX = -1;
	let maxY = -1;
	for (let y = 0; y < ch; y++) {
		for (let x = 0; x < cw; x++) {
			const i = (y * cw + x) * 4;
			const empty = data[i + 3] < ALPHA_MIN || (data[i] > WHITE_MIN && data[i + 1] > WHITE_MIN && data[i + 2] > WHITE_MIN);
			if (empty) continue;
			if (x < minX) minX = x;
			if (x > maxX) maxX = x;
			if (y < minY) minY = y;
			if (y > maxY) maxY = y;
		}
	}
	if (maxX < 0) return null; // ảnh trống

	const x0 = Math.max(0, minX / cw - MARGIN);
	const y0 = Math.max(0, minY / ch - MARGIN);
	const x1 = Math.min(1, (maxX + 1) / cw + MARGIN);
	const y1 = Math.min(1, (maxY + 1) / ch + MARGIN);
	const crop = { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
	// Gần như không có viền thừa thì khỏi cắt.
	return crop.w > 0.97 && crop.h > 0.97 ? null : crop;
}

export default function BrandLogo({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) {
	const ref = useRef<HTMLImageElement>(null);
	const [crossOrigin, setCrossOrigin] = useState<"anonymous" | undefined>("anonymous");
	const [crop, setCrop] = useState<Crop | null>(null);
	const [aspect, setAspect] = useState(width / height);
	const [ready, setReady] = useState(false);

	function handleLoad(img: HTMLImageElement) {
		let next: Crop | null = null;
		try {
			next = measureCrop(img);
		} catch {
			next = null;
		}
		const nw = img.naturalWidth || width;
		const nh = img.naturalHeight || height;
		setCrop(next);
		setAspect(next ? (next.w * nw) / (next.h * nh) : nw / nh);
		setReady(true);
	}

	useEffect(() => {
		// Ảnh đã có trong cache trước khi hydrate: onLoad sẽ không bắn lại.
		if (ref.current?.complete && ref.current.naturalWidth > 0) handleLoad(ref.current);
		// Không để logo ẩn mãi nếu ảnh chậm hoặc lỗi.
		const fallback = window.setTimeout(() => setReady(true), 3000);
		return () => window.clearTimeout(fallback);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const imgStyle = crop
		? {
				width: `${100 / crop.w}%`,
				height: `${100 / crop.h}%`,
				left: `${(-crop.x / crop.w) * 100}%`,
				top: `${(-crop.y / crop.h) * 100}%`,
			}
		: { width: "100%", height: "100%", objectFit: "contain" as const, objectPosition: "left center" };

	return (
		<span className={`brand-logo-frame${ready ? " is-ready" : ""}`} style={{ aspectRatio: aspect }}>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				ref={ref}
				src={src}
				alt={alt}
				crossOrigin={crossOrigin}
				style={imgStyle}
				onLoad={(e) => handleLoad(e.currentTarget)}
				// Máy chủ ảnh không cho CORS: tải lại không kèm crossOrigin (hiển thị bình thường, chỉ không đo được).
				onError={() => (crossOrigin ? setCrossOrigin(undefined) : setReady(true))}
			/>
		</span>
	);
}
