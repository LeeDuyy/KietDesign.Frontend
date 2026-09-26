# Website Spec — Trần Quang Nhân Kiệt · Architecture & Design

Next.js (App Router) landing page cho studio kiến trúc & nội thất. Tài liệu này mô tả trạng thái hiện tại của toàn bộ website (không chỉ hero) — dùng làm tài liệu tham chiếu khi tiếp tục phát triển hoặc bàn giao.

Stack: Next.js + TypeScript, CSS thuần (`app/globals.css`, không Tailwind), design tokens từ package `@vn-dylan/tokens` được override theo brand riêng.

## 1. Design tokens

Khai báo tại `app/globals.css` (`:root`), override lên trên bộ token mặc định của `@vn-dylan/tokens`.

| Token | Giá trị | Dùng cho |
|---|---|---|
| `--dyl-bg` | `#F7F5EF` (kem) | nền trang |
| `--dyl-ink` / `--dyl-text` | `#2F3A34` (xanh rêu đậm) | chữ chính, nút tối, nền dark section |
| `--dyl-primary` | `#B89B7A` (vàng đồng) | accent, đường kẻ, gradient nút primary |
| `--dyl-primary-deep` | `#A98A66` | hover link, số liệu nổi bật |
| `--dyl-primary-mild` | `#E3C9A3` | gradient nhạt, chữ phụ trên nền tối |
| `--dyl-text-muted` | `#6B706A` (xám ấm) | mô tả phụ |
| `--dyl-text-faint` | `#A7A7A7` | số trang, nhãn phụ |
| `--dyl-border` / `--dyl-border-strong` | `#E6E1D3` / `#D9D2BD` | viền, đường kẻ |
| `--gutter` | `clamp(16px, 4vw, 64px)` | gutter hai bên toàn site, max 64px |

**Font** (khai báo `app/layout.tsx`, tự host qua `next/font/google`):
- Display (`--font-display`): **Montserrat** 500/600/700/800 — khớp font trong `public/logos/logo-full.svg` gốc (`Montserrat, Poppins`). Dùng cho toàn bộ heading + hero.
- Sans (`--font-sans`): **Inter** 400–700 — body text.
- Mono (`--font-mono`): **JetBrains Mono** 500 — mã số (DA.01, mono label...).

**Logo**: `public/logos/logo-full.svg` là bản lockup dọc (icon + "TRẦN QUANG NHÂN KIỆT" + "ARCHITECTURE & DESIGN") không có nền cứng (đã bỏ `<rect>` nền để trong suốt, hoà theo nền thật). `logo-mark.svg` là icon rời, chỉ dùng ở footer.

## 2. Hành vi toàn site

### Full-bleed sections
Các khối cần tràn hết viewport (`header`, `hero-full`, `image-band`) dùng `margin-inline:calc(-1 * var(--gutter))` vì là con trực tiếp của `body` (đã có `padding-inline:var(--gutter)`). Riêng `#du-an` không phải con trực tiếp của `body` (nằm trong `main{max-width:1200px}`) nên phải dùng kỹ thuật khác: `width:100vw; margin-left/right:calc(50% - 50vw)`. Kỹ thuật này gây tràn ngang do độ rộng thanh cuộn dọc — đã fix bằng `overflow-x:hidden` trên cả `html` và `body`.

### Animation khởi tạo (page load)
Riêng khối `.hero-full-card` (tiêu đề, rule, mô tả/list, nút) và `.hero-pager` chạy keyframe `hero-in` (fade + trượt lên 24px) ngay khi trang paint, so le delay 0.05s → 0.75s theo thứ tự đọc. Không phụ thuộc scroll, không cần JS.

### Scroll reveal (2 chiều)
Component `components/ScrollReveal.tsx` — dùng `IntersectionObserver` (threshold 0.15, rootMargin `-60px` đáy) để toggle class `.reveal-visible`. **Không unobserve** sau lần hiện đầu — mỗi lần phần tử ra khỏi viewport, state reset về ẩn, nên animation replay cả khi cuộn xuống lẫn cuộn lên. Áp cho: dải ảnh "Lắng nghe – Kiến tạo – An cư", và từng section trong `<main>` (trừ hero — hero dùng animation khởi tạo riêng, không animate lại theo scroll).

Section "Dự án" là ngoại lệ: chỉ phần tiêu đề (`section-head`) dùng `ScrollReveal` chung; **mỗi dự án trong `ProjectsList` có `ScrollReveal` riêng** để animate độc lập, không đồng loạt.

`prefers-reduced-motion: reduce` tắt toàn bộ transition/animation (`* {…!important}`) và ép các phần tử đang phụ thuộc animation để hiện (`.reveal`, `.hero-full-card > *`, `.hero-pager`) về `opacity:1` tĩnh, tránh kẹt vô hình.

## 3. Cấu trúc trang (top → bottom)

### 3.1 Header — `header.site` (sticky, nền trắng mờ + blur)
- **Desktop (≥768px)**: `nav` cao tối thiểu 88px, không giới hạn `max-width` (đã bỏ centering 1280px để logo bám sát mép trái, tránh khoảng trống lớn trên màn hình rộng). Logo (`brand-logo`, 100px cao) đẩy sát trái bằng `margin-right:auto`; menu `nav-links` (13px, gap 32px) nằm bên phải: **Trang chủ** (active, gạch chân) · Giới thiệu (`#ve-chung-toi`) · Dịch vụ (`#dich-vu`) · Dự án (`#du-an`) · Tin tức (`#`, chưa có trang) · Liên hệ (`#dat-lich`).
- **≤1024px**: thu gap menu 20px, gap nav 24px.
- **≤767px**: `nav-links` ẩn, logo (66px) căn giữa header, hamburger (`MobileNav`) ghim tuyệt đối bên phải.
- Không có nút CTA hay icon tìm kiếm trong header (đã yêu cầu bỏ cả hai).
- `MobileNav.tsx` (panel hamburger) dùng đúng 6 mục và thứ tự giống nav desktop (Trang chủ/Giới thiệu/Dịch vụ/Dự án/Tin tức/Liên hệ), cộng thêm nút "Đặt lịch tư vấn" riêng ở cuối panel.

### 3.2 Hero — `section.hero-full`
- **Desktop**: grid ảo 40/60. Cột chữ (`hero-full-card`) không có nền/shadow, nằm đè trực tiếp lên nền kem, padding trái 64px (32px ở ≤1024px). Cột ảnh (`hero-media`) tuyệt đối bên phải, rộng 62%, mask trái mờ dần vào nền (`linear-gradient(to right, transparent, #000 35%)`). Góc dưới-phải ảnh có `hero-tag` (nhãn "ARCHITECTURE / INTERIOR / LANDSCAPE" nền kem đè lên ảnh).
- **Mobile (≤767px)**: không còn grid — ảnh thu về khối 65%×72% góc trên-phải, mask cả 2 chiều (phải→trái + dưới→trên); chữ nằm trong padding 24px, heading 24–28px weight 300; list "Kiến trúc/Nội thất/Cảnh quan" thay cho đoạn mô tả (`.lede` ẩn); nút CTA bo góc 2px.
- `hero-pager` (01 — 02 03 04 05) là phần tử **tách riêng** khỏi `hero-full-card`, tuyệt đối ở góc dưới-trái hero (desktop: 64/32px; mobile: 24/24px) — hiện tại là số trang tĩnh (số "01" active), **chưa nối với slider thật** (ảnh nền hero không tự đổi khi bấm số).
- Nội dung: H1 "Kiến tạo / không gian / sống bền vững", CTA "Khám phá dự án →" trỏ `#du-an`.

### 3.3 Dải nhãn mobile — `.hero-tags-band`
Chỉ hiển thị ở mobile (ẩn ở desktop vì đã có `hero-tag` trong hero) — lặp lại "Architecture / Interior / Landscape" ngay dưới hero.

### 3.4 Dải ảnh phát biểu — `.image-band` (bọc `ScrollReveal`)
Ảnh full-bleed cao `clamp(320px,52vw,520px)`, overlay gradient tối dần từ trái, badge tròn "K·T" góc trên-trái, heading "Lắng nghe. Kiến tạo. An cư." góc dưới-trái (màu trắng).

### 3.5 `<main>` (max-width 1200px, trừ `#du-an` full-bleed riêng)

| Section | id | Nội dung | Layout |
|---|---|---|---|
| Số liệu | — | 4 chỉ số (120+ dự án, 8 năm, 35 ngày, 4.9/5) | grid 4 cột (2 cột ở ≤640px), khung viền chung |
| Giới thiệu | `ve-chung-toi` | 2 đoạn mô tả studio + 4 điểm nhấn (icon dấu +) | grid 2 cột (1 cột ≤860px), nền gradient nhạt |
| **Dự án** | `du-an` | Xem mục 4 riêng bên dưới | full-bleed, zig-zag ảnh/chữ xen kẽ |
| Dịch vụ | `dich-vu` | 4 dòng dịch vụ (DV.01–04) | spec-sheet list (mã + tiêu đề + mô tả), không phải card |
| Quy trình | `quy-trinh` | 5 bước (01→05) | grid 5 cột (2 cột ≤960px, 1 cột ≤480px) |
| Đánh giá | `danh-gia` | 3 testimonial | grid 3 cột (1 cột ≤860px) |
| Đặt lịch | `dat-lich` | CTA + `BookingForm` | nền tối `--dyl-ink`, grid 2 cột (1 cột ≤860px) |
| FAQ | `hoi-dap` | 6 câu hỏi (`<details>`, câu đầu mở sẵn) | accordion, dấu +/– |

Mỗi section (trừ Dự án — xem mục 4) bọc trong 1 `ScrollReveal` duy nhất.

**`BookingForm`** (`components/BookingForm.tsx`, client component): Họ tên, SĐT, Loại hình (select: Căn hộ/Nhà phố/Biệt thự/Khác), Khung giờ khảo sát, nút "Gửi yêu cầu tư vấn". `onSubmit` hiện tại chỉ `preventDefault()` — **chưa nối API/email thật**.

### 3.6 Footer — `footer.site`
4 cột (2 cột ≤760px): brand (logo-mark + tên, style ngang — khác kiểu lockup dọc của header), Liên hệ, Điều hướng (Dịch vụ/Quy trình/Dự án), Theo dõi (Facebook/Instagram/Pinterest — href `#`, placeholder). Dòng cuối: copyright.

## 4. Section "Dự án" — chi tiết (`components/ProjectsList.tsx`, client component)

- **Layout**: `#du-an` phá khung `main` để tràn full viewport (xem mục 2), zig-zag ảnh/chữ đảo bên mỗi dòng lẻ (`.pz-row.reverse`), 1 cột ở ≤860px.
- **Dữ liệu**: `lib/projects.ts` — mỗi dự án có `slides: {src, alt}[]` (3–4 ảnh/dự án), `stat1`/`stat2` tuỳ loại hình.
- **Ảnh cover** (`slides[0]`) hiển thị trong `.pz-media` — là `<button>` (không phải `<div>`) để có thể bấm + hỗ trợ bàn phím. Hover: ảnh scale 1.045, overlay tối mờ hiện chữ "Xem N ảnh".
- **Lightbox slider** khi click ảnh:
  - Overlay `position:fixed` toàn màn hình, nền tối 94%, đóng khi bấm nền/nút X/phím `Esc`.
  - Điều hướng: nút tròn ‹ › hoặc phím mũi tên trái/phải; chấm chỉ báo (`lightbox-dots`) bấm nhảy thẳng tới ảnh.
  - **Animation chuyển ảnh**: mỗi lần đổi slide, ảnh mới chạy keyframe `lightbox-slide-in` (fade + scale 1.015→1 + trượt ngang 36px) — hướng trượt theo biến CSS `--dir` (1 = next/tới, -1 = prev/lùi), tự tính khi bấm chấm chỉ báo dựa trên so sánh index.
  - Ảnh hiển thị `object-fit:contain` (thấy trọn ảnh, không crop như card ngoài).
  - Khi mở: khoá scroll body (`document.body.style.overflow = "hidden"`), trả lại khi đóng.
  - Slider chỉ điều hướng ảnh **trong cùng 1 dự án** — không có nút "dự án kế tiếp" nhảy sang dự án khác.

## 5. Component/file map

| File | Vai trò |
|---|---|
| `app/layout.tsx` | Load font (Montserrat/Inter/JetBrains Mono), metadata SEO cơ bản |
| `app/page.tsx` | Toàn bộ trang chủ (server component, trừ phần dùng client component con) |
| `app/globals.css` | Toàn bộ style — không có file CSS khác |
| `components/MobileNav.tsx` | Hamburger + panel menu mobile (client) — **nav items chưa đồng bộ với desktop** |
| `components/ScrollReveal.tsx` | Wrapper `IntersectionObserver` tái sử dụng cho mọi section |
| `components/ProjectsList.tsx` | Render zig-zag + lightbox slider (client) |
| `components/BookingForm.tsx` | Form đặt lịch (client, chưa nối backend) |
| `lib/projects.ts` | Dữ liệu 5 dự án (type `Project`, `Slide`, `Stat`) |
| `public/logos/` | `logo-full.svg` (lockup dọc, nền trong suốt), `logo-mark.svg` (icon rời, dùng ở footer), `logo-full-dark.svg` (chưa dùng trong code) |
| `public/images/` | Ảnh thật cho hero, image-band, và slides của 5 dự án |

## 6. Breakpoint tổng hợp

| Breakpoint | Áp dụng |
|---|---|
| `max-width:1024px` | Thu gap menu header; padding-left hero-full-card/hero-pager giảm còn 32px |
| `max-width:960px` | `.process` 5→2 cột |
| `max-width:860px` | `.about`, `.quotes`, `.cta-band`, `.pz-row` chuyển 1 cột |
| `max-width:767px` | **Ngưỡng chính mobile**: header đổi logo-căn-giữa + hamburger, hero đổi layout hoàn toàn (xem 3.2), `hero-tags-band` hiện |
| `max-width:760px` | Footer 4→2 cột |
| `max-width:640px` | `.stats` 4→2 cột, `.spec-row` 1 cột, lightbox thu nhỏ nút điều hướng |
| `max-width:480px` | `.process` →1 cột |

## 7. Việc còn dang dở / cần quyết định tiếp

1. Link **"Tin tức"** trỏ `#` — chưa có trang/section thật.
2. **`BookingForm`** chưa gọi API thật (chỉ `preventDefault`) — cần nối endpoint gửi lead khi có backend.
3. **`hero-pager`** trên hero là số trang tĩnh, chưa nối với slider ảnh nền hero thật (hero hiện chỉ có 1 ảnh, không đổi khi bấm số 02–05).
4. Social links ở footer (Facebook/Instagram/Pinterest) đang là placeholder `#`.
