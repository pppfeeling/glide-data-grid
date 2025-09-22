# shadcn/ui Cell Renderers

This directory contains custom cell renderers built with [shadcn/ui](https://ui.shadcn.com/) components for the Glide Data Grid. These renderers provide modern, accessible UI components while maintaining the high-performance Canvas rendering capabilities of the grid.

## 🏗️ Architecture

Each cell renderer follows the same pattern:

1. **Canvas Rendering** (`draw` function) - High-performance read-only display
2. **React Editor** (`provideEditor` function) - Interactive editing with shadcn/ui components
3. **Type Safety** - Full TypeScript support with proper type definitions

## 📁 Directory Structure

```
shadcnCell/
├── index.ts                          # Main exports
├── utils/
│   ├── theme-mapping.ts              # Theme integration utilities
│   └── shadcn-helpers.ts             # Helper functions (planned)
├── shadcn-button-cell.tsx            # Button cell renderer
├── shadcn-dropdown-cell.tsx          # Dropdown/Select cell renderer
├── shadcn-date-picker-cell.tsx       # Date picker cell renderer
├── shadcn-tags-cell.tsx              # Tags/Badge cell renderer
├── shadcn-multi-select-cell.tsx      # Multi-select cell renderer
└── README.md                         # This file
```

## 🚀 Getting Started

### Prerequisites

1. **shadcn/ui Setup**: Ensure shadcn/ui is configured in your project
2. **Tailwind CSS**: Required for shadcn/ui styling
3. **Required Components**: Install needed shadcn/ui components

```bash
# Install shadcn/ui components (run from project root)
npx shadcn@latest add button
npx shadcn@latest add select
npx shadcn@latest add calendar
npx shadcn@latest add popover
npx shadcn@latest add input
npx shadcn@latest add checkbox
npx shadcn@latest add badge
```

### Usage

```typescript
import { DataEditor } from "@glideapps/glide-data-grid";
import { ShadcnButtonCell, ShadcnDropdownCell } from "./shadcnCell";

// Use individual renderers
<DataEditor
    customRenderers={[ShadcnButtonCell, ShadcnDropdownCell]}
    // ... other props
/>

// Or use all renderers
import { AllShadcnRenderers } from "./shadcnCell";

<DataEditor
    customRenderers={AllShadcnRenderers}
    // ... other props
/>
```

## 📊 Component Status

| Component | Status | Priority | Complexity | shadcn/ui Components |
|-----------|--------|----------|------------|---------------------|
| Button Cell | 🔄 Planned | 1 | 🟢 Low | Button |
| Date Picker Cell | 🔄 Planned | 2 | 🟡 Medium | Calendar, Popover, Button |
| Dropdown Cell | 🔄 Planned | 3 | 🟡 Medium | Select, SelectContent, SelectItem |
| Tags Cell | 🔄 Planned | 4 | 🟡 Medium | Badge, Checkbox |
| Multi-Select Cell | 🔄 Planned | 5 | 🔴 High | Command, Popover, Badge |

**Legend:**
- 🟢 **Low Complexity**: Simple component replacement
- 🟡 **Medium Complexity**: Some custom logic required
- 🔴 **High Complexity**: Significant custom implementation needed

## 🎨 Theme Integration

The shadcn/ui cells integrate with the Glide Data Grid theme system through:

### CSS Variables
Theme values are mapped to CSS variables that shadcn/ui components can use:

```typescript
import { mapThemeToCSS, applyThemeToElement } from "./utils/theme-mapping";

// Apply theme to container element
const themeVars = mapThemeToCSS(theme);
```

### Tailwind Classes
Helper functions provide Tailwind class mappings:

```typescript
import { getThemeTailwindClasses } from "./utils/theme-mapping";

const classes = getThemeTailwindClasses(theme);
// Use classes.bgCell, classes.textDark, etc.
```

### Inline Styles
For cases where CSS variables or Tailwind aren't sufficient:

```typescript
import { getThemeInlineStyles } from "./utils/theme-mapping";

const styles = getThemeInlineStyles(theme);
// Use styles.accentColor, styles.cellBackground, etc.
```

## 🧪 Testing

### Storybook Development
Run Storybook to test components in isolation:

```bash
npm run storybook
# Navigate to: Glide-Data-Grid/shadcn/ui Cells
```

### Individual Component Testing
Each component has its own story for focused testing.

### Integration Testing
The `AllShadcnCells` story shows all components working together.

## 📝 Implementation Guidelines

### 1. Canvas Rendering (Preserve Existing Pattern)
```typescript
draw: (args, cell) => {
    const { ctx, theme, rect } = args;
    // Keep existing Canvas logic for performance
    // Map theme values as needed
    return true;
},
```

### 2. React Editor (New shadcn/ui Pattern)
```typescript
provideEditor: () => ({
    editor: (props) => {
        const { value, onChange, onFinishedEditing, theme } = props;

        return (
            <div className="w-full h-full" style={mapThemeToCSS(theme)}>
                {/* shadcn/ui components here */}
            </div>
        );
    },
    disablePadding: true, // Usually needed for proper rendering
}),
```

### 3. Type Definitions
```typescript
interface ShadcnButtonCellProps {
    readonly kind: "shadcn-button-cell";
    readonly title: string;
    readonly variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    readonly onClick?: () => void;
}

export type ShadcnButtonCell = CustomCell<ShadcnButtonCellProps>;
```

## 🔧 Development Workflow

### 1. Component Creation
1. Create component file (e.g., `shadcn-button-cell.tsx`)
2. Implement Canvas `draw` function
3. Implement React `provideEditor` function
4. Add proper TypeScript types
5. Export from `index.ts`

### 2. Testing
1. Add component to Storybook stories
2. Test Canvas rendering
3. Test editor functionality
4. Test theme integration
5. Test with different data scenarios

### 3. Integration
1. Update `AllShadcnRenderers` array
2. Uncomment relevant imports in stories
3. Test in actual DataEditor usage
4. Update documentation

## 🐛 Common Issues & Solutions

### Theme Not Applied
**Problem**: shadcn/ui components don't reflect grid theme
**Solution**: Ensure CSS variables are applied to component container

### Portal Rendering Issues
**Problem**: Dropdowns appear in wrong location
**Solution**: Use `portalElementRef` prop correctly with shadcn/ui Portal components

### Bundle Size Concerns
**Problem**: Adding shadcn/ui increases bundle size
**Solution**: Use tree-shaking and lazy loading for complex components

### Performance Regression
**Problem**: React components slower than original
**Solution**: Use React.memo and minimize re-renders

## 📚 Resources

- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Glide Data Grid Documentation](https://grid.glideapps.com/)
- [Migration Guide](../../../SHADCN_UI_MIGRATION.md)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

## 🤝 Contributing

1. Follow the established patterns for Canvas + React dual rendering
2. Maintain TypeScript type safety
3. Ensure theme integration works properly
4. Add comprehensive tests via Storybook
5. Update documentation as needed