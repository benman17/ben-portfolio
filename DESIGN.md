---
name: Ben Manguiat, Data Analyst
description: A portfolio set as a short data story; paper, ink and one vermilion highlight.
colors:
  paper: "#ffffff"
  wash: "#f3f4f6"
  code-bg: "#f3f4f6"
  ink: "#15171c"
  ink-2: "#41464f"
  ink-3: "#5f6570"
  rule: "#d8dbe0"
  rule-strong: "#9aa0a9"
  chart: "#b9bec6"
  accent: "#c2361f"
  accent-ink: "#ffffff"
typography:
  display:
    fontFamily: "Libre Franklin, ui-sans-serif, system-ui, sans-serif"
    fontSize: "3.375rem"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Libre Franklin, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Libre Franklin, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 800
    lineHeight: 1.4
    letterSpacing: "-0.01em"
  standfirst:
    fontFamily: "Source Serif 4, ui-serif, Georgia, serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.65
  body:
    fontFamily: "Source Serif 4, ui-serif, Georgia, serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Libre Franklin, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    lineHeight: 1.5
  caption:
    fontFamily: "Libre Franklin, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.625
  figure:
    fontFamily: "Libre Franklin, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 800
    fontFeature: "\"tnum\", \"lnum\""
  code:
    fontFamily: "Geist Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.625
rounded:
  none: "0px"
spacing:
  gutter-mobile: "16px"
  gutter-desktop: "32px"
  container: "1152px"
  column-gap: "56px"
  section: "80px"
  section-lg: "112px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 20px"
    height: "48px"
  button-outline:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 16px"
    height: "44px"
  toggle:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.none}"
    padding: "0 12px"
    height: "40px"
  toggle-pressed:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  tab:
    textColor: "{colors.ink-3}"
    typography: "{typography.label}"
    height: "44px"
  tab-selected:
    textColor: "{colors.ink}"
  bar:
    backgroundColor: "{colors.chart}"
    height: "20px"
  bar-highlight:
    backgroundColor: "{colors.accent}"
  code-block:
    backgroundColor: "{colors.code-bg}"
    textColor: "{colors.ink}"
    typography: "{typography.code}"
    rounded: "{rounded.none}"
    padding: "16px"
  contact-band:
    backgroundColor: "{colors.wash}"
    padding: "64px 16px"
---

# Design System: Ben Manguiat, Data Analyst

## Overview

**Creative North Star: "The Data Desk"**

The site is set like a newsroom data explainer: a white page, near-black ink, a heavy grotesk for headlines and a book serif for reading. Every page leads with a finding rather than a label, and the evidence sits right beside it as a house-drawn chart with a real caption and a source line. Nothing is boxed; structure comes from hairline rules, a two-pixel ink rule that opens each section, and a 12-column grid that splits text and figure roughly 7 to 5.

Colour is almost entirely greyscale. One vermilion carries the value the annotation is talking about, the "Email me" link, the active nav underline, the selected tab, focus rings and text selection. Everything else in a chart is grey. Density is comfortable rather than airy: generous section spacing, measured line lengths, and no decorative surfaces competing with the numbers.

Light is the default because the reader is a recruiter on a work laptop in daylight; a complete dark token set follows the OS through `prefers-color-scheme`. Motion is authored with GSAP and Lenis (see Motion below): headlines rise in by line, charts draw in, key figures count up, sections settle in as they scroll into view, and one inverted ink band carries a scroll-reactive tool marquee. Every motion is short, plays once, never hides content a visitor is already looking at, and disappears under reduced motion. The site refuses the dark-terminal developer portfolio: no mono HUD, no node maps, no skill pillars, no cards.

**Key Characteristics:**
- Headline is a finding; standfirst in serif beneath it.
- Grey charts, one vermilion highlight on the discussed value.
- Hairline rules and square corners; no cards, no radius.
- Tabular lining figures wherever numbers sit in rows or charts.
- Every figure carries a caption and a "Source:" line.
- Light by default, full dark set via the OS.

## Colors

Paper and ink in cool, barely-tinted greys, with a single warm vermilion that does all the pointing.

### Primary
- **Annotation Vermilion** (`accent`): the one highlighted bar or value per chart, its figure in heavy weight, the "Email me" link, the active nav and selected-tab underline, focus outlines, text selection and the input caret. In dark mode it lifts to a lighter coral (#ff6f52) so it holds contrast on the dark page.

### Neutral
- **Paper** (`paper`): the page. Dark: #111317.
- **Wash** (`wash`, and `code-bg` at the same value): the only tinted surface; used for the contact band, code blocks and chart tooltips' cursor. Dark: #1a1d22.
- **Ink** (`ink`): headlines, figures, the primary button fill, and the two-pixel section rule. Dark: #eceef1.
- **Ink 2** (`ink-2`): serif body copy and unhighlighted values. Dark: #c0c5cc.
- **Ink 3** (`ink-3`): captions, source lines, metadata labels, inactive nav and tabs, axis ticks. Dark: #969ca6.
- **Rule** (`rule`): hairlines between rows, list items, the header bottom border, image frames. Dark: #2b2f36.
- **Rule Strong** (`rule-strong`): dashed reference lines in charts, link underlines at rest, the copy button outline, axis strokes, scrollbars. Dark: #575d67.
- **Chart Grey** (`chart`): every bar that is not the subject of the annotation. Dark: #4b515b.
- **Accent Ink** (`accent-ink`): text set on vermilion (selection). Dark: #111317.

### Named Rules
**The One Highlight Rule.** A chart highlights exactly one value in vermilion: the one the caption or headline discusses. All other marks are Chart Grey. If nothing is being discussed, nothing is red.

**The Ordinal Fade Rule.** When a chart genuinely needs more than two classes (the NFL tiers), it ramps from vermilion through a 45% vermilion to ink-3 to chart grey. It never introduces a second hue.

## Typography

**Display Font:** Libre Franklin (with ui-sans-serif, system-ui)
**Body Font:** Source Serif 4 (with ui-serif, Georgia)
**Label/Mono Font:** Geist Mono, for SQL and schema names only

**Character:** A heavy newsroom grotesk states the finding; a calm book serif explains it. Sans carries everything structural (nav, labels, captions, numbers), serif carries everything you read as prose.

### Hierarchy
- **Display** (800, 2.25rem rising to 3.375rem, 1.05, -0.025em): the page's finding, one per page. Index pages use the same weight at 2.25rem to 3rem.
- **Headline** (700, 1.5rem to 1.75rem, 1.15, -0.015em): a project's finding in lists and the "Next:" link; the delivery headline goes to 2.125rem.
- **Title** (800, 1.25rem, -0.01em): section headings, always sitting on a 2px ink rule with 12px above the text.
- **Standfirst** (Source Serif 4, 400, 1.25rem to 1.375rem): the dek under a display headline, measure 40 to 62ch.
- **Body** (Source Serif 4, 400, 1.125rem, 1.65, ink-2): running text, measure 65ch max. Smaller serif (1.0625rem) for list deks.
- **Label** (600 to 700, 0.9375rem): links, buttons, tabs, metadata values, chart row names. Sentence case, no tracking.
- **Caption** (400, 0.8125rem, 1.625, ink-3): figure captions and source lines. Chart titles above a figure are 1rem bold ink with a 0.875rem ink-3 subtitle.
- **Code** (Geist Mono, 0.8125rem, 1.625): SQL excerpts and table/column names.

### Named Rules
**The Finding-First Rule.** A display or headline states what the data showed, in a sentence. Section titles are plain nouns ("What I found", "The question"). No kicker, eyebrow or category label sits above a headline.

**The Tabular Figures Rule.** Any number in a chart, table, stat line or step counter uses tabular lining figures; highlighted values go to 800 weight in vermilion, others stay 600 in ink-2.

**The Sentence Case Rule.** No uppercase, no letter-spaced labels anywhere. Headlines balance (`text-wrap: balance`), paragraphs wrap pretty.

## Layout

A single centered column capped at 1152px with 16px side gutters on mobile and 32px from 640px up. Inside it, a 12-column grid: the lead story splits 7/5 (text, then chart) with a 56px gap from 1024px; case-study bodies split 8/4 (prose, then a tools aside); story lists split 7/5 with the figure on the right, or 2 columns for paired stories. Everything collapses to one column on mobile, with the chart following the byline.

Vertical rhythm is section-led: 80px between sections on mobile, 112px on large screens; 40 to 56px top padding under the sticky 56/64px header. Prose is held to measured widths (40ch standfirst on the home lead, 60 to 65ch for body). Interactive targets are at least 44px tall (nav links, tabs, outline button), 40px for filter toggles, 48px for the primary button.

## Elevation & Depth

Flat. Depth is never conveyed with shadow; it comes from rules and a single tonal step. The page is Paper; the contact band and code blocks step to Wash; image exports sit inside a one-pixel rule frame. The sticky header is the one translucent surface: Paper at 85% to 95% over a backdrop blur, separated by a hairline.

### Named Rules
**The Rule-Not-Box Rule.** Group with rules, never with cards. A 2px ink rule opens a section; 1px hairlines separate rows; a 1px left rule sets off a finding in a list. No container gets a fill, radius or shadow to make it a "card".

## Shapes

Square everywhere: zero radius on buttons, toggles, code blocks, image frames, tooltips and chart bars (Recharts tooltips are forced to `borderRadius: 0`). Bars are flat rectangles drawn from the left. The only circles are 10px legend swatches. Reference lines are dashed 1px rule-strong verticals; links underline at 1px with a 0.2em offset and thicken to 2px on hover.

## Components

### Buttons
Few, heavy and square; most actions are links.
- **Shape:** square (0px).
- **Primary:** ink fill, paper text, 700 weight, 48px tall on the home lead (44px in case studies), 20px side padding, trailing arrow that nudges 2px right on hover. Used once per view for the main path ("Read the analysis", "Source code").
- **Outline:** 1px ink border, ink text, same height and weight; for the secondary external action ("Live site").
- **Press:** primary and outline scale to 0.98 on press over 150ms with the expo ease-out; small controls use 0.97.
- **Copy button:** 36px tall, 1px rule-strong border, ink-2 label, hover shifts border and text to ink; on success the icon swaps to a vermilion check that pops in (180ms) and the label reads "Copied".

### Toggles (filter groups)
- **Style:** 40px tall, 1px rule border, ink-2 label, 12px side padding; hover takes an ink border and ink text.
- **Pressed:** ink fill, paper text, `aria-pressed`. A row of them carries a quiet ink-3 sentence-case label to its left.

### Tabs
- Underlined labels in a row on a hairline baseline, 24px apart, 44px tall, scrolling horizontally on narrow screens. Selected: ink text with a 2px vermilion underline. Unselected: ink-3, ink on hover. Full arrow/Home/End keyboard support.

### Navigation
- Sticky header: name in 800 weight on the left; Work, About, Code and a vermilion "Email me" on the right, 600 weight, 44px targets. Active page: ink text with a 2px vermilion underline at 0.45em offset; inactive: ink-3. "Code" hides below 640px.

### Links
- In running text: ink with a 1px rule-strong underline that turns vermilion on hover (160ms). The contact link is vermilion itself. Whole-row story links use a stretched hit area and underline the headline in vermilion on hover.

### Bar Chart (signature)
The house chart, built from HTML rather than a scaled SVG so labels keep their size on phones.
- Bold 1rem title and ink-3 subtitle above; row label left (highlighted row in ink, others ink-2/ink-3); flat bar; value right in tabular figures.
- One vermilion bar, the rest Chart Grey; a dashed rule-strong reference line labeled in ink-3 ("Half of all boards").
- Closes with a hairline and a 0.8125rem ink-3 "Source:" line that names the dataset and, where relevant, says the result is an association.
- Bars draw in from 4% width (800ms expo ease-out, 70ms stagger) the first time they scroll into view (`components/motion/BarDraw.tsx`); values and labels never animate. Tab switches never replay the draw.

### Figure (exported image)
- The real screenshot inside a 1px rule frame on white, caption in ink-3 at 0.8125rem with a "Full size" link at the right.

### Code Block
- Wash background, 1px rule border, square, 16 to 20px padding, Geist Mono at 0.8125rem, horizontal scroll contained. A small ink-3 label above names the excerpt.

### Contact Band
- Full-bleed Wash band under a hairline: an 800-weight question as the headline (max 20ch), one serif line, the email address large with its copy button, then plain links.

## Motion

Built on GSAP (ScrollTrigger, SplitText), Lenis and components adapted from React Bits (`components/reactbits/`, license in that folder). One shared GSAP setup lives in `lib/gsap.ts`.

- **Smooth scroll:** Lenis on the page's own scroll (no wrapper), lerp 0.11, driven by GSAP's ticker so ScrollTrigger reads the same frame. Off under reduced motion; touch keeps native momentum.
- **Headlines:** `SplitText` masks each word and lifts it 110% (900ms expo out, 35ms stagger); splitting by words keeps the browser's own wrapping, which line-splitting broke on iOS Safari. Page h1s play on load; others when scrolled to. GSAP labels the split for screen readers.
- **Reveals:** `AnimatedContent` lifts 24px and fades in (900ms expo out), optionally staggering children; fires at 97% of the viewport so nothing visible waits for a scroll.
- **Figures:** `CountUp` counts real values up once on scroll; the server HTML and screen readers always get the final number.
- **Marquee:** `ScrollVelocity` drifts the tool list in the ink band and speeds up with Lenis scroll velocity; the items are also a plain list for screen readers.
- **Magnet:** the primary CTA (and "Source code") drifts toward a fine pointer, at most a fifth of the distance; inert on touch.
- **Header:** tucks away while reading down past 160px, returns on scroll up or focus; a 2px vermilion rule along its bottom tracks reading progress.
- **No-JS and reduced motion:** an inline script adds `html.motion` before paint only when motion is allowed; start states (hidden headlines, collapsed hero bars) are scoped to that class, so without it everything renders final and still.

## Do's and Don'ts

### Do:
- **Do** lead every page and every list item with the finding as a sentence, in Libre Franklin 800 or 700.
- **Do** colour exactly one chart value vermilion and keep every other mark Chart Grey.
- **Do** end every chart with a caption-size "Source:" line that names the real dataset.
- **Do** separate sections with a 2px ink rule and rows with 1px hairlines.
- **Do** set every number in rows or charts with tabular lining figures.
- **Do** keep motion within the Motion section's vocabulary, play it once, and drop all of it under reduced motion.
- **Do** define every new colour in both the light and dark token sets.

### Don't:
- **Don't** add kickers, eyebrows, or uppercase letter-spaced labels above headlines.
- **Don't** round corners or put content in cards with fills or shadows.
- **Don't** introduce a second accent hue; extend a scale with vermilion opacity or greys.
- **Don't** set prose in the grotesk or headlines in the serif.
- **Don't** use mono outside code, SQL and schema names.
- **Don't** animate chart values or labels, loop anything except the marquee, or hold content hidden that is already in view.
