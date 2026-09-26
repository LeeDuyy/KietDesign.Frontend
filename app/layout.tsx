import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Montserrat } from "next/font/google";
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

export const metadata: Metadata = {
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="vi" className={`${displayFont.variable} ${sansFont.variable} ${monoFont.variable}`}>
			<body>{children}</body>
		</html>
	);
}
