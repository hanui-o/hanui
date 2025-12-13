<script setup lang="ts">
/**
 * HeaderWithNavigation 컴포넌트
 * NavigationMenu를 포함하는 헤더 컴포넌트
 */
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { Search, Menu, X } from 'lucide-vue-next';
import { cn } from '@/lib/utils';
import Container from './Container.vue';
import Button from './Button.vue';
import Logo from './Logo.vue';
import NavigationMenu from './NavigationMenu.vue';
import SearchModal from './SearchModal.vue';

// ============================================================================
// Types
// ============================================================================

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

// ============================================================================
// Props
// ============================================================================

const props = withDefaults(
  defineProps<{
    /** NavigationMenu 항목 데이터 */
    menuItems: NavigationMenuItem[];
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
    popularKeywords: () => [],
    recentKeywords: () => [],
  }
);

const emit = defineEmits<{
  (e: 'search', value: string): void;
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
    <!-- Branding + NavigationMenu + Actions -->
    <Container class="flex items-center justify-between py-2 gap-4">
      <!-- Logo -->
      <Logo :src="logo" :alt="logoAlt" :href="logoHref">
        <template #slogan>
          <slot name="slogan" />
        </template>
      </Logo>

      <!-- NavigationMenu - Inline -->
      <NavigationMenu
        :items="menuItems"
        :current-path="currentPath"
        class="hidden lg:block flex-1"
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
                v-if="item.href && !item.sections && !item.children"
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
                  v-if="item.children"
                  class="list-none m-0 p-0 pb-3 pl-4"
                >
                  <li v-for="child in item.children" :key="child.label">
                    <a
                      :href="child.href"
                      class="block py-2 text-krds-body-sm font-medium text-krds-gray-90 hover:text-krds-primary-60 transition-colors"
                    >
                      {{ child.label }}
                    </a>
                  </li>
                </ul>
                <template v-if="item.sections">
                  <ul
                    v-for="(section, sIndex) in item.sections"
                    :key="sIndex"
                    class="list-none m-0 p-0 pb-3 pl-4"
                  >
                    <li v-for="link in section.links" :key="link.label">
                      <a
                        :href="link.href"
                        class="block py-2 text-krds-body-sm font-medium text-krds-gray-90 hover:text-krds-primary-60 transition-colors"
                      >
                        {{ link.label }}
                      </a>
                    </li>
                  </ul>
                </template>
              </template>
            </li>
          </ul>
        </div>
      </div>
    </Teleport>
  </header>
</template>
