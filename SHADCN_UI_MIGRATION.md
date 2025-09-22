# shadcn/ui Migration Guide for Glide Data Grid Custom Cells

This document provides a comprehensive guide for migrating custom cell renderers in `packages/cells/src/cells` from the current Linaria CSS-in-JS + react-select implementation to shadcn/ui components.

## 📋 Migration Overview

### Current State Analysis
The custom cell renderers use a dual-rendering approach:
- **Canvas rendering** for high-performance read-only display
- **React components** for interactive editing via `provideEditor`

### Migration Goals
- Replace Linaria CSS-in-JS with Tailwind CSS
- Replace react-select with shadcn/ui Select/Combobox
- Maintain existing API compatibility
- Preserve Canvas rendering performance

## 🏗️ Architecture Deep Dive

### Custom Cell Interface Structure

Every custom cell must implement the `CustomRenderer<T>` interface:

```typescript
export interface CustomRenderer<T extends CustomCell = CustomCell> extends BaseCellRenderer<T> {
    readonly isMatch: (cell: CustomCell) => cell is T;
    readonly onPaste?: (val: string, cellData: T["data"]) => T["data"] | undefined;
}
```

### Required Methods

#### Essential (Required)
- **`kind`**: `GridCellKind.Custom` (fixed)
- **`isMatch`**: Type guard for cell identification
- **`draw`**: Canvas rendering for read-only display

#### Editor Support (Optional)
- **`provideEditor`**: React component for edit mode
- **`onClick`**: Click event handling
- **`onSelect`**: Selection event handling
- **`onPaste`**: Paste operation handling

#### Additional (Optional)
- **`measure`**: Dynamic width calculation
- **`needsHover`**: Hover state requirement
- **`needsHoverPosition`**: Hover position requirement
- **`drawPrep`**: Pre-rendering setup

### provideEditor Implementation Patterns

#### Return Type Options
1. **Simple Function**: `ProvideEditorComponent<T>`
2. **Object with Config**:
   ```typescript
   {
       editor: ProvideEditorComponent<T>;
       deletedValue?: (toDelete: T) => T;
       disablePadding?: boolean;
       disableStyling?: boolean;
   }
   ```
3. **undefined**: Use default editor

#### Editor Component Props Interface
```typescript
export type ProvideEditorComponent<T extends InnerGridCell> = React.FunctionComponent<{
    readonly onChange: (newValue: T) => void;
    readonly onFinishedEditing: (newValue?: T, movement?: readonly [-1 | 0 | 1, -1 | 0 | 1]) => void;
    readonly isHighlighted: boolean;
    readonly value: T;
    readonly initialValue?: string;
    readonly theme: Theme;
    readonly portalElementRef?: React.RefObject<HTMLElement>;
    readonly activation?: CellActivatedEventArgs;
    // ... other props
}>;
```

#### Editor Lifecycle
1. **Initialization**: Component mounts with `value`, `theme`, `initialValue`
2. **Real-time Updates**: `onChange` called on user input
3. **Completion**: `onFinishedEditing` called with final value and optional navigation
4. **Portal Rendering**: Dropdowns rendered via `portalElementRef`

## 📊 Component Migration Matrix

| Component | Current Tech | shadcn/ui Target | Complexity | Priority |
|-----------|-------------|------------------|------------|----------|
| `button-cell.tsx` | Custom Canvas + HTML | Button | 🟢 Low | 1 |
| `date-picker-cell.tsx` | HTML input[type=date] | DatePicker | 🟡 Medium | 2 |
| `dropdown-cell.tsx` | react-select | Select | 🟡 Medium | 3 |
| `tags-cell.tsx` | Custom checkboxes | Badge + Checkbox | 🟡 Medium | 4 |
| `multi-select-cell.tsx` | react-select multi | Combobox + Multi | 🔴 High | 5 |

## 🚀 Migration Implementation Plan

### Phase 1: Environment Setup

#### 1.1 Install shadcn/ui Dependencies
```bash
# Install shadcn/ui CLI (if not already installed)
npx shadcn@latest init

# Add required components
npx shadcn@latest add button
npx shadcn@latest add select
npx shadcn@latest add input
npx shadcn@latest add calendar
npx shadcn@latest add popover
npx shadcn@latest add checkbox
npx shadcn@latest add badge
```

#### 1.2 Configure Tailwind Integration
- Ensure Tailwind CSS is properly configured
- Set up CSS variable mapping for theme integration
- Configure coexistence with existing Linaria styles

#### 1.3 Create Theme Mapping Utilities
```typescript
// utils/theme-mapping.ts
export const mapThemeToCSS = (theme: Theme) => ({
  '--gdg-accent-color': theme.accentColor,
  '--gdg-bg-cell': theme.bgCell,
  '--gdg-text-dark': theme.textDark,
  // ... other mappings
});
```

### Phase 2: Simple Component Migration

#### 2.1 button-cell.tsx Migration
**Complexity**: 🟢 Low
**Estimated Time**: 2-4 hours

**Steps**:
1. Keep existing Canvas `draw` function unchanged
2. Replace custom button styles with shadcn/ui Button
3. Update `provideEditor` to use Button component
4. Test hover states and click handlers

**Implementation Pattern**:
```typescript
// Before (Linaria)
const StyledButton = styled.button`...`;

// After (shadcn/ui)
import { Button } from "@/components/ui/button";

const Editor = (props) => (
    <Button
        variant="default"
        onClick={() => props.value.data.onClick?.()}
        className="w-full h-full"
    >
        {props.value.data.title}
    </Button>
);
```

#### 2.2 date-picker-cell.tsx Migration
**Complexity**: 🟡 Medium
**Estimated Time**: 4-6 hours

**Steps**:
1. Replace HTML input with shadcn/ui DatePicker
2. Handle date formatting and timezone logic
3. Integrate with Popover for dropdown calendar
4. Test min/max date constraints

**Implementation Pattern**:
```typescript
// Before
<StyledInputBox type="date" value={value} onChange={...} />

// After
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

<Popover>
    <PopoverTrigger asChild>
        <Button variant="outline">{displayDate}</Button>
    </PopoverTrigger>
    <PopoverContent>
        <Calendar selected={date} onSelect={setDate} />
    </PopoverContent>
</Popover>
```

#### 2.3 dropdown-cell.tsx Migration
**Complexity**: 🟡 Medium
**Estimated Time**: 6-8 hours

**Steps**:
1. Replace react-select with shadcn/ui Select
2. Migrate custom styling to Tailwind classes
3. Handle portal rendering with Select components
4. Test option rendering and selection logic

**Implementation Pattern**:
```typescript
// Before
<Select options={values} onChange={...} />

// After
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

<Select value={value} onValueChange={setValue}>
    <SelectTrigger>
        <SelectValue placeholder="Select option" />
    </SelectTrigger>
    <SelectContent>
        {options.map(option => (
            <SelectItem key={option.value} value={option.value}>
                {option.label}
            </SelectItem>
        ))}
    </SelectContent>
</Select>
```

### Phase 3: Complex Component Migration

#### 3.1 tags-cell.tsx Migration
**Complexity**: 🟡 Medium
**Estimated Time**: 6-8 hours

**Steps**:
1. Replace custom pill styling with Badge components
2. Convert checkboxes to shadcn/ui Checkbox
3. Handle tag selection state management
4. Update Canvas rendering for consistency

#### 3.2 multi-select-cell.tsx Migration
**Complexity**: 🔴 High
**Estimated Time**: 8-12 hours

**Steps**:
1. Replace react-select multi with Combobox + custom multi-select logic
2. Implement tag removal and duplicate handling
3. Handle complex portal rendering scenarios
4. Extensive testing of edge cases

### Phase 4: Integration & Testing

#### 4.1 Theme Integration Completion
- Complete CSS variable mapping
- Test theme switching
- Ensure visual consistency

#### 4.2 Performance Optimization
- Bundle size analysis
- Render performance testing
- Canvas rendering optimization

#### 4.3 Comprehensive Testing
- Unit tests for all migrated components
- Integration tests with DataEditor
- Visual regression testing
- Accessibility testing

## 🛠️ Development Commands

### Migration Workflow Commands
```bash
# Start development environment
npm run storybook

# Run tests during migration
npm run test-cells

# Build and check for issues
cd packages/cells && npm run build && npm run lint

# Test integration
npm run test-projects
```

### Component Testing Commands
```bash
# Test specific cell renderer
npm test -- button-cell
npm test -- dropdown-cell
npm test -- date-picker-cell

# Run visual tests
npm run storybook
# Navigate to: Cells -> [Component] -> Stories
```

## 📝 Implementation Checklist

### Pre-Migration Setup
- [ ] shadcn/ui CLI installed and configured
- [ ] Required components added to project
- [ ] Tailwind CSS integration verified
- [ ] Theme mapping utilities created
- [ ] Development environment set up

### Component Migration Checklist (per component)
- [ ] Canvas `draw` function preserved
- [ ] React editor component migrated
- [ ] Styling converted to Tailwind/shadcn
- [ ] Portal rendering tested
- [ ] Event handlers verified
- [ ] Theme integration confirmed
- [ ] Unit tests updated
- [ ] Integration tests passing
- [ ] Visual consistency verified

### Post-Migration Validation
- [ ] All components render correctly
- [ ] No regression in Canvas performance
- [ ] Theme switching works
- [ ] Bundle size acceptable
- [ ] Accessibility maintained
- [ ] Documentation updated

## 🔍 Testing Strategy

### Unit Testing
- Component rendering with various props
- Event handler functionality
- Theme application
- Portal rendering behavior

### Integration Testing
- DataEditor integration
- Cell switching and navigation
- Copy/paste operations
- Keyboard navigation

### Visual Testing
- Component appearance across themes
- Hover and focus states
- Animation and transitions
- Responsive behavior

### Performance Testing
- Bundle size impact
- Render performance
- Canvas rendering consistency
- Memory usage

## 📚 Reference Examples

### Canvas Rendering Pattern (Preserve)
```typescript
draw: (args, cell) => {
    const { ctx, theme, rect } = args;

    // Existing Canvas logic remains unchanged
    ctx.fillStyle = theme.accentColor;
    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);

    return true;
},
```

### provideEditor Pattern (Migrate)
```typescript
provideEditor: () => ({
    editor: (props) => {
        const { value, onChange, onFinishedEditing, theme } = props;

        return (
            <div className="w-full h-full p-2">
                {/* shadcn/ui components here */}
                <Button
                    onClick={() => onFinishedEditing(value)}
                    className="w-full"
                >
                    {value.data.title}
                </Button>
            </div>
        );
    },
    disablePadding: true,
}),
```

## 🚨 Common Pitfalls & Solutions

### Theme Integration Issues
**Problem**: shadcn/ui components not respecting grid theme
**Solution**: Use CSS variables and custom Tailwind configuration

### Portal Rendering Conflicts
**Problem**: Dropdowns not rendering in correct portal
**Solution**: Ensure `portalElementRef` is properly passed to shadcn components

### Bundle Size Increase
**Problem**: Adding shadcn/ui increases bundle size significantly
**Solution**: Use tree-shaking and lazy loading for complex components

### Performance Regression
**Problem**: React components slower than previous implementation
**Solution**: Optimize with React.memo and careful state management

---

This migration guide provides a structured approach to modernizing the Glide Data Grid cell renderers with shadcn/ui while maintaining the high-performance characteristics and API compatibility of the existing system.