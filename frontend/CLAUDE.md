# AllThingsGreat Frontend Documentation

> A Nuxt 3 lifestyle blogging application for fitness, dedication, and goal commitment.

## Quick Context

- **Framework:** Nuxt 3.17.5 with Vue 3 and TypeScript
- **CMS:** Sanity (headless CMS with GROQ queries)
- **Styling:** UnoCSS (Tailwind-compatible utility-first CSS)
- **Primary Color:** `#40c1ad` (teal)
- **Fonts:** DM Sans, DM Serif Display, DM Mono

---

## Directory Structure

```
frontend/
├── components/           # Vue components (feature-organized)
├── composables/          # Reusable composition functions
├── constants/            # App-wide constants
├── internationalization/ # i18n translation files (15+ languages)
├── layouts/              # Nuxt layout components
├── lib/                  # Utility libraries
├── middleware/           # Nuxt route middleware
├── pages/                # File-based routing
├── plugins/              # Nuxt plugins
├── public/               # Static assets
├── sanity/               # Sanity CMS queries & types
├── server/               # API routes (minimal)
├── tests/                # Test files
├── assets/               # CSS and SVG assets
├── app.vue               # Root component
├── nuxt.config.ts        # Nuxt configuration
└── unocss.config.ts      # UnoCSS styling config
```

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `nuxt.config.ts` | Nuxt configuration, modules, Sanity setup |
| `sanity/queries.ts` | All GROQ queries for fetching CMS data |
| `sanity/types.ts` | Auto-generated Sanity TypeScript types |
| `types.ts` | Core application TypeScript types |
| `composables/item.ts` | Modal providers, video utilities |
| `composables/utils.ts` | Formatting functions (date, time, numbers) |
| `lib/utils.ts` | Link resolver for internal/external links |

---

## Data Flow Pattern

```
Sanity CMS → GROQ Queries (sanity/queries.ts) → useSanityQuery() → Components → Render
```

### Fetching Data Example

```typescript
// In a page or component
const { data } = await useSanityQuery<PostQueryResult>(postQuery, { slug });
```

### Important Queries (sanity/queries.ts)

| Query | Purpose |
|-------|---------|
| `postsQuery` | All posts ordered by publish date |
| `somePostsQuery` | Posts with skip/limit/author filter |
| `postQuery` | Single post with full content & author |
| `pageQuery` | Dynamic pages with page builder blocks |
| `settingsQuery` | Site settings and metadata |
| `getRecommendedAuthorPosts` | Author's other posts (excluding current) |

---

## Component Organization

### Core Components

| Component | Location | Purpose |
|-----------|----------|---------|
| `NavBar.vue` | `/components/` | Mobile/responsive navigation |
| `Header.vue` | `/components/` | Top header with logo |
| `TheFooter.vue` | `/components/` | Site footer |
| `PortableContent.vue` | `/components/` | Renders Sanity rich text |
| `Avatar.vue` | `/components/` | Author avatar with date |
| `ResolvedLink.vue` | `/components/` | Smart internal/external link handler |

### Feature Directories

| Directory | Contains |
|-----------|----------|
| `media/` | Hero, Card, Grid, Overview, Author, Details |
| `carousel/` | Base carousel, AutoQuery (with Sanity data) |
| `person/` | Person cards, credits, photos |
| `photo/` | Photo card, modal viewer |
| `video/` | Video card, grid |
| `global/` | CallToAction, InfoSection reusables |

---

## Pages & Routing

| Route | File | Purpose |
|-------|------|---------|
| `/` | `pages/index.vue` | Home page with hero and carousels |
| `/blog` | `pages/blog.vue` | Blog listing (under development) |
| `/posts/:slug` | `pages/posts/[slug].vue` | Individual post detail |
| `/:slug` | `pages/[slug].vue` | Dynamic generic pages |
| `/shop` | `pages/shop.vue` | Shop/commerce page |

---

## Styling Conventions

### UnoCSS Patterns

```html
<!-- Utility classes (Tailwind-like) -->
<div class="p-8 flex gap-4 items-center">

<!-- Attribute mode -->
<div flex="~ col" px4 md:px14 py4 gap6>

<!-- Custom shortcuts defined in unocss.config.ts -->
<a class="n-link">        <!-- Navigation link style -->
<button class="n-tab">    <!-- Tab style -->
```

### Theme Colors

- **Primary:** `#40c1ad` (teal)
- **Background:** Dark (#111)
- **Text:** White on dark backgrounds

---

## Composables Reference

### item.ts

```typescript
getTrailer(item)           // Extract trailer from media videos
getVideoLink(item)         // YouTube key → embed URL
useIframeModal()           // Video modal hook
useImageModal()            // Image modal hook
```

### utils.ts

```typescript
formatDate(string, locale) // Localized date formatting
formatTime(minutes)        // Minutes → "1h 30min" format
numberWithCommas(num)      // 1000 → "1,000"
formatLang(code)           // "en" → "English"
formatVote(count)          // Compact vote display
```

### useSiteMetadata.ts

```typescript
useSiteMetadata({ title, description, image }) // Set SEO meta tags
```

---

## Sanity Integration

### Environment Variables Required

```env
NUXT_SANITY_PROJECT_ID=     # Sanity project ID
NUXT_SANITY_DATASET=        # Dataset name (production/development)
NUXT_SANITY_API_READ_TOKEN= # Read-only API token
NUXT_SANITY_API_VERSION=    # API version (e.g., 2025-04-01)
NUXT_SANITY_STUDIO_URL=     # Studio URL for visual editing
```

### Type Generation

Types are auto-generated from Sanity schema:

```bash
# Runs automatically before dev/build via predev/prebuild scripts
npx sanity typegen generate
```

Generated types are in `sanity/types.ts`.

---

## Common Patterns

### Rendering Portable Text (Rich Content)

```vue
<PortableContent :value="post.content" />
```

### Resolving Links

```vue
<ResolvedLink :link="linkData">
  Link Text
</ResolvedLink>
```

### Using Sanity Images

```vue
<img :src="$urlFor(image).width(800).url()" />
```

---

## Scripts

```bash
npm run dev       # Start development server
npm run build     # Production build
npm run generate  # Static site generation
npm run preview   # Preview production build
```

---

## Testing

- **Framework:** Vitest with @vue/test-utils
- **Coverage:** @vitest/coverage-v8
- **E2E:** Playwright
- **Test files:** `*.nuxt.test.ts` pattern

---

## Caching Strategy

- **Development:** No caching
- **Production:** SWR (stale-while-revalidate)
  - `maxAge: 120s` - Cache duration
  - `staleMaxAge: 60s` - Serve stale while revalidating

---

## Key Dependencies

| Package | Purpose |
|---------|---------|
| `@nuxtjs/sanity` | Sanity CMS integration |
| `@portabletext/vue` | Rich text rendering |
| `@unocss/nuxt` | Utility CSS |
| `@nuxt/image` | Image optimization |
| `@vueuse/nuxt` | Vue composition utilities |
| `date-fns` | Date formatting |

---

## Development Notes

### View Transitions

Enabled via `nuxt.config.ts`:
```typescript
experimental: { viewTransition: true }
```

The `disable-vue-transitions.global.ts` middleware handles fallback for unsupported browsers.

### Scroll Preservation

The `scroll.client.ts` plugin preserves scroll position on the `#app-scroller` element during navigation.

### Link Resolution

The `lib/utils.ts` `linkResolver()` function handles:
- External URLs (href)
- Internal page references
- Internal post references

---

## Adding New Content

### New Page

1. Create file in `pages/` (e.g., `pages/about.vue`)
2. Use `useSanityQuery` for data fetching
3. Add route-specific metadata with `useSiteMetadata()`

### New Component

1. Create in appropriate `components/` subdirectory
2. Components auto-import (no import statement needed)
3. Follow existing naming conventions (PascalCase)

### New Query

1. Add GROQ query in `sanity/queries.ts`
2. Define TypeScript types or use generated types from `sanity/types.ts`
3. Use with `useSanityQuery<YourType>(yourQuery, params)`

---

## Architecture Decisions

- **Headless CMS Pattern:** Content in Sanity, presentation in Nuxt
- **Component-Driven:** Feature-organized components for maintainability
- **Composition API:** All composables use Vue 3 Composition API
- **Type Safety:** Full TypeScript with auto-generated Sanity types
- **Utility-First CSS:** UnoCSS for rapid UI development
- **Progressive Enhancement:** View Transitions with graceful fallback
