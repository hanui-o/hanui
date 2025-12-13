<script setup lang="ts">
import { ref, onUnmounted } from 'vue';
import { cn } from '@/lib/utils';

export interface MegaMenuLink {
  label: string;
  href: string;
  active?: boolean;
}

export interface MegaMenuColumn {
  title: string;
  href?: string;
  links: MegaMenuLink[];
  active?: boolean;
}

const props = withDefaults(
  defineProps<{
    columns: MegaMenuColumn[];
    currentPath?: string;
    dropdownBgColor?: string;
    class?: string;
  }>(),
  {
    dropdownBgColor: 'bg-white',
  }
);

const isOpen = ref(true);
const activeColumn = ref<number | null>(null);
let timeoutId: ReturnType<typeof setTimeout> | null = null;

const isColumnActive = (column: MegaMenuColumn) => {
  return (
    column.active ||
    (props.currentPath && column.href === props.currentPath) ||
    (props.currentPath && column.links.some((link) => link.href === props.currentPath))
  );
};

const handleMouseEnter = () => {
  if (timeoutId) clearTimeout(timeoutId);
  isOpen.value = true;
};

const handleMouseLeave = () => {
  timeoutId = setTimeout(() => {
    isOpen.value = false;
    activeColumn.value = null;
  }, 200);
};

const handleColumnMouseEnter = (index: number) => {
  activeColumn.value = index;
};

const handleColumnFocus = (index: number) => {
  if (timeoutId) clearTimeout(timeoutId);
  isOpen.value = true;
  activeColumn.value = index;
};

const handleKeyDown = (e: KeyboardEvent, index: number) => {
  if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    isOpen.value = true;
    activeColumn.value = index;
  } else if (e.key === 'Escape') {
    isOpen.value = false;
    activeColumn.value = null;
  }
};

onUnmounted(() => {
  if (timeoutId) clearTimeout(timeoutId);
});
</script>

<template>
  <nav
    :class="cn('krds-mega-menu relative', props.class)"
    aria-label="메인 메뉴"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Main Menu Bar -->
    <ul class="flex items-center gap-2">
      <li v-for="(column, index) in columns" :key="index">
        <a
          :href="column.href || '#'"
          :class="
            cn(
              'flex items-center h-14 px-4 py-2 font-medium rounded-md',
              'transition-colors duration-200',
              'hover:bg-krds-gray-5',
              'focus:outline-none focus:ring-2 focus:ring-krds-primary-60 focus:ring-offset-2',
              isColumnActive(column) && 'bg-krds-gray-5 text-krds-primary-60',
              activeColumn === index && isOpen && 'bg-krds-gray-5'
            )
          "
          :aria-current="isColumnActive(column) ? 'page' : undefined"
          aria-haspopup="true"
          :aria-expanded="isOpen && activeColumn === index"
          @mouseenter="handleColumnMouseEnter(index)"
          @focus="handleColumnFocus(index)"
          @keydown="(e) => handleKeyDown(e, index)"
        >
          {{ column.title }}
        </a>
      </li>
    </ul>

    <!-- Mega Dropdown -->
    <div
      v-if="isOpen"
      :class="
        cn(
          'absolute left-1/2 -translate-x-1/2 top-full mt-6 z-50',
          'w-screen',
          dropdownBgColor,
          'border-t border-krds-gray-10',
          'shadow-md',
          'animate-in fade-in slide-in-from-top-2 duration-200'
        )
      "
      role="menu"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div
          :class="
            cn(
              'grid gap-12',
              columns.length === 2 && 'grid-cols-2',
              columns.length === 3 && 'grid-cols-3',
              columns.length === 4 && 'grid-cols-4',
              columns.length === 5 && 'grid-cols-5',
              columns.length === 6 && 'grid-cols-6',
              columns.length === 7 && 'grid-cols-7',
              columns.length >= 8 && 'grid-cols-4 lg:grid-cols-8'
            )
          "
        >
          <div
            v-for="(column, colIndex) in columns"
            :key="colIndex"
            :class="
              cn(
                'space-y-3',
                activeColumn === colIndex && 'opacity-100',
                activeColumn !== null && activeColumn !== colIndex && 'opacity-60'
              )
            "
            @mouseenter="handleColumnMouseEnter(colIndex)"
          >
            <!-- Column Title -->
            <h3 class="font-bold text-krds-gray-90 pb-2">
              <a
                v-if="column.href"
                :href="column.href"
                class="hover:text-krds-primary-60 transition-colors focus:outline-none focus:ring-2 focus:ring-krds-primary-60 rounded"
                role="menuitem"
              >
                {{ column.title }}
              </a>
              <span v-else>{{ column.title }}</span>
            </h3>

            <!-- Sub Links -->
            <ul class="space-y-2" role="menu">
              <li v-for="(link, linkIndex) in column.links" :key="linkIndex">
                <a
                  :href="link.href"
                  :class="
                    cn(
                      'block py-1.5 rounded-md',
                      'transition-colors',
                      'hover:bg-krds-gray-5 hover:text-krds-primary-60',
                      'focus:outline-none focus:ring-2 focus:ring-krds-primary-60',
                      link.active || link.href === currentPath
                        ? 'bg-krds-gray-5 text-krds-primary-60 font-medium'
                        : 'text-krds-gray-70'
                    )
                  "
                  :aria-current="link.active || link.href === currentPath ? 'page' : undefined"
                  role="menuitem"
                >
                  {{ link.label }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
