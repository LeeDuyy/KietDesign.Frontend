import BrandLogo from "@/components/BrandLogo";
import MobileNav from "@/components/MobileNav";
import { NAV_LINKS, type NavKey } from "@/lib/nav";

const LOGO_ALT = "Trần Quang Nhân Kiệt — Architecture & Design";

export default function SiteHeader({ logo, logoMobile, current }: { logo: string; logoMobile?: string | null; current: NavKey }) {
	return (
		<header className="site">
			<nav>
				<a className="brand-logo" href="/" aria-label="KDesign — về trang chủ">
					{logoMobile ? (
						// Hai bản logo, CSS (≤767px) chọn bản hiển thị — tránh lệch giữa server và client.
						<>
							<span className="brand-logo-desktop">
								<BrandLogo src={logo} alt={LOGO_ALT} width={169} height={100} />
							</span>
							<span className="brand-logo-mobile">
								<BrandLogo src={logoMobile} alt={LOGO_ALT} width={169} height={100} />
							</span>
						</>
					) : (
						<BrandLogo src={logo} alt={LOGO_ALT} width={169} height={100} />
					)}
				</a>
				<ul className="nav-links">
					{NAV_LINKS.map((link) => (
						<li key={link.key}>
							<a className={link.key === current ? "active" : undefined} href={link.href}>{link.label}</a>
						</li>
					))}
				</ul>
				<MobileNav />
			</nav>
		</header>
	);
}
