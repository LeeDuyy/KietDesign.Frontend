# API công khai cho website landing

Ba endpoint chỉ đọc, không cần đăng nhập, dùng để landing lấy nội dung do chủ studio nhập ở trang quản trị.

- **Trang tài liệu (có nút "Gọi thử"):** `/api-docs` trên trang quản trị.
- **Đặc tả OpenAPI 3.1 (nhập vào Postman, Swagger UI, codegen):** `/api/public/openapi.json`.
- Nguồn duy nhất của cả hai: `src/lib/api-docs/openapi.ts`. Đổi payload API thì sửa file này (test sẽ báo nếu ví dụ lệch với schema).

- **Địa chỉ gốc:** giá trị `PUBLIC_BASE_URL` của trang quản trị (ví dụ `https://admin.kiettran.info`). Để trống thì lấy theo Host của request.
- **Phương thức:** `GET` (kèm `OPTIONS` cho preflight).
- **CORS:** trình duyệt chỉ được gọi từ `https://kiettran.info` và `http://localhost` (mọi cổng). Origin khác không nhận `Access-Control-Allow-Origin` (preflight trả 403). Thêm origin khác bằng biến `CORS_ALLOWED_ORIGINS` (cách nhau bằng dấu phẩy). Gọi từ máy chủ (Server Component, curl) không có header Origin nên không bị giới hạn. Áp dụng cho cả API lẫn ảnh `/media/*`.
- **Cache:** API luôn trả `Cache-Control: no-store`, nên phía landing tự quyết định cache (xem mục "Cách dùng"). Ảnh trả `immutable, max-age=1 năm`, vì tên file đổi mỗi lần thay ảnh.

## `GET /api/public/site-media`

Ảnh và logo của website.

```json
{
  "hero": { "url": "https://admin.kiettran.info/media/abc.jpg" },
  "imageBand": { "url": "https://admin.kiettran.info/media/def.jpg" },
  "logos": {
    "header": { "url": "https://admin.kiettran.info/media/logo-header.svg" },
    "footer": { "url": "https://admin.kiettran.info/media/logo-footer.svg" },
    "favicon": { "url": "https://admin.kiettran.info/media/favicon.png" }
  },
  "projects": [
    {
      "id": "…",
      "slug": "du-an-mau-1",
      "name": "Dự án mẫu 1",
      "projectType": "Căn hộ",
	  "year": 2022,
	  "location": "TP. Hồ Chí Minh",
	  "description": "Không gian cà phê tân cổ điển ấm áp.",
	  "duration": "10 tuần",
      "images": [{ "position": 1, "url": "https://admin.kiettran.info/media/…" }]
    }
  ]
}
```

- Mọi `url` là địa chỉ tuyệt đối, dùng thẳng được trong `<img>` hoặc `next/image`.
- `logos.favicon` là `null` khi chưa đặt favicon. Landing nên dùng icon mặc định của nó.
- `projects[].images` xếp theo `position` tăng dần; ảnh đầu là ảnh cover.
- `projects` chỉ gồm dự án có `applied=true`; dự án đã tắt vẫn nằm trong Admin nhưng không có trong response.

## `GET /api/public/consulting`

Nội dung phần tư vấn.

```json
{
  "services": [{ "code": "DV.01", "title": "…", "description": "…" }],
  "processSteps": [{ "step": 1, "title": "…", "description": "…" }],
  "faqs": [{ "question": "…", "answer": "…" }],
  "booking": { "projectTypes": ["Căn hộ", "…"], "surveySlots": ["08:00–10:00", "…"] }
}
```

Mọi danh sách chỉ trả mục có `applied=true`. Vì vậy `services` có tối đa 4 dòng, `processSteps` tối đa 5 bước và có thể rỗng; `faqs`, `booking.projectTypes`, `booking.surveySlots` cũng chỉ gồm mục đang áp dụng. Frontend phải giữ nguyên response rỗng, không thay bằng nội dung dự phòng.

## `GET /api/public/contact-info`

```json
{
  "phone": "0900 000 000",
  "email": "lien-he@example.com",
  "address": "Chưa cập nhật",
  "socialLinks": { "zalo": null, "facebook": null, "tiktok": null, "instagram": null, "pinterest": null }
}
```

`socialLinks.*` là `null` khi chưa nhập: ẩn liên kết đó trên landing.

## Cách dùng trong landing (Next.js)

```ts
// lib/admin-api.ts
const BASE = process.env.ADMIN_API_URL!; // https://admin.kiettran.info

export async function getSiteMedia() {
	const res = await fetch(`${BASE}/api/public/site-media`, { next: { revalidate: 60 } });
	if (!res.ok) throw new Error(`site-media ${res.status}`);
	return res.json();
}
```

- Gọi từ Server Component với `revalidate` (60 giây trở lên) để không đập vào trang quản trị mỗi lượt xem.
- Dùng `next/image` với ảnh của admin thì cần khai báo domain trong `next.config`:

```js
images: { remotePatterns: [{ protocol: "https", hostname: "admin.kiettran.info" }] }
```

- Favicon: trả trong `generateMetadata` → `icons: { icon: media.logos.favicon?.url ?? "/icon.svg" }`.
- Khi trang quản trị không trả lời, landing phải có nội dung dự phòng (bản hiện tại đang hard-code) thay vì lỗi trắng trang.

## Cấu hình phía trang quản trị

| Biến | Ý nghĩa |
|---|---|
| `PUBLIC_BASE_URL` | Origin công khai dùng để dựng URL ảnh. Nên đặt khi chạy sau reverse proxy. |
