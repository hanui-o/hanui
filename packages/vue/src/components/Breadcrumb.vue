<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrent?: boolean;
}

const props = withDefaults(
  defineProps<{
    items: BreadcrumbItem[];
    separator?: string;
    maxItems?: number;
    itemsBeforeCollapse?: number;
    itemsAfterCollapse?: number;
    ariaLabel?: string;
    class?: string;
  }>(),
  {
    separator: '/',
    itemsBeforeCollapse: 1,
    itemsAfterCollapse: 1,
    ariaLabel: 'Breadcrumb',
  }
);

interface DisplayItem extends BreadcrumbItem {
  isCollapsed?: boolean;
}

const displayedItems = computed<DisplayItem[]>(() => {
  if (!props.maxItems || props.items.length <= props.maxItems) {
    return props.items;
  }

  const totalSlots = props.maxItems - 1;
  const before = props.itemsBeforeCollapse;
  const after = Math.max(1, totalSlots - before);

  const beforeItems = props.items.slice(0, before);
  const afterItems = props.items.slice(props.items.length - after);

  return [
    ...beforeItems,
    { label: '...', isCollapsed: true },
    ...afterItems,
  ];
});

const linkClasses = cn(
  'text-krds-gray-70',
  'hover:text-krds-gray-95',
  'transition-colors',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-krds-primary-base focus-visible:ring-offset-2',
  'rounded-sm'
);
</script>

<template>
  <nav
    id="breadcrumb"
    :aria-label="ariaLabel"
    :class="cn('pt-6 mb-10', props.class)"
  >
    <ol class="flex items-center flex-wrap gap-2">
      <li
        v-for="(item, index) in displayedItems"
        :key="item.href || `${item.label}-${index}`"
        class="flex items-center gap-2"
      >
        <!-- Collapsed indicator -->
        <span
          v-if="(item as DisplayItem).isCollapsed"
          class="text-krds-gray-60"
          aria-hidden="true"
        >
          {{ item.label }}
        </span>

        <!-- Current page -->
        <span
          v-else-if="item.isCurrent || index === displayedItems.length - 1"
          class="font-medium text-krds-gray-95"
          aria-current="page"
        >
          {{ item.label }}
        </span>

        <!-- Link -->
        <a
          v-else
          :href="item.href || '#'"
          :class="linkClasses"
        >
          {{ item.label }}
        </a>

        <!-- Separator -->
        <span
          v-if="index !== displayedItems.length - 1"
          class="text-krds-gray-50 select-none"
          aria-hidden="true"
        >
          {{ separator }}
        </span>
      </li>
    </ol>
  </nav>
</template>
