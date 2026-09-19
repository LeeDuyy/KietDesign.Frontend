export type Slide = { src: string; alt: string };

export type Project = {
	code: string;
	title: string;
	meta: string;
	desc: string;
	chips: string[];
	slides: Slide[];
};

export const projects: Project[] = [
	{
		code: "DA.01",
		title: "Căn hộ Anh Hoàng",
		meta: "92M² · QUẬN 7 · 6 TUẦN THI CÔNG",
		desc: "Phong cách ấm áp đương đại — gỗ óc chó, mảng tường đất nung và điểm nhấn cam được lặp lại xuyên suốt từ phòng khách đến phòng làm việc và phòng tắm.",
		chips: ["Gỗ óc chó", "Đá terrazzo", "Mảng tường đất nung"],
		slides: [
			{ src: "/images/living-terracotta.jpg", alt: "Phòng khách tông đất nung, kệ gỗ mở, căn hộ Anh Hoàng quận 7" },
			{ src: "/images/bedroom-skyline.jpg", alt: "Phòng ngủ master view thành phố, tường bê tông mài ấm, căn hộ Anh Hoàng" },
			{ src: "/images/office-teal.jpg", alt: "Phòng làm việc kệ thép mở tường xanh ngọc, bàn cam, căn hộ Anh Hoàng" },
			{ src: "/images/bath-amber.jpg", alt: "Phòng tắm tủ gương hổ phách, lavabo bệt, căn hộ Anh Hoàng" },
		],
	},
	{
		code: "DA.02",
		title: "Căn hộ Anh Sơn",
		meta: "78M² · QUẬN 2 · 5 TUẦN THI CÔNG",
		desc: "Tối giản, ấm bằng chất liệu thay vì màu sắc — ghế bành mù tạt làm điểm nhấn giữa tông da đen và tường xanh rêu, có hẳn một góc piano riêng cho gia chủ yêu nhạc.",
		chips: ["Ghế bọc da lì", "Tường xanh rêu", "Đá marble"],
		slides: [
			{ src: "/images/living-mustard-chair.jpg", alt: "Phòng khách ghế bành vàng mù tạt, sofa da đen, căn hộ Anh Sơn quận 2" },
			{ src: "/images/dining-green.jpg", alt: "Bàn ăn ghế da nâu, tường xanh rêu, bếp mở, căn hộ Anh Sơn" },
			{ src: "/images/piano-corner.jpg", alt: "Góc piano gỗ với kệ trang trí, căn hộ Anh Sơn" },
		],
	},
	{
		code: "DA.03",
		title: "Khu nghỉ dưỡng Phan Thiết",
		meta: "VILLA SÂN VƯỜN · PHAN THIẾT",
		desc: "Cụm villa trệt phong cách Địa Trung Hải — tường trát thô trắng, mái lá cọ và sân vườn nhiệt đới quây quanh hồ bơi chung.",
		chips: ["Tường trát thô trắng", "Mái lá & gỗ", "Sân vườn nhiệt đới"],
		slides: [
			{ src: "/images/resort-exterior.jpg", alt: "Phối cảnh biệt thự nghỉ dưỡng sân vườn, tường trắng, hàng dừa, Phan Thiết" },
			{ src: "/images/resort-pool.jpg", alt: "Hồ bơi chung villa nghỉ dưỡng, hàng dừa, Phan Thiết" },
			{ src: "/images/resort-villa.jpg", alt: "Villa mái lá cọ sân vườn xương rồng, Phan Thiết" },
		],
	},
	{
		code: "DA.04",
		title: "Cà phê G'Long",
		meta: "MẶT BẰNG F&B · TP.HCM · 10 TUẦN THI CÔNG",
		desc: "Không gian cà phê tân cổ điển ấm áp — quầy pha chế gỗ sẫm, ghế bọc nhung đỏ và kệ trưng bày mở, thiết kế để quán vừa đón khách nhanh vừa giữ chân khách ngồi lâu.",
		chips: ["Ghế bọc nhung đỏ", "Quầy gỗ sẫm", "Kệ trưng bày mở"],
		slides: [
			{ src: "/images/cafe-storefront.jpg", alt: "Mặt tiền quán cà phê G'Long, bảng hiệu vàng, sân hiên trồng cây" },
			{ src: "/images/cafe-dining-1.jpg", alt: "Khu vực bàn ghế cà phê, ghế bọc nhung đỏ, kệ gỗ trưng bày sách và cà phê" },
			{ src: "/images/cafe-dining-2.jpg", alt: "Quầy pha chế gỗ sẫm, tranh treo tường phong cách cà phê, ghế nhung đỏ" },
		],
	},
	{
		code: "DA.05",
		title: "Nhà phố Anh Tuyến",
		meta: "NHÀ PHỐ 3 TẦNG · QUẬN 9 · 7 TUẦN THI CÔNG",
		desc: "Nhà cho gia đình nhiều thế hệ — phòng khách gỗ chạm truyền thống dành cho ông bà, bếp mở hiện đại cạnh cầu thang cho sinh hoạt chung, và phòng riêng đầy màu sắc cho các con.",
		chips: ["Gỗ chạm truyền thống", "Đá marble", "Nội thất trẻ em"],
		slides: [
			{ src: "/images/tuyen-formal-room.jpg", alt: "Phòng khách truyền thống gỗ chạm, bàn thờ gia tiên, nhà phố Anh Tuyến quận 9" },
			{ src: "/images/tuyen-kitchen-stair.jpg", alt: "Bếp mở hiện đại cạnh cầu thang, tủ gỗ, mảng tường vàng, nhà phố Anh Tuyến" },
			{ src: "/images/tuyen-kids-room.jpg", alt: "Phòng ngủ trẻ em có gác lửng và bàn học, nhà phố Anh Tuyến" },
		],
	},
];
