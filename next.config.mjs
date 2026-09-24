/** @type {import('next').NextConfig} */
const nextConfig = {
	// Đóng gói runtime tối thiểu (.next/standalone) để CI đẩy thẳng lên VPS, không cần node_modules đầy đủ.
	output: "standalone",
};

export default nextConfig;
