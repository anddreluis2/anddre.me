# Essays System Implementation

This document describes the MDX-based essays system implemented for anddre.me.

## Overview

The essays system allows you to write blog posts in MDX format (Markdown + JSX) and have them automatically compiled into static pages within your domain at build time.

## Architecture

- **Content Storage**: MDX files in `content/essays/`
- **List Page**: `/essays` - Shows all essays with metadata
- **Individual Pages**: `/essays/[slug]` - Displays full essay content
- **Static Generation**: All pages are pre-rendered at build time using Next.js SSG

## File Structure

```
/Users/anddreluis2/projects/anddre.me/
├── content/
│   └── essays/
│       ├── README.md (instructions)
│       ├── example-essay.mdx
│       └── unpacking-tao-of-react.mdx
├── src/
│   ├── app/
│   │   └── essays/
│   │       ├── page.tsx (list view)
│   │       └── [slug]/
│   │           └── page.tsx (individual essay)
│   └── lib/
│       └── essays.ts (utility functions)
```

## Features

### ✅ Implemented

1. **MDX Support**: Write essays in Markdown with full JSX support
2. **Frontmatter Metadata**: Title, description, publish date, tags
3. **Automatic Reading Time**: Calculated from content
4. **Syntax Highlighting**: Code blocks with highlight.js (github-dark theme)
5. **Static Generation**: Pre-rendered at build time for optimal performance
6. **SEO-Friendly**: Proper metadata and semantic HTML
7. **Dark Mode**: Full support with theme-aware code highlighting
8. **Responsive Design**: Mobile-first, matches existing site design
9. **Type Safety**: Full TypeScript support
10. **Back Navigation**: Easy return to essays list

### Essay Metadata

Each essay requires frontmatter at the top:

```yaml
---
title: "Your Essay Title"
description: "Brief description for SEO"
publishedAt: "YYYY-MM-DD"
tags: ["tag1", "tag2"]
---
```

## Dependencies Installed

- `next-mdx-remote`: Render MDX content dynamically
- `gray-matter`: Parse frontmatter from MDX files
- `reading-time`: Calculate reading time automatically
- `rehype-highlight`: Syntax highlighting for code blocks
- `rehype-slug`: Add IDs to headings for anchor links

## Usage

### Creating a New Essay

1. Create a file in `content/essays/` with `.mdx` extension
2. Use kebab-case for filename (e.g., `my-new-essay.mdx`)
3. Add frontmatter with required fields
4. Write your content using Markdown/MDX
5. Run `bun run build` to generate static pages

### Example Essay Structure

```mdx
---
title: "My Awesome Essay"
description: "Learn about awesome things"
publishedAt: "2026-02-05"
tags: ["react", "performance"]
---

## Introduction

Your content here...

### Code Example

```tsx
function MyComponent() {
  return <div>Hello World</div>;
}
```

## Conclusion

More content...
```

### Building

```bash
# Development
bun run dev

# Production build
bun run build

# Start production server
bun run start
```

## Performance Characteristics

Following the React performance rules in your user_rules:

1. **No Async Waterfalls**: Essays are loaded in parallel during build
2. **Static Generation**: All pages pre-rendered at build time
3. **No Client-Side Fetching**: Pure HTML served to users
4. **Fast Page Loads**: Minimal JavaScript bundle
5. **SEO Optimized**: Static HTML with proper metadata

## URLs

- Essays List: `https://anddre.me/essays`
- Individual Essay: `https://anddre.me/essays/[slug]`

## Styling

- Responsive typography with prose classes
- Dark mode support
- Code blocks with syntax highlighting
- Consistent with site design language
- AnimatedHoverText components for headers

## Build Output

The build successfully generates:
- Static HTML for `/essays` (list page)
- Static HTML for each essay at `/essays/[slug]`
- All pages are ○ (Static) or ● (SSG)

Example build output:
```
Route (app)                                 Size  First Load JS
├ ○ /essays                                881 B         151 kB
├ ● /essays/[slug]                         172 B         105 kB
├   ├ /essays/example-essay
├   └ /essays/unpacking-tao-of-react
```

## Next Steps

1. Write more essays in `content/essays/`
2. Optionally migrate existing Dev.to articles
3. Consider adding:
   - RSS feed generation
   - Tag filtering page
   - Search functionality
   - Related essays section
   - View count tracking (if desired)

## Troubleshooting

### Build Errors

If you encounter build errors:
1. Delete `.next` folder: `rm -rf .next`
2. Rebuild: `bun run build`

### Tags Not Showing

Make sure tags are defined as an array in frontmatter:
```yaml
tags: ["tag1", "tag2"]  # ✅ Correct
tags: "tag1, tag2"       # ❌ Wrong
```

### Module Not Found

If you see module errors after adding dependencies:
1. Clean install: `rm -rf node_modules bun.lockb .next`
2. Reinstall: `bun install`
3. Rebuild: `bun run build`

## Files Modified/Created

### Created
- `content/essays/README.md`
- `content/essays/example-essay.mdx`
- `content/essays/unpacking-tao-of-react.mdx` (user created)
- `src/lib/essays.ts`
- `src/app/essays/[slug]/page.tsx`
- `ESSAYS_IMPLEMENTATION.md` (this file)

### Modified
- `src/app/essays/page.tsx` - Updated to use local MDX files
- `src/app/globals.css` - Added syntax highlighting styles
- `next.config.ts` - Simplified (removed unnecessary MDX config)
- `package.json` - Added MDX dependencies

## Implementation Complete ✅

All todos completed:
- ✅ Install MDX and related dependencies
- ✅ Configure Next.js for MDX support
- ✅ Create essay utility functions
- ✅ Update essays list page to use local MDX files
- ✅ Create dynamic [slug] page for individual essays
- ✅ Create example MDX essays
- ✅ Test build and verify static generation works

The essays system is now fully functional and ready to use!
