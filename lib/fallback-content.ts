// Nội dung dự phòng: dùng khi trang quản trị chưa cấu hình (ADMIN_API_URL trống) hoặc không trả lời.

/** Logo mobile mặc định (400×112, emblem bên trái + chữ bên phải; hiển thị cao 56px) khi Admin chưa đặt `headerMobile`. */
export const DEFAULT_MOBILE_LOGO = "/logos/logo-header-mobile.png";

export const fallbackMedia = {
	hero: { src: "/images/living-terracotta.jpg", alt: "Phòng khách căn hộ Anh Hoàng, tường đất nung, sofa da nâu, quận 7" },
	imageBand: { src: "/images/resort-exterior.jpg", alt: "Phối cảnh biệt thự nghỉ dưỡng sân vườn, Phan Thiết" },
	logoHeader: "/logos/logo-full.svg",
	logoHeaderMobile: DEFAULT_MOBILE_LOGO as string | null,
	logoFooter: "/logos/logo-mark.svg",
	favicon: null as string | null,
};

export const fallbackServices = [
	{
		code: "DV.01",
		title: "Tư vấn & Concept",
		description:
			"Khảo sát hiện trạng, lắng nghe nhu cầu sử dụng thật, đề xuất phong cách và ngân sách phù hợp trước khi vẽ bất cứ điều gì.",
	},
	{
		code: "DV.02",
		title: "Thiết kế 3D & Vật liệu",
		description:
			"Phối cảnh chi tiết từng phòng, bảng vật liệu thật để khách hàng hình dung chính xác trước khi thi công — không đoán mò.",
	},
	{
		code: "DV.03",
		title: "Thi công trọn gói",
		description:
			"Đội thi công riêng của studio, giám sát kỹ thuật có mặt hàng ngày, báo cáo tiến độ hàng tuần cho khách hàng.",
	},
	{
		code: "DV.04",
		title: "Bàn giao & Bảo hành",
		description:
			"Nghiệm thu từng hạng mục trước khi giao chìa khoá, bảo hành nội thất 24 tháng và hỗ trợ bảo trì sau đó.",
	},
];

export const fallbackProcessSteps = [
	{ step: 1, title: "Khảo sát & lắng nghe", description: "Đo đạc hiện trạng, trao đổi phong cách sống và ngân sách." },
	{ step: 2, title: "Concept & mood board", description: "Định hướng phong cách, bảng màu, cảm hứng thiết kế." },
	{ step: 3, title: "Thiết kế 3D chi tiết", description: "Phối cảnh từng không gian, chốt vật liệu và chi phí." },
	{ step: 4, title: "Thi công & giám sát", description: "Triển khai đúng bản vẽ, giám sát viên có mặt hàng ngày." },
	{ step: 5, title: "Bàn giao & bảo hành", description: "Nghiệm thu, dọn dẹp, bàn giao chìa khoá và sổ bảo hành." },
];

export const fallbackFaqs = [
	{
		question: "Thiết kế nội thất trọn gói mất bao lâu?",
		answer: "Trung bình 4–6 tuần cho phần thiết kế và 2–3 tháng thi công, tuỳ diện tích và mức độ hoàn thiện.",
	},
	{
		question: "Chi phí thiết kế nội thất chung cư khoảng bao nhiêu?",
		answer:
			"Chi phí phụ thuộc diện tích, phong cách và vật liệu chọn. Trần Quang Nhân Kiệt báo giá chi tiết ngay sau buổi khảo sát miễn phí, không phát sinh ẩn.",
	},
	{
		question: "Có cần đặt cọc trước khi khảo sát không?",
		answer: "Không. Buổi khảo sát hiện trạng và tư vấn concept ban đầu hoàn toàn miễn phí.",
	},
	{
		question: "Studio có làm được nhiều phong cách khác nhau không?",
		answer:
			"Có — từ ấm áp đương đại, tối giản, đến nghỉ dưỡng nhiệt đới, tuỳ gu và công năng của từng gia đình, không rập khuôn một phong cách cho mọi dự án.",
	},
	{
		question: "Trần Quang Nhân Kiệt nhận dự án ở khu vực nào?",
		answer: "TP. Hồ Chí Minh và các tỉnh lân cận; một số dự án nghỉ dưỡng tại Phan Thiết, Vũng Tàu.",
	},
	{
		question: "Có bảo hành sau khi bàn giao không?",
		answer: "Có — bảo hành nội thất 24 tháng và hỗ trợ bảo trì sau bàn giao.",
	},
];

export const fallbackStats = [
	{ value: "120+", label: "dự án đã hoàn thiện" },
	{ value: "8 năm", label: "kinh nghiệm thiết kế" },
	{ value: "35 ngày", label: "trung bình khảo sát → concept" },
	{ value: "4.9/5", label: "đánh giá từ khách hàng" },
];

export const fallbackBooking = {
	projectTypes: ["Căn hộ", "Nhà phố", "Biệt thự", "Khác"],
	surveySlots: ["08:00–10:00", "10:00–12:00", "14:00–16:00", "16:00–18:00"],
};

export const fallbackContact = {
	phone: "+84 912 345 678",
	email: "kiet@kdesign.vn",
	address: "12 Đường ABC, Quận 7, TP.HCM",
	socialLinks: { facebook: null, tiktok: null, instagram: null, pinterest: null } as {
		facebook: string | null;
		tiktok: string | null;
		instagram: string | null;
		pinterest: string | null;
	},
};
