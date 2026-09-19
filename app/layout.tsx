import type { Metadata } from "next";
import { Big_Shoulders, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Variable font: browsers auto-drive the opsz axis from rendered font-size,
// so large headlines render as the condensed "Display" cut on their own.
const displayFont = Big_Shoulders({
	subsets: ["vietnamese", "latin"],
	weight: "variable",
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
	title: "Kiệt Trần Design — Studio thiết kế nội thất",
	description:
		"Studio thiết kế và thi công nội thất trọn gói cho căn hộ, nhà phố, biệt thự và mặt bằng thương mại tại TP. Hồ Chí Minh.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="vi" className={`${displayFont.variable} ${sansFont.variable} ${monoFont.variable}`}>
			<body>{children}</body>
		</html>
	);
}
