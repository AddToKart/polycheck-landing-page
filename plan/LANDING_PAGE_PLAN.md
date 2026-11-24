# Polycheck — Landing Page Plan

## Responsibility

This document covers the design, content, and implementation of a **frontend-only marketing landing page** for Polycheck. It is a standalone Next.js page (or standalone HTML/CSS/JS project) that introduces the system, showcases its features, and provides a mock APK download link. It is not the app itself — it is a presentation layer meant to sell the project to viewers, evaluators, or stakeholders.

---

## 1. Page Purpose & Audience

**Purpose:** Introduce Polycheck as a complete attendance management system for PUP. Show off its capabilities visually. Provide a download link for the Android APK (mock/stub). Establish credibility through polished design and clear communication.

**Primary Audience:**
- PUP faculty and administrators evaluating the system
- Thesis panel / project evaluators
- Students who want to understand what the app does before downloading
- Anyone visiting the project demo URL

**Tone:** Professional, modern, academic-institutional. Not startup-y. Reflects PUP's identity — serious, credible, "Iskolar ng Bayan."

---

## 2. Tech Stack (Landing Page Only)

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 15 (App Router) | Consistent with existing frontend; can live as a route or standalone |
| Styling | Tailwind CSS | Same design tokens as the main app |
| Components | shadcn/ui (minimal) | Buttons, cards if needed; mostly custom sections |
| Icons | lucide-react | Same icon set as the main app |
| Fonts | Lora (headings) + DM Sans (body) | Same Google Fonts as the main app |
| Animations | CSS keyframes + Intersection Observer | Scroll-triggered fade-ins, no heavy JS libraries |
| Images | Next/Image optimized | Screenshots, mockups, logo |
| Deployment | Static export (`output: 'export'`) or Vercel | No server needed;纯 frontend |

**If standalone (not inside the polycheck monorepo):** Use plain HTML + Tailwind CDN + vanilla JS. Same visual result, zero build step.

---

## 3. Design System Reference

All values pulled from the existing Polycheck design system. The landing page must use these exactly.

### Colors

| Token | Hex | Landing Page Usage |
|---|---|---|
| Maroon (Primary) | `#7B1113` | Hero section background, CTA buttons, section headers |
| Deep Maroon (Dark) | `#4A0A0B` | Dark mode surfaces, footer, hover states |
| Golden Yellow (Accent) | `#FFDF00` | Highlights, feature badges, star decorations, download button accent |
| White | `#FFFFFF` | Light mode background, card backgrounds |
| Black (Dark base) | `#0A0A0A` | Dark mode background |
| Zinc-100 | `#F4F4F4` | Light mode subtle backgrounds |
| Zinc-500 | `#71717A` | Body text (secondary) |
| Zinc-900 | `#18181B` | Body text (primary, light mode) |

### Typography

| Element | Font | Weight | Size Range |
|---|---|---|---|
| Hero headline | Lora | 700 (Bold) | 4xl — 8xl responsive |
| Section headings | Lora | 700 (Bold) | 3xl — 5xl |
| Subheadings | DM Sans | 600 (SemiBold) | lg — 2xl |
| Body text | DM Sans | 400 (Regular) | base — lg |
| Labels / badges | DM Sans | 700 (Bold) | xs — sm, uppercase, tracking-widest |
| Code / stats | DM Mono | 400 | sm — base |

### Spacing & Layout

- Max content width: `max-w-6xl` (1152px) centered
- Section vertical padding: `py-24 md:py-32`
- Section horizontal padding: `px-6 md:px-8`
- Grid gap: `gap-8` (features grid), `gap-6` (cards)
- Hero minimum height: `min-h-screen` (full viewport)

### Existing Animations (from globals.css)

```css
/* Reuse these from the main app */
.animate-fade-in-up    /* 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards */
.animate-float         /* 6s ease-in-out infinite, translateY oscillation */
.animate-pulse-slow    /* 12s ease-in-out infinite, scale + translate */
.delay-100 / delay-200 / delay-300 / delay-500  /* stagger delays */
```

### Decorative Elements

- **PUP Star**: Reuse the CSS triangle star from `(auth-landing)/layout.tsx` — golden in light mode, maroon-dark in dark mode
- **Horizontal rules**: Thin `w-12 h-[2px] bg-golden` dividers before headings
- **Dot separators**: `●` character between footer items (existing pattern)

---

## 4. Page Structure (Section by Section)

### 4.1 — Navigation Bar (Sticky)

**Position:** Fixed top, full width, `z-50`
**Background:** `bg-white/80 dark:bg-black/80 backdrop-blur-md` with bottom border
**Height:** `h-16`

| Left | Center | Right |
|---|---|---|
| PUP Logo (24x24) + "Polycheck" in Lora bold | — (empty on mobile) | Theme toggle + "Download APK" button (golden bg, maroon text, rounded-full, sm) |

**Mobile:** Logo left, hamburger right (slides to nav links: Features, How It Works, Download, Login). Download button becomes full-width CTA in mobile menu.

**Scroll behavior:** Navbar background opacity increases on scroll (via `useEffect` + `scrollY` listener or CSS `backdrop-blur`).

---

### 4.2 — Hero Section

**Background:** Solid maroon `#7B1113` (light mode) or deep maroon `#4A0A0B` (dark mode)
**Layout:** Full viewport height, flex column centered, text left-aligned on desktop, centered on mobile.

**Content:**

```
[Golden horizontal rule — w-16 h-[2px]]

ISKOLAR NG BAYAN
(labeled text, uppercase, tracking-[0.3em], golden, DM Sans bold xs)

Polycheck.
(Lora, 7xl md:8xl lg:9xl, bold, golden, leading-[0.95], tracking-tighter)

A unified attendance management system for the
Polytechnic University of the Philippines.
(DM Sans, text-lg md:text-xl, white/80, max-w-xl, leading-relaxed)

[Two CTA buttons side by side]
  [Download APK] — bg-golden text-maroon-dark font-bold rounded-full px-8 py-3
  [See How It Works] — border border-white/30 text-white rounded-full px-8 py-3

[Decorative PUP Star — animate-float, scale-[0.6]]
```

**Background decoration:** Subtle radial gradient or grid pattern (optional). Large semi-transparent PUP logo watermark at 5% opacity behind the text (optional).

---

### 4.3 — Problem Statement Section

**Background:** White / `#0D0D0D` (dark)
**Layout:** Single column, max-w-3xl centered, text-only

**Content:**

```
THE PROBLEM
(uppercase label, tracking-widest, maroon, DM Sans bold)

Traditional attendance is broken.
(Lora, 3xl md:4xl, bold, zinc-900 dark:white)

Paper sign sheets get lost. Proxy attendance goes undetected.
Students in remote campuses can't always reach the system.
Manual tallying wastes hours that should be spent teaching.

[Three inline stats in a row]
  40%    of paper records contain errors (mock stat)
  2hrs   wasted per week on manual attendance (mock stat)
  15%    of attendance records are disputed annually (mock stat)

[Each stat: Lora bold 4xl golden, label in DM Sans sm zinc-500]
```

---

### 4.4 — Solution Overview Section

**Background:** Subtle zinc-50 / dark zinc-900
**Layout:** Two columns on desktop (text left, visual right), stacked on mobile

**Content:**

```
THE SOLUTION
(uppercase label, tracking-widest, maroon, DM Sans bold)

Attendance that works for everyone.
(Lora, 3xl md:4xl, bold)

Polycheck replaces paper sign sheets with a cryptographic,
GPS-verified, offline-first digital attendance system.
It works in any classroom — even without internet.

[Three mini feature pills/badges in a row]
  [QR Code Scanning]  [GPS Geofencing]  [Offline-First]

[Right side: Mockup image of phone + laptop showing the app]
Use the existing presentation montage: outputs/polycheck-feature-presentation-montage.png
Or compose a simple device frame mockup.
```

---

### 4.5 — Features Grid

**Background:** White / dark black
**Layout:** 3-column grid on desktop, 1-column on mobile. `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`

**Section heading:**

```
BUILT FOR THE CLASSROOM
(uppercase label)
Features that matter.
(Lora 3xl md:4xl bold)
```

**Feature Cards (12 total, 2 rows of 6 or 3 rows of 4):**

Each card: `bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8`

| # | Icon (lucide) | Title | Description |
|---|---|---|---|
| 1 | `QrCode` | Cryptographic QR Codes | Every QR token is Ed25519-signed, unique per session, and expires in 1–15 minutes. No screenshots, no replays. |
| 2 | `MapPin` | GPS Geofencing | Circular geofence (30–50m radius) verified locally on the student's device and re-validated server-side. No GPS spoofing. |
| 3 | `WifiOff` | Offline-First | Every critical in-class action works without internet. Attendance syncs when connectivity returns. No classroom left behind. |
| 4 | `Shield` | Anti-Cheat System | Multi-layer defense: signed tokens, geolocation check, single active session, duplicate rejection, clock-drift prevention. |
| 5 | `Smartphone` | Digital Student ID | Flippable PUP ID card with photo, student number, program, and QR. Bound to device. Cannot be screenshotted for proxy use. |
| 6 | `Calendar` | Schedule Management | Full calendar views (month/week) for both faculty and students. Recurring session creation with bulk scheduling. |
| 7 | `BarChart3` | Attendance Analytics | Real-time dashboards with donut charts, attendance rates, per-student and per-session breakdowns. CSV export. |
| 8 | `Users` | Student Officers | Presidents create sessions. QAC members upload proof-of-class photos. Peer-led session management with granular permissions. |
| 9 | `Camera` | Proof of Class | Timestamped classroom photos uploaded during sessions. Serves as audit verification that a class meeting occurred. |
| 10 | `AlertTriangle` | Dispute System | Students flag issues. Teachers review with Accept, Reject, or Override. Full audit trail with dispute reasons and resolution history. |
| 11 | `RefreshCw` | Real-Time Sync | WebSocket-powered live updates. Teachers see check-ins instantly. Redis-backed caching for microsecond validation. |
| 12 | `Lock` | Secure Authentication | Better Auth with HttpOnly cookies (web) and signed bearer tokens (mobile). Single active session per account. |

---

### 4.6 — How It Works (Flow Diagram)

**Background:** Maroon `#7B1113` (light) or deep maroon `#4A0A0B` (dark)
**Layout:** Horizontal flow on desktop, vertical on mobile. 4 steps connected by arrows.

**Section heading (centered, white text):**

```
HOW IT WORKS
(uppercase label, golden)

The attendance flow.
(Lora 3xl md:4xl bold, white)
```

**Steps (numbered circles + text):**

```
[1]                    [2]                    [3]                    [4]
Teacher generates      Student opens          Haversine checks      Attendance recorded
a signed QR code       Polycheck & scans      GPS geofence          and synced to cloud
for the session.       the QR in class.       locally on device.    in real-time.

(large number in      (DM Sans base,         (DM Sans base,        (DM Sans base,
golden circle,         white/80)              white/80)             white/80)
Lora 2xl bold,
white text)
```

**Arrows between steps:** `→` character or SVG chevron, golden color.

**Below the flow:**

```
Works offline. Syncs when connected.
(DM Sans, text-sm, white/60, italic)
```

---

### 4.7 — Anti-Cheat Showcase

**Background:** White / dark black
**Layout:** Two columns — left: table/list, right: visual

**Section heading:**

```
ANTI-CHEAT SYSTEM
(uppercase label, maroon)

Every angle covered.
(Lora 3xl md:4xl bold)
```

**Cheat Scenario Table:**

| Threat | How Polycheck Stops It |
|---|---|
| Sending QR to absent friend | Short expiry (1–15 min) + GPS geofence + server re-validation |
| Logging into someone else's account | Single active session per account (Better Auth) |
| GPS spoofing | Coordinate plausibility monitoring + server-side verification |
| Screenshot replay of QR | Signed `issuedAt` timestamp + server expiry check + duplicate rejection |
| Clock manipulation | `issuedAt` is cryptographically signed into the token — device clock is irrelevant |

Each row: `border-b border-zinc-200 dark:border-zinc-800 py-4` with threat in `font-semibold text-zinc-900 dark:text-white` and solution in `text-zinc-500 dark:text-zinc-400`.

---

### 4.8 — Platform Availability

**Background:** Subtle zinc-50 / dark zinc-900
**Layout:** Three columns (Web, Android, iOS), centered

**Section heading (centered):**

```
AVAILABLE ON
(uppercase label)

Every device.
(Lora 3xl md:4xl bold)
```

**Platform Cards (3):**

| Platform | Icon | Details |
|---|---|---|
| **Web Dashboard** | `Globe` | Full-featured faculty dashboard. Manage subjects, activate sessions, view analytics. Access at polycheck.app |
| **Android** | `Smartphone` | Native mobile app for students and faculty. QR scanning, offline attendance, digital ID. Download the APK below. |
| **iOS** | `Smartphone` | Built with Expo. Same codebase, same features. Available via TestFlight or direct build. |

Each card: centered, `rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8`, icon in `w-12 h-12 rounded-xl bg-maroon/5 dark:bg-golden/5` with maroon/golden icon.

---

### 4.9 — Tech Stack Section

**Background:** White / dark black
**Layout:** Horizontal strip or grid of tech badges

**Section heading (centered):**

```
BUILT WITH
(uppercase label)
```

**Tech badges (pill-shaped, `rounded-full border border-zinc-200 dark:border-zinc-800 px-4 py-2 text-sm`):**

| Badge | Color accent |
|---|---|
| Next.js | Black/white |
| React Native | Cyan |
| Expo | Black/white |
| NestJS | Red |
| PostgreSQL | Blue |
| Prisma | Gray |
| Redis | Red |
| Tailwind CSS | Cyan |
| shadcn/ui | Black/white |
| TypeScript | Blue |
| pnpm | Yellow |
| Turborepo | Red |

Arranged in a flex-wrap row, centered, with `gap-3`.

---

### 4.10 — Download Section (CTA)

**Background:** Maroon `#7B1113` (light) or deep maroon `#4A0A0B` (dark)
**Layout:** Centered, full-width

**Content:**

```
[Decorative PUP Star — small, golden]

READY TO TRY POLYCHECK?
(uppercase label, golden, DM Sans bold, tracking-widest)

Download the Android APK
(Lora 3xl md:4xl bold, white)

Experience the full attendance system on your Android device.
Scan QR codes, check your attendance, and explore the faculty dashboard.

[Download APK Button — large, bg-golden text-maroon-dark font-bold rounded-full px-12 py-4 text-lg]
  href: "#" (mock link)
  onClick: alert("APK download coming soon!") or trigger a mock download

[Below button, small text]
Version 1.0 · Android 8.0+ · 15 MB (approx)
(DM Sans text-sm text-white/50)

[Secondary link]
Or try the web dashboard →
(DM Sans text-sm text-golden underline, href="/login")
```

**Mock APK behavior:**
- Button href points to `/downloads/polycheck-v1.0.apk` (a placeholder file or a 404 page)
- Or button triggers a toast/alert: "The APK build is being prepared. Check back soon!"
- The link should feel real — proper file path, version number, size estimate

---

### 4.11 — Footer

**Background:** Deep maroon `#4A0A0B` (light) or black `#0A0A0A` (dark)
**Layout:** Single column, centered, compact

**Content:**

```
[PUP Logo — small, 32x32, white/opacity]

Polytechnic University of the Philippines
(DM Sans text-sm text-white/60)

Republic of the Philippines
(DM Sans text-xs text-white/40)

● ● ●
(dot separators)

Polycheck v1.0
Attendance Management System

© 2026 Polycheck · Iskolar ng Bayan
(DM Sans text-xs text-white/30)
```

**Optional bottom links (small, white/40):**
- GitHub Repository
- Documentation
- Contact

---

## 5. Responsive Breakpoints

| Breakpoint | Width | Behavior |
|---|---|---|
| Mobile | < 768px | Single column, stacked sections, hamburger nav, full-width CTAs |
| Tablet | 768px — 1024px | 2-column grids, side-by-side layouts |
| Desktop | > 1024px | 3-column grids, horizontal flow, sticky nav with full links |

---

## 6. Dark Mode

The landing page must support dark mode, consistent with the main app.

**Implementation:**
- Use `dark:` Tailwind variants throughout
- Respect `prefers-color-scheme` with localStorage override (same as main app)
- Theme toggle in the navbar (reuse `ThemeToggle.tsx` component pattern)
- Store preference as `polycheck-theme` in localStorage

**Dark mode specifics:**
- Hero bg: deep maroon `#4A0A0B` instead of maroon `#7B1113`
- Feature cards: `bg-zinc-900` + `border-zinc-800`
- Text: `text-white` instead of `text-zinc-900`
- Secondary text: `text-zinc-400` instead of `text-zinc-500`
- Golden accents remain `#FFDF00` in both modes
- Footer: `bg-black` instead of deep maroon

---

## 7. Animations & Interactions

### Scroll-Triggered Fade-Ins

Use Intersection Observer to add `opacity-0 translate-y-8` → `opacity-100 translate-y-0` transitions as sections enter viewport.

```js
// Minimal JS for scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fade-in-up')
      observer.unobserve(entry.target)
    }
  })
}, { threshold: 0.1 })

document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el))
```

### Hover Effects

- Feature cards: `hover:-translate-y-1 hover:shadow-lg transition-all duration-300`
- CTA buttons: `hover:scale-105 transition-transform duration-200`
- Nav links: `hover:text-maroon dark:hover:text-golden transition-colors`

### Hero Animations

- PUP star: `animate-float` (existing 6s oscillation)
- Headline: `animate-fade-in-up` with `delay-100`
- Subtext: `animate-fade-in-up` with `delay-200`
- CTAs: `animate-fade-in-up` with `delay-300`

### Parallax (Optional)

Subtle parallax on the hero background decoration — large PUP logo watermark moves at 0.5x scroll speed. Implement via `transform: translateY(scrollY * 0.5)`.

---

## 8. Image Assets Needed

| Asset | Source | Usage |
|---|---|---|
| PUP Logo | `frontend/public/pup-logo.png` | Navbar, footer, hero watermark |
| Feature Montage | `outputs/polycheck-feature-presentation-montage.png` | Solution overview section (phone+laptop mockup) |
| Presentation Slides | `outputs/polycheck-feature-presentation/slide-*.png` | Optional: embedded screenshots in feature cards |
| App Icon | `android/assets/pup-logo-square.png` | APK download section, favicon |

**If images are not available:** Use placeholder colored divs with icons (`QrCode`, `MapPin`, `Smartphone` from lucide) as stand-ins. The page should look complete without photographs.

---

## 9. Content Copy (Exact Text)

All copy is written below. Use these exact strings.

### Hero
- **Label:** "ISKOLAR NG BAYAN"
- **Headline:** "Polycheck."
- **Subtext:** "A unified attendance management system for the Polytechnic University of the Philippines. Digitized class tracking with secure geolocation and offline-first capabilities."
- **CTA Primary:** "Download APK"
- **CTA Secondary:** "See How It Works"

### Problem
- **Label:** "THE PROBLEM"
- **Headline:** "Traditional attendance is broken."
- **Body:** "Paper sign sheets get lost. Proxy attendance goes undetected. Students in remote campuses can't always reach the system. Manual tallying wastes hours that should be spent teaching."
- **Stats:** "40% of paper records contain errors" · "2hrs wasted per week on manual attendance" · "15% of attendance records are disputed annually"

### Solution
- **Label:** "THE SOLUTION"
- **Headline:** "Attendance that works for everyone."
- **Body:** "Polycheck replaces paper sign sheets with a cryptographic, GPS-verified, offline-first digital attendance system. It works in any classroom — even without internet."
- **Badges:** "QR Code Scanning" · "GPS Geofencing" · "Offline-First"

### Features
- **Label:** "BUILT FOR THE CLASSROOM"
- **Headline:** "Features that matter."
- **(See feature grid in Section 4.5 for all 12 card titles and descriptions)**

### How It Works
- **Label:** "HOW IT WORKS"
- **Headline:** "The attendance flow."
- **Step 1:** "Teacher generates a signed QR code for the session."
- **Step 2:** "Student opens Polycheck & scans the QR in class."
- **Step 3:** "Haversine checks GPS geofence locally on device."
- **Step 4:** "Attendance recorded and synced to cloud in real-time."
- **Note:** "Works offline. Syncs when connected."

### Anti-Cheat
- **Label:** "ANTI-CHEAT SYSTEM"
- **Headline:** "Every angle covered."
- **(See table in Section 4.7)**

### Platforms
- **Label:** "AVAILABLE ON"
- **Headline:** "Every device."
- **Web:** "Full-featured faculty dashboard. Manage subjects, activate sessions, view analytics."
- **Android:** "Native mobile app for students and faculty. QR scanning, offline attendance, digital ID."
- **iOS:** "Built with Expo. Same codebase, same features. Available via TestFlight or direct build."

### Download
- **Label:** "READY TO TRY POLYCHECK?"
- **Headline:** "Download the Android APK"
- **Body:** "Experience the full attendance system on your Android device. Scan QR codes, check your attendance, and explore the faculty dashboard."
- **Button:** "Download APK"
- **Meta:** "Version 1.0 · Android 8.0+ · 15 MB"
- **Secondary:** "Or try the web dashboard →"

### Footer
- **Institution:** "Polytechnic University of the Philippines"
- **Republic:** "Republic of the Philippines"
- **Version:** "Polycheck v1.0 · Attendance Management System"
- **Copyright:** "© 2026 Polycheck · Iskolar ng Bayan"

---

## 10. File Structure (If Standalone)

If building as a separate project (not inside the polycheck monorepo):

```
polycheck-landing/
├── index.html
├── tailwind.config.js      # Extended with PUP color tokens
├── package.json            # tailwindcss, postcss, autoprefixer
├── public/
│   ├── pup-logo.png
│   ├── fonts/
│   │   └── Lora_400Regular.ttf
│   └── downloads/
│       └── polycheck-v1.0.apk   # Placeholder (can be empty or a text file)
├── src/
│   ├── style.css           # Tailwind directives + custom animations
│   └── main.js             # Intersection Observer, theme toggle, nav scroll
└── README.md
```

If building inside the polycheck monorepo as a Next.js route:

```
frontend/src/app/landing/
├── page.tsx                # Main landing page
├── layout.tsx              # Minimal layout (no sidebar, no auth)
└── components/
    ├── Hero.tsx
    ├── ProblemStatement.tsx
    ├── SolutionOverview.tsx
    ├── FeaturesGrid.tsx
    ├── HowItWorks.tsx
    ├── AntiCheatShowcase.tsx
    ├── PlatformAvailability.tsx
    ├── TechStack.tsx
    ├── DownloadCta.tsx
    └── LandingFooter.tsx
```

---

## 11. Mock APK Download

The download button must feel functional even though the APK does not exist.

**Options (pick one):**

1. **Toast/Alert (simplest):**
   ```js
   onClick={() => alert("The APK build is being prepared. Check back soon!")}
   ```

2. **Placeholder file:**
   - Create `public/downloads/polycheck-v1.0.apk` as a small text file
   - Button links to it with `download` attribute
   - User downloads a tiny file with a message inside

3. **Dedicated page:**
   - `/download` route with a "Coming Soon" message and the same golden CTA
   - More professional than an alert

**Recommended:** Option 2 for realism, Option 3 for polish.

---

## 12. SEO & Meta

```html
<title>Polycheck — Attendance Management System for PUP</title>
<meta name="description" content="A unified, offline-first attendance management system for the Polytechnic University of the Philippines. QR code scanning, GPS geofencing, and real-time analytics." />
<meta property="og:title" content="Polycheck — PUP Attendance System" />
<meta property="og:description" content="Cryptographic QR codes. GPS geofencing. Offline-first. The attendance system built for PUP." />
<meta property="og:image" content="/pup-logo.png" />
<meta name="theme-color" content="#7B1113" />
<link rel="icon" href="/favicon.png" />
```

---

## 13. Accessibility

- All images have `alt` text
- Color contrast meets WCAG 2.1 AA (maroon on white = 7.5:1, golden on maroon = 5.8:1)
- All interactive elements are keyboard-focusable
- Skip-to-content link at top of page
- Proper heading hierarchy (h1 → h2 → h3, no skipping)
- `aria-label` on icon-only buttons
- Focus-visible ring on all interactive elements: `focus-visible:ring-2 focus-visible:ring-golden focus-visible:ring-offset-2`

---

## 14. Implementation Checklist

- [ ] Create project scaffold (standalone HTML or Next.js route)
- [ ] Configure Tailwind with PUP color tokens
- [ ] Import Lora + DM Sans fonts
- [ ] Build Navigation Bar with theme toggle
- [ ] Build Hero section with CTAs
- [ ] Build Problem Statement section
- [ ] Build Solution Overview section with mockup image
- [ ] Build Features Grid (12 cards)
- [ ] Build How It Works flow diagram
- [ ] Build Anti-Cheat showcase table
- [ ] Build Platform Availability cards
- [ ] Build Tech Stack badge strip
- [ ] Build Download CTA section
- [ ] Build Footer
- [ ] Add scroll-triggered animations (Intersection Observer)
- [ ] Implement dark mode toggle + localStorage persistence
- [ ] Test responsive breakpoints (mobile, tablet, desktop)
- [ ] Test accessibility (keyboard nav, screen reader, contrast)
- [ ] Add SEO meta tags
- [ ] Create mock APK placeholder file
- [ ] Final visual polish pass

---

## 15. Key Decisions

- **Standalone vs monorepo route:** If the landing page is meant to be deployed independently (e.g., a marketing site at `polycheck.app`), build it as a standalone HTML/CSS/JS project. If it is part of the existing Next.js app, add it as a `/landing` route with a minimal layout (no sidebar, no auth).
- **No backend dependency:** The landing page is 100% static. No API calls. No authentication. No database. Pure presentation.
- **Mock APK is acceptable:** This is a project demo, not a production distribution. A placeholder download link with a clear "coming soon" message is fine.
- **Reuse existing design system:** Do not invent new colors, fonts, or spacing. Everything comes from the existing Polycheck design tokens.
- **Content is final:** The copy in Section 9 is written and approved. Do not paraphrase — use the exact strings.
- **12 features, not more:** The feature grid is capped at 12 cards. This covers all major capabilities without overwhelming the viewer.
- **Dark mode from day one:** Every section must have dark mode styles. No "dark mode later."
