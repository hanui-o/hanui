---
"@hanui/react": major
"@hanui/vue": minor
---

# Major Bundle Optimization and Accessibility Improvements

## Bundle Optimization (70% size reduction)

- **BREAKING**: Move Radix UI packages to peerDependencies
- **BREAKING**: Move lucide-react to peerDependencies
- Move shiki to optionalDependencies (Code component only)
- Add @tanstack/react-table and swiper as optional peerDependencies
- Update vite.config.ts with regex patterns for better tree-shaking

## Accessibility Improvements (WCAG 2.1 AA)

### React
- Fix Input clear/password toggle keyboard accessibility (remove tabIndex=-1)
- Add focus-visible styles to Input action buttons

### Vue
- Add focus trapping to Modal and AlertDialog components
- Implement arrow key navigation for RadioGroup (ARIA compliant)
- Auto-focus first element when modal opens
- Restore focus when modal closes

## Migration Guide

Users upgrading to this version must install peer dependencies:

```bash
# Install all Radix UI packages
pnpm add @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-checkbox @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-select @radix-ui/react-slider @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-tooltip @radix-ui/react-visually-hidden

# Install other peer dependencies
pnpm add lucide-react tailwindcss

# Optional: Install if using specific components
pnpm add @tanstack/react-table  # For DataTable
pnpm add swiper  # For Carousel
pnpm add shiki  # For Code component with syntax highlighting
```

Or use the CLI to auto-install dependencies:
```bash
npx hanui add button  # CLI will prompt to install missing dependencies
```
