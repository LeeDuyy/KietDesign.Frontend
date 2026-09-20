# Desktop Hero – UI Spec (Trần Quang Nhân Kiệt · Architecture & Design)

Thiết kế cho viewport desktop/laptop từ 1280px trở lên. Cùng hệ thiết kế với bản mobile (`mobile-hero-ui-spec.md`).

## 1. Design tokens

| Token | Giá trị |
|---|---|
| `--bg` | `#F7F5EF` (kem) |
| `--ink` | `#2F3A34` (xanh rêu đậm, dùng cho chữ và nút) |
| `--gold` | `#B89B7A` (đường kẻ, accent) |
| `--gray` | `#A7A7A7` (số trang không active) |
| Font | Montserrat hoặc Poppins (300/400/500) |
| Container | `max-width: 1280px`, padding ngang 64px |

## 2. Cấu trúc từ trên xuống

### Header (cao khoảng 88px, nền kem)

- **Logo bên trái**: biểu tượng K (cao khoảng 44px), bên dưới là "TRẦN QUANG NHÂN KIỆT" (khoảng 13px, weight 500, letter-spacing 0.08em), rồi "ARCHITECTURE & DESIGN" (khoảng 7px, letter-spacing rộng) kèm đường kẻ mảnh phía trên. Toàn bộ logo căn giữa theo chiều ngang của chính nó.
- **Menu**: "Trang chủ, Giới thiệu, Dịch vụ, Dự án, Tin tức, Liên hệ", cỡ 13px, weight 400, gap khoảng 32px, đặt ở giữa-phải. Mục active ("Trang chủ") có gạch chân 1px màu `--ink`, cách chữ khoảng 6px. Hover: đổi sang `--gold`.
- **Icon tìm kiếm** (kính lúp 18px, stroke 1.5px) ở góc phải, cách menu khoảng 40px.

### Hero (grid 2 cột, chiều cao khoảng `calc(100vh - 88px)`, tối thiểu 560px)

**Cột trái (khoảng 40%, `z-index` cao hơn ảnh, căn giữa theo chiều dọc)**

- **Tiêu đề**: ba dòng "KIẾN TẠO / KHÔNG GIAN / SỐNG BỀN VỮNG", chữ hoa, khoảng 44px (`clamp(32px, 3.4vw, 48px)`), weight 300–400, letter-spacing 0.04em, line-height 1.3, màu `--ink`.
- **Đường kẻ**: rộng 32px, dày 2px, màu `--ink` (hoặc `--gold`), cách tiêu đề khoảng 24px.
- **Đoạn mô tả**: "Từ nền tảng vững chắc, dẫn dắt bởi ý tưởng sáng tạo, kiến tạo những công trình bền vững." Cỡ 15px, line-height 1.7, màu `--ink`, tối đa khoảng 340px (`max-width: 22em`) để ngắt thành 3 dòng.
- **Nút CTA** "KHÁM PHÁ DỰ ÁN →": nền `--ink`, chữ kem, hoa, 12px, letter-spacing 0.08em, padding `16px 32px`, bo góc 2px, cách đoạn mô tả khoảng 32px. Hover: nền chuyển sang `#3b4a42`, mũi tên dịch phải 4px.
- **Pagination** ở đáy cột trái (cách đáy khoảng 32px): "01" cỡ 18px màu `--ink`, đường kẻ 1px dài 36px, rồi "02" và "03" cỡ 12px màu `--gray`, gap 16px.

**Cột phải (khoảng 60%, ảnh)**

- Ảnh công trình bê tông có kính, cây xanh và hồ bơi, chiếm toàn bộ chiều cao hero và sát mép phải màn hình (`object-fit: cover`).
- Cạnh trái ảnh mờ dần vào nền kem: `mask-image: linear-gradient(to right, transparent 0, #000 35%)`.
- **Thẻ nhãn góc dưới phải**: khối nền kem đặc, rộng khoảng 26% cột ảnh, cao khoảng 72px, đè lên góc ảnh (`position: absolute; right: 0; bottom: 0`). Bên trong là ba dòng "ARCHITECTURE / INTERIOR / LANDSCAPE", cỡ 11px, letter-spacing 0.25em, hoa, căn phải, màu `--ink` nhạt, line-height 1.6, padding `16px 24px`.

## 3. Code khởi đầu

### HTML

```html
<header class="hdr">
  <a class="brand" href="/"><img src="logo-full.svg" alt="Trần Quang Nhân Kiệt"></a>
  <nav>
    <a class="active" href="#">Trang chủ</a>
    <a href="#">Giới thiệu</a>
    <a href="#">Dịch vụ</a>
    <a href="#">Dự án</a>
    <a href="#">Tin tức</a>
    <a href="#">Liên hệ</a>
  </nav>
  <button class="search" aria-label="Tìm kiếm">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>
  </button>
</header>

<section class="hero">
  <div class="hero-text">
    <h1>Kiến tạo<br>không gian<br>sống bền vững</h1>
    <i class="rule"></i>
    <p>Từ nền tảng vững chắc,<br>dẫn dắt bởi ý tưởng sáng tạo,<br>kiến tạo những công trình bền vững.</p>
    <a class="cta" href="#projects">Khám phá dự án <span>→</span></a>
    <div class="pager"><b>01</b><i></i><span>02</span><span>03</span></div>
  </div>
  <div class="hero-media">
    <img src="hero.jpg" alt="">
    <div class="tag">Architecture<br>Interior<br>Landscape</div>
  </div>
</section>
```

### CSS

```css
:root{--bg:#F7F5EF;--ink:#2F3A34;--gold:#B89B7A;--gray:#A7A7A7}
body{margin:0;background:var(--bg);color:var(--ink);font-family:Montserrat,sans-serif}

.hdr{max-width:1280px;margin:0 auto;height:88px;padding:0 64px;display:flex;align-items:center;gap:40px}
.brand{margin-right:auto}
.brand img{height:56px;display:block}
nav{display:flex;gap:32px;font-size:13px}
nav a{color:var(--ink);text-decoration:none;padding-bottom:6px;border-bottom:1px solid transparent;transition:color .2s}
nav a:hover{color:var(--gold)}
nav a.active{border-bottom-color:var(--ink)}
.search{background:none;border:0;color:var(--ink);cursor:pointer}

.hero{position:relative;display:grid;grid-template-columns:40% 60%;min-height:calc(100vh - 88px);overflow:hidden}
.hero-text{position:relative;z-index:2;padding:0 0 96px 64px;display:flex;flex-direction:column;justify-content:center;
  margin-left:max(0px,calc((100vw - 1280px)/2))}
h1{font-size:clamp(32px,3.4vw,48px);font-weight:300;line-height:1.3;letter-spacing:.04em;text-transform:uppercase;margin:0}
.rule{display:block;width:32px;height:2px;background:var(--ink);margin:24px 0}
.hero-text p{font-size:15px;line-height:1.7;max-width:22em;margin:0 0 32px}
.cta{align-self:flex-start;display:inline-flex;gap:8px;align-items:center;background:var(--ink);color:var(--bg);
  padding:16px 32px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;text-decoration:none;border-radius:2px;transition:background .2s}
.cta:hover{background:#3b4a42}
.cta span{transition:transform .2s}
.cta:hover span{transform:translateX(4px)}
.pager{position:absolute;left:64px;bottom:32px;display:flex;align-items:center;gap:16px;font-size:12px;color:var(--gray)}
.pager b{font-size:18px;font-weight:400;color:var(--ink)}
.pager i{width:36px;height:1px;background:var(--ink)}

.hero-media{position:absolute;top:0;right:0;bottom:0;width:62%}
.hero-media img{width:100%;height:100%;object-fit:cover;
  -webkit-mask-image:linear-gradient(to right,transparent 0,#000 35%);mask-image:linear-gradient(to right,transparent 0,#000 35%)}
.tag{position:absolute;right:0;bottom:0;background:var(--bg);padding:16px 24px;min-width:26%;box-sizing:border-box;
  text-align:right;font-size:11px;line-height:1.6;letter-spacing:.25em;text-transform:uppercase}
```

## 4. Responsive

- Từ 1024px trở xuống: thu nhỏ khoảng cách menu (gap 20px) và padding container về 32px.
- Dưới 768px: chuyển sang layout mobile (xem `mobile-hero-ui-spec.md`): menu thu vào hamburger, ảnh chuyển xuống nền bên phải và fade vào nền kem, thẻ nhãn "Architecture / Interior / Landscape" chuyển thành danh sách "Kiến trúc / Nội thất / Cảnh quan" dưới đường kẻ.

## 5. Lưu ý khi implement

- Ảnh hero là ảnh chụp thật, cần thay bằng ảnh dự án của bạn, tỉ lệ khoảng 16:10 và chừa vùng trời phía trên.
- Pagination cho thấy đây là slider: click hoặc auto-play 5–6 giây đổi ảnh và tiêu đề; số active phóng to, đường kẻ chuyển dịch theo slide.
- Nên dùng chung một component ảnh hero cho desktop và mobile, chỉ đổi `width`, `height` và hướng của gradient mask qua media query.
