"use client";

import { useEffect, useRef, useState } from "react";

export default function ScrollReveal({
	children,
	className = "",
}: {
	children: React.ReactNode;
	className?: string;
}) {
	const ref = useRef<HTMLDivElement>(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		// Re-arms on every crossing (not just the first), so the reveal replays
		// both scrolling down into view and scrolling back up into view.
		const observer = new IntersectionObserver(
			([entry]) => setVisible(entry.isIntersecting),
			{ threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	return (
		<div ref={ref} className={`reveal${visible ? " reveal-visible" : ""}${className ? ` ${className}` : ""}`}>
			{children}
		</div>
	);
}
