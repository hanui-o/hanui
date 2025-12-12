<script setup lang="ts">
/**
 * HeaderWithMegaMenu 컴포넌트
 * MegaMenu를 포함하는 헤더 컴포넌트
 */
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { Search, Menu, X, SquareArrowOutUpRight, Check } from 'lucide-vue-next';
import { cn } from '../lib/utils';
import Container from './Container.vue';
import Button from './Button.vue';
import Logo from './Logo.vue';
import MegaMenu from './MegaMenu.vue';
import SearchModal from './SearchModal.vue';
import DropdownMenu from './DropdownMenu.vue';
import DropdownMenuTrigger from './DropdownMenuTrigger.vue';
import DropdownMenuContent from './DropdownMenuContent.vue';
import DropdownMenuItem from './DropdownMenuItem.vue';

// ============================================================================
// Types
// ============================================================================

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

export interface UtilityLink {
  label: string;
  href?: string;
  children?: UtilityLink[];
  external?: boolean;
  icon?: any;
  isSelected?: boolean;
  onClick?: () => void;
}

// ============================================================================
// Props
// ============================================================================

const props = withDefaults(
  defineProps<{
    /** MegaMenu 컬럼 데이터 */
    megaColumns: MegaMenuColumn[];
    /** 유틸리티 링크 */
    utilityLinks?: UtilityLink[];
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
    <!-- Utility Bar -->
    <div
      v-if="utilityLinks && utilityLinks.length > 0"
      class="hidden lg:flex justify-end"
    >
      <Container class="flex justify-end">
        <ul class="flex justify-end list-none m-0 p-0">
          <li
            v-for="(link, index) in utilityLinks"
            :key="link.label"
            class="relative flex items-center"
          >
            <span
              v-if="index !== 0"
              class="inline-flex w-px h-3 bg-krds-gray-20"
            />

            <!-- Depth 2: DropdownMenu -->
            <DropdownMenu v-if="link.children && link.children.length > 0">
              <DropdownMenuTrigger
                class="inline-flex items-center gap-1 text-krds-body-sm font-medium text-krds-gray-90 hover:text-krds-primary-60 transition-colors py-2 px-3"
              >
                <component
                  v-if="link.icon"
                  :is="link.icon"
                  class="flex-shrink-0"
                  aria-hidden="true"
                />
                {{ link.label }}
              </DropdownMenuTrigger>
              <DropdownMenuContent
                class="rounded-xl min-w-[140px] py-2.5 z-[100]"
                align="end"
              >
                <template v-for="child in link.children" :key="child.label">
                  <a
                    v-if="child.href"
                    :href="child.href"
                    :target="child.external ? '_blank' : undefined"
                    :rel="child.external ? 'noopener noreferrer' : undefined"
                  >
                    <DropdownMenuItem
                      :class="cn(
                        'flex items-center justify-between gap-2 text-krds-body-sm',
                        child.isSelected && 'bg-krds-primary-5 font-medium'
                      )"
                    >
                      {{ child.label }}
                      <SquareArrowOutUpRight
                        v-if="child.external"
                        class="w-3 h-3"
                        aria-hidden="true"
                      />
                      <Check
                        v-if="child.isSelected"
                        class="w-4 h-4 text-krds-primary-60 ml-auto"
                        aria-hidden="true"
                      />
                    </DropdownMenuItem>
                  </a>
                  <DropdownMenuItem
                    v-else
                    :class="cn(
                      'flex items-center justify-between gap-2 text-krds-body-sm',
                      child.isSelected && 'bg-krds-primary-5 font-medium'
                    )"
                    @select="child.onClick?.()"
                  >
                    {{ child.label }}
                    <Check
                      v-if="child.isSelected"
                      class="w-4 h-4 text-krds-primary-60 ml-auto"
                      aria-hidden="true"
                    />
                  </DropdownMenuItem>
                </template>
              </DropdownMenuContent>
            </DropdownMenu>

            <!-- Depth 1: 일반 링크 -->
            <a
              v-else
              :href="link.href"
              class="inline-flex items-center gap-1 text-krds-body-sm font-medium text-krds-gray-90 hover:text-krds-primary-60 transition-colors py-2 px-3"
              :target="link.external ? '_blank' : undefined"
              :rel="link.external ? 'noopener noreferrer' : undefined"
            >
              <component
                v-if="link.icon"
                :is="link.icon"
                class="flex-shrink-0"
                aria-hidden="true"
              />
              {{ link.label }}
              <SquareArrowOutUpRight
                v-if="link.external"
                class="w-3 h-3 ml-1"
                aria-hidden="true"
              />
            </a>
          </li>
        </ul>
      </Container>
    </div>

    <!-- Branding + MegaMenu + Actions -->
    <Container class="flex items-center justify-between pt-2 lg:pt-2 gap-2">
      <!-- Logo -->
      <Logo :src="logo" :alt="logoAlt" :href="logoHref">
        <template #slogan>
          <slot name="slogan" />
        </template>
      </Logo>

      <!-- MegaMenu - Inline -->
      <MegaMenu :columns="megaColumns" class="hidden lg:block" />

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
              v-for="(column, index) in megaColumns"
              :key="`${column.title}-${index}`"
              class="border-b border-krds-gray-20 last:border-b-0"
            >
              <div class="py-4 text-base font-bold text-krds-gray-90">
                {{ column.title }}
              </div>
              <ul
                v-if="column.links && column.links.length > 0"
                class="list-none m-0 p-0 pb-3 pl-4"
              >
                <li v-for="link in column.links" :key="link.label">
                  <a
                    :href="link.href"
                    class="block py-2 text-krds-body-sm font-medium text-krds-gray-90 hover:text-krds-primary-60 transition-colors"
                  >
                    {{ link.label }}
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <div
            v-if="utilityLinks && utilityLinks.length > 0"
            class="flex flex-col gap-3 mt-8 pt-5 border-t border-krds-gray-20"
          >
            <Button
              v-for="link in utilityLinks.filter((l) => !l.children)"
              :key="link.label"
              :href="link.href"
              variant="tertiary"
              class="w-full justify-center"
            >
              {{ link.label }}
            </Button>
          </div>
        </div>
      </div>
    </Teleport>
  </header>
</template>
