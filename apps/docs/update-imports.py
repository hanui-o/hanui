#!/usr/bin/env python3
import re
import os
import sys

# Component categorization
CONTENT_COMPONENTS = {'PageSection', 'Section', 'SectionHeading', 'Subsection', 'PageNavigation', 'CodeBlock'}
HELPER_COMPONENTS = {'DoCard', 'DontCard', 'SimpleGrid', 'Wrap'}

def parse_imports(content):
    """Extract imports from @/components/hanui"""
    # Find the import statement
    pattern = r'import\s+{([^}]+)}\s+from\s+[\'"]@/components/hanui[\'"];?'
    match = re.search(pattern, content, re.MULTILINE | re.DOTALL)

    if not match:
        return None

    imports_str = match.group(1)
    # Split by comma and clean up
    imports = [imp.strip() for imp in imports_str.split(',')]

    return imports, match.group(0)

def categorize_imports(imports):
    """Categorize imports into content, helpers, and UI components"""
    content = []
    helpers = []
    ui = []

    for imp in imports:
        if imp in CONTENT_COMPONENTS:
            # Handle Section -> PageSection as Section alias
            if imp == 'Section':
                content.append('PageSection as Section')
            else:
                content.append(imp)
        elif imp in HELPER_COMPONENTS:
            helpers.append(imp)
        else:
            ui.append(imp)

    return content, helpers, ui

def generate_new_imports(content, helpers, ui):
    """Generate the new import statements"""
    lines = []

    if content:
        lines.append(f"// Docs layout components")
        lines.append(f"import {{ {', '.join(content)} }} from '@/components/content';")
        lines.append("")

    if helpers:
        lines.append(f"// Docs helper components")
        lines.append(f"import {{ {', '.join(helpers)} }} from '@/components/helpers';")
        lines.append("")

    if ui:
        lines.append(f"// UI components - from @hanui/react")
        lines.append(f"import {{")
        for i, component in enumerate(ui):
            comma = ',' if i < len(ui) - 1 else ''
            lines.append(f"  {component}{comma}")
        lines.append(f"}} from '@hanui/react';")

    return '\n'.join(lines)

def update_file(filepath):
    """Update imports in a single file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        result = parse_imports(content)
        if not result:
            return False, "No @/components/hanui imports found"

        imports, old_import = result

        content_comps, helper_comps, ui_comps = categorize_imports(imports)
        new_imports = generate_new_imports(content_comps, helper_comps, ui_comps)

        # Replace the old import with new imports
        new_content = content.replace(old_import, new_imports)

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)

        return True, f"Updated: {len(content_comps)} content, {len(helper_comps)} helpers, {len(ui_comps)} UI components"

    except Exception as e:
        return False, f"Error: {str(e)}"

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 update-imports.py <file1> [file2] ...")
        sys.exit(1)

    for filepath in sys.argv[1:]:
        if not os.path.exists(filepath):
            print(f"❌ {filepath}: File not found")
            continue

        success, message = update_file(filepath)
        status = "✅" if success else "❌"
        print(f"{status} {filepath}: {message}")

if __name__ == "__main__":
    main()
