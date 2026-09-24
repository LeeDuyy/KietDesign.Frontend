import Image from "next/image";
import ProjectsList from "@/components/ProjectsList";
import BookingForm from "@/components/BookingForm";
import MobileNav from "@/components/MobileNav";
import HeroImage from "@/components/HeroImage";
import ScrollReveal from "@/components/ScrollReveal";
import { projects } from "@/lib/projects";

const jsonLd = {
	"@context": "https://schema.org",
	"@type": "HomeAndConstructionBusiness",
	name: "Trần Quang Nhân Kiệt — Architecture & Design",
	description: "Studio kiến trúc và thiết kế nội thất trọn gói tại TP. Hồ Chí Minh.",
	address: {
		"@type": "PostalAddress",
		streetAddress: "12 Đường ABC",
		addressLocality: "Quận 7",
		addressRegion: "TP. Hồ Chí Minh",
		addressCountry: "VN",
	},
	telephone: "+84912345678",
	email: "kiet@kdesign.vn",
	areaServed: "TP. Hồ Chí Minh",
	priceRange: "$$",
};

export default function Home() {
	return (
		<>
			<div className="ruler" />

			<header className="site">
				<nav>
					<div className="brand-logo">
						<Image src="/logos/logo-full.svg" alt="Trần Quang Nhân Kiệt — Architecture &amp; Design" width={169} height={100} unoptimized />
					</div>
					<ul className="nav-links">
						<li><a className="active" href="/">Trang chủ</a></li>
						<li><a href="#ve-chung-toi">Giới thiệu</a></li>
						<li><a href="#dich-vu">Dịch vụ</a></li>
						<li><a href="#du-an">Dự án</a></li>
						<li><a href="#">Tin tức</a></li>
						<li><a href="#dat-lich">Liên hệ</a></li>
					</ul>
					<MobileNav />
				</nav>
			</header>

			<section className="hero-full">
				<div className="hero-media">
					<HeroImage
						src="/images/living-terracotta.jpg"
						alt="Phòng khách căn hộ Anh Hoàng, tường đất nung, sofa da nâu, quận 7"
					/>
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
					<a className="btn btn-ink" href="#du-an">Khám phá dự án <span aria-hidden="true">→</span></a>
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
						src="/images/resort-exterior.jpg"
						alt="Phối cảnh biệt thự nghỉ dưỡng sân vườn, Phan Thiết"
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

				<section id="du-an">
					<ScrollReveal>
						<div className="section-head">
							<div>
								<h2>Dự án tiêu biểu</h2>
								<p>5 công trình tiêu biểu — từ căn hộ, nhà phố đến nghỉ dưỡng và F&amp;B.</p>
							</div>
							<span className="section-num mono">DA.01 – DA.05</span>
						</div>
					</ScrollReveal>
					<ProjectsList projects={projects} />
				</section>

				<ScrollReveal>
				<section id="dich-vu">
					<div className="section-head">
						<div>
							<h2>Dịch vụ</h2>
							<p>Một studio, một quy trình khép kín từ ý tưởng đến bàn giao.</p>
						</div>
						<span className="section-num mono">DV.01 – DV.04</span>
					</div>
					<div className="spec-list">
						<div className="spec-row">
							<div className="code">DV.01</div>
							<div>
								<h3>Tư vấn &amp; Concept</h3>
								<p>Khảo sát hiện trạng, lắng nghe nhu cầu sử dụng thật, đề xuất phong cách và ngân sách phù hợp trước khi vẽ bất cứ điều gì.</p>
							</div>
						</div>
						<div className="spec-row">
							<div className="code">DV.02</div>
							<div>
								<h3>Thiết kế 3D &amp; Vật liệu</h3>
								<p>Phối cảnh chi tiết từng phòng, bảng vật liệu thật để khách hàng hình dung chính xác trước khi thi công — không đoán mò.</p>
							</div>
						</div>
						<div className="spec-row">
							<div className="code">DV.03</div>
							<div>
								<h3>Thi công trọn gói</h3>
								<p>Đội thi công riêng của studio, giám sát kỹ thuật có mặt hàng ngày, báo cáo tiến độ hàng tuần cho khách hàng.</p>
							</div>
						</div>
						<div className="spec-row">
							<div className="code">DV.04</div>
							<div>
								<h3>Bàn giao &amp; Bảo hành</h3>
								<p>Nghiệm thu từng hạng mục trước khi giao chìa khoá, bảo hành nội thất 24 tháng và hỗ trợ bảo trì sau đó.</p>
							</div>
						</div>
					</div>
				</section>
				</ScrollReveal>

				<ScrollReveal>
				<section id="quy-trinh">
					<div className="section-head">
						<div>
							<h2>Quy trình</h2>
							<p>5 bước, một cam kết duy nhất: đúng như bản vẽ.</p>
						</div>
						<span className="section-num mono">01 → 05</span>
					</div>
					<div className="process">
						<div className="step"><b>01</b><h3>Khảo sát &amp; lắng nghe</h3><p>Đo đạc hiện trạng, trao đổi phong cách sống và ngân sách.</p></div>
						<div className="step"><b>02</b><h3>Concept &amp; mood board</h3><p>Định hướng phong cách, bảng màu, cảm hứng thiết kế.</p></div>
						<div className="step"><b>03</b><h3>Thiết kế 3D chi tiết</h3><p>Phối cảnh từng không gian, chốt vật liệu và chi phí.</p></div>
						<div className="step"><b>04</b><h3>Thi công &amp; giám sát</h3><p>Triển khai đúng bản vẽ, giám sát viên có mặt hàng ngày.</p></div>
						<div className="step"><b>05</b><h3>Bàn giao &amp; bảo hành</h3><p>Nghiệm thu, dọn dẹp, bàn giao chìa khoá và sổ bảo hành.</p></div>
					</div>
				</section>
				</ScrollReveal>

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
								<a className="btn btn-primary" href="tel:+84912345678">Gọi hotline +84 912 345 678</a>
								<a className="btn btn-ghost" style={{ borderColor: "#404040", color: "#fff" }} href="mailto:kiet@kdesign.vn">kiet@kdesign.vn</a>
							</div>
						</div>
						<div className="booking-card">
							<p className="mono">BƯỚC ĐẦU · ĐẶT LỊCH KHẢO SÁT</p>
							<BookingForm />
						</div>
					</div>
				</section>
				</ScrollReveal>

				<ScrollReveal>
				<section id="hoi-dap">
					<div className="section-head">
						<div>
							<h2>Câu hỏi thường gặp</h2>
							<p>Những điều khách hàng thường hỏi trước khi khảo sát.</p>
						</div>
					</div>
					<div className="faq">
						<details open>
							<summary>Thiết kế nội thất trọn gói mất bao lâu?</summary>
							<p>Trung bình 4–6 tuần cho phần thiết kế và 2–3 tháng thi công, tuỳ diện tích và mức độ hoàn thiện.</p>
						</details>
						<details>
							<summary>Chi phí thiết kế nội thất chung cư khoảng bao nhiêu?</summary>
							<p>Chi phí phụ thuộc diện tích, phong cách và vật liệu chọn. Trần Quang Nhân Kiệt báo giá chi tiết ngay sau buổi khảo sát miễn phí, không phát sinh ẩn.</p>
						</details>
						<details>
							<summary>Có cần đặt cọc trước khi khảo sát không?</summary>
							<p>Không. Buổi khảo sát hiện trạng và tư vấn concept ban đầu hoàn toàn miễn phí.</p>
						</details>
						<details>
							<summary>Studio có làm được nhiều phong cách khác nhau không?</summary>
							<p>Có — từ ấm áp đương đại, tối giản, đến nghỉ dưỡng nhiệt đới, tuỳ gu và công năng của từng gia đình, không rập khuôn một phong cách cho mọi dự án.</p>
						</details>
						<details>
							<summary>Trần Quang Nhân Kiệt nhận dự án ở khu vực nào?</summary>
							<p>TP. Hồ Chí Minh và các tỉnh lân cận; một số dự án nghỉ dưỡng tại Phan Thiết, Vũng Tàu.</p>
						</details>
						<details>
							<summary>Có bảo hành sau khi bàn giao không?</summary>
							<p>Có — bảo hành nội thất 24 tháng và hỗ trợ bảo trì sau bàn giao.</p>
						</details>
					</div>
				</section>
				</ScrollReveal>
			</main>

			<footer className="site">
				<div className="foot-grid">
					<div>
						<div className="brand" style={{ marginBottom: ".8rem" }}>
							<Image src="/logos/logo-mark.svg" alt="Biểu trưng Trần Quang Nhân Kiệt" width={44} height={41} unoptimized />
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
							<li>+84 912 345 678</li>
							<li>kiet@kdesign.vn</li>
							<li>12 Đường ABC, Quận 7, TP.HCM</li>
						</ul>
					</div>
					<div>
						<h4>Điều hướng</h4>
						<ul>
							<li><a href="#dich-vu">Dịch vụ</a></li>
							<li><a href="#quy-trinh">Quy trình</a></li>
							<li><a href="#du-an">Dự án</a></li>
						</ul>
					</div>
					<div>
						<h4>Theo dõi</h4>
						<ul>
							<li><a href="#">Facebook</a></li>
							<li><a href="#">Instagram</a></li>
							<li><a href="#">Pinterest</a></li>
						</ul>
					</div>
				</div>
				<div className="foot-bottom">
					<span>© 2026 Trần Quang Nhân Kiệt — Architecture &amp; Design. TP.HCM.</span>
					<span className="mono">PROTOTYPE — v0.4</span>
				</div>
			</footer>

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
