<script setup lang="ts">
/**
 * PanelMenu 컴포넌트
 * KRDS 스타일 패널형 메뉴 (1Depth → 2Depth 패널 형태)
 */
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import {
  ChevronRight,
  ChevronDown,
  SquareArrowOutUpRight,
  ArrowRight,
} from 'lucide-vue-next';
import { cn } from '../lib/utils';
import Badge from './Badge.vue';

// ============================================================================
// Types
// ============================================================================

export interface PanelMenuLink {
  label: string;
  href?: string;
  onClick?: () => void;
  external?: boolean;
}

export interface PanelMenuSubContent {
  title: string;
  titleLink?: {
    label: string;
    href: string;
  };
  links: PanelMenuLink[];
  banner?: {
    badge?: string;
    label: string;
    href: string;
  };
}

export interface PanelMenu2DepthItem {
  label: string;
  href?: string;
  external?: boolean;
  subContent?: PanelMenuSubContent;
  active?: boolean;
}

export interface PanelMenuItem {
  label: string;
  href?: string;
  active?: boolean;
  panel?: PanelMenu2DepthItem[];
}

// ============================================================================
// Props & Emits
// ============================================================================

const props = withDefaults(
  defineProps<{
    /** 1Depth 메뉴 항목 배열 */
    items: PanelMenuItem[];
    /** 추가 className */
    class?: string;
    /** 현재 경로 (aria-current 설정용) */
    currentPath?: string;
    /** 패널 최소 높이 (px) */
    panelMinHeight?: number;
  }>(),
  {
    panelMinHeight: 262,
  }
);

const emit = defineEmits<{
  (e: 'openChange', isOpen: boolean): void;
}>();

// ============================================================================
// State
// ============================================================================

const open1Depth = ref<number | null>(null);
const active2Depth = ref<number | null>(null);
const menuRef = ref<HTMLElement | null>(null);

// ============================================================================
// Computed
// ============================================================================

const currentPanel = computed(() =>
  open1Depth.value !== null ? props.items[open1Depth.value]?.panel : null
);

const current2DepthItem = computed(() =>
  active2Depth.value !== null && currentPanel.value
    ? currentPanel.value[active2Depth.value]
    : null
);

// ============================================================================
// Styles
// ============================================================================

function get1DepthStyles(isActive: boolean, hasPanel: boolean, isOpen: boolean = false) {
  return cn(
    'relative h-full px-4',
    'transition-colors duration-200',
    'hover:bg-krds-primary-5',
    'pt-3 pb-4 font-bold text-krds-body-lg',
    'focus:outline-none focus:ring-2 focus:ring-krds-primary-60 focus:ring-offset-2',
    hasPanel ? 'group inline-flex items-center gap-1' : 'block',
    (isActive || isOpen) && [
      'before:absolute before:left-0 before:w-full before:h-1 before:bg-krds-secondary-70',
      hasPanel ? 'before:bottom-0' : 'before:bottom-0 text-krds-primary-60',
    ]
  );
}

function get2DepthStyles(isActive: boolean, hasSubContent: boolean) {
  return cn(
    'flex items-center gap-2 w-full px-6 py-4',
    'text-krds-body-md',
    'transition-colors duration-200',
    'focus:outline-none focus:ring-2 focus:ring-inset focus:ring-krds-secondary-80',
    'hover:bg-krds-white hover:text-krds-secondary-80 hover:font-bold',
    hasSubContent && 'bg-transparent border-none cursor-pointer text-left justify-between',
    hasSubContent
      ? isActive
        ? 'bg-white text-krds-secondary-80 font-bold'
        : 'text-krds-gray-90 font-medium'
      : isActive
        ? 'text-krds-secondary-80 font-bold'
        : 'text-krds-gray-90 font-medium'
  );
}

// ============================================================================
// Handlers
// ============================================================================

function handleToggle1Depth(index: number) {
  if (open1Depth.value === index) {
    open1Depth.value = null;
    active2Depth.value = null;
  } else {
    open1Depth.value = index;
    const panelItems = props.items[index]?.panel;
    if (panelItems) {
      const firstWithSub = panelItems.findIndex((item) => item.subContent);
      active2Depth.value = firstWithSub >= 0 ? firstWithSub : null;
    }
  }
}

function handleClose() {
  open1Depth.value = null;
  active2Depth.value = null;
}

// ============================================================================
// Effects
// ============================================================================

// 열림 상태 변경 시 콜백
watch(open1Depth, (val) => {
  emit('openChange', val !== null);
});

// 패널 열릴 때 body 스크롤 막기
watch(open1Depth, (val) => {
  if (val !== null) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

// 외부 클릭 시 닫기
function handleClickOutside(event: MouseEvent) {
  if (menuRef.value && !menuRef.value.contains(event.target as Node)) {
    handleClose();
  }
}

// ESC 키로 닫기
function handleEscape(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    handleClose();
  }
}

watch(open1Depth, (val) => {
  if (val !== null) {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
  } else {
    document.removeEventListener('mousedown', handleClickOutside);
    document.removeEventListener('keydown', handleEscape);
  }
});

onUnmounted(() => {
  document.body.style.overflow = '';
  document.removeEventListener('mousedown', handleClickOutside);
  document.removeEventListener('keydown', handleEscape);
});
</script>

<template>
  <nav
    ref="menuRef"
    :class="cn('krds-panel-menu', 'relative', props.class)"
    aria-label="주 메뉴"
  >
    <!-- 1Depth 메뉴 바 -->
    <ul class="flex flex-row items-center gap-2 list-none m-0 p-0">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="relative"
      >
        <!-- 패널이 있는 경우: 버튼 -->
        <button
          v-if="item.panel && item.panel.length > 0"
          type="button"
          :class="get1DepthStyles(
            !!(item.active || (item.href && item.href === currentPath)),
            true,
            open1Depth === index
          )"
          :data-state="open1Depth === index ? 'open' : 'closed'"
          :aria-expanded="open1Depth === index"
          aria-haspopup="true"
          @click="handleToggle1Depth(index)"
        >
          {{ item.label }}
          <ChevronDown
            :class="cn(
              'relative top-[1px] transition-transform duration-200',
              open1Depth === index && 'rotate-180'
            )"
            :size="20"
            aria-hidden="true"
          />
        </button>

        <!-- 패널이 없는 경우: 링크 -->
        <a
          v-else
          :href="item.href"
          :class="get1DepthStyles(
            !!(item.active || (item.href && item.href === currentPath)),
            false
          )"
          :aria-current="item.active || (item.href && item.href === currentPath) ? 'page' : undefined"
        >
          {{ item.label }}
        </a>
      </li>
    </ul>

    <!-- 2Depth 패널 -->
    <div
      v-if="open1Depth !== null && currentPanel"
      :class="cn(
        'absolute top-full mt-0 z-[90]',
        'left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen',
        'bg-white border-y border-krds-gray-20 shadow-lg',
        'animate-in fade-in-0 zoom-in-95 duration-200'
      )"
      role="menu"
    >
      <div class="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
        <div class="flex" :style="{ minHeight: `${panelMinHeight}px` }">
          <!-- 왼쪽: 2Depth 메뉴 리스트 -->
          <div class="w-[280px] flex-shrink-0 bg-krds-primary-5 border-r border-krds-gray-20">
            <ul class="list-none m-0 px-0 py-4" role="menubar">
              <li
                v-for="(item2, index2) in currentPanel"
                :key="index2"
                role="none"
              >
                <!-- 단순 링크 (subContent 없음) -->
                <a
                  v-if="!item2.subContent"
                  :href="item2.href"
                  :class="get2DepthStyles(!!item2.active, false)"
                  role="menuitem"
                  :target="item2.external ? '_blank' : undefined"
                  :rel="item2.external ? 'noopener noreferrer' : undefined"
                >
                  {{ item2.label }}
                  <SquareArrowOutUpRight
                    v-if="item2.external"
                    class="w-4 h-4 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <ArrowRight
                    v-else
                    class="w-4 h-4 flex-shrink-0"
                    aria-hidden="true"
                  />
                </a>

                <!-- subContent 트리거 -->
                <button
                  v-else
                  type="button"
                  :class="get2DepthStyles(active2Depth === index2, true)"
                  role="menuitem"
                  :aria-expanded="active2Depth === index2"
                  @click="active2Depth = index2"
                  @focus="active2Depth = index2"
                >
                  {{ item2.label }}
                  <ChevronRight
                    :class="cn(
                      'w-5 h-5 flex-shrink-0 transition-transform',
                      active2Depth === index2 && 'text-krds-secondary-80'
                    )"
                    aria-hidden="true"
                  />
                </button>
              </li>
            </ul>
          </div>

          <!-- 오른쪽: 서브 콘텐츠 -->
          <div class="flex-1 px-10 py-7">
            <div
              v-if="current2DepthItem?.subContent"
              role="menu"
              :aria-label="current2DepthItem.subContent.title"
            >
              <!-- 서브 타이틀 -->
              <div class="flex items-center gap-5 mb-5">
                <h2 class="text-krds-heading-md font-bold text-krds-gray-90 m-0">
                  {{ current2DepthItem.subContent.title }}
                </h2>
                <a
                  v-if="current2DepthItem.subContent.titleLink"
                  :href="current2DepthItem.subContent.titleLink.href"
                  class="inline-flex items-center gap-1 text-krds-body-sm font-medium text-krds-gray-70 hover:text-krds-primary-60 hover:underline transition-colors"
                >
                  <span class="underline">
                    {{ current2DepthItem.subContent.titleLink.label }}
                  </span>
                  <ChevronRight class="w-4 h-4" aria-hidden="true" />
                </a>
              </div>

              <!-- Last depth 링크 목록 -->
              <ul class="list-disc list-inside grid grid-cols-3 gap-x-7 gap-y-5 mb-6 marker:text-krds-gray-40">
                <li
                  v-for="(link, linkIndex) in current2DepthItem.subContent.links"
                  :key="linkIndex"
                  role="none"
                >
                  <a
                    v-if="link.href"
                    :href="link.href"
                    :class="cn(
                      'hover:text-krds-primary-60 hover:underline',
                      'transition-colors',
                      'focus:outline-none focus:ring-2 focus:ring-krds-primary-60 focus:ring-offset-2 rounded'
                    )"
                    role="menuitem"
                    :target="link.external ? '_blank' : undefined"
                    :rel="link.external ? 'noopener noreferrer' : undefined"
                  >
                    {{ link.label }}
                    <SquareArrowOutUpRight
                      v-if="link.external"
                      class="inline-block w-3 h-3 ml-1"
                      aria-hidden="true"
                    />
                  </a>
                  <button
                    v-else
                    type="button"
                    :class="cn(
                      'hover:text-krds-primary-60 hover:underline',
                      'transition-colors bg-transparent border-none cursor-pointer p-0',
                      'focus:outline-none focus:ring-2 focus:ring-krds-primary-60 focus:ring-offset-2 rounded'
                    )"
                    role="menuitem"
                    @click="link.onClick?.()"
                  >
                    {{ link.label }}
                  </button>
                </li>
              </ul>

              <!-- 배너 영역 -->
              <div
                v-if="current2DepthItem.subContent.banner"
                class="flex items-center gap-3 p-4 bg-krds-gray-5 rounded-lg"
              >
                <Badge
                  v-if="current2DepthItem.subContent.banner.badge"
                  variant="secondary"
                >
                  {{ current2DepthItem.subContent.banner.badge }}
                </Badge>
                <a
                  :href="current2DepthItem.subContent.banner.href"
                  class="inline-flex items-center gap-1 text-krds-body-md font-medium text-krds-gray-90 hover:text-krds-primary-60 transition-colors"
                >
                  {{ current2DepthItem.subContent.banner.label }}
                  <ChevronRight class="w-5 h-5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
