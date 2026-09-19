# Landing Page — Kiệt Trần Design

Giai đoạn 1: chỉ landing page (chưa có booking flow thật), mục tiêu SEO và quảng bá thương hiệu cho studio thiết kế nội thất Kiệt Trần. Booking thật là giai đoạn sau; landing page hiện tại có một CTA band mô phỏng bước đặt lịch để làm điểm nối.

> **v2 (bản này):** ưu tiên gây ấn tượng ngay từ đầu — dự án nổi bật chuyển lên ngay sau hero, có chuyển động khi scroll liên kết các dự án với nhau, và các phần hero/dự án tận dụng toàn bộ chiều rộng màn hình thay vì bị bó trong khung 1200px. Phần dưới tài liệu này đã cập nhật theo hướng đó — chưa dựng lại prototype, sẽ làm ở bước kế tiếp sau khi blueprint được duyệt.

## Design system

Dùng `@vn-dylan/tokens` (đã có sẵn trong `package.json`) làm nguồn token — neutrals, radius, shadow, spacing, font hệ thống (Inter, JetBrains Mono). Bộ mặc định (`default`) là xanh dương thiên dashboard, nên trang này override sang schema **gold** có sẵn trong `preset-theme-schema` (`#f3a027` / deep `#d5841a` / mild `#f6b757`) — ấm hơn, hợp vật liệu gỗ và đồng của nội thất, vẫn tươi sáng. Đổi sang schema khác (`orange`, `cyan`, `purple`...) chỉ là đổi vài biến CSS trong `app/globals.css`.

Dylan vốn là design system cho dashboard, không có font hiển thị cho landing page — bổ sung **Big Shoulders** (variable font, dùng ở đầu cỡ lớn "Display") cho tiêu đề, giữ nguyên Inter cho phần đọc. Theme: **chỉ light**, theo yêu cầu — không có dark mode.

Motif xuyên suốt: ngôn ngữ "bản vẽ kỹ thuật" (thước tỉ lệ ở đầu trang, mã dịch vụ `DV.01–04`, mã dự án `DA.01–05`) vì thương hiệu và toàn bộ concept xoay quanh "bản vẽ".

## Kiến trúc trang (v2 — dự án lên đầu để gây ấn tượng trước)

1. Header sticky + hero full-bleed (ảnh dự án thật làm nền, headline đè lên)
2. **Dự án nổi bật** — chuyển lên ngay sau hero (trước đây ở gần cuối). Đây là khoảnh khắc "gây ấn tượng" chính của trang: showcase toàn màn hình, có chuyển động khi scroll liên kết 5 dự án (chi tiết ở mục riêng bên dưới)
3. Dải số liệu (placeholder, cần số thật) — đóng vai trò "hạ nhiệt" sau khoảnh khắc ấn tượng, chuyển sang phần tin cậy/thông tin
4. Về Kiệt Trần (giới thiệu studio + 4 điểm khác biệt)
5. Dịch vụ — dạng spec-list (DV.01–04), không phải card giống nhau
6. Quy trình — 5 bước thật (khảo sát → concept → 3D → thi công → bàn giao)
7. Đánh giá khách hàng
8. CTA đặt lịch + form mockup (chưa nối backend)
9. FAQ (SEO, dùng `<details>` semantic)
10. Footer — NAP + JSON-LD `HomeAndConstructionBusiness`

Nav header đổi thứ tự theo đúng flow mới: Dự án · Về chúng tôi · Dịch vụ · Quy trình · Hỏi đáp.

## Bố cục toàn màn hình & chuyển động khi scroll

**Full-bleed có chọn lọc, không phải toàn trang.** "Tận dụng toàn bộ diện tích" áp dụng cho các phần mang tính thị giác/gây ấn tượng — hero và showcase dự án tràn hết chiều rộng viewport, không còn gutter 1200px. Các phần đọc nhiều chữ (Về chúng tôi, Dịch vụ, Quy trình, FAQ) vẫn giữ khung đọc ~1200px — chữ tràn hết màn hình rộng sẽ khó đọc, nên chỉ ảnh/showcase mới full-bleed, không phải toàn bộ trang.

**Khoảnh khắc chuyển động chính — showcase dự án dạng "cuộn phim" liên kết bằng thước đo.** Thay vì 5 card xếp dọc như bản v1, phần Dự án nổi bật trở thành một khối cao ~5×100vh; bên trong, khung hiển thị dùng `position: sticky` giữ nguyên một viewport trong lúc người dùng scroll dọc — scroll dọc được đổi thành chuyển động ngang (`translateX`) chạy qua lần lượt DA.01 → DA.05, mỗi dự án chiếm trọn màn hình (ảnh tràn viền). Bên cạnh là một thanh dọc dạng thước đo (nối tiếp motif "bản vẽ" đã có ở thước ngang đầu trang): 5 vạch mã DA.01–DA.05, vạch của dự án đang hiện phóng to/tô đậm, và một đường fill chạy dài dần theo tiến độ scroll — đây chính là phần "liên kết các dự án nổi bật với nhau" mà bạn yêu cầu, biến motif trang trí có sẵn thành một chỉ báo tiến trình thật.

Sau khi cuộn hết 5 dự án, scroll dọc trở lại bình thường sang phần Dải số liệu.

**Chỉ một khoảnh khắc lớn, không rải rác.** Các phần còn lại (Về chúng tôi, Dịch vụ, Quy trình, Đánh giá, FAQ) giữ nguyên tĩnh, không thêm hiệu ứng fade/slide-up khi vào khung nhìn — dàn hiệu ứng cuộn ở mọi section là một pattern rất phổ biến và dễ nhận ra là dựng hàng loạt, nên chỉ dồn toàn bộ "điểm nhấn chuyển động" vào một khoảnh khắc ở đầu trang thay vì rải mỗi phần một hiệu ứng nhỏ.

**Dự phòng khi không hợp:** với `prefers-reduced-motion` hoặc trên màn hình hẹp (< 860px, nơi kỹ thuật pin/scroll-jack ngang dễ gãy trải nghiệm chạm), showcase dự án rơi về lại bố cục xếp dọc từng dự án kèm slider ảnh như bản v1 — không ép chuyển động ngang lên mobile.

## Dự án trong portfolio (ảnh thật từ `Resources/A KIET`)

| Mã | Dự án | Loại hình | Nguồn ảnh |
| --- | --- | --- | --- |
| DA.01 | Căn hộ Anh Hoàng | Căn hộ 92m², Q.7 | `tong hop - a Hoang/ảnh final` |
| DA.02 | Căn hộ Anh Sơn | Căn hộ 78m², Q.2 | `tong hop - a Sơn q2/ảnh final` |
| DA.03 | Khu nghỉ dưỡng Phan Thiết | Villa sân vườn | `tong hop - a Đồng phan thiết/ảnh render` |
| DA.04 | Cà phê G'Long | F&B / thương mại | `tong hop - sala cafe/ảnh 3d` |
| DA.05 | Nhà phố Anh Tuyến | Nhà phố 3 tầng, Q.9 | `tong hop a Tuyen - q9/ảnh final` |

Còn chưa dùng tới, có thể thêm sau nếu cần thêm dự án: `tong hop HBT` (quán bar nhiều tầng), `tong hop a Tan - tan phu`, `tong hop aTan - lagi` (resort).

## SEO

Heading hierarchy đúng chuẩn (một `h1` duy nhất ở hero), alt text mô tả thật cho từng ảnh, FAQ bằng `<details>` semantic, JSON-LD `HomeAndConstructionBusiness` trong `app/page.tsx`, ảnh qua `next/image` (tự tối ưu định dạng/kích thước khi build/serve). Còn thiếu trước khi lên production: sitemap.xml, `robots.txt`, metadata Open Graph, nén ảnh nguồn (ảnh gốc trong `Resources` khá nặng, 1–8MB/ảnh).

## Việc cần xác nhận / còn placeholder

- Tên thương hiệu "Kiệt Trần", địa chỉ, hotline, email trong `lib/projects.ts` / `app/page.tsx` / JSON-LD đều là **placeholder**.
- Số liệu ở dải stat (120+ dự án, 8 năm, 4.9/5) là **placeholder**, cần số thật.
- Xác nhận 16 ảnh dự án trong `public/images/` được phép dùng công khai (đều là ảnh render/thi công thực tế của studio, lấy từ `Resources/A KIET`).
- Chưa nối booking form thật (`components/BookingForm.tsx` hiện chỉ `preventDefault`, chưa gửi đi đâu).

## Implementation (Next.js App Router)

```
app/
  layout.tsx       — root layout, next/font (Big Shoulders + Inter + JetBrains Mono), metadata
  globals.css       — @import '@vn-dylan/tokens/css' + gold schema override + component CSS
  page.tsx          — toàn bộ nội dung trang (server component)
components/
  ProjectSlider.tsx — carousel ảnh mỗi dự án (client component, useState)
  BookingForm.tsx    — form đặt lịch mockup (client component, cần 'use client' vì có onSubmit)
lib/
  projects.ts        — dữ liệu 5 dự án (ảnh, mô tả, vật liệu)
public/images/        — 16 ảnh dự án thật, copy từ Resources/A KIET
```

Chạy thử: `pnpm dev` (mặc định cổng 3000, tự chuyển 3001 nếu 3000 đang bận) — đã kiểm tra trả về HTTP 200, ảnh qua `next/image` optimizer hoạt động.
