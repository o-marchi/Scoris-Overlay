# SCORIS Design System & Style Guide

## Overview

A comprehensive design system built with Tailwind CSS v4, featuring a complete set of reusable components, utilities, and design tokens for consistent UI development across the SCORIS tournament overlay application.

## Accessing the Style Guide

Visit `/style-guide` in your running application to see all components and patterns with live examples.

```bash
npm run dev
# Navigate to http://localhost:8080/style-guide
```

## Design Tokens

### Colors

The design system uses OKLCH color space for perceptually uniform colors across light and dark themes.

```css
--color-primary: #EEBF3D        /* Gold accent color */
--color-secondary: #6B4FBB      /* Purple secondary color */
--color-surface-dim              /* Dimmest background */
--color-surface                  /* Default background */
--color-surface-bright           /* Brightest background */
--color-text                     /* Primary text */
--color-text-muted              /* Secondary text */
```

All colors automatically adapt to light/dark theme via the `html.dark` class.

### Typography

**Fonts:**
- `Inter` (font-sans) - Body text
- `Oxanium` (font-display) - Headings and display text

**Headings:**
- h1: text-5xl (48px)
- h2: text-4xl (36px)
- h3: text-3xl (30px)
- h4: text-2xl (24px)
- h5: text-xl (20px)
- h6: text-lg (18px)

### Shadows

Three elevation levels for visual hierarchy:

```css
--shadow-s  /* Subtle shadows for level-1 surfaces */
--shadow-m  /* Medium shadows for level-2 surfaces */
--shadow-l  /* Strong shadows for level-3 surfaces */
```

## Component Classes

### Buttons

```html
<!-- Variants -->
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-outline">Outline</button>
<button class="btn btn-ghost">Ghost</button>

<!-- Sizes -->
<button class="btn btn-primary btn-sm">Small</button>
<button class="btn btn-primary">Default</button>
<button class="btn btn-primary btn-lg">Large</button>

<!-- With icons -->
<button class="btn btn-primary">
  <span>📁</span>
  Open File
</button>
```

### Forms

```html
<div class="form-group">
  <label class="form-label" for="field">Label</label>
  <input type="text" class="form-input" id="field" placeholder="Placeholder">
  <div class="form-help">Helper text</div>
  <div class="form-error">Error message</div>
</div>

<!-- Textarea -->
<textarea class="form-textarea"></textarea>

<!-- Select -->
<select class="form-select">
  <option>Option 1</option>
</select>

<!-- Checkbox -->
<label class="form-check-label">
  <input type="checkbox" class="form-checkbox">
  Check me
</label>
```

### Cards

```html
<!-- Basic card -->
<div class="card">
  <div class="card-header">Title</div>
  <div class="card-body">Content</div>
  <div class="card-footer">Footer</div>
</div>

<!-- Hoverable card -->
<div class="card-hover">
  <div class="card-header">Interactive Card</div>
  <div class="card-body">Hover to see effect</div>
</div>
```

### Badges

```html
<span class="badge badge-primary">New</span>
<span class="badge badge-secondary">Beta</span>
<span class="badge badge-outline">v1.0</span>
```

### Alerts

```html
<div class="alert alert-info">Info message</div>
<div class="alert alert-success">Success message</div>
<div class="alert alert-warning">Warning message</div>
<div class="alert alert-error">Error message</div>
```

### Tables

```html
<table class="table">
  <thead>
    <tr>
      <th>Column 1</th>
      <th>Column 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Data 1</td>
      <td>Data 2</td>
    </tr>
  </tbody>
</table>
```

## Layout Utilities

### Containers

```html
<!-- Standard container (max-width: 1200px) -->
<div class="container">...</div>

<!-- Narrow container (max-width: 800px) -->
<div class="container-narrow">...</div>

<!-- Section padding -->
<section class="section">...</section>

<!-- Divider -->
<div class="divider"></div>
```

### Semantic Levels

Use semantic level classes for visual hierarchy:

```html
<div class="level-0">Base level (surface-dim)</div>
<div class="level-1">First elevation (surface + shadow-s)</div>
<div class="level-2">Second elevation (surface-bright + shadow-m)</div>
<div class="level-3">Third elevation (surface-bright + shadow-l)</div>
```

## Navigation

The Header component (`/src/components/Header.vue`) provides:
- Sticky header with navigation links
- Automatic route highlighting
- Theme toggle integration
- User authentication status
- Responsive design

```vue
<template>
  <Header />
</template>

<script setup>
import Header from '@/components/Header.vue';
</script>
```

## Usage Guidelines

### Color Usage

- Use `--color-primary` for primary actions, CTAs, and brand emphasis (gold #EEBF3D)
- Use `--color-secondary` for secondary actions and accents (purple #6B4FBB)
- Use surface levels for background hierarchy (dim → surface → bright)
- Use `--color-text` for primary content
- Use `--color-text-muted` for secondary/supporting text

### Component Selection

- **Buttons**: Use `.btn-primary` for main actions, `.btn-secondary` for secondary actions
- **Forms**: Always pair inputs with labels using `.form-label` and `.form-input`
- **Cards**: Use `.card-hover` for interactive/clickable cards
- **Alerts**: Match alert type to message severity

### Accessibility

- All form inputs should have associated labels
- Use semantic HTML elements (button, input, etc.)
- Maintain sufficient color contrast (OKLCH ensures perceptual uniformity)
- Buttons have focus and disabled states built-in

### Theme Compatibility

All components automatically adapt to light/dark themes. To ensure compatibility:

- Use CSS custom properties for colors (not hard-coded hex values)
- Test components in both themes
- Avoid opacity on colored backgrounds (use OKLCH alpha channel if needed)

## Combining with Tailwind

The style guide components work seamlessly with Tailwind utilities:

```html
<button class="btn btn-primary mt-4 w-full">
  Full Width Button with Margin
</button>

<div class="card p-8 mb-6">
  Custom padding and margin
</div>
```

## File Structure

```
client/src/assets/styles/
  ├── main.css          # All design system styles
  └── base.css          # CSS reset

client/src/components/
  ├── Header.vue        # Navigation header
  ├── ThemeToggle.vue   # Dark/light mode toggle
  └── Login.vue         # Auth status display

client/src/views/
  └── StyleGuide.vue    # Interactive style guide
```

## Development Tips

1. **Consistent Spacing**: Use Tailwind spacing utilities (p-4, m-6, gap-3) for consistency
2. **Semantic Classes**: Prefer semantic classes (`.card`, `.btn`) over utility-only approaches for complex components
3. **Component Composition**: Build complex UIs by combining base components with Tailwind utilities
4. **Theme Testing**: Always test new components in both light and dark themes

## Browser Support

- Modern browsers with CSS custom property support
- CSS Grid and Flexbox
- OKLCH color space (falls back gracefully)

## Performance

- CSS is processed through Tailwind's JIT compiler
- Only used utilities are included in production build
- Font loading uses `font-display: swap` for performance
