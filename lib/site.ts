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
export const SITE_TITLE = "KDesign";
export const SITE_DESCRIPTION =
	"Studio kiến trúc và thiết kế nội thất trọn gói cho căn hộ, nhà phố, biệt thự và mặt bằng thương mại tại TP. Hồ Chí Minh.";
