import BrandLogo from "@/components/BrandLogo";
import SocialIcon from "@/components/SocialIcon";
import { getSocialLinks, type SiteContent } from "@/lib/site-content";

export default function SiteFooter({ content }: { content: SiteContent }) {
	const { media, contact } = content;
	const socialLinks = getSocialLinks(contact);

	return (
		<>
			<footer className="site">
				<div className="foot-grid">
					<div>
						<div className="brand brand-footer" style={{ marginBottom: ".8rem" }}>
							<BrandLogo src={media.logoFooter} alt="Biểu trưng Trần Quang Nhân Kiệt" width={44} height={41} />
							<span className="brand-text">
								TRẦN QUANG NHÂN KIỆT
								<small>ARCHITECTURE &amp; DESIGN</small>
							</span>
						</div>
						<p style={{ color: "var(--dyl-text-muted)", maxWidth: "34ch", fontSize: ".9rem" }}>
							Kiến trúc và thiết kế nội thất trọn gói cho căn hộ, nhà phố và biệt thự tại TP. Hồ Chí Minh.
						</p>
					</div>
					<div>
						<h4>Liên hệ</h4>
						<ul>
							{contact.phone && <li>{contact.phone}</li>}
							{contact.email && <li>{contact.email}</li>}
							{contact.address && <li>{contact.address}</li>}
						</ul>
					</div>
					<div>
						<h4>Điều hướng</h4>
						<ul>
							{content.services.length > 0 && <li><a href="/#dich-vu">Dịch vụ</a></li>}
							{content.processSteps.length > 0 && <li><a href="/#quy-trinh">Quy trình</a></li>}
							{content.projects.length > 0 && <li><a href="/#du-an">Dự án</a></li>}
						</ul>
					</div>
					{socialLinks.length > 0 && (
						<div>
							<h4>Theo dõi</h4>
							<ul>
								{socialLinks.map((link) => (
									<li key={link.label}>
										<a className="social-link" href={link.href} target="_blank" rel="noopener noreferrer">
												<SocialIcon network={link.network} />
												{link.label}
											</a>
									</li>
								))}
							</ul>
						</div>
					)}
				</div>
				<div className="foot-bottom">
					<span>© 2026 Trần Quang Nhân Kiệt — Architecture &amp; Design. TP.HCM.</span>
				</div>
			</footer>

			{contact.social.zalo && (
				<a
					className="zalo-bubble"
					href={contact.social.zalo}
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Chat với KDesign qua Zalo"
				>
					<span aria-hidden="true">Zalo</span>
				</a>
			)}
		</>
	);
}
