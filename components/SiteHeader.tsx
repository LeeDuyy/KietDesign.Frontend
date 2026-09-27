import BrandLogo from "@/components/BrandLogo";
import MobileNav from "@/components/MobileNav";
import { NAV_LINKS, type NavKey } from "@/lib/nav";

export default function SiteHeader({ logo, current }: { logo: string; current: NavKey }) {
	return (
		<header className="site">
			<nav>
				<a className="brand-logo" href="/" aria-label="KDesign — về trang chủ">
					<BrandLogo src={logo} alt="Trần Quang Nhân Kiệt — Architecture &amp; Design" width={169} height={100} />
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
