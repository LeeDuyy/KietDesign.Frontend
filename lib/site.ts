// Domain chính (canonical). www.kiettran.info phải redirect 301 về đây.
export const SITE_URL = "https://kiettran.info";
export const SITE_NAME = "KDesign";

// Liên kết mạng xã hội dùng khi trang quản trị chưa nhập (API contact-info chưa có TikTok).
// Điền URL đầy đủ, ví dụ "https://www.tiktok.com/@kdesign". null = ẩn liên kết đó.
export const SOCIAL_DEFAULTS = {
	facebook: null as string | null,
	tiktok: null as string | null,
	instagram: null as string | null,
	pinterest: null as string | null,
	zalo: null as string | null, // null = tự dựng https://zalo.me/<số điện thoại liên hệ>
};

// Tên chủ studio và các cách người dùng hay gõ khi tìm: dùng chung cho title, keywords và JSON-LD.
export const OWNER_NAME = "Trần Quang Nhân Kiệt";
export const OWNER_ALIASES = ["Kiệt Trần", "Kiet Tran", "Tran Quang Nhan Kiet"];
export const SITE_TITLE = `${SITE_NAME} | ${OWNER_NAME} (Kiệt Trần) – Thiết kế kiến trúc & nội thất TP.HCM`;
export const SITE_DESCRIPTION =
	`${SITE_NAME} – studio kiến trúc và thiết kế nội thất trọn gói của ${OWNER_NAME} (Kiệt Trần) cho căn hộ, nhà phố, biệt thự và mặt bằng thương mại tại TP. Hồ Chí Minh.`;
export const SITE_KEYWORDS = [
	SITE_NAME,
	"KDesign Kiệt Trần",
	OWNER_NAME,
	...OWNER_ALIASES,
	"thiết kế nội thất TP.HCM",
	"thiết kế kiến trúc",
	"thiết kế nội thất trọn gói",
	"thiết kế thi công nhà phố",
	"thiết kế căn hộ",
	"thiết kế biệt thự",
	"thiết kế nội thất cà phê nhà hàng",
];
