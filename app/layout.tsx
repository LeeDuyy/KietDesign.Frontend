import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Montserrat } from "next/font/google";
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
	title: "Trần Quang Nhân Kiệt — Architecture & Design",
	description:
		"Studio kiến trúc và thiết kế nội thất trọn gói cho căn hộ, nhà phố, biệt thự và mặt bằng thương mại tại TP. Hồ Chí Minh.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="vi" className={`${displayFont.variable} ${sansFont.variable} ${monoFont.variable}`}>
			<body>{children}</body>
		</html>
	);
}
