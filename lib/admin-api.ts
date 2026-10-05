// Client cho API công khai của trang quản trị (Admin/docs/api/public-api.md).
// Mọi hàm đều trả `null` khi trang quản trị không trả lời — nơi gọi phải dùng nội dung dự phòng
// (lib/fallback-content.ts) thay vì để lỗi làm trắng trang.

const BASE = (process.env.ADMIN_API_URL ?? "").replace(/\/+$/, "");

/** Origin trang quản trị, null khi chưa cấu hình. Trình duyệt gọi thẳng booking-request tại đây (Admin đã mở CORS cho kiettran.info và localhost). */
export const adminApiUrl: string | null = BASE || null;
const REVALIDATE_SECONDS = 60;
const TIMEOUT_MS = 5000;

export type ApiImage = { url: string };

export type ApiSiteMedia = {
	hero: ApiImage;
	imageBand: ApiImage;
	logos: { header: ApiImage; headerMobile?: ApiImage | null; footer: ApiImage; favicon: ApiImage | null };
	projects: {
		id: string;
		slug: string;
		name: string;
		projectType: string;
		year: number | null;
		location: string;
		description: string;
		duration: string;
		images: { position: number; url: string }[];
	}[];
};

export type ApiConsulting = {
	services: { code: string; title: string; description: string }[];
	processSteps: { step: number; title: string; description: string }[];
	faqs: { question: string; answer: string }[];
	booking: { projectTypes: string[]; surveySlots: string[] };
};

export type ApiContactInfo = {
	phone: string;
	email: string;
	address: string | null;
	socialLinks: {
		zalo: string | null;
		facebook: string | null;
		tiktok: string | null;
		instagram: string | null;
		pinterest: string | null;
	};
};

export type ApiHomeStats = { stats: { value: string; label: string }[] };

async function getJson<T>(path: string): Promise<T | null> {
	if (!BASE) return null;
	try {
		const res = await fetch(`${BASE}/api/public/${path}`, {
			next: { revalidate: REVALIDATE_SECONDS },
			signal: AbortSignal.timeout(TIMEOUT_MS),
		});
		if (!res.ok) return null;
		return (await res.json()) as T;
	} catch {
		return null;
	}
}

export const getSiteMedia = () => getJson<ApiSiteMedia>("site-media");
export const getConsulting = () => getJson<ApiConsulting>("consulting");
export const getContactInfo = () => getJson<ApiContactInfo>("contact-info");
export const getHomeStats = () => getJson<ApiHomeStats>("home-stats");
