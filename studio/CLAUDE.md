# AllThingsGreat Sanity Studio Documentation

> Sanity CMS studio for managing content of the AllThingsGreat lifestyle blogging site.

## Quick Context

- **Platform:** Sanity v3.95.0
- **Project ID:** `x2ls736n`
- **Dataset:** `production`
- **React:** 18.3.1
- **TypeScript:** 5.6.3

---

## Directory Structure

```
studio/
├── src/
│   ├── schemaTypes/
│   │   ├── index.ts              # Central schema exports
│   │   ├── documents/            # Top-level document types
│   │   │   ├── post.ts           # Blog post schema
│   │   │   ├── page.ts           # Static pages schema
│   │   │   ├── person.ts         # Author/person schema
│   │   │   └── tag.ts            # Tag/category schema
│   │   ├── objects/              # Reusable nested structures
│   │   │   ├── blockContent.tsx  # Rich text editor config
│   │   │   ├── callToAction.ts   # CTA blocks for page builder
│   │   │   ├── infoSection.ts    # Info blocks for page builder
│   │   │   └── link.ts           # Flexible link object
│   │   └── singletons/           # Single-document types
│   │       └── settings.tsx      # Global site settings
│   ├── structure/
│   │   └── index.ts              # Desk structure customization
│   └── lib/
│       └── initialValues.ts      # Demo data for seeding
├── static/
│   └── page-builder-thumbnails/  # Visual previews for page builder
│       ├── callToAction.webp
│       └── infoSection.webp
├── sanity.config.ts              # Main studio configuration
├── sanity.cli.ts                 # CLI configuration
├── sanity.types.ts               # Auto-generated TypeScript types
├── schema.json                   # Exported schema definition
├── package.json                  # Dependencies and scripts
└── tsconfig.json                 # TypeScript configuration
```

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `sanity.config.ts` | Main config: plugins, preview, document resolution |
| `src/schemaTypes/index.ts` | Central export of all schema types |
| `src/structure/index.ts` | Custom desk structure & navigation |
| `sanity.types.ts` | Auto-generated TypeScript types |
| `src/lib/initialValues.ts` | Default values for new documents |

---

## Schema Types Overview

### Document Types (Top-Level Content)

| Type | Icon | Purpose |
|------|------|---------|
| `post` | DocumentTextIcon | Blog posts with content, author, tags |
| `page` | DocumentIcon | Static pages with page builder |
| `person` | UserIcon | Authors/contributors |
| `tag` | - | Categories for organizing posts |

### Singleton Types

| Type | Icon | Document ID | Purpose |
|------|------|-------------|---------|
| `settings` | CogIcon | `siteSettings` | Global site configuration |

### Object Types (Reusable Structures)

| Type | Icon | Purpose |
|------|------|---------|
| `blockContent` | - | Rich text editor with links |
| `link` | LinkIcon | Flexible URL/page/post reference |
| `callToAction` | BulbOutlineIcon | CTA section for page builder |
| `infoSection` | TextIcon | Content section for page builder |

---

## Document Schemas in Detail

### POST (Blog Posts)

**File:** `src/schemaTypes/documents/post.ts`

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `title` | string | Yes | Post headline |
| `slug` | slug | Yes | Auto-generated from title |
| `content` | blockContent | No | Rich text with images |
| `excerpt` | text | No | Short summary |
| `coverImage` | image | Yes | Hero image with hotspot |
| `date` | datetime | No | Auto-set to current time |
| `author` | reference → person | No | Links to Person |
| `tags` | array of references | No | Multiple tag references |
| `seoTitle` | string | No | 50-60 chars recommended |
| `seoDescription` | text | No | 150-160 chars recommended |

**Field Groups:** Content, SEO

---

### PAGE (Static Pages)

**File:** `src/schemaTypes/documents/page.ts`

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `name` | string | Yes | Internal page name |
| `slug` | slug | Yes | Auto-generated from name |
| `heading` | string | Yes | Display heading |
| `subheading` | string | No | Secondary heading |
| `pageBuilder` | array | No | CTA and InfoSection blocks |
| `seoTitle` | string | No | 50-60 chars recommended |
| `seoDescription` | text | No | 150-160 chars recommended |

**Page Builder Components:**
- `callToAction` - CTA with heading, text, button
- `infoSection` - Content section with rich text

**Field Groups:** Content, SEO

---

### PERSON (Authors)

**File:** `src/schemaTypes/documents/person.ts`

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `firstName` | string | Yes | First name |
| `lastName` | string | Yes | Last name |
| `nickName` | string | Yes | Display name |
| `bio` | text | No | Biography |
| `quote` | text | No | Featured quote |
| `picture` | image | Yes | Profile picture with hotspot |
| `instagram` | string | No | Handle (without @) |
| `snapchat` | string | No | Handle |
| `github` | string | No | Handle |

---

### TAG (Categories)

**File:** `src/schemaTypes/documents/tag.ts`

| Field | Type | Required |
|-------|------|----------|
| `title` | string | Yes |
| `slug` | slug | Yes |

---

### SETTINGS (Global Config)

**File:** `src/schemaTypes/singletons/settings.tsx`
**Document ID:** `siteSettings`

| Field | Type | Notes |
|-------|------|-------|
| `title` | string | Fallback SEO title, navbar title |
| `description` | blockContent | Homepage description with links |
| `ogImage` | image | Default Open Graph image |

---

## Object Schemas in Detail

### LINK (Flexible Link)

**File:** `src/schemaTypes/objects/link.ts`

| Field | Type | Default | Visibility |
|-------|------|---------|------------|
| `linkType` | string | 'url' | Always visible |
| `href` | url | - | When linkType = 'href' |
| `page` | reference → page | - | When linkType = 'page' |
| `post` | reference → post | - | When linkType = 'post' |
| `openInNewTab` | boolean | false | Always visible |

**Link Types:** `href` (external URL), `page` (internal page), `post` (blog post)

---

### CALLTOACTION (CTA Block)

**File:** `src/schemaTypes/objects/callToAction.ts`

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `heading` | string | Yes | CTA heading |
| `text` | text | No | Description |
| `buttonText` | string | No | Button label |
| `link` | link | No | Button destination |

**Validation:** `buttonText` and `link` must both be set or both empty.

---

### INFOSECTION (Content Block)

**File:** `src/schemaTypes/objects/infoSection.ts`

| Field | Type | Notes |
|-------|------|-------|
| `heading` | string | Section heading |
| `subheading` | string | Secondary heading |
| `content` | blockContent | Rich text content |

---

### BLOCKCONTENT (Rich Text)

**File:** `src/schemaTypes/objects/blockContent.tsx`

**Supported Content:**
- Standard text blocks
- Link annotations (URL, page, or post references)
- Images (when used in post content)

---

## Content Relationships

```
Settings (singleton: siteSettings)
├── ogImage
└── description (blockContent)

Post
├── author → Person
├── tags → Tag[]
├── coverImage
└── content (blockContent)

Page
└── pageBuilder[]
    ├── callToAction
    │   └── link → (URL | Page | Post)
    └── infoSection
        └── content (blockContent with links)

Person
└── picture

Tag
└── (referenced by Post.tags)
```

---

## Plugins Enabled

| Plugin | Purpose |
|--------|---------|
| `presentationTool` | Live visual editing with frontend preview |
| `structureTool` | Custom desk/menu organization |
| `assist` | AI-powered content suggestions |
| `visionTool` | GROQ query editor for debugging |

---

## Desk Structure

**File:** `src/structure/index.ts`

- Main list title: "Website Content"
- Auto-pluralizes document type names (Post → Posts)
- Special singleton: "Site Settings" with direct edit access
- Hidden types: `settings`, `assist.instruction.context`

---

## Environment Variables

**Required:**
```env
SANITY_STUDIO_PROJECT_ID=x2ls736n
SANITY_STUDIO_DATASET=production
```

**Optional:**
```env
SANITY_STUDIO_PREVIEW_URL=http://localhost:3000
SANITY_STUDIO_STUDIO_HOST=
```

---

## Scripts

```bash
npm run dev           # Start development studio
npm run build         # Build for production
npm run deploy        # Deploy to Sanity hosting
npm run extract-types # Generate TypeScript types from schema
```

---

## Type Generation

Types are auto-generated from the schema:

```bash
npm run extract-types
```

This generates `sanity.types.ts` with TypeScript interfaces for all schema types.

**Frontend Integration:** The frontend's `sanity/types.ts` can be synced by running type generation in the studio.

---

## Preview Configuration

**Default Preview URL:** `http://localhost:3000`

**Preview Routes:**
- Enable: `/preview/enable`
- Disable: `/preview/disable`

**Document Resolution:**
- Pages: `/:slug`
- Posts: `/posts/:slug`

---

## Validation Patterns

### Alt Text Required

Applied to all image fields (coverImage, picture, ogImage):
```typescript
validation: (rule) =>
  rule.custom((value) => {
    if (value?.asset && !value?.alt) {
      return 'Alt text is required when an image is present';
    }
    return true;
  })
```

### Conditional Link Validation

Link object ensures correct field is populated based on `linkType`:
```typescript
// If linkType is 'href', href field is required
// If linkType is 'page', page reference is required
// If linkType is 'post', post reference is required
```

### CTA Button Validation

Both `buttonText` and `link` must be set together or both empty:
```typescript
validation: (rule) =>
  rule.custom((_, context) => {
    const { buttonText, link } = context.parent;
    if ((buttonText && !link) || (!buttonText && link)) {
      return 'Both button text and link must be set, or both must be empty';
    }
    return true;
  })
```

---

## AI Assist Integration

AI content assistance is enabled for image fields:
- Post `coverImage` - auto-generate alt text
- Person `picture` - auto-generate alt text
- Settings `ogImage` - auto-generate alt text

---

## Page Builder Pattern

Pages use a flexible page builder array accepting:

1. **callToAction** - CTA sections with optional button
2. **infoSection** - Rich text content sections

Visual thumbnails in `/static/page-builder-thumbnails/` enable a grid-based insertion UI.

---

## Adding New Schema Types

### New Document Type

1. Create file in `src/schemaTypes/documents/`
2. Export schema definition with fields, validation, preview
3. Add to exports in `src/schemaTypes/index.ts`
4. Run `npm run extract-types` to update TypeScript types

### New Object Type

1. Create file in `src/schemaTypes/objects/`
2. Export schema definition
3. Add to exports in `src/schemaTypes/index.ts`
4. Reference in document schemas where needed

### New Singleton

1. Create file in `src/schemaTypes/singletons/`
2. Add to desk structure in `src/structure/index.ts`
3. Configure initial values if needed

---

## Common Patterns

### Slug Field

```typescript
defineField({
  name: 'slug',
  type: 'slug',
  options: {
    source: 'title', // or 'name'
    maxLength: 96,
    isUnique: isUniqueOtherThanLanguage,
  },
  validation: (rule) => rule.required(),
})
```

### Image with Hotspot

```typescript
defineField({
  name: 'coverImage',
  type: 'image',
  options: { hotspot: true },
  fields: [
    defineField({
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
    }),
  ],
})
```

### Reference Field

```typescript
defineField({
  name: 'author',
  type: 'reference',
  to: [{ type: 'person' }],
})
```

### Field Groups

```typescript
groups: [
  { name: 'content', title: 'Content' },
  { name: 'seo', title: 'SEO' },
],
fields: [
  defineField({ name: 'title', group: 'content', ... }),
  defineField({ name: 'seoTitle', group: 'seo', ... }),
]
```

---

## Key Dependencies

| Package | Purpose |
|---------|---------|
| `sanity` | Core CMS framework |
| `@sanity/vision` | GROQ query editor |
| `@sanity/assist` | AI content assistance |
| `date-fns` | Date formatting in previews |
| `pluralize-esm` | Pluralizing schema names in UI |
| `styled-components` | Custom component styling |

---

## Architecture Decisions

- **Singleton Pattern:** Settings as a single document for global config
- **Page Builder:** Flexible array of typed blocks for dynamic pages
- **Reference Types:** Type-safe relationships between documents
- **Conditional Fields:** Show/hide based on other field values
- **AI Integration:** Auto-generate image alt text
- **Preview Integration:** Live frontend preview in Presentation tool
- **Field Groups:** Organize complex schemas (Content vs SEO)
- **Hotspot Images:** Allow editors to define focus areas
