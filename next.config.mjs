// Ảnh do trang quản trị phục vụ (/media/*) đi qua next/image nên origin của nó phải nằm trong remotePatterns.
// Đọc lúc build: đặt ADMIN_API_URL cả ở bước build của CI lẫn lúc chạy (compose.yaml).
function adminImagePatterns() {
	const raw = process.env.ADMIN_API_URL;
	if (!raw) return [];
	try {
		const { protocol, hostname, port } = new URL(raw);
		return [{ protocol: protocol.replace(":", ""), hostname, port }];
	} catch {
		return [];
	}
}

/** @type {import('next').NextConfig} */
const nextConfig = {
	// Đóng gói runtime tối thiểu (.next/standalone) để CI đẩy thẳng lên VPS, không cần node_modules đầy đủ.
	output: "standalone",
	images: { remotePatterns: adminImagePatterns() },
};

export default nextConfig;
