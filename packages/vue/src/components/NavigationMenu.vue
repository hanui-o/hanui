<script setup lang="ts">
import { ref } from 'vue';
import { ChevronDown } from 'lucide-vue-next';
import { cn } from '../lib/utils';

export interface NavigationMenuLink {
  label: string;
  href: string;
  description?: string;
  active?: boolean;
}

export interface NavigationMenuSection {
  title?: string;
  links: NavigationMenuLink[];
  utilityLinks?: NavigationMenuLink[];
}

export interface NavigationMenuItem {
  label: string;
  href?: string;
  active?: boolean;
  sections?: NavigationMenuSection[];
  children?: NavigationMenuLink[];
  dropdownWidth?: string;
}

const props = withDefaults(
  defineProps<{
    items: NavigationMenuItem[];
    currentPath?: string;
    orientation?: 'horizontal' | 'vertical';
    class?: string;
  }>(),
  {
    orientation: 'horizontal',
  }
);

const openIndex = ref<number | null>(null);

const isItemActive = (item: NavigationMenuItem) => {
  return item.active || item.href === props.currentPath;
};

const handleItemClick = (index: number, hasDropdown: boolean) => {
  if (hasDropdown) {
    openIndex.value = openIndex.value === index ? null : index;
  }
};

const handleMouseEnter = (index: number, hasDropdown: boolean) => {
  if (hasDropdown) {
    openIndex.value = index;
  }
};

const handleMouseLeave = () => {
  openIndex.value = null;
};

const handleKeyDown = (e: KeyboardEvent, index: number, hasDropdown: boolean) => {
  if (e.key === 'Enter' || e.key === ' ') {
    if (hasDropdown) {
      e.preventDefault();
      handleItemClick(index, hasDropdown);
    }
  } else if (e.key === 'Escape') {
    openIndex.value = null;
  }
};
</script>

<template>
  <nav
    :class="cn('krds-navigation-menu relative', props.class)"
    aria-label="Main navigation"
  >
    <ul
      :class="
        cn(
          'flex mb-2',
          orientation === 'horizontal' ? 'flex-row items-center gap-2' : 'flex-col gap-1'
        )
      "
    >
      <li
        v-for="(item, index) in items"
        :key="index"
        class="relative"
        @mouseenter="handleMouseEnter(index, Boolean(item.sections || item.children))"
        @mouseleave="handleMouseLeave"
      >
        <!-- Dropdown Trigger -->
        <template v-if="item.sections || item.children">
          <button
            type="button"
            :class="
              cn(
                'group inline-flex items-center gap-1',
                'px-4 py-2 font-medium rounded-md',
                'transition-colors duration-200',
                'hover:bg-krds-gray-5',
                'focus:outline-none focus:ring-2 focus:ring-krds-primary-60 focus:ring-offset-2',
                openIndex === index && 'bg-krds-gray-5'
              )
            "
            :aria-expanded="openIndex === index"
            aria-haspopup="true"
            @click="handleItemClick(index, true)"
            @keydown="(e) => handleKeyDown(e, index, true)"
          >
            {{ item.label }}
            <ChevronDown
              :class="
                cn(
                  'relative top-[1px] transition-transform duration-200',
                  openIndex === index && 'rotate-180'
                )
              "
              :size="16"
              aria-hidden="true"
            />
          </button>

          <!-- Dropdown Content -->
          <div
            v-if="openIndex === index"
            :class="
              cn(
                'absolute top-full left-1/2 -translate-x-1/2 mt-1 z-50',
                item.dropdownWidth || 'w-[200px]',
                'rounded-lg border border-krds-gray-20 bg-white shadow-lg',
                'animate-in fade-in-0 zoom-in-95'
              )
            "
          >
            <!-- Sections -->
            <template v-if="item.sections">
              <div
                v-for="(section, sIndex) in item.sections"
                :key="sIndex"
                :class="cn('p-4', sIndex > 0 && 'border-t border-krds-gray-20')"
              >
                <h3
                  v-if="section.title"
                  class="text-xs font-semibold text-krds-gray-60 uppercase tracking-wide mb-3"
                >
                  {{ section.title }}
                </h3>

                <ul class="space-y-2">
                  <li v-for="(link, lIndex) in section.links" :key="lIndex">
                    <a
                      :href="link.href"
                      :class="
                        cn(
                          'block px-3 py-2 rounded-md',
                          'transition-colors',
                          'hover:bg-krds-gray-5',
                          'focus:outline-none focus:ring-2 focus:ring-krds-primary-60',
                          link.active && 'bg-krds-gray-5 text-krds-primary-60'
                        )
                      "
                      :aria-current="link.active ? 'page' : undefined"
                    >
                      <div class="font-medium text-krds-gray-90">
                        {{ link.label }}
                      </div>
                      <div
                        v-if="link.description"
                        class="text-xs text-krds-gray-60 mt-1"
                      >
                        {{ link.description }}
                      </div>
                    </a>
                  </li>
                </ul>

                <!-- Utility Links -->
                <div
                  v-if="section.utilityLinks && section.utilityLinks.length > 0"
                  class="mt-3 pt-3 border-t border-krds-gray-10"
                >
                  <ul class="space-y-1">
                    <li v-for="(uLink, uIndex) in section.utilityLinks" :key="uIndex">
                      <a
                        :href="uLink.href"
                        class="block px-3 py-1.5 text-xs font-medium text-krds-primary-60 hover:underline focus:outline-none focus:ring-2 focus:ring-krds-primary-60 rounded"
                      >
                        {{ uLink.label }} →
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </template>

            <!-- Simple Children -->
            <div v-else-if="item.children" class="p-2">
              <ul class="space-y-1">
                <li v-for="(child, cIndex) in item.children" :key="cIndex">
                  <a
                    :href="child.href"
                    :class="
                      cn(
                        'block px-3 py-2 rounded-md',
                        'text-krds-gray-90',
                        'transition-colors',
                        'hover:bg-krds-gray-5',
                        'focus:outline-none focus:ring-2 focus:ring-krds-primary-60',
                        child.active && 'bg-krds-gray-5 text-krds-primary-60'
                      )
                    "
                    :aria-current="child.active ? 'page' : undefined"
                  >
                    {{ child.label }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </template>

        <!-- Simple Link -->
        <a
          v-else
          :href="item.href"
          :class="
            cn(
              'block px-4 py-2 font-medium rounded-md',
              'transition-colors duration-200',
              'hover:bg-krds-gray-5',
              'focus:outline-none focus:ring-2 focus:ring-krds-primary-60 focus:ring-offset-2',
              isItemActive(item) && 'bg-krds-gray-5 text-krds-primary-60'
            )
          "
          :aria-current="isItemActive(item) ? 'page' : undefined"
        >
          {{ item.label }}
        </a>
      </li>
    </ul>
  </nav>
</template>
