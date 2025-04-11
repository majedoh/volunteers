# Volunteers Platform - Design Documentation & Developer Handoff Guide

## Project Overview
Core Goal Alignment: Both your request and the document aim to create a centralized platform for managing volunteer opportunities and interactions for the Presidency of Religious Affairs at the Grand Mosque and the Prophet's Mosque. The goal is to streamline processes, improve communication, and enhance the volunteer experience.

This document serves as a comprehensive guide for designers and engineers working on the Volunteers platform. The project is a Next.js-based volunteer platform that supports bilingual content (Arabic and English) with full RTL/LTR support, following a component-based architecture with a clear separation of layout, UI components, and content sections.

**Last Updated**: April 11, 2025

## Technology Stack

- **Framework**: Next.js with App Router
- **Component Library**: Shadcn UI (New York style variant)
- **Styling**: Tailwind CSS with CSS modules for component-specific styling
- **UI Components**: Custom components built on Radix UI primitives via Shadcn
- **Internationalization**: Custom language context for Arabic and English support
- **Icon Library**: Lucide icons

## Project Structure

```
volunteers/
├── components.json         # Shadcn configuration
├── public/
│   ├── images/             # Static images
│   └── locales/            # Translation files
│       ├── ar/common.json  # Arabic translations
│       └── en/common.json  # English translations
└── src/
    ├── app/                # Next.js App Router files
    ├── components/         # React components
    │   ├── layout/         # Layout components
    │   ├── sections/       # Page section components
    │   └── ui/             # Reusable UI components
    ├── context/            # React context providers
    ├── hooks/              # Custom React hooks
    ├── lib/                # Utility functions
    ├── styles/             # CSS modules and global styles
    └── types/              # TypeScript type definitions
```

## Shadcn Implementation

The project uses Shadcn UI, with the following configuration details:

- **Style Variant**: New York style with rounded corners and subtle shadows
- **Configuration**: Defined in `components.json` at the root of the project
- **Component Source**: Components are imported into the project's codebase rather than being installed as dependencies
- **CSS Variables**: Enabled for theming consistency
- **Base Color**: Neutral base color scheme
- **Path Aliases**: Custom path aliases configured for cleaner imports
- **Icon Library**: Lucide icons integration

## Tailwind CSS Guidelines

### Proper Structure & No Directive Shortcuts

The project strictly prohibits Tailwind directive shortcuts:

```tsx
// ❌ DON'T DO THIS
<div className="flex p-4 text-xl">

// ✅ DO THIS INSTEAD
<div className="display: flex; padding: 1rem; font-size: 1.25rem;">
```

- **Class Organization**: Group related classes (layout, typography, colors, etc.)
- **Responsive Classes**: Use the full syntax for responsive design
- **Semantic Naming**: Use classes that reflect purpose rather than just appearance

### CSS Module System

- Each component has its own scoped CSS module when needed (e.g., `about.module.css`)
- Import CSS modules with the following pattern:

```tsx
import styles from '@/styles/component-name.module.css';

const Component = () => (
  <div className={styles.container}>
    <h2 className={styles.heading}>Title</h2>
  </div>
);
```

## Component Architecture

### Reusable Design Components

The project follows a small, modular component architecture:

#### Base UI Components (`/src/components/ui/`)

- **button.tsx**: Button component with multiple variants
- **card.tsx**: Flexible container component
- **avatar.tsx**: User profile image component
- **badge.tsx**: Label component for status indicators
- **tabs.tsx**: Content organization component

#### Composite Components

- **OpportunityCard.tsx**: Specialized card for volunteer opportunities
- **LanguageSwitcher.tsx**: Language selection component

#### Layout Components (`/src/components/layout/`)

- **Layout.tsx**: Master layout wrapper
- **Header.tsx**: Navigation and branding
- **Footer.tsx**: Site information and links

#### Section Components (`/src/components/sections/`)

- **HeroSection.tsx**: Landing section with background and CTAs
- **FeaturedOpportunities.tsx**: Grid of opportunity cards
- **AboutSection.tsx**: Organization information section

## Design System

### Colors

The color system is defined in CSS variables in `src/styles/theme.css`:

```css
:root {
  --color-primary: #3b82f6;
  --color-primary-dark: #2563eb;
  --color-accent: #f59e0b;
  --color-accent-dark: #d97706;
  /* Additional color variables */
}
```

Main color categories:
- **Primary**: Main brand and interactive elements
- **Accent**: Call-to-action and highlighted elements
- **Neutral**: Text, backgrounds, and borders
- **Semantic**: Success, warning, error states

### Typography

Typography follows a structured system with dedicated CSS classes in theme.css:

```css
.heading-1 {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
}

.body-text {
  font-size: 1rem;
  line-height: 1.5;
}
/* Additional typography classes */
```

Typography guidelines:
- Headings: Use .heading-1 through .heading-6
- Body text: Use .body-text, .body-text-sm, .body-text-lg
- Special text: .caption, .overline, .label classes available

### Spacing System

Consistent spacing through CSS variables:

```css
:root {
  --spacing-xs: 0.25rem;  /* 4px */
  --spacing-sm: 0.5rem;   /* 8px */
  --spacing-md: 1rem;     /* 16px */
  --spacing-lg: 1.5rem;   /* 24px */
  --spacing-xl: 2rem;     /* 32px */
  /* Additional spacing variables */
}
```

## Internationalization (i18n)

### Language Context

A central `language-context.tsx` provides language management:

```tsx
// Example usage in components
import { useLanguage } from '@/context/language-context';

const Component = () => {
  const { t, dir, language, setLanguage } = useLanguage();
  
  return (
    <div>
      <h1>{t('headingKey')}</h1>
      <button onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}>
        Switch to {language === 'en' ? 'Arabic' : 'English'}
      </button>
    </div>
  );
};
```

### RTL/LTR Support

- Document direction automatically updates based on language
- Components adjust their layout and alignment accordingly
- Icon directions are reversed when appropriate
- Text alignment adapts to language direction

## Image Assets

All images are stored in the `/public/images/` directory:
- **logo.png**: Main brand logo
- **about-image.jpg**: Organization information imagery
- **i1234.png**: Hero section background image
- **opportunity1.jpg, opportunity2.jpg, opportunity3.jpg**: Featured volunteer opportunities

## Accessibility Guidelines

- Use semantic HTML elements
- Include proper ARIA attributes
- Ensure keyboard navigation works
- Maintain appropriate color contrast
- Provide text alternatives for images
- Test with screen readers in both languages

## Performance Considerations

- Optimize image sizes and formats
- Implement lazy loading for below-fold content
- Use code splitting for large components
- Minimize CSS bundle size with CSS modules
- Implement appropriate caching strategies

## Development Guidelines

### Adding New Components

1. **Component Creation**:
   - Create a file in the appropriate directory
   - Follow the established component patterns
   - Use CSS modules for component-specific styles

2. **Styling Approach**:
   ```tsx
   // Example component with proper styling approach
   import styles from '@/styles/component-name.module.css';
   
   const ComponentName: React.FC = () => {
     return (
       <div className={styles.container}>
         <h2 className={styles.heading}>Component Title</h2>
       </div>
     );
   };
   ```

3. **Shadcn Component Customization**:
   - Import and customize base components
   - Maintain design system consistency
   - Follow established patterns

4. **Internationalization**:
   - Add translation keys to both language files
   - Test components in both RTL and LTR modes

### Modifying Existing Components

1. Understand the component's purpose and dependencies
2. Preserve the existing structure and naming conventions
3. Update the corresponding CSS module if needed
4. Ensure i18n compatibility for both RTL and LTR layouts
5. Test across different viewport sizes

### Creating New Pages

1. Import and compose existing components
2. Maintain consistent section structure
3. Ensure all text content is internationalized
4. Test in both language contexts and across device sizes

## Getting Started

To continue development on this project:

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Visit `http://localhost:3000`

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Shadcn UI Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs)
- [Lucide Icons](https://lucide.dev)

---

This document is intended to be a living reference. As the project evolves, please update this documentation to reflect any significant changes to the design system, component architecture, or development practices.