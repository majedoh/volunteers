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
    │   ├── opportunities/            # Opportunities listing page
    │   │   ├── [id]/                 # Dynamic opportunity details page
    │   │   │   └── page.tsx          # Individual opportunity page
    │   │   └── page.tsx              # Opportunities listing page
    ├── components/         # React components
    │   ├── layout/         # Layout components
    │   ├── sections/       # Page section components
    │   └── ui/             # Reusable UI components
    │       ├── filters/                # Filter components
    │       │   ├── SearchInput.tsx     # Search input component
    │       │   ├── FilterDropdown.tsx  # Dropdown filter component
    │       │   ├── DateRangeFilter.tsx # Date range filter component
    │       │   └── FilterSection.tsx   # Combined filters component
    │       ├── opportunity/            # Opportunity components
    │       │   ├── detail/                     # Detail view components
    │       │   │   ├── DetailHeader.tsx        # Opportunity header
    │       │   │   ├── DetailContent.tsx       # Opportunity content
    │       │   │   ├── DetailActions.tsx       # Action buttons
    │       │   │   ├── DetailSkeleton.tsx      # Loading skeleton
    │       │   │   └── DetailError.tsx         # Error state
    │       │   ├── OpportunityCard.tsx         # Card component
    │       │   ├── OpportunityCardSkeleton.tsx # Loading skeleton
    │       │   ├── EmptyState.tsx              # Empty results state
    │       │   └── ErrorState.tsx              # Error state
    │       └── Pagination.tsx         # Pagination component
    ├── context/            # React context providers
    ├── hooks/              # Custom React hooks
    │   ├── api/              # API hooks
    │   │   ├── useOpportunities.ts     # Opportunities listing hook
    │   │   └── useOpportunityDetail.ts # Opportunity details hook
    ├── lib/                # Utility functions
    ├── styles/             # CSS modules and global styles
    │   ├── opportunities.module.css      # Opportunities listing styles
    │   └── opportunity/                  # Opportunity styles
    │       └── detail.module.css         # Detail page styles
    └── types/              # TypeScript type definitions
        └── opportunity.ts              # Opportunity type definitions
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



We've added comprehensive features for managing and exploring volunteer opportunities:

### 1. Opportunity Listing Page (`/opportunities`)

The opportunities listing page allows users to browse, search, and filter volunteer opportunities with the following features:

- **Search Functionality**: Real-time search with debouncing for optimal performance
- **Filtering System**: Filter by category, location, and date range
- **Pagination**: Paginated results for better performance and user experience
- **Responsive Layout**: Adapts to all device sizes with appropriate grid layouts
- **Loading States**: Skeleton loading for improved perceived performance
- **Empty States**: Clear messaging when no results match filters
- **Error Handling**: Graceful error handling with retry options

### 2. Opportunity Details Page (`/opportunities/[id]`)

The opportunity details page provides comprehensive information about a specific volunteer opportunity:

- **Detailed View**: Complete information including description, requirements, skills, and time commitment
- **Media Display**: Featured image with responsive sizing
- **Conditional Actions**: Application button that adapts based on user login state and opportunity status
- **Interactive Elements**: Tooltips for disabled actions with explanatory text
- **Navigation**: Clear path back to the opportunities list
- **Loading States**: Skeleton loading during data fetching
- **Error Handling**: Comprehensive error handling with retry options

### 3. Data Management

- **TypeScript Types**: Comprehensive type definitions for improved development experience
- **Custom Hooks**: API hooks for data fetching with loading, error, and success states
- **Mock Data**: Simulated API responses for development and testing

### 4. User Experience Enhancements

- **Micro-interactions**: Subtle animations and transitions for improved user engagement
- **Tooltips**: Contextual information for better user understanding
- **Loading Indicators**: Skeleton loading for reduced perceived wait times
- **State Management**: Clear indication of current filters and search parameters

### 5. Integration with Home Page

- **Featured Opportunities**: Display of selected opportunities on the home page
- **Call-to-Action**: Direct links to the opportunities page from hero section and featured opportunities
- **Seamless Navigation**: Connected user journey from home to opportunities to details

## New Data Models

### Opportunity Type

```typescript
// Basic opportunity information displayed in cards
export interface Opportunity {
  id: string;
  title: string;
  description: string;
  image: string;
  location: string;
  date: string;
  spots: number;
  featured: boolean;
  category: string;
}
```

### OpportunityDetail Type

```typescript
// Detailed opportunity information for the details page
export interface OpportunityDetail extends Opportunity {
  longDescription: string;
  requirements: string[];
  skills: string[];
  timeCommitment: string;
  contactPerson?: string;
  contactEmail?: string;
  address?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  status: 'open' | 'closed' | 'filled';
  applicationDeadline: string;
}
```

## Component Architecture

### Filter Components

1. **SearchInput**: Text search with debouncing
2. **FilterDropdown**: Category and location filtering
3. **DateRangeFilter**: Date range selection
4. **FilterSection**: Container for all filters with reset functionality

### Opportunity Card Components

1. **OpportunityCard**: Display for individual opportunities
2. **OpportunityCardSkeleton**: Loading state
3. **EmptyState**: No results display
4. **ErrorState**: Error handling display

### Detail Page Components

1. **DetailHeader**: Title, image, and meta information
2. **DetailContent**: Main content sections
3. **DetailActions**: Application and sharing buttons
4. **DetailSkeleton**: Loading state
5. **DetailError**: Error handling

## Navigation Flow

The project now implements a complete user journey:

1. Users can explore featured opportunities on the home page
2. "Explore Opportunities" button in the hero section leads to the opportunities listing page
3. "View All Opportunities" button in the featured section leads to the full listing
4. Clicking any opportunity card navigates to its detailed view
5. Back button on the detail page returns to the listing page

## CSS Module Organization

1. **opportunities.module.css**: Styles for the opportunities listing page
2. **opportunity/detail.module.css**: Styles for the opportunity details page

This organization keeps styles modular and maintainable while ensuring consistent design language across features.

## Internationalization Enhancements

Additional translation keys have been added to support the new features:

1. **Filter Labels**: Category, location, date filters
2. **UI Elements**: Pagination, buttons, empty states
3. **Error Messages**: Various error states
4. **Detail Page**: Section titles, action buttons

All new components fully support RTL/LTR layouts with proper directional adjustments.

---

This document is intended to be a living reference. As the project evolves, please update this documentation to reflect any significant changes to the design system, component architecture, or development practices.