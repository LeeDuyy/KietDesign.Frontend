import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Montserrat } from "next/font/google";
import { getSiteContent } from "@/lib/site-content";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";
import "./globals.css";

// Matches the wordmark font declared in the brand logo (public/logos/logo-full.svg: "Montserrat, Poppins").
const displayFont = Montserrat({
	subsets: ["vietnamese", "latin"],
	weight: ["500", "600", "700", "800"],
	variable: "--font-display",
});

const sansFont = Inter({
	subsets: ["vietnamese", "latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-sans",
});

const monoFont = JetBrains_Mono({
	subsets: ["vietnamese", "latin"],
	weight: ["500"],
	variable: "--font-mono",
});

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
		<html lang="vi" className={`${displayFont.variable} ${sansFont.variable} ${monoFont.variable}`}>
			<body>{children}</body>
		</html>
	);
}
