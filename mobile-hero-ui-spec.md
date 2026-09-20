# Mobile Hero – UI Spec (Trần Quang Nhân Kiệt · Architecture & Design)

Thiết kế cho khung mobile khoảng 390px.

## 1. Design tokens

| Token | Giá trị |
|---|---|
| `--bg` | `#F7F5EF` (kem) |
| `--ink` | `#2F3A34` (xanh rêu đậm, dùng cho chữ và nút) |
| `--gold` | `#B89B7A` (đường kẻ, accent) |
| `--gray` | `#A7A7A7` (số trang không active) |
| Font | Sans hình học, nét mảnh: Montserrat hoặc Poppins (300/400/500) |
| Bo góc | Gần như vuông, khoảng 2px |

## 2. Cấu trúc từ trên xuống

### Header (cao khoảng 72px, nền kem)

- Logo căn giữa: biểu tượng K nhỏ (cao khoảng 40px), dưới là tên "TRẦN QUANG NHÂN KIỆT" (khoảng 11px, weight 500, letter-spacing 0.08em), dưới nữa là "ARCHITECTURE & DESIGN" (khoảng 6px, letter-spacing rộng) kèm hai đường kẻ mảnh hai bên.
- Icon hamburger (3 gạch ngang, 20px, stroke 1.5px) ở góc phải, căn giữa theo chiều dọc với logo.

### Hero (chiếm phần còn lại, `position: relative`, padding ngang 24px)

- **Ảnh nền**: công trình bê tông có kính và cây xanh, đặt `position: absolute; right: 0`, rộng khoảng 60–65% màn hình, phần sát header có bầu trời. Cạnh trái ảnh mờ dần vào nền kem bằng `mask-image: linear-gradient(to right, transparent, #000 40%)`. Cạnh dưới cũng fade nhẹ vào nền.
- **Tiêu đề** (nằm đè lên bên trái, `z-index` cao hơn ảnh): ba dòng "KIẾN TẠO / KHÔNG GIAN / SỐNG BỀN VỮNG", chữ hoa, khoảng 28px, weight 300–400, letter-spacing khoảng 0.04em, line-height 1.3, màu `--ink`.
- **Đường kẻ vàng**: rộng 32px, dày 2px, màu `--gold`, cách tiêu đề khoảng 20px.
- **Danh sách dịch vụ**: ba dòng "Kiến trúc / Nội thất / Cảnh quan", cỡ 13–14px, line-height 1.7, màu `--ink` hơi nhạt (opacity 0.8).
- **Nút CTA** "KHÁM PHÁ DỰ ÁN →": nền `--ink`, chữ kem, hoa, khoảng 11–12px, letter-spacing 0.08em, padding `14px 24px`, canh trái, cách danh sách khoảng 40px. Mũi tên là icon riêng, cách chữ 8px.
- **Pagination** ở đáy hero: "01" cỡ khoảng 18px màu `--ink`, tiếp theo là đường kẻ ngang dài khoảng 36px (1px, màu `--ink`), rồi "02" và "03" cỡ 11px màu `--gray`, cách nhau khoảng 16px.

## 3. Code khởi đầu

### HTML

```html
<header class="hdr">
  <img src="logo-full.svg" alt="Trần Quang Nhân Kiệt" class="logo">
  <button class="burger" aria-label="Menu"><span></span><span></span><span></span></button>
</header>

<section class="hero">
  <img class="hero-img" src="hero.jpg" alt="">
  <div class="hero-content">
    <h1>Kiến tạo<br>không gian<br>sống bền vững</h1>
    <i class="rule"></i>
    <ul><li>Kiến trúc</li><li>Nội thất</li><li>Cảnh quan</li></ul>
    <a class="cta" href="#projects">Khám phá dự án <span>→</span></a>
  </div>
  <div class="pager"><b>01</b><i></i><span>02</span><span>03</span></div>
</section>
```

### CSS

```css
:root{--bg:#F7F5EF;--ink:#2F3A34;--gold:#B89B7A;--gray:#A7A7A7}
body{margin:0;background:var(--bg);color:var(--ink);font-family:Montserrat,sans-serif}
.hdr{height:72px;display:flex;align-items:center;justify-content:center;position:relative}
.logo{height:48px}
.burger{position:absolute;right:24px;background:none;border:0;display:grid;gap:5px}
.burger span{width:20px;height:1.5px;background:var(--ink)}

.hero{position:relative;min-height:calc(100svh - 72px);padding:32px 24px 72px;overflow:hidden}
.hero-img{position:absolute;top:0;right:0;width:65%;height:72%;object-fit:cover;z-index:0;
  -webkit-mask-image:linear-gradient(to right,transparent,#000 45%),linear-gradient(to bottom,#000 80%,transparent);
  -webkit-mask-composite:source-in;mask-composite:intersect}
.hero-content{position:relative;z-index:1}
h1{font-size:28px;font-weight:300;line-height:1.3;letter-spacing:.04em;text-transform:uppercase;margin:0}
.rule{display:block;width:32px;height:2px;background:var(--gold);margin:20px 0}
ul{list-style:none;padding:0;margin:0 0 40px;font-size:14px;line-height:1.7}
.cta{display:inline-flex;gap:8px;align-items:center;background:var(--ink);color:var(--bg);
  padding:14px 24px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;text-decoration:none;border-radius:2px}
.pager{position:absolute;left:24px;bottom:24px;display:flex;align-items:center;gap:16px;font-size:11px;color:var(--gray)}
.pager b{font-size:18px;font-weight:400;color:var(--ink)}
.pager i{width:36px;height:1px;background:var(--ink)}
```

## 4. Lưu ý khi implement

- Ảnh hero là ảnh chụp thật, cần thay bằng ảnh dự án của bạn. Nên xuất tỉ lệ khoảng 4:5 và chừa phần trời phía trên.
- Pagination cho thấy đây là slider: click hoặc swipe sẽ đổi ảnh và tiêu đề, số active phóng to và đậm hơn.
- Màn nhỏ hơn 360px: hạ cỡ h1 xuống 24px, hoặc dùng `clamp(24px, 7vw, 30px)`.
