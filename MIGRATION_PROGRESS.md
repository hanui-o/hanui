# 📋 Documentation Migration Progress Update

## 🎯 Overall Progress: 12/17 Pages Complete (70.6%)

### ✅ Completed Pages (12/17)

| #   | Page       | Category      | Status      | Notes                                                              |
| --- | ---------- | ------------- | ----------- | ------------------------------------------------------------------ |
| 1   | Tabs       | Layout        | ✅ Complete | Baseline migration                                                 |
| 2   | Display    | Typography    | ✅ Complete | Typography component                                               |
| 3   | Heading    | Typography    | ✅ Complete | Typography component                                               |
| 4   | NavText    | Typography    | ✅ Complete | Typography component                                               |
| 5   | Spacing    | Design System | ✅ Complete | Design token page                                                  |
| 6   | Input      | Form          | ✅ Complete | Form component                                                     |
| 7   | Label      | Form          | ✅ Complete | **API Fix**: Font weight corrected (Bold 700 → Regular 400)        |
| 8   | Select     | Selection     | ✅ Complete | **Radix UI**: Added Radix UI features section                      |
| 9   | FileUpload | Form          | ✅ Complete | **API Fix**: onChange type corrected (`File[]` → `UploadedFile[]`) |
| 10  | Tooltip    | Help          | ✅ Complete | Custom component with Foundation Layer                             |
| 11  | Pagination | Navigation    | ✅ Complete | Smart ellipsis pagination                                          |
| 12  | SkipLink   | Navigation    | ✅ Complete | WCAG Level A compliance component                                  |

### ⏳ Remaining Pages (5/17)

| #   | Page           | Category   | Path                                                               | Component Path                                       | Status     |
| --- | -------------- | ---------- | ------------------------------------------------------------------ | ---------------------------------------------------- | ---------- |
| 13  | SideNavigation | Navigation | `/apps/docs/src/app/components/navigation/sidenavigation/page.tsx` | `/packages/react/src/components/side-navigation.tsx` | ⏳ Pending |
| 14  | MainMenu       | Navigation | `/apps/docs/src/app/components/navigation/mainmenu/page.tsx`       | `/packages/react/src/components/main-menu.tsx`       | ⏳ Pending |
| 15  | Identifier     | Identity   | `/apps/docs/src/app/components/identity/identifier/page.tsx`       | `/packages/react/src/components/Identifier/`         | ⏳ Pending |
| 16  | Header         | Identity   | `/apps/docs/src/app/components/identity/header/page.tsx`           | `/packages/react/src/components/Header/`             | ⏳ Pending |
| 17  | Masthead       | Identity   | `/apps/docs/src/app/components/identity/masthead/page.tsx`         | `/packages/react/src/components/Masthead/`           | ⏳ Pending |

---

## 🔧 Infrastructure Changes Made

### Export Configuration Updates

**File**: `/apps/docs/components/hanui/index.ts`

Added the following exports:

```typescript
// Typography
export { Display } from './display';
export { NavText } from './navtext';

// Content Components
export { StructuredList } from './structured-list';
```

**New Re-export Files Created**:

- `/apps/docs/components/hanui/display.tsx`
- `/apps/docs/components/hanui/label.tsx`
- `/apps/docs/components/hanui/navtext.tsx`
- `/apps/docs/components/hanui/structured-list.tsx`

All follow the pattern:

```typescript
export { ComponentName } from '@hanui/react';
```

---

## 📖 Detailed Migration Guide for Remaining Pages

### Step-by-Step Migration Process

#### 1️⃣ Pre-Migration Checklist

**For each page, verify:**

```bash
# 1. Check if component exists
ls /Users/jeongmiae/Library/Mobile\ Documents/com~apple~CloudDocs/odada/00-github/--git-odada/--HANUI/packages/react/src/components/ComponentName/

# 2. Read the component implementation
# Look for: Props interface, default values, Radix UI usage
```

**Component verification:**

- ✅ SideNavigation: exists at `/packages/react/src/components/side-navigation.tsx`
- ✅ MainMenu: exists at `/packages/react/src/components/main-menu.tsx`
- ✅ Identifier: exists at `/packages/react/src/components/Identifier/`
- ✅ Header: exists at `/packages/react/src/components/Header/`
- ✅ Masthead: exists at `/packages/react/src/components/Masthead/`

#### 2️⃣ Standard Migration Template

**Every migrated page MUST follow this exact structure:**

```tsx
'use client';

import { ComponentName } from '@hanui/react';
import { useState } from 'react'; // If needed for interactive examples
import {
  Section,
  Subsection,
  SectionHeading,
  Body,
  Card,
  Code,
  List,
  ListItem,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  PageNavigation,
  DoCard,
  DontCard,
} from '@/components/hanui';

export default function ComponentPage() {
  // State for interactive examples (if needed)

  return (
    <Section>
      {/* 1. Page Title */}
      <SectionHeading
        level="h1"
        id="component-name"
        title="Component Name"
        description="한글 설명입니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* 2. Installation */}
          <Subsection level="h2">
            <SectionHeading level="h2" id="installation" title="설치" />
            <Body>
              CLI를 사용하여 컴포넌트를 프로젝트에 설치할 수 있습니다.
            </Body>
            <Card>
              <Code language="bash">npx @hanui/cli add component-name</Code>
            </Card>
          </Subsection>

          {/* 3. What is it */}
          <Subsection level="h2">
            <SectionHeading
              level="h2"
              id="what-is-it"
              title="ComponentName이란?"
            />
            <Body>컴포넌트에 대한 설명...</Body>
            <Body>WCAG/KWCAG 준수 정보...</Body>
          </Subsection>

          {/* 4. Preview Examples */}
          <Subsection level="h2">
            <SectionHeading level="h2" id="preview" title="미리보기" />

            <Subsection level="h3">
              <SectionHeading level="h3" id="basic" title="기본" />
              <Card>{/* Live example */}</Card>
              <Card>
                <Code language="tsx">{`code here`}</Code>
              </Card>
            </Subsection>

            {/* More example subsections... */}
          </Subsection>

          {/* 5. Usage */}
          <Subsection level="h2">
            <SectionHeading level="h2" id="usage" title="사용 방법" />
            <Card>
              <Code language="tsx">{`import example`}</Code>
            </Card>
          </Subsection>

          {/* 6. Best Practices */}
          <Subsection level="h2">
            <SectionHeading level="h2" id="best-practices" title="모범 사례" />

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="when-to-use"
                title="언제 사용하나요?"
              />
              <DoCard>
                <List variant="check">
                  <ListItem>Use case 1</ListItem>
                  <ListItem>Use case 2</ListItem>
                </List>
              </DoCard>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="when-not-to-use"
                title="언제 사용하지 말아야 하나요?"
              />
              <DontCard>
                <List variant="xmark">
                  <ListItem>Anti-pattern 1</ListItem>
                  <ListItem>Anti-pattern 2</ListItem>
                </List>
              </DontCard>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="implementation-tips"
                title="구현 팁"
              />
              <List variant="disc">
                <ListItem>
                  <strong>Tip 1:</strong> Description
                </ListItem>
                <ListItem>
                  <strong>Tip 2:</strong> Description
                </ListItem>
              </List>
            </Subsection>
          </Subsection>

          {/* 7. Accessibility */}
          <Subsection level="h2">
            <SectionHeading level="h2" id="accessibility" title="접근성" />
            <Body>
              이 컴포넌트는 WCAG 2.1 / KWCAG 2.2 AA 기준을 준수합니다.
            </Body>

            <List variant="disc">
              <ListItem>
                <strong>Feature 1:</strong> Description
              </ListItem>
              <ListItem>
                <strong>Feature 2:</strong> Description
              </ListItem>
            </List>
          </Subsection>

          {/* 8. Foundation Layer */}
          <Subsection level="h2">
            <SectionHeading
              level="h2"
              id="foundation-layer"
              title="Foundation Layer"
            />
            <Body>컴포넌트가 자동으로 처리하는 기능들...</Body>

            <Card variant="filled">
              <List variant="check">
                <ListItem>
                  <strong>Auto feature 1:</strong> Description
                </ListItem>
                <ListItem>
                  <strong>Auto feature 2:</strong> Description
                </ListItem>
              </List>
            </Card>
          </Subsection>
        </TabsContent>

        <TabsContent value="api">
          {/* API Reference */}
          <Subsection level="h2">
            <SectionHeading
              level="h2"
              id="api-reference"
              title="API Reference"
            />

            <Subsection level="h3">
              <SectionHeading level="h3" id="props" title="Props" />
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prop</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Default</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>propName</Code>
                    </TableCell>
                    <TableCell>
                      <Code>type</Code>
                    </TableCell>
                    <TableCell>
                      <Code>default</Code>
                    </TableCell>
                    <TableCell>Description</TableCell>
                  </TableRow>
                  {/* More rows... */}
                </TableBody>
              </Table>
            </Subsection>
          </Subsection>
        </TabsContent>
      </Tabs>

      {/* 9. Page Navigation */}
      <PageNavigation
        previous={{
          title: 'Previous Page',
          href: '/path/to/previous',
        }}
        next={{
          title: 'Next Page',
          href: '/path/to/next',
        }}
      />
    </Section>
  );
}
```

#### 3️⃣ Four-Point Migration Checklist

**Run this checklist for EVERY page before marking it complete:**

##### ✅ 1. Component Existence (컴포넌트 유무)

```bash
# Verify component exists
find /Users/jeongmiae/Library/Mobile\ Documents/com~apple~CloudDocs/odada/00-github/--git-odada/--HANUI/packages/react/src/components -name "*ComponentName*"

# Read the component file
# Check: Does it exist? What are the exports?
```

**Action**: If component doesn't exist, create placeholder page or skip.

##### ✅ 2. API Reference Verification (API 레퍼런스 확인)

```bash
# Read component implementation
cat /path/to/component/Component.tsx

# Look for:
# - Props interface definition
# - Default values
# - Required vs optional props
# - Type definitions
```

**CRITICAL**: Compare documentation Props table with actual component interface.

**Known discrepancies found:**

- ❌ **Label**: Doc said `font-weight: bold (700)` → Actual: `font-weight: normal (400)` ✅ Fixed
- ❌ **FileUpload**: Doc said `onChange: (files: File[])` → Actual: `onChange: (files: UploadedFile[])` ✅ Fixed

**Action**: If mismatch found, update documentation to match the component implementation.

##### ✅ 3. Content Cleanup (내용 정리)

**Remove all legacy imports:**

```tsx
// ❌ DELETE THESE
import { PageHeader } from '@/components/content/PageHeader';
import { CodeBlock } from '@/components/content/CodeBlock';
import { GuidelineSection } from '@/components/content/GuidelineSection';
import { ComponentPreview } from '@/components/content/ComponentPreview';
import { SectionHeading } from '@/components/hanui/section-header'; // OLD VERSION
```

**Use only new imports:**

```tsx
// ✅ USE THESE
import {
  Section,
  Subsection,
  SectionHeading, // NEW VERSION from section-heading-improved
  Body,
  Card,
  Code,
  // ... all from @/components/hanui
} from '@/components/hanui';
```

##### ✅ 4. Radix UI Features (Radix 기능 주입)

**Check component for Radix UI usage:**

```typescript
// Look for imports like:
import * as RadixSelect from '@radix-ui/react-select';
import * as RadixTabs from '@radix-ui/react-tabs';
// etc.
```

**If Radix UI is used**, add this subsection in the API tab:

```tsx
<Subsection level="h3">
  <SectionHeading level="h3" id="radix-features" title="Radix UI 기능" />
  <Card variant="filled">
    <List variant="check" className="text-krds-gray-90">
      <ListItem>
        <strong>@radix-ui/react-component:</strong> 설명...
      </ListItem>
      <ListItem>
        <strong>자동 ARIA:</strong> 설명...
      </ListItem>
      {/* More features */}
    </List>
  </Card>
</Subsection>
```

**Example**: See `/apps/docs/src/app/components/selection/select/page.tsx` (Select component uses Radix UI)

#### 4️⃣ Build Verification

After each page migration:

```bash
# Test docs build
cd /Users/jeongmiae/Library/Mobile\ Documents/com~apple~CloudDocs/odada/00-github/--git-odada/--HANUI/apps/docs
npm run build

# Should see:
# ✓ Compiled successfully
# ✓ Generating static pages (57/57)
```

**If build fails:**

1. Check for missing exports in `/apps/docs/components/hanui/index.ts`
2. Create re-export file if needed (e.g., `component-name.tsx`)
3. Verify import paths are correct

---

## 🚨 Common Pitfalls to Avoid

### ❌ DON'T DO THIS

1. **Don't revert changes when fixing errors**

   ```
   ❌ Going back to old version to fix build errors
   ✅ Only fix the error while keeping all current changes
   ```

2. **Don't use legacy components**

   ```tsx
   ❌ import { PageHeader } from '@/components/content/PageHeader';
   ✅ import { SectionHeading } from '@/components/hanui';
   ```

3. **Don't forget to update PageNavigation links**

   ```tsx
   ❌ next={{ title: 'NextPage', href: '/wrong/path' }}
   ✅ next={{ title: 'NextPage', href: '/correct/path' }}
   ```

4. **Don't skip the 4-point checklist**
   - Every page MUST go through all 4 checks
   - Document any API mismatches found

5. **Don't assume Props without verification**
   ```
   ❌ Copying old documentation Props table
   ✅ Read actual component file and verify each prop
   ```

### ✅ DO THIS

1. **Always check component implementation first**
2. **Use consistent section ordering** (Installation → What is it → Preview → Usage → Best Practices → Accessibility → Foundation Layer)
3. **Add Radix UI section** if component uses Radix primitives
4. **Test build after each page**
5. **Update todo list** after completion

---

## 📂 File Structure Reference

### Completed Example Files (Use as Reference)

**Best examples to follow:**

- `/apps/docs/src/app/components/selection/select/page.tsx` - Radix UI component
- `/apps/docs/src/app/components/help/tooltip/page.tsx` - Custom component with Foundation Layer
- `/apps/docs/src/app/components/navigation/pagination/page.tsx` - Complex state management
- `/apps/docs/src/app/components/navigation/skiplink/page.tsx` - Accessibility-focused component

### Import Pattern (Copy This Exactly)

```tsx
'use client';

import { ComponentName } from '@hanui/react';
import { useState } from 'react'; // Only if needed
import {
  Section,
  Subsection,
  SectionHeading,
  Body,
  Card,
  Code,
  List,
  ListItem,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  PageNavigation,
  DoCard,
  DontCard,
} from '@/components/hanui';
```

---

## 🎯 Next Steps for Cursor

### Priority Order

1. **SideNavigation** - Complex navigation component
2. **MainMenu** - Header navigation component
3. **Identifier** - Identity component
4. **Header** - Page header component
5. **Masthead** - Top banner component

### Before You Start

```bash
# 1. Verify current branch
git branch  # Should be on feature/v0.2.0-docs-migration

# 2. Check current status
git status

# 3. Start with clean state
git stash  # If you have uncommitted changes
```

### For Each Page

```bash
# 1. Read component implementation
cat /Users/jeongmiae/Library/Mobile\ Documents/com~apple~CloudDocs/odada/00-github/--git-odada/--HANUI/packages/react/src/components/ComponentName/*.tsx

# 2. Read current page
cat /Users/jeongmiae/Library/Mobile\ Documents/com~apple~CloudDocs/odada/00-github/--git-odada/--HANUI/apps/docs/src/app/components/category/component-name/page.tsx

# 3. Apply template from this issue

# 4. Run 4-point checklist

# 5. Test build
npm run build

# 6. Mark todo as complete
```

---

## 📊 Final Checklist Before PR

- [ ] All 17 pages migrated
- [ ] All pages follow identical structure
- [ ] All API references verified against component code
- [ ] Build passes without errors
- [ ] No legacy component imports remain
- [ ] Git status shows only intentional changes
- [ ] Commit with proper message format

---

## 🔗 Related Files

- Migration template: This issue
- Completed examples: `/apps/docs/src/app/components/selection/select/page.tsx`
- Export config: `/apps/docs/components/hanui/index.ts`
- Component source: `/packages/react/src/components/`

---

**Last Updated**: 2025-01-20
**Updated By**: Claude (Sonnet 4.5)
**Completion**: 12/17 pages (70.6%)
