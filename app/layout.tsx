import type { Metadata } from "next";
import { getSiteContent } from "@/lib/site-content";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";
// Montserrat (khớp wordmark trong logo), Inter, JetBrains Mono: tự lưu ở public/fonts thay vì next/font/google,
// vì build trên CI từng lỗi khi tải font từ Google ("An error occurred in `next/font`").
import "./fonts.css";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
	// Favicon do chủ studio đặt ở trang quản trị; chưa đặt thì dùng public/icon.svg + favicon.ico mặc định.
	const { media } = await getSiteContent();
	return {
		metadataBase: new URL(SITE_URL),
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		alternates: { canonical: "/" },
		openGraph: {
			type: "website",
			locale: "vi_VN",
			url: "/",
			siteName: SITE_NAME,
			title: SITE_TITLE,
			description: SITE_DESCRIPTION,
		},
		twitter: {
			card: "summary_large_image",
			title: SITE_TITLE,
			description: SITE_DESCRIPTION,
		},
		// Không dùng app/icon.svg | app/favicon.ico: Next sẽ tự chèn chúng cạnh favicon từ API và trình duyệt có thể chọn nhầm.
		icons: {
			icon: media.favicon
				? [{ url: media.favicon }]
				: [
						{ url: "/favicon.ico", sizes: "48x48" },
						{ url: "/icon.svg", type: "image/svg+xml" },
					],
			apple: "/apple-icon.png",
		},
	};
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="vi">
			<body>{children}</body>
		</html>
	);
}
