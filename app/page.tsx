import Image from "next/image";
import ProjectsList from "@/components/ProjectsList";
import BookingForm from "@/components/BookingForm";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import HeroImage from "@/components/HeroImage";
import ScrollReveal from "@/components/ScrollReveal";
import { adminApiUrl } from "@/lib/admin-api";
import { getSiteContent, getSocialLinks, type SiteContent } from "@/lib/site-content";
import { SITE_NAME, SITE_URL } from "@/lib/site";

// Chỉ đưa vào JSON-LD những trường đã có dữ liệu thật — Google đọc thẳng khối này.
function buildJsonLd({ contact }: SiteContent) {
	const sameAs = getSocialLinks(contact).flatMap((link) => (link.href ? [link.href] : []));
	return {
		"@context": "https://schema.org",
		"@type": "HomeAndConstructionBusiness",
		name: `${SITE_NAME} – Trần Quang Nhân Kiệt`,
		url: SITE_URL,
		description: "Studio kiến trúc và thiết kế nội thất trọn gói tại TP. Hồ Chí Minh.",
		areaServed: "TP. Hồ Chí Minh",
		...(contact.address && {
			address: { "@type": "PostalAddress", streetAddress: contact.address, addressCountry: "VN" },
		}),
		...(contact.telHref && { telephone: contact.telHref }),
		...(contact.email && { email: contact.email }),
		...(sameAs.length > 0 && { sameAs }),
	};
}

export default async function Home() {
	const content = await getSiteContent();
	const { media, projects, services, processSteps, faqs, booking, contact } = content;
	const jsonLd = buildJsonLd(content);
	const bookingEndpoint = adminApiUrl ? `${adminApiUrl}/api/public/booking-request` : null;
	const heroTarget = projects.length > 0 ? "#du-an" : services.length > 0 ? "#dich-vu" : "#dat-lich";

	return (
		<>
			<div className="ruler" />

			<SiteHeader logo={media.logoHeader} current="home" />

			<section className="hero-full">
				<div className="hero-media">
					<HeroImage src={media.hero.src} alt={media.hero.alt} />
					<div className="hero-tag" aria-hidden="true">
						<span>Architecture</span>
						<span>Interior</span>
						<span>Landscape</span>
					</div>
				</div>
				<div className="hero-full-card">
					<h1>Kiến tạo<br />không gian<br />sống bền vững</h1>
					<div className="hero-rule" />
					<p className="lede">
						Từ nền tảng vững chắc, dẫn dắt bởi ý tưởng sáng tạo — kiến tạo những công trình bền vững
						cho từng gia đình, từ kiến trúc đến nội thất.
					</p>
					<ul className="hero-mobile-tags">
						<li>Kiến trúc</li>
						<li>Nội thất</li>
						<li>Cảnh quan</li>
					</ul>
					<a className="btn btn-ink" href={heroTarget}>Khám phá thêm <span aria-hidden="true">→</span></a>
				</div>
				<div className="hero-pager" aria-hidden="true">
					<b>01</b><i />
					<span>02</span>
					<span>03</span>
					<span>04</span>
					<span>05</span>
				</div>
			</section>

			<div className="hero-tags-band">
				<span>Architecture</span>
				<span>Interior</span>
				<span>Landscape</span>
			</div>

			<ScrollReveal>
				<div className="image-band">
					<Image
						src={media.imageBand.src} alt={media.imageBand.alt}
						fill
						sizes="100vw"
						priority
					/>
					<div className="image-band-badge"><span>K·T</span></div>
					<div className="image-band-copy">
						<h2>Lắng nghe.<br />Kiến tạo.<br />An cư.</h2>
					</div>
				</div>
			</ScrollReveal>

			<main>
				<ScrollReveal>
					<section className="stats" aria-label="Số liệu studio">
						<div className="stat"><b>120+</b><span>dự án đã hoàn thiện</span></div>
						<div className="stat"><b>8 năm</b><span>kinh nghiệm thiết kế</span></div>
						<div className="stat"><b>35 ngày</b><span>trung bình khảo sát → concept</span></div>
						<div className="stat"><b>4.9/5</b><span>đánh giá từ khách hàng</span></div>
					</section>
				</ScrollReveal>

				<ScrollReveal>
				<section id="ve-chung-toi">
					<div className="about">
						<div>
							<h2 className="about-heading">Về Trần Quang Nhân Kiệt</h2>
							<p>
								Trần Quang Nhân Kiệt là một studio kiến trúc &amp; nội thất quy mô nhỏ, làm việc trực tiếp với từng gia chủ
								thay vì qua nhiều tầng nhân sự. Đội kiến trúc, đội thiết kế 3D và đội thi công nằm trong cùng một studio,
								nên bản vẽ và hiện trường luôn khớp nhau — không có chuyện &ldquo;vẽ một đằng, làm một nẻo&rdquo;.
							</p>
							<p>
								Chúng tôi không theo một phong cách cố định. Từ ấm áp đương đại, tối giản, đến nghỉ dưỡng nhiệt đới —
								phong cách được chọn theo cách gia chủ sống, không theo trào lưu.
							</p>
						</div>
						<ul className="about-facts">
							<li>
								<PlusIcon />
								<div><b>Một đội ngũ, một quy trình</b><span>Thiết kế và thi công cùng một studio, không thuê ngoài từng phần.</span></div>
							</li>
							<li>
								<PlusIcon />
								<div><b>Vật liệu có nguồn gốc rõ ràng</b><span>Bảng vật liệu thật được đưa cho khách hàng trước khi thi công.</span></div>
							</li>
							<li>
								<PlusIcon />
								<div><b>Giám sát viên có mặt hàng ngày</b><span>Không để nhà thầu phụ tự triển khai không kiểm soát.</span></div>
							</li>
							<li>
								<PlusIcon />
								<div><b>Bảo hành 24 tháng</b><span>Hỗ trợ bảo trì sau bàn giao, không &ldquo;bán xong là hết&rdquo;.</span></div>
							</li>
						</ul>
					</div>
				</section>
				</ScrollReveal>

				{projects.length > 0 && (
					<section id="du-an">
						<ScrollReveal>
							<div className="section-head">
								<div>
									<h2>Dự án tiêu biểu</h2>
									<p>{projects.length} công trình tiêu biểu — từ căn hộ, nhà phố đến nghỉ dưỡng và F&amp;B.</p>
								</div>
								<span className="section-num mono">
									{projects[0].code}{projects.length > 1 && ` – ${projects[projects.length - 1].code}`}
								</span>
							</div>
						</ScrollReveal>
						<ProjectsList projects={projects} />
					</section>
				)}

				{services.length > 0 && (
					<ScrollReveal>
						<section id="dich-vu">
							<div className="section-head">
								<div>
									<h2>Dịch vụ</h2>
									<p>Một studio, một quy trình khép kín từ ý tưởng đến bàn giao.</p>
								</div>
								<span className="section-num mono">
									{services[0].code}{services.length > 1 && ` – ${services[services.length - 1].code}`}
								</span>
							</div>
							<div className="spec-list">
								{services.map((service) => (
									<div className="spec-row" key={service.code}>
										<div className="code">{service.code}</div>
										<div>
											<h3>{service.title}</h3>
											<p>{service.description}</p>
										</div>
									</div>
								))}
							</div>
						</section>
					</ScrollReveal>
				)}

				{processSteps.length > 0 && (
					<ScrollReveal>
						<section id="quy-trinh">
							<div className="section-head">
								<div>
									<h2>Quy trình</h2>
									<p>{processSteps.length} bước, một cam kết duy nhất: đúng như bản vẽ.</p>
								</div>
								<span className="section-num mono">01 → {String(processSteps.length).padStart(2, "0")}</span>
							</div>
							<div className="process">
								{processSteps.map((step) => (
									<div className="step" key={step.step}>
										<b>{String(step.step).padStart(2, "0")}</b>
										<h3>{step.title}</h3>
										<p>{step.description}</p>
									</div>
								))}
							</div>
						</section>
					</ScrollReveal>
				)}

				<ScrollReveal>
				<section id="danh-gia">
					<div className="section-head">
						<div>
							<h2>Khách hàng nói gì</h2>
							<p>Trích từ phản hồi sau bàn giao.</p>
						</div>
					</div>
					<div className="quotes">
						<blockquote className="quote">
							<p>&ldquo;Đội ngũ đo đạc kỹ, bản vẽ 3D giống hệt lúc bàn giao, không phát sinh bất ngờ.&rdquo;</p>
							<footer>ANH HOÀNG · QUẬN 7</footer>
						</blockquote>
						<blockquote className="quote">
							<p>&ldquo;Thi công đúng tiến độ, giám sát có mặt mỗi ngày nên thợ làm rất cẩn thận.&rdquo;</p>
							<footer>ANH SƠN · QUẬN 2</footer>
						</blockquote>
						<blockquote className="quote">
							<p>&ldquo;Concept ban đầu đã rất sát gu của gia đình, chỉnh sửa nhẹ là chốt luôn.&rdquo;</p>
							<footer>CHỊ BỘT · TP. THỦ ĐỨC</footer>
						</blockquote>
					</div>
				</section>
				</ScrollReveal>

				<ScrollReveal>
				<section id="dat-lich">
					<div className="cta-band">
						<div>
							<h2>Sẵn sàng vẽ lại<br />không gian sống của bạn?</h2>
							<p>Đặt lịch khảo sát miễn phí — đội thiết kế liên hệ trong 24 giờ để hẹn thời gian phù hợp.</p>
							<div className="hero-actions">
								{contact.phone && contact.telHref && (
									<a className="btn btn-primary" href={`tel:${contact.telHref}`}>Gọi hotline {contact.phone}</a>
								)}
								{contact.email && (
									<a className="btn btn-ghost" style={{ borderColor: "#404040", color: "#fff" }} href={`mailto:${contact.email}`}>{contact.email}</a>
								)}
							</div>
						</div>
						{booking.projectTypes.length > 0 && booking.surveySlots.length > 0 && (
							<div className="booking-card">
								<p className="mono">BƯỚC ĐẦU · ĐẶT LỊCH KHẢO SÁT</p>
								<BookingForm
									projectTypes={booking.projectTypes}
									surveySlots={booking.surveySlots}
									endpoint={bookingEndpoint}
									hotline={contact.phone}
								/>
							</div>
						)}
					</div>
				</section>
				</ScrollReveal>

				{faqs.length > 0 && (
					<ScrollReveal>
						<section id="hoi-dap">
							<div className="section-head">
								<div>
									<h2>Câu hỏi thường gặp</h2>
									<p>Những điều khách hàng thường hỏi trước khi khảo sát.</p>
								</div>
							</div>
							<div className="faq">
								{faqs.map((faq, i) => (
									<details key={faq.question} open={i === 0}>
										<summary>{faq.question}</summary>
										<p>{faq.answer}</p>
									</details>
								))}
							</div>
						</section>
					</ScrollReveal>
				)}
			</main>

			<SiteFooter content={content} />

			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
		</>
	);
}

function PlusIcon() {
	return (
		<svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
			<path d="M8 1V15M1 8H15" stroke="currentColor" strokeWidth="1.4" />
		</svg>
	);
}
