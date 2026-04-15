# Blog Redesign Plan — SWE Personal Blog

**Status:** WAITING FOR CONFIRMATION  
**Created:** 2026-04-16  
**Scope:** Blog only (`/blog` and `/blog/[slug]`) — portfolio untouched.

---

## 1. Requirements Restatement

Biến trang `/blog` hiện tại thành một blog **thực sự của một SWE** — tập trung vào việc chia sẻ kinh nghiệm và bài viết kỹ thuật. Không phải showcase portfolio.

### Tiêu chí thành công

- Đọc blog này cảm giác như đọc bài của một kỹ sư thực thụ (không phải template)
- Trải nghiệm đọc (reading experience) là ưu tiên số 1
- Người đọc có thể khám phá bài viết theo chủ đề / series một cách tự nhiên
- Codebase vẫn đơn giản, filesystem-based, không cần CMS

---

## 2. Phân tích hiện trạng

### Vấn đề hiện tại

| Vấn đề | Mức độ |
|--------|--------|
| Blog listing quá generic — không khác gì template | HIGH |
| Post page thiếu context: không có author bio cuối bài, không có related posts | HIGH |
| Không có navigation next/prev post | MEDIUM |
| Không có RSS feed | MEDIUM |
| Category "courses" + "tips" cồng kềnh, không phản ánh blog cá nhân | MEDIUM |
| Không có social share | LOW |
| Code blocks tốt nhưng thiếu line numbers | LOW |

### Điểm mạnh giữ nguyên

- MDX filesystem approach — đơn giản, không cần CMS
- TOC sidebar trên desktop — giữ nguyên
- Reading progress bar — giữ nguyên
- SEO metadata — giữ nguyên
- Syntax highlighting (sugar-high) — giữ nguyên
- Tech stack: Next.js App Router + Tailwind CSS v4 + Framer Motion

---

## 3. Reference Blogs (định hướng)

- **overreacted.io** (Dan Abramov) — tối giản, nội dung là tất cả
- **leerob.io** (Lee Robinson) — editorial, clean list
- **swyx.io** — category rõ ràng, tập trung vào SWE content
- **joshwcomeau.com** — interactive, code-heavy, reading-first

**Định hướng thiết kế cho blog này:** Editorial + Reading-First — nội dung là trung tâm, UI phục vụ nội dung, không phải ngược lại.

---

## 4. Kế hoạch triển khai

### Phase 1 — Blog Listing Page Redesign

**Mục tiêu:** Trang danh sách bài viết trông như blog của một kỹ sư thực thụ, không phải template.

#### 1.1 Header Redesign

Thay đổi header từ generic title thành author intro ngắn gọn:

```
"Notes from the trenches" (hoặc tagline cá nhân)
[Ảnh nhỏ hoặc initials] Khanh Pham · Software Engineer
Brief 1-2 dòng về mình viết gì: "I write about React, Go, distributed systems, and lessons from building real products."
```

File: `src/app/blog/page.tsx`

#### 1.2 Simplify Content Categories

Bỏ category "courses" (không phù hợp với blog cá nhân). Thay vào đó dùng **topics/tags** để phân loại:

- Đơn giản: chỉ filter bằng tags (React, Go, TypeScript, System Design, Career, etc.)
- Bỏ filter bar phức tạp, thay bằng topic pills gọn nhẹ hơn
- Frontmatter: bỏ `category`, giữ `tags` + thêm `series` (optional)

File: `src/lib/blog.ts`, `src/components/blog/blog-filter.tsx`

#### 1.3 Post List Layout — Editorial Style

Thay `pro-card` nặng nề bằng layout editorial nhẹ hơn:

**Featured post** (latest): Vẫn nổi bật nhưng đơn giản hơn — title lớn, description, tags, date. Không cần card box nặng.

**Post list:** Giữ layout dạng danh sách với date column, nhưng thêm:
- Visual indicator cho series (nếu post thuộc series)
- Hover animation tinh tế hơn
- Group by year nếu có nhiều bài (optional Phase 2)

#### 1.4 Xóa "courses" section

Content `src/content/blog/courses/` — convert thành series trong tips hoặc giữ nhưng không hiển thị riêng. Quyết định cuối khi xem số lượng content.

---

### Phase 2 — Blog Post Page Enhancement

**Mục tiêu:** Trải nghiệm đọc tốt hơn, có context đầy đủ, có path để đọc tiếp.

#### 2.1 Author Bio Footer

Cuối mỗi bài, thêm một block nhỏ:

```
[Avatar/Initials] Khanh Pham
Software Engineer. Writing about React, Go, and building things that work.
[→ About me]  [GitHub]  [Twitter/X]
```

File: tạo `src/components/blog/author-bio.tsx`

#### 2.2 Related Posts / Series Navigation

Sau author bio, hiển thị:
- Nếu bài thuộc **series**: show next/prev trong cùng series với progress (3/5)
- Nếu không có series: show 2-3 bài cùng tags (computed từ `getAllPosts()`)

File: tạo `src/components/blog/related-posts.tsx`, update `src/lib/blog.ts`

#### 2.3 Post Footer Navigation (Prev/Next)

Ở dưới cùng, simple prev/next navigation:

```
← [Tên bài trước]          [Tên bài sau] →
```

File: tạo `src/components/blog/post-nav.tsx`, update `src/app/blog/[slug]/page.tsx`

#### 2.4 Social Share (đơn giản)

3 nút share nhỏ trong header bài (hoặc cuối bài):
- Copy link
- Share to X/Twitter
- Share to LinkedIn

Không dùng thư viện — tự viết với native share API + fallback copy-to-clipboard.

File: tạo `src/components/blog/share-buttons.tsx`

#### 2.5 Code Block Improvements

Thêm line numbers vào `CodeBlock`:
- Line numbers bên trái (xám, không selectable)
- Filename header hiển thị rõ hơn (đã có `data-filename`)
- Language badge (đã có)

File: `src/components/blog/code-block.tsx`

---

### Phase 3 — Content Structure & Discovery

**Mục tiêu:** Cải thiện cách tổ chức và khám phá nội dung.

#### 3.1 Series Support

Thêm `series` và `seriesOrder` vào frontmatter:

```yaml
---
title: "Go Error Handling — Part 1: Basics"
series: "go-in-practice"
seriesTitle: "Go in Practice"
seriesOrder: 1
---
```

Cập nhật `src/lib/blog.ts` để group theo series.

File: `src/lib/blog.ts`, `src/types/blog.ts` (nếu chưa có)

#### 3.2 RSS Feed

Tạo route `/blog/rss.xml` trả về valid RSS 2.0 feed:

```
GET /blog/rss.xml → RSS feed toàn bộ bài viết, mới nhất trước
```

File: tạo `src/app/blog/rss.xml/route.ts`

#### 3.3 Better MDX Frontmatter

Mở rộng frontmatter schema:

```yaml
---
title: string (required)
description: string (required)
date: YYYY-MM-DD (required)
tags: string[] (required)
series?: string           # series slug
seriesTitle?: string      # series human name  
seriesOrder?: number      # position in series
draft?: boolean           # ẩn khỏi production
featured?: boolean        # pin lên đầu list
---
```

Bỏ: `category`, `level`, `course`, `courseChapter` (quá phức tạp cho blog cá nhân)

---

### Phase 4 — Polish & Reading Experience

**Mục tiêu:** Tiểu tiết làm cho blog trông professional và dễ đọc.

#### 4.1 Typography Improvements

- Tăng `line-height` trong prose lên 1.8 (hiện tại ~1.7)
- Giới hạn `max-width` prose xuống ~65ch (optimal reading width)
- `font-size` body text bài viết: 17-18px desktop
- Block quote styling — thêm màu sắc, border trái có màu primary
- Heading anchor links (hover show # icon để copy link)

File: `src/app/globals.css` (prose-blog section)

#### 4.2 Estimated Reading Experience Metrics

Trong post header thêm thêm:
- Word count (simple)
- Last updated date (nếu khác published date)

File: `src/lib/blog.ts`, `src/app/blog/[slug]/page.tsx`

#### 4.3 "Back to top" button

Fixed button xuất hiện sau khi scroll 500px, scroll to top khi click.

File: tạo `src/components/blog/back-to-top.tsx`

---

## 5. Files bị ảnh hưởng

```
src/
├── app/
│   └── blog/
│       ├── page.tsx                        [Phase 1 — thay đổi lớn]
│       ├── [slug]/page.tsx                  [Phase 2 — thêm components]
│       └── rss.xml/route.ts                 [Phase 3 — tạo mới]
├── components/
│   └── blog/
│       ├── blog-filter.tsx                  [Phase 1 — simplify]
│       ├── author-bio.tsx                   [Phase 2 — tạo mới]
│       ├── related-posts.tsx                [Phase 2 — tạo mới]
│       ├── post-nav.tsx                     [Phase 2 — tạo mới]
│       ├── share-buttons.tsx                [Phase 2 — tạo mới]
│       ├── code-block.tsx                   [Phase 2 — add line numbers]
│       ├── back-to-top.tsx                  [Phase 4 — tạo mới]
│       └── index.ts                         [update exports]
├── lib/
│   └── blog.ts                              [Phase 1+3 — extend]
└── app/globals.css                          [Phase 4 — prose tweaks]

src/content/blog/
└── tips/                                    [Phase 3 — update frontmatter]
```

**Không thay đổi:**
- `table-of-contents.tsx`
- `reading-progress.tsx`
- `mdx-component.tsx` (trừ nếu cần heading anchors)
- `glass-sidebar.tsx`
- Portfolio pages

---

## 6. Risks & Decisions

| Risk | Khả năng | Giải pháp |
|------|---------|-----------|
| Bỏ "courses" làm mất content hiện có | MEDIUM | Convert introduction.mdx thành tips post trước khi xóa |
| RSS feed encoding issues với tiếng Việt | LOW | Dùng proper CDATA wrapping |
| Related posts logic phức tạp | LOW | Giữ đơn giản: chỉ match 1-2 tags đầu tiên |
| Series navigation tăng complexity `blog.ts` | MEDIUM | Tách ra `src/lib/series.ts` riêng |

---

## 7. Complexity & Scope

| Phase | Complexity | Files thay đổi |
|-------|-----------|----------------|
| Phase 1 — Listing redesign | LOW | 3 files |
| Phase 2 — Post enhancement | MEDIUM | 5 files mới + 2 update |
| Phase 3 — Content structure | MEDIUM | 2 files + route mới |
| Phase 4 — Polish | LOW | 2 files + 1 mới |
| **Tổng** | **MEDIUM** | **~15 files** |

---

## 8. Thứ tự thực hiện đề xuất

```
Phase 1 (1-2h)  → verify UI trên browser
    ↓
Phase 3.1+3.2 (1h) → RSS + series schema
    ↓
Phase 2 (2-3h)  → post page enhancements
    ↓
Phase 4 (1h)   → polish
```

Tổng ước tính: **5-7 giờ** thực hiện.

---

## 9. Quyết định cần xác nhận

1. **"Courses" content:** Bỏ hoàn toàn hay convert thành series bình thường?
2. **Author avatar:** Dùng ảnh thật hay initials? (ảnh cần có file)
3. **Comments:** Có muốn thêm comments không? (Giscus/GitHub Discussions — Phase 5 nếu muốn)
4. **Newsletter:** Có muốn thêm newsletter signup không? (cần service như Resend/ConvertKit)
5. **Ngôn ngữ bài viết:** Tiếng Anh, Tiếng Việt, hay cả hai? (ảnh hưởng đến typography và RSS)

---

**WAITING FOR CONFIRMATION**: Bạn có muốn tiến hành theo plan này không?

Nếu muốn thay đổi gì, nói: "modify: [thay đổi]"  
Nếu đồng ý, nói: "yes" hoặc "proceed" để bắt đầu implement Phase 1.
