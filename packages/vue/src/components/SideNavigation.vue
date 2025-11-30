<script setup lang="ts">
import { ref } from 'vue';
import { cn } from '../lib/utils';

export interface SideNavLink {
  label: string;
  href?: string;
  active?: boolean;
  children?: SideNavLink[];
}

export interface SideNavSection {
  label: string;
  href?: string;
  active?: boolean;
  children?: SideNavLink[];
}

const props = withDefaults(
  defineProps<{
    title: string;
    sections: SideNavSection[];
    class?: string;
  }>(),
  {}
);

// 2단계 섹션 열림 상태
const openSections = ref<Set<number>>(
  new Set(
    props.sections
      .map((section, index) =>
        section.active || section.children?.some((child) => child.active) ? index : -1
      )
      .filter((i) => i !== -1)
  )
);

// 3단계 메뉴 열림 상태
const openChildren = ref<Set<string>>(
  new Set(
    props.sections.flatMap((section, sectionIndex) =>
      (section.children || [])
        .map((child, childIndex) =>
          child.active || child.children?.some((c) => c.active)
            ? `${sectionIndex}-${childIndex}`
            : ''
        )
        .filter((key) => key !== '')
    )
  )
);

const toggleSection = (index: number) => {
  if (openSections.value.has(index)) {
    openSections.value.delete(index);
  } else {
    openSections.value.add(index);
  }
  openSections.value = new Set(openSections.value);
};

const toggleChild = (sectionIndex: number, childIndex: number) => {
  const key = `${sectionIndex}-${childIndex}`;
  if (openChildren.value.has(key)) {
    openChildren.value.delete(key);
  } else {
    openChildren.value.add(key);
  }
  openChildren.value = new Set(openChildren.value);
};
</script>

<template>
  <nav
    :class="cn('w-full max-w-[296px] py-10 pr-10 bg-white', props.class)"
    aria-labelledby="side-nav-title"
  >
    <!-- 1Depth-title -->
    <div
      id="side-nav-title"
      class="px-2 pb-4 m-0 border-b border-krds-gray-40 text-2xl font-bold leading-[1.4] text-krds-gray-90"
    >
      {{ title }}
    </div>

    <!-- 메뉴 리스트 -->
    <ul role="menubar" class="list-none p-0 m-0">
      <li
        v-for="(section, sectionIndex) in sections"
        :key="sectionIndex"
        role="none"
        :class="
          cn(
            'relative border-b border-krds-gray-20',
            (section.active || section.children?.some((child) => child.active)) &&
              'active border-krds-gray-30'
          )
        "
      >
        <!-- 2Depth with children -->
        <template v-if="section.children && section.children.length > 0">
          <button
            type="button"
            @click="toggleSection(sectionIndex)"
            :class="
              cn(
                'flex items-center justify-between w-full px-2 py-4 border-0 bg-transparent',
                'text-krds-body-md font-bold leading-[1.5] text-krds-gray-90 text-left cursor-pointer',
                'transition-all duration-200 ease-in-out',
                'hover:bg-krds-primary-5',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-krds-blue-60 focus-visible:outline-offset-[-2px]'
              )
            "
            role="menuitem"
            :aria-expanded="openSections.has(sectionIndex)"
            aria-haspopup="true"
          >
            {{ section.label }}
            <svg
              class="w-5 h-5 transition-transform duration-200"
              :class="openSections.has(sectionIndex) && 'rotate-180'"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- 3단계 하위 메뉴 -->
          <ul v-if="openSections.has(sectionIndex)" role="menu" class="list-none p-0 pb-2 m-0">
            <li
              v-for="(child, childIndex) in section.children"
              :key="childIndex"
              role="none"
              :class="cn('relative', child.active && 'active')"
            >
              <!-- 3Depth with grandchildren -->
              <template v-if="child.children && child.children.length > 0">
                <button
                  type="button"
                  @click="toggleChild(sectionIndex, childIndex)"
                  :class="
                    cn(
                      'flex items-center gap-2 w-full py-2 px-4 border-0 bg-transparent rounded-md',
                      'text-krds-body-md font-normal leading-[1.5] text-krds-gray-90 text-left cursor-pointer',
                      'transition-all duration-200',
                      'hover:bg-krds-primary-5',
                      'focus-visible:outline focus-visible:outline-2 focus-visible:outline-krds-blue-60'
                    )
                  "
                  role="menuitem"
                  :aria-expanded="openChildren.has(`${sectionIndex}-${childIndex}`)"
                >
                  <span class="mr-1">•</span>
                  {{ child.label }}
                  <svg
                    class="w-5 h-5 ml-auto transition-transform duration-200"
                    :class="openChildren.has(`${sectionIndex}-${childIndex}`) && 'rotate-180'"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <!-- 4단계 하위 메뉴 -->
                <ul
                  v-if="openChildren.has(`${sectionIndex}-${childIndex}`)"
                  role="menu"
                  class="list-none p-0 m-0"
                >
                  <li
                    v-for="(grandChild, grandChildIndex) in child.children"
                    :key="grandChildIndex"
                    role="none"
                  >
                    <a
                      :href="grandChild.href"
                      :class="
                        cn(
                          'flex items-center gap-2 w-full py-2 px-4 pl-10 bg-transparent rounded-md',
                          'text-krds-body-md font-normal leading-[1.5] text-krds-gray-90 text-left no-underline',
                          'hover:bg-krds-primary-5',
                          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-krds-blue-60',
                          grandChild.active &&
                            'font-bold text-krds-blue-60 ring-2 ring-krds-blue-60 rounded-md'
                        )
                      "
                      role="menuitem"
                      :aria-current="grandChild.active ? 'page' : undefined"
                    >
                      <span class="text-krds-gray-60">•</span>
                      {{ grandChild.label }}
                    </a>
                  </li>
                </ul>
              </template>

              <!-- 3Depth link (no grandchildren) -->
              <a
                v-else
                :href="child.href"
                :class="
                  cn(
                    'flex items-center gap-2 w-full py-2 px-4 border-0 bg-transparent rounded-md',
                    'text-krds-body-md font-normal leading-[1.5] text-krds-gray-90 text-left no-underline',
                    'hover:bg-krds-primary-5',
                    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-krds-blue-60',
                    child.active && 'font-bold text-krds-blue-60 ring-2 ring-krds-blue-60 rounded-md'
                  )
                "
                role="menuitem"
                :aria-current="child.active ? 'page' : undefined"
              >
                <span>•</span>
                {{ child.label }}
              </a>
            </li>
          </ul>
        </template>

        <!-- 2Depth link (no children) -->
        <a
          v-else
          :href="section.href"
          :class="
            cn(
              'flex items-center justify-between w-full py-3 px-3 border-0 bg-transparent',
              'text-krds-body-md font-normal leading-[1.5] text-krds-gray-90 text-left no-underline',
              'transition-all duration-200',
              'hover:bg-krds-gray-10',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-krds-blue-60',
              section.active && 'font-bold text-krds-blue-60'
            )
          "
          role="menuitem"
          :aria-current="section.active ? 'page' : undefined"
        >
          {{ section.label }}
        </a>
      </li>
    </ul>
  </nav>
</template>
