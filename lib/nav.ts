// Đường dẫn dạng "/#mục" để dùng được cả ở trang chủ lẫn các trang con (vd. /du-an/<slug>).
export const NAV_LINKS = [
	{ href: "/", label: "Trang chủ", key: "home" },
	{ href: "/#ve-chung-toi", label: "Giới thiệu", key: "about" },
	{ href: "/#dich-vu", label: "Dịch vụ", key: "services" },
	{ href: "/#du-an", label: "Dự án", key: "projects" },
	{ href: "#", label: "Tin tức", key: "news" },
	{ href: "/#dat-lich", label: "Liên hệ", key: "contact" },
] as const;

export type NavKey = (typeof NAV_LINKS)[number]["key"];
