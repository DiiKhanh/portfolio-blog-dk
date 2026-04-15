# DESIGN.md — Khanh Pham Portfolio Blog

> Design system reference for this codebase. Extracted from the live source code (globals.css, components).
> Use this before making any UI change to stay visually consistent across pages.
>
> **Scope**: This document covers the full design system. Blog-specific redesign guidelines are in [Section 10](#10-blog-specific-redesign-notes).

---

## Table of Contents

1. [Visual Theme and Atmosphere](#1-visual-theme-and-atmosphere)
2. [Color Palette and Roles](#2-color-palette-and-roles)
3. [Typography Rules](#3-typography-rules)
4. [Component Styles](#4-component-styles)
5. [Layout Principles](#5-layout-principles)
6. [Depth and Elevation](#6-depth-and-elevation)
7. [Do's and Don'ts](#7-dos-and-donts)
8. [Responsive Behavior](#8-responsive-behavior)
9. [Agent Prompt Guide](#9-agent-prompt-guide)
10. [Blog-Specific Redesign Notes](#10-blog-specific-redesign-notes)

---

## 1. Visual Theme and Atmosphere

### Identity

This is a **dark-first, technical, editorial** design system. It lives in the intersection of:
- The dark, deep-space aesthetic of modern developer tools
- The readable, content-focused feel of a real SWE's personal blog
- Subtle glassmorphism and depth — never garish or over-animated

### Atmosphere Keywords

`dark luxury` · `technical precision` · `editorial calm` · `deep space` · `reading-first`

### Mood

The site feels like a **late-night terminal with good taste** — the kind of personal site a principal engineer would build on a weekend: confident, minimal chrome, neon accents that know when to be quiet.

### Background Environment

The background is not flat — it has three fixed atmospheric layers:

```
Layer 1 (z-0): Grid lines — 60×60px dot grid, 3% white on dark / 3% black on light
Layer 2 (z-0): Mesh gradients — three radial blobs:
  - Top-left: Cyan (#00D9FF) at 15% opacity, blurred 60px
  - Bottom-right: Green (#10B981) at 15% opacity, blurred 60px
  - Center: Blue (#0EA5E9) at 8% opacity, blurred 80px
Layer 3 (z-1+): All page content sits above these
```

This creates a sense of depth and atmosphere without competing with content.

### Motion Personality

- Entrances: fade + translateY(-8px), ~400ms ease-out
- Hover: 200-300ms, cubic-bezier(0.4, 0, 0.2, 1)
- Cards lift: translateY(-4px) on hover — consistent across all card types
- Reading progress bar: linear motion, no spring
- Always respect `prefers-reduced-motion: reduce`

---

## 2. Color Palette and Roles

### Dark Mode (Default)

| Token | Value | Role |
|-------|-------|------|
| `--background` | `#050510` | Page background — deep navy-black |
| `--background-secondary` | `#0A0E27` | Elevated surfaces, sidebar |
| `--foreground` | `#E0E0FF` | Primary text — soft warm white |
| `--foreground-muted` | `#9CA3AF` | Secondary text, captions, meta |
| `--primary` | `#00D9FF` | Cyan — links, accents, markers |
| `--primary-hover` | `#00C7E6` | Primary on hover |
| `--secondary` | `#0EA5E9` | Sky blue — gradients, secondary accent |
| `--accent` | `#10B981` | Emerald green — success, live indicators |
| `--border` | `#333344` | Dividers, borders |
| `--glass-bg` | `rgba(255,255,255,0.05)` | Glass card surface |
| `--glass-border` | `rgba(255,255,255,0.1)` | Glass card border |

### Light Mode

| Token | Value | Role |
|-------|-------|------|
| `--background` | `#F8FAFC` | Light grey — not pure white |
| `--background-secondary` | `#FFFFFF` | Cards and elevated surfaces |
| `--foreground` | `#0F172A` | Near-black text |
| `--foreground-muted` | `#64748B` | Slate-500 — muted text |
| `--primary` | `#0EA5E9` | Sky blue (shifted from cyan) |
| `--primary-hover` | `#0284C7` | Darker blue on hover |
| `--border` | `#E2E8F0` | Subtle light border |
| `--glass-bg` | `rgba(255,255,255,0.7)` | High opacity glass |
| `--glass-border` | `rgba(0,0,0,0.1)` | Dark-on-light border |

### Semantic Color Usage

| Use Case | Color |
|----------|-------|
| Links | `--primary` |
| CTA buttons | Gradient: `--primary` → `--accent` |
| Code inline background | `rgba(0,217,255,0.08)` on dark / `rgba(14,165,233,0.08)` on light |
| Blockquote border | `--primary` (3px left border) |
| Success / live | `--accent` (#10B981 green) |
| Beginner badge | `#22C55E` (green) |
| Intermediate badge | `#EAB308` (yellow) |
| Advanced badge | `#EF4444` (red) |
| List markers | `--primary` |
| Focus ring | `2px solid --primary`, offset 2px |

### Gradient Recipes

```css
/* CTA Button */
background: linear-gradient(135deg, var(--primary), var(--accent));

/* Gradient text */
background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 50%, var(--accent) 100%);

/* Pro card glow (dark) */
box-shadow: 0 0 40px -12px rgba(0, 217, 255, 0.4);

/* Pro card border glow */
border: 1px solid rgba(0, 217, 255, 0.3);
```

---

## 3. Typography Rules

### Font Stack

| Role | Family | Weights |
|------|--------|---------|
| Heading (`--font-heading`) | Space Grotesk | 400, 600, 700 |
| Body (`--font-body`) | DM Sans | 400, 500, 600, 700 |
| Code (`--font-mono`) | JetBrains Mono | 400, 500 |

**Fallback chain:**
```css
font-heading: "Space Grotesk", sans-serif
font-body:    "DM Sans", sans-serif
font-mono:    "JetBrains Mono", "Fira Code", "Cascadia Code", Consolas, monospace
```

### Scale

| Usage | Size | Weight | Letter-spacing |
|-------|------|--------|----------------|
| Hero heading | `clamp(3rem, 8vw, 5rem)` | 700 | -0.04em |
| Section title | `clamp(2.5rem, 5vw, 4rem)` | 700 | -0.02em |
| H1 (blog post) | `clamp(1.875rem, 4vw, 2.5rem)` | 700 | -0.02em |
| H2 (prose) | 1.625rem | 700 | -0.02em |
| H3 (prose) | 1.25rem | 600 | -0.01em |
| H4 (prose) | 1.0625rem | 600 | 0 |
| Body (prose) | 1.0625rem | 400 | 0 |
| Body (UI) | 1rem | 400 | 0 |
| Caption / meta | 0.75rem–0.875rem | 400–500 | 0 |
| Badge label | 0.6875rem | 600 | 0.05em (uppercase) |

### Line Height

| Context | Value |
|---------|-------|
| Hero headings | 1.1 |
| Section headings | 1.2–1.3 |
| Prose headings | 1.3 |
| Prose body | 1.85 |
| UI body text | 1.5–1.6 |
| Code blocks | 1.7 |

### Readable Width

- **Prose content:** target 65–72 characters per line
- Enforce with `max-w-[720px]` or `max-w-3xl` on article containers
- Never let prose fill full viewport width on desktop

### Rules

- Always use `font-heading` class for all display and heading text
- Body paragraphs: `color: var(--foreground-muted)` — not full foreground
- Headings: `color: var(--foreground)` — full brightness
- `letter-spacing: -0.02em` on all headings ≥ 1.5rem
- Uppercase labels: always pair `uppercase` with `tracking-widest` (0.1em+)

---

## 4. Component Styles

### 4.1 Glass Card (`.glass-card`)

Frosted glass surface for UI panels, navbars, sidebars.

```css
background: rgba(255,255,255,0.05);
backdrop-filter: blur(16px);
border: 1px solid rgba(255,255,255,0.1);
border-radius: 20px;
/* Hover: translateY(-4px) + stronger bg */
```

**Use for:** Navigation panels, sidebar overlays, filter bars, tool UI.  
**Don't use for:** Primary content cards where `.pro-card` is more appropriate.

### 4.2 Pro Card (`.pro-card`)

Solid dark card with cyan glow — the main content card.

```css
background: #111827;
border: 1px solid rgba(0,217,255,0.3);
border-radius: 20px;
box-shadow: 0 0 40px -12px rgba(0,217,255,0.4);
/* Hover: translateY(-4px) scale(1.01) + stronger glow */
```

**Use for:** Featured blog post, project cards, primary content blocks.  
**Light mode:** White background, sky-blue border at 30% opacity.

### 4.3 Pro Card Gradient (`.pro-card-gradient`)

Variant with animated gradient border (blue → purple → blue).

**Use for:** Hero CTA sections, premium feature callouts. Use sparingly.

### 4.4 Clay Badge (`.clay-badge`)

Claymorphic tag/badge with soft embossed shadow.

```css
background: linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
border-radius: 12px;
box-shadow: 4px 4px 12px rgba(0,0,0,0.3), -2px -2px 8px rgba(255,255,255,0.05), inset ...;
```

**Use for:** Tag pills, technology badges on cards.

### 4.5 Level Badges

Three semantic badge variants using claymorphism + color:
- `.level-badge-beginner` → green `#22C55E`
- `.level-badge-intermediate` → yellow `#EAB308`
- `.level-badge-advanced` → red `#EF4444`

### 4.6 Buttons

| Class | Style |
|-------|-------|
| `.btn-primary` | Gradient fill (cyan→green), black text, 12px radius |
| `.btn-secondary` | Transparent + border, hover turns primary color |
| `.btn-outline` | Primary-colored border, fills on hover |

Shared: `border-radius: 12px`, `padding: 12px 28px`, hover: `translateY(-2px)`.

### 4.7 Code Terminal (`.code-terminal`)

macOS-style code block wrapper:
- Dark background `#0D1117` (GitHub Dark)
- Header bar `#161B22` with red/yellow/green dots
- Border: `rgba(255,255,255,0.08)` — glows cyan on hover
- Code: JetBrains Mono, 0.875rem, line-height 1.7
- Syntax: VS Code Dark+ token palette via sugar-high

### 4.8 Inline Code

```css
font-family: var(--font-mono);
font-size: 0.875em;
padding: 2px 8px;
background: rgba(0,217,255,0.08);
border: 1px solid rgba(0,217,255,0.12);
border-radius: 5px;
color: var(--primary);
```

### 4.9 Gradient Text (`.gradient-text`)

```css
background: linear-gradient(135deg, cyan → sky-blue → emerald);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

Animated variant (`.gradient-text-animate`): 5s gradient-shift animation.

---

## 5. Layout Principles

### Container Widths

| Context | Max Width | Notes |
|---------|-----------|-------|
| Blog listing, article | `max-w-3xl` (48rem / 768px) | Comfortable reading column |
| Wide content (with TOC) | `max-w-6xl` (72rem) | Article + TOC sidebar |
| Section content | `max-w-2xl`–`max-w-3xl` | Hero text, descriptions |
| Full-width | None | Background elements only |

### Spacing Rhythm

- Section padding: `100px 24px` (desktop) → reduce on mobile
- Card internal padding: `24px`–`32px`
- Gap between cards: `20px`
- Stack spacing (heading → description): `16px`
- Prose paragraph margin: `1.6em` bottom

### Z-Index Scale

```
z-0   Background layers (grid, mesh gradients)
z-1   Page content
z-10  Sticky elements (filter bar)
z-20  Navbar
z-30  Sidebars
z-40  Overlays
z-50  Modals, drawers
```

### Reading Layout (Blog Post)

```
[Navbar fixed top]
  ↓
[Back link]
[Article header: title, tags, meta]
[Prose content — max 720px]
[Fixed-position TOC sidebar — right, hidden mobile]
[Footer: author bio, related posts, prev/next]
```

Max prose width: `~720px`. TOC appears at `lg` (1024px+) breakpoint.

### Blog Listing Layout

```
[Navbar]
[Hero header — max-w-3xl, pt-32 pb-12]
[Sticky filter bar — bg/80 blur backdrop]
[Posts: featured card + divider list — max-w-3xl]
```

---

## 6. Depth and Elevation

The system uses three elevation layers to create perceived depth:

### Layer 0 — Atmospheric Background
Fixed, non-scrolling. Grid lines + mesh gradient blobs. Always `z-0`.

### Layer 1 — Base Surface
Page `background: #050510`. All content sits here at `z-1`.

### Layer 2 — Elevated Cards
Glass and Pro cards float above the base:
- **Glass cards**: blur(16px) + 5% white bg + subtle border
- **Pro cards**: solid `#111827` + cyan glow shadow
- Hover: lift by 4px (`translateY(-4px)`) + stronger glow

### Layer 3 — Floating UI
Sticky navbar, filter bar, sidebars, TOC:
- Always use `backdrop-filter: blur(12-20px)` + `bg/80` opacity
- Never fully opaque — the atmosphere should bleed through

### Glow Hierarchy

| Element | Glow Intensity |
|---------|---------------|
| Pro card default | `0 0 40px -12px rgba(0,217,255,0.4)` |
| Pro card hover | `0 0 60px -8px rgba(0,217,255,0.6)` |
| Code block hover | `0 12px 48px -12px rgba(0,217,255,0.15)` |
| Button hover | `0 8px 24px -8px var(--primary)` |
| Glass card hover | `0 20px 40px -12px rgba(0,0,0,0.3)` |

---

## 7. Do's and Don'ts

### Do's

- ✅ **Dark mode first** — always design and code dark mode before light
- ✅ **Use CSS variables** — never hardcode `#050510`, always use `var(--background)`
- ✅ **Limit line width** — keep prose ≤ 72ch, use `max-w-3xl` on article body
- ✅ **Use `cursor-pointer`** on every clickable element (cards, buttons, links, badges)
- ✅ **Match the grid** — 60px grid, 20px/24px/32px/48px spacing multiples
- ✅ **Semantic HTML** — `<article>`, `<header>`, `<nav>`, `<time>`, `<section>`, `<main>`
- ✅ **JetBrains Mono for code** — never use system monospace in displayed code
- ✅ **`scroll-margin-top: 6rem`** on all heading anchors (below fixed navbar)
- ✅ **Respect `prefers-reduced-motion`** — all animations wrapped in the global rule
- ✅ **Focus rings** — always visible, `2px solid var(--primary)` with 2px offset
- ✅ **`font-heading` class** for all heading elements, not `font-sans`
- ✅ **Prose body text**: `color: var(--foreground-muted)`, not full `--foreground`
- ✅ **Hover transitions**: exactly 200-300ms with `cubic-bezier(0.4, 0, 0.2, 1)`

### Don'ts

- ❌ **No emojis as UI icons** — use Lucide React SVG icons
- ❌ **No layout-bound animation** — never animate `width`, `height`, `top`, `left`, `margin`; only `transform` + `opacity`
- ❌ **No `scale()` on text** — scale transforms on text cause CLS; lift with `translateY` only
- ❌ **No pure white backgrounds** — even in light mode, use `#F8FAFC` not `#FFFFFF`
- ❌ **No inline styles for design tokens** — keep all color/typography in CSS variables
- ❌ **No light mode glass with `rgba(255,255,255,0.1)`** — too transparent; use `0.7`+
- ❌ **No `font-size < 16px` on mobile** for body text — accessibility minimum
- ❌ **No `z-index` without reference to the scale** above — ad-hoc z-index causes stacking bugs
- ❌ **No prose wider than `max-w-3xl`** — reading comfort limit
- ❌ **No removing `backdrop-filter`** from sticky nav — it creates the floating effect
- ❌ **No hardcoded `#000` text** — use `var(--foreground)` or `var(--foreground-muted)`
- ❌ **No missing `alt` text** — all images require descriptive alt
- ❌ **No removing `prefers-reduced-motion`** global override

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Tailwind prefix |
|------|-------|-----------------|
| Mobile | < 640px | (default) |
| Tablet | 640px+ | `sm:` |
| Laptop | 1024px+ | `lg:` |
| Desktop | 1280px+ | `xl:` |
| Wide | 1536px+ | `2xl:` |

### Specific Behaviors

**Navbar:** Always fixed top, full width, `backdrop-blur-md`.

**Blog TOC Sidebar:**
- Desktop (lg+): Fixed right panel, `w-56`, sticks inside article scroll area
- Mobile: Hidden. Replaced by in-article heading structure

**Blog Glass Sidebar (Courses/Series):**
- Desktop (lg+): Fixed left panel, `width: 300px`, full height
- Mobile: Off-screen `translateX(-100%)`, slides in `.open` state

**Bento Grid:**
```
Desktop: 4 columns
Tablet (1024px): 2 columns
Mobile (640px): 1 column
span-2 / span-3: collapse to span-1 on mobile
```

**Blog listing post row:**
- Desktop: date column (`sm:w-28`) + content column side by side
- Mobile: stacked vertically

**Pro Cards hover:**
- Desktop: `translateY(-4px) scale(1.01)`
- Mobile: no scale transform (touch devices — remove hover lift for performance)

**Typography scale:** All hero/section headings use `clamp()` — fluid scaling between mobile and desktop without breakpoint jumps.

### Mobile-Specific Rules

- Minimum touch target: 44×44px (apply `min-h-[44px] min-w-[44px]` on interactive elements)
- Body font: minimum `16px` / `1rem` — never smaller
- Horizontal scroll: `overflow-x: hidden` on `body`
- Padding: at least `px-6` (24px) horizontal padding on all section containers

---

## 9. Agent Prompt Guide

Use these prompts when asking an AI agent to generate or modify UI for this codebase.

### Master System Prompt Snippet

```
Design style: Dark-first editorial blog with glassmorphism and subtle cyan glow.
Background: Deep navy #050510 with fixed atmospheric layers (60px grid, radial cyan/green/blue mesh gradients at 8-15% opacity).
Colors: Primary #00D9FF (cyan), Secondary #0EA5E9 (sky blue), Accent #10B981 (green), Foreground #E0E0FF, Muted #9CA3AF.
Fonts: Space Grotesk (headings, 700, -0.02em tracking), DM Sans (body), JetBrains Mono (code).
Cards: Use .pro-card (solid #111827 with cyan border glow) for content; .glass-card (frosted glass) for UI panels.
Motion: hover translateY(-4px) 300ms cubic-bezier(0.4,0,0.2,1); entrance fade+slide-up 400ms.
Tailwind: v4 with CSS custom properties — always use var(--token) via @theme inline mapping.
```

### Blog Post Page Prompt

```
Create a blog post reading page for a software engineer's personal blog.
Visual: Dark editorial — deep navy background, prose column max 720px, sticky TOC on right at lg+.
Typography: Space Grotesk headings (tracking -0.02em), DM Sans body 1.0625rem, line-height 1.85, muted foreground for paragraphs.
Code blocks: macOS terminal aesthetic — #0D1117 background, #161B22 header with traffic-light dots, JetBrains Mono, VS Code Dark+ syntax colors.
Inline code: cyan-tinted background, primary color text, 5px border-radius.
Article header: tags (clay-badge), title, description, date + reading time meta row.
Footer: author bio card, related posts, prev/next post navigation.
Avoid: full-width prose, white backgrounds, emojis as icons, layout-bound animation.
```

### Blog Listing Page Prompt

```
Create a blog listing page for a software engineer's personal blog.
Style: Editorial/reading-first. Not a card grid — use a list layout with clear hierarchy.
Header: brief author intro (name, role, 1-2 sentence tagline), not just "Blog".
Posts: date column (tabular-nums, muted) + content column (title, description, tags, reading time).
Featured post: slightly elevated treatment — larger title, more prominent card — but not heavy pro-card.
Filter: minimal tag pills, no heavy filter bar. Simple horizontal scroll on mobile.
Dark mode first, light mode must have sufficient contrast.
Max width: max-w-3xl centered. No full-bleed prose.
```

### Component Prompt Template

```
Component: [name]
Context: [where it appears — blog post footer, sidebar, etc.]
Behavior: [hover, click, animation]
Style constraints:
- Colors: use var(--primary), var(--foreground), var(--foreground-muted), var(--glass-border)
- No hardcoded colors
- Use Lucide icons (not emojis)
- cursor-pointer on interactive elements
- transition-colors/transform at 200-300ms
- Respect prefers-reduced-motion
Output: TypeScript React component with Tailwind classes only.
```

---

## 10. Blog-Specific Redesign Notes

> Quick reference for the blog redesign described in `specs/active/feat-002-blog-redesign/plan.md`.

### Blog Page vs Portfolio Page — Key Differences

| Concern | Portfolio | Blog |
|---------|-----------|------|
| Primary goal | Impress / hire me | Share knowledge / be useful |
| Content density | High visual impact | Reading comfort |
| Card style | `.pro-card` with glow | Light list rows, not heavy cards |
| Featured element | Project showcase cards | Featured article (elevated but simple) |
| Background effects | Full mesh gradient + grid | Same — consistent with site |
| Animation | Entrance animations | Minimal — content is the focus |

### Prose Optimization for Blog

Current `prose-blog` settings are good. For the redesign, apply these tweaks:

```css
.prose-blog {
  font-size: 1.0625rem;  /* current — keep */
  line-height: 1.85;     /* current — keep */
  max-width: 65ch;       /* ADD — enforce reading width */
}
```

Add heading anchor links on hover:
```tsx
// H2/H3 in MDX components: show # link on hover
<h2 id={slug} className="group scroll-mt-24">
  {children}
  <a href={`#${slug}`} className="ml-2 opacity-0 group-hover:opacity-40 text-primary">#</a>
</h2>
```

### Blog Post Footer Stack

```
[Author bio — .glass card with avatar/initials, name, tagline, links]
[Related posts — 2 cards, same tags, .pro-card style]
[Post navigation — prev ← text | text → next, hairline divider]
```

### Tags in Blog Context

Tags render as `.clay-badge` — keep consistent with the rest of the site.  
On the listing page, tag filter pills should be simplified:
- Current style: badge-looking complex filter
- Target: simple text pills, `border border-glass-border`, active state: `bg-primary/10 border-primary/30 text-primary`

### RSS Feed

Route: `/blog/rss.xml` — standard `application/rss+xml` Content-Type.  
Include in `<head>` of blog layout:
```html
<link rel="alternate" type="application/rss+xml" title="Khanh Pham Blog" href="/blog/rss.xml" />
```

---

*Last updated: 2026-04-16. Update this file when making significant design system changes.*
