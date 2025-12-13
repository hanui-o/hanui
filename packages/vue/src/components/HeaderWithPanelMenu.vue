<script setup lang="ts">
/**
 * HeaderWithPanelMenu 컴포넌트
 * PanelMenu를 포함하는 헤더 컴포넌트
 */
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { Search, Menu, X } from 'lucide-vue-next';
import { cn } from '@/lib/utils';
import Container from './Container.vue';
import Button from './Button.vue';
import Logo from './Logo.vue';
import PanelMenu from './PanelMenu.vue';
import SearchModal from './SearchModal.vue';

// ============================================================================
// Types (PanelMenu types)
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
// Props
// ============================================================================

const props = withDefaults(
  defineProps<{
    /** PanelMenu 항목 데이터 */
    menuItems: PanelMenuItem[];
    /** 현재 경로 */
    currentPath?: string;
    /** 로고 이미지 URL */
    logo?: string;
    /** 로고 alt 텍스트 */
    logoAlt?: string;
    /** 로고 링크 */
    logoHref?: string;
    /** 스크롤 시 헤더 동작 */
    stickyBehavior?: 'always' | 'auto' | 'never';
    /** auto 모드에서 헤더가 사라지기 시작하는 스크롤 위치 */
    scrollThreshold?: number;
    /** 패널 최소 높이 */
    panelMinHeight?: number;
    /** 인기검색어 목록 */
    popularKeywords?: any[];
    /** 최근검색어 목록 */
    recentKeywords?: any[];
    /** 추가 className */
    class?: string;
  }>(),
  {
    logo: 'https://www.krds.go.kr/resources/img/pattern/layout/head_logo.svg',
    logoAlt: '대한민국정부',
    logoHref: '/',
    stickyBehavior: 'always',
    scrollThreshold: 150,
    panelMinHeight: 262,
    popularKeywords: () => [],
    recentKeywords: () => [],
  }
);

const emit = defineEmits<{
  (e: 'search', value: string): void;
  (e: 'menuOpenChange', isOpen: boolean): void;
}>();

// ============================================================================
// State
// ============================================================================

const isMobileMenuOpen = ref(false);
const isSearchOpen = ref(false);
const isScrolled = ref(false);

// ============================================================================
// Computed
// ============================================================================

const positionClass = computed(() =>
  props.stickyBehavior === 'never' ? 'relative' : 'sticky top-0'
);

const hideClass = computed(() =>
  props.stickyBehavior === 'auto' && isScrolled.value ? '-translate-y-full' : ''
);

// ============================================================================
// Effects
// ============================================================================

function handleScroll() {
  isScrolled.value = window.scrollY > props.scrollThreshold;
}

onMounted(() => {
  if (props.stickyBehavior === 'auto') {
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
  }
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

// ============================================================================
// Handlers
// ============================================================================

function handleSearch(value: string) {
  emit('search', value);
  isSearchOpen.value = false;
}

function handleMenuOpenChange(isOpen: boolean) {
  emit('menuOpenChange', isOpen);
}
</script>

<template>
  <header
    :class="cn(
      'relative left-0 z-[70] bg-white border-b border-krds-gray-20 transition-transform duration-500 ease-in-out',
      positionClass,
      hideClass,
      props.class
    )"
  >
    <!-- Branding + PanelMenu + Actions -->
    <Container class="flex items-center justify-between py-2 gap-4">
      <!-- Logo -->
      <Logo :src="logo" :alt="logoAlt" :href="logoHref">
        <template #slogan>
          <slot name="slogan" />
        </template>
      </Logo>

      <!-- PanelMenu - Inline -->
      <PanelMenu
        :items="menuItems"
        :current-path="currentPath"
        :panel-min-height="panelMinHeight"
        class="hidden lg:block flex-1"
        @open-change="handleMenuOpenChange"
      />

      <!-- Actions -->
      <div class="inline-flex gap-3 md:gap-0">
        <Button
          variant="ghost"
          size="icon"
          class="min-w-0 hover:bg-krds-gray-10"
          aria-label="검색"
          @click="isSearchOpen = true"
        >
          <Search class="w-6 h-6" aria-hidden="true" />
        </Button>
        <SearchModal
          v-model:open="isSearchOpen"
          :popular-keywords="popularKeywords"
          :recent-keywords="recentKeywords"
          @search="handleSearch"
        />
        <Button
          variant="ghost"
          size="icon"
          class="lg:hidden min-w-0 hover:bg-krds-gray-10"
          :aria-label="isMobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'"
          :aria-expanded="isMobileMenuOpen"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <X v-if="isMobileMenuOpen" class="w-6 h-6" aria-hidden="true" />
          <Menu v-else class="w-6 h-6" aria-hidden="true" />
        </Button>
      </div>
    </Container>

    <!-- Mobile Menu -->
    <Teleport to="body">
      <div
        v-if="isMobileMenuOpen"
        class="lg:hidden fixed inset-0 z-[1000] bg-white overflow-y-auto"
      >
        <div class="flex justify-end items-center p-5 border-b border-krds-gray-20 sticky top-0 bg-white z-10">
          <Button
            variant="ghost"
            size="icon"
            class="min-w-0 hover:bg-krds-gray-10"
            aria-label="메뉴 닫기"
            @click="isMobileMenuOpen = false"
          >
            <X class="w-6 h-6" aria-hidden="true" />
          </Button>
        </div>
        <div class="p-5">
          <ul class="list-none m-0 p-0">
            <li
              v-for="(item, index) in menuItems"
              :key="`${item.label}-${index}`"
              class="border-b border-krds-gray-20 last:border-b-0"
            >
              <a
                v-if="item.href && !item.panel"
                :href="item.href"
                class="block py-4 text-base font-bold text-krds-gray-90 hover:text-krds-primary-60 transition-colors"
              >
                {{ item.label }}
              </a>
              <template v-else>
                <div class="py-4 text-base font-bold text-krds-gray-90">
                  {{ item.label }}
                </div>
                <ul
                  v-if="item.panel"
                  class="list-none m-0 p-0 pb-3 pl-4"
                >
                  <li v-for="panelItem in item.panel" :key="panelItem.label">
                    <a
                      v-if="panelItem.href"
                      :href="panelItem.href"
                      class="block py-2 text-krds-body-sm font-medium text-krds-gray-90 hover:text-krds-primary-60 transition-colors"
                    >
                      {{ panelItem.label }}
                    </a>
                    <div
                      v-else-if="panelItem.subContent"
                      class="py-2 text-krds-body-sm font-medium text-krds-gray-90"
                    >
                      {{ panelItem.label }}
                    </div>
                  </li>
                </ul>
              </template>
            </li>
          </ul>
        </div>
      </div>
    </Teleport>
  </header>
</template>
