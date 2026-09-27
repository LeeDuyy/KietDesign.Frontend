"use client";

import { useState } from "react";
import { NAV_LINKS } from "@/lib/nav";

const LINKS = NAV_LINKS;

export default function MobileNav() {
	const [open, setOpen] = useState(false);

	return (
		<div className="mobile-nav">
			<button
				type="button"
				className={`mobile-nav-toggle${open ? " is-open" : ""}`}
				aria-expanded={open}
				aria-label={open ? "Đóng menu" : "Mở menu"}
				onClick={() => setOpen((v) => !v)}
			>
				<span />
				<span />
				<span />
			</button>

			<div className={`mobile-nav-panel${open ? " is-open" : ""}`} aria-hidden={!open}>
				<ul>
					{LINKS.map((link, i) => (
						<li key={link.href} style={{ transitionDelay: open ? `${i * 0.04 + 0.05}s` : "0s" }}>
							<a href={link.href} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>{link.label}</a>
						</li>
					))}
				</ul>
				<a
					className="btn btn-primary"
					href="/#dat-lich"
					tabIndex={open ? 0 : -1}
					style={{ transitionDelay: open ? `${LINKS.length * 0.04 + 0.05}s` : "0s" }}
					onClick={() => setOpen(false)}
				>
					Đặt lịch tư vấn
				</a>
			</div>
		</div>
	);
}
