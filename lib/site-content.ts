import { getConsulting, getContactInfo, getHomeStats, getSiteMedia, type ApiContactInfo, type ApiSiteMedia } from "@/lib/admin-api";
import {
	DEFAULT_MOBILE_LOGO,
	fallbackBooking,
	fallbackContact,
	fallbackFaqs,
	fallbackMedia,
	fallbackProcessSteps,
	fallbackServices,
	fallbackStats,
} from "@/lib/fallback-content";
import { fallbackProjects, type Project } from "@/lib/projects";
import { SOCIAL_DEFAULTS } from "@/lib/site";
import type { SocialNetwork } from "@/components/SocialIcon";

/** Trang quản trị điền chuỗi này cho trường chưa nhập — coi như không có dữ liệu. */
const PLACEHOLDER = "chưa cập nhật";

export function cleanText(value: string | null | undefined): string | null {
	const text = value?.trim();
	return text && text.toLowerCase() !== PLACEHOLDER ? text : null;
}

/** "+84 384 793 266" | "0384 793 266" → "0384793266": dạng Zalo dùng trong https://zalo.me/<số>. */
export function toZaloId(phone: string): string {
	const digits = phone.replace(/\D/g, "");
	return digits.startsWith("84") ? `0${digits.slice(2)}` : digits;
}

/** "0900 000 000" → "+84900000000" để dùng trong href="tel:". */
export function toTelHref(phone: string): string {
	const digits = phone.replace(/[^\d+]/g, "");
	if (digits.startsWith("+")) return digits;
	if (digits.startsWith("0")) return `+84${digits.slice(1)}`;
	return `+${digits}`;
}

/** "Căn hộ Anh Hoàng" → "can-ho-anh-hoang" (bỏ dấu tiếng Việt, đ → d). */
export function slugify(text: string): string {
	return text
		.normalize("NFD")
		.replace(/[̀-ͯ]/g, "")
		.replace(/đ/gi, "d")
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

function projectsFromApi(items: ApiSiteMedia["projects"]): Project[] {
	// Slug dựng từ tên dự án để URL luôn khớp tên hiển thị: slug do Admin sinh một lần khi tạo
	// (vd. "du-an-mau-1") và không đổi theo khi chủ studio đổi tên. Slug Admin chỉ là phương án dự phòng.
	const used = new Set<string>();
	const uniqueSlug = (name: string, apiSlug: string) => {
		const base = slugify(name) || slugify(apiSlug) || "du-an";
		let slug = base;
		for (let n = 2; used.has(slug); n++) slug = `${base}-${n}`;
		used.add(slug);
		return slug;
	};

	return items
		.filter((p) => p.images.length > 0)
		.map((p, i) => {
			const category = cleanText(p.projectType);
			const location = cleanText(p.location);
			const description = cleanText(p.description);
			const duration = cleanText(p.duration);
			const year = p.year === null ? undefined : String(p.year);
			const label = category ? `${p.name} — ${category}` : p.name;
			const slides = [...p.images]
				.sort((a, b) => a.position - b.position)
				.map((img, n) => ({ src: img.url, alt: `${label}, ảnh ${n + 1}` }));
			const stats = [
				category ? { label: "Loại hình", value: category } : null,
				duration ? { label: "Thời gian thực hiện", value: duration } : null,
			].filter((stat): stat is { label: string; value: string } => stat !== null);

			return {
				code: `DA.${String(i + 1).padStart(2, "0")}`,
				slug: uniqueSlug(p.name, p.slug),
				title: p.name,
				category,
				slides,
				year,
				location: location ?? undefined,
				desc: description ?? undefined,
				meta: [category, location, duration].filter(Boolean).join(" · ") || undefined,
				stat1: stats[0],
				stat2: stats[1],
			};
		});
}

export async function getSiteContent() {
	// fetch cùng URL trong một lượt render được Next dedupe, nên layout và page gọi lại không tốn thêm request.
	const [media, consulting, contact, homeStats] = await Promise.all([
		getSiteMedia(),
		getConsulting(),
		getContactInfo(),
		getHomeStats(),
	]);

	const brandAlt = "Trần Quang Nhân Kiệt — Architecture & Design";
	const phone = cleanText(contact?.phone) ?? (contact ? null : fallbackContact.phone);
	const email = cleanText(contact?.email) ?? (contact ? null : fallbackContact.email);
	const address = cleanText(contact?.address) ?? (contact ? null : fallbackContact.address);
	// Khi Admin đã trả response, `null` có nghĩa là mục đang tắt/không áp dụng: tuyệt đối
	// không dựng lại link từ dữ liệu dự phòng (đặc biệt là Zalo từ số điện thoại).
	const social = contact
		? {
				facebook: cleanText(contact.socialLinks.facebook),
				// Admin API chưa quản lý TikTok (thường null) nên rơi về SOCIAL_DEFAULTS.
				tiktok: cleanText(contact.socialLinks.tiktok),
				instagram: cleanText(contact.socialLinks.instagram),
				pinterest: cleanText(contact.socialLinks.pinterest),
				zalo: cleanText(contact.socialLinks.zalo),
			}
		: {
				facebook: cleanText(fallbackContact.socialLinks.facebook) ?? SOCIAL_DEFAULTS.facebook,
				tiktok: SOCIAL_DEFAULTS.tiktok,
				instagram: cleanText(fallbackContact.socialLinks.instagram) ?? SOCIAL_DEFAULTS.instagram,
				pinterest: cleanText(fallbackContact.socialLinks.pinterest) ?? SOCIAL_DEFAULTS.pinterest,
				zalo: SOCIAL_DEFAULTS.zalo ?? (phone ? `https://zalo.me/${toZaloId(phone)}` : null),
			};

	return {
		media: media
			? {
					hero: { src: media.hero.url, alt: `Công trình tiêu biểu — ${brandAlt}` },
					imageBand: { src: media.imageBand.url, alt: `Công trình nổi bật — ${brandAlt}` },
					logoHeader: media.logos.header.url,
					// Chưa đặt ở Admin thì dùng logo mobile mặc định (public/logos/logo-header-mobile.png).
					logoHeaderMobile: media.logos.headerMobile?.url ?? DEFAULT_MOBILE_LOGO,
					logoFooter: media.logos.footer.url,
					favicon: media.logos.favicon?.url ?? null,
				}
			: fallbackMedia,
		projects: media ? projectsFromApi(media.projects) : fallbackProjects,
		services: consulting?.services ?? fallbackServices,
		processSteps: consulting?.processSteps ?? fallbackProcessSteps,
		faqs: consulting?.faqs ?? fallbackFaqs,
		booking: consulting?.booking ?? fallbackBooking,
		// Admin chỉ trả các ô đang áp dụng (có thể rỗng → ẩn dải số liệu); chỉ khi API lỗi mới dùng dự phòng.
		stats: homeStats?.stats ?? fallbackStats,
		contact: {
			phone,
			telHref: phone ? toTelHref(phone) : null,
			email,
			address,
			social,
		},
	};
}

export type SiteContent = Awaited<ReturnType<typeof getSiteContent>>;

// Thứ tự hiển thị ở footer. Mục không áp dụng (`null`) không được render.
// Zalo không nằm đây vì là bong bóng chat riêng.
export function getSocialLinks({ social }: SiteContent["contact"]) {
	return [
		{ network: "facebook", label: "Facebook", href: social.facebook },
		{ network: "tiktok", label: "TikTok", href: social.tiktok },
		{ network: "instagram", label: "Instagram", href: social.instagram },
		{ network: "pinterest", label: "Pinterest", href: social.pinterest },
	].filter((link): link is { network: SocialNetwork; label: string; href: string } => link.href !== null);
}
