<script setup lang="ts">
import { ref } from 'vue';
import { ChevronRight, X } from 'lucide-vue-next';
import { cn } from '../lib/utils';
import Container from './Container.vue';

export interface FooterLink {
  name: string;
  url: string;
}

export interface RelatedSiteGroup {
  id: string;
  title: string;
  links: FooterLink[];
}

export interface ContactInfo {
  label: string;
  description: string;
}

export interface SnsLink {
  name: string;
  href: string;
}

export interface FooterMenuItem {
  label: string;
  href: string;
  highlighted?: boolean;
}

const props = withDefaults(
  defineProps<{
    relatedSites?: RelatedSiteGroup[];
    contactInfo?: ContactInfo[];
    quickLinks?: FooterLink[];
    snsLinks?: SnsLink[];
    footerMenu?: FooterMenuItem[];
    address?: string;
    copyright?: string;
    identifierText?: string;
    class?: string;
  }>(),
  {
    relatedSites: () => [
      {
        id: 'family-sites',
        title: '가족 사이트',
        links: [
          { name: '건강iN', url: '#' },
          { name: 'The건강보험', url: '#' },
          { name: '요양기관업무포털', url: '#' },
        ],
      },
      {
        id: 'service-sites',
        title: '서비스 사이트',
        links: [
          { name: '민원신청', url: '#' },
          { name: '증명서발급', url: '#' },
          { name: '건강검진', url: '#' },
        ],
      },
    ],
    contactInfo: () => [
      { label: '대표전화 1577-1000', description: '(유료, 평일 09시~18시)' },
      { label: '해외이용 82-33-811-2001', description: '(유료, 평일 09시~18시)' },
    ],
    quickLinks: () => [
      { name: '찾아오시는 길', url: '#' },
      { name: '이용안내', url: '#' },
      { name: '직원검색', url: '#' },
    ],
    footerMenu: () => [
      { label: '개인정보처리방침', href: '#', highlighted: true },
      { label: '저작권 정책', href: '#' },
      { label: '웹 접근성 품질인증 마크 획득', href: '#' },
    ],
    address: '(26464) 강원특별자치도 원주시 건강로 32(반곡동) 국민건강보험공단',
    copyright: '© 2023 National Health Insurance Service. All rights reserved.',
    identifierText: '이 누리집은 보건복지부 누리집입니다.',
  }
);

const openModal = ref<string | null>(null);
</script>

<template>
  <footer
    id="krds-footer"
    :class="cn('relative z-50 bg-krds-gray-5', props.class)"
  >
    <!-- Related Sites Quick Access -->
    <div class="border-y border-krds-gray-10 bg-white">
      <Container class="flex flex-col lg:flex-row">
        <button
          v-for="site in relatedSites"
          :key="site.id"
          type="button"
          class="flex-1 flex items-center justify-between px-8 py-4 border-r border-krds-gray-10 last:border-r-0 hover:bg-krds-primary-5 transition-colors text-left"
          :title="`${site.title} 메뉴`"
          @click="openModal = site.id"
        >
          {{ site.title }}
          <ChevronRight class="h-5 w-5" aria-hidden="true" />
        </button>
      </Container>
    </div>

    <!-- Main Footer Content -->
    <Container class="py-10">
      <!-- Logo -->
      <div
        class="w-56 h-14 bg-no-repeat bg-contain bg-left"
        style="background-image: url('https://www.krds.go.kr/resources/img/component/icon/ico_logo_krds.svg')"
      >
        <span class="sr-only">KRDS - Korea Design System</span>
      </div>

      <div class="flex flex-col lg:flex-row gap-8 mt-9">
        <!-- Info Section -->
        <div class="flex-1 space-y-5">
          <p class="text-krds-gray-90">{{ address }}</p>
          <ul class="space-y-3">
            <li
              v-for="contact in contactInfo"
              :key="contact.label"
              class="flex items-center flex-wrap"
            >
              <strong class="font-bold">{{ contact.label }}</strong>
              <span class="ml-2">{{ contact.description }}</span>
            </li>
          </ul>
        </div>

        <!-- Links Section -->
        <div class="lg:w-1/4 space-y-9">
          <nav class="flex flex-col gap-2" aria-label="바로가기">
            <a
              v-for="link in quickLinks"
              :key="link.name"
              :href="link.url"
              class="flex items-center gap-2 text-krds-gray-90 hover:underline"
            >
              {{ link.name }}
              <ChevronRight class="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>

          <nav v-if="snsLinks && snsLinks.length > 0" class="flex gap-3" aria-label="소셜 미디어">
            <a
              v-for="sns in snsLinks"
              :key="sns.name"
              :href="sns.href"
              target="_blank"
              rel="noopener noreferrer"
              class="w-12 h-12 flex items-center justify-center border border-krds-gray-20 rounded-full hover:bg-krds-gray-5"
              :aria-label="`${sns.name} (새 창 열기)`"
            >
              <slot :name="`sns-${sns.name}`">
                <span class="text-xs">{{ sns.name.slice(0, 2) }}</span>
              </slot>
            </a>
          </nav>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="mt-6 pt-6 border-t border-krds-gray-10 space-y-9">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <nav class="flex flex-wrap gap-3" aria-label="사이트 정책">
            <a
              v-for="menu in footerMenu"
              :key="menu.label"
              :href="menu.href"
              :class="
                cn(
                  'text-krds-gray-90 hover:underline',
                  menu.highlighted && 'font-bold text-krds-accent-text'
                )
              "
            >
              {{ menu.label }}
            </a>
          </nav>
          <p class="text-sm text-krds-gray-50">{{ copyright }}</p>
        </div>

        <!-- KRDS Identifier -->
        <div class="flex items-center gap-3">
          <span
            class="w-16 h-6 bg-no-repeat bg-contain bg-center"
            style="background-image: url('https://www.krds.go.kr/resources/img/component/icon/ico_logo_krds_small.svg')"
          >
            <span class="sr-only">KRDS - Korea Design System</span>
          </span>
          <span class="text-sm text-krds-gray-70">{{ identifierText }}</span>
        </div>
      </div>
    </Container>

    <!-- Related Sites Modal -->
    <Teleport to="body">
      <template v-for="site in relatedSites" :key="site.id">
        <div
          v-if="openModal === site.id"
          class="fixed inset-0 z-[1000] bg-black/50"
          @click="openModal = null"
        />
        <div
          v-if="openModal === site.id"
          class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1001] w-[90%] max-w-4xl max-h-[85vh] bg-white rounded-xl shadow-lg"
        >
          <div class="flex items-center justify-between px-8 py-6 border-b border-krds-gray-10">
            <h2 class="text-xl font-bold">{{ site.title }}</h2>
            <button
              type="button"
              class="p-2 rounded-md hover:bg-krds-gray-5"
              aria-label="닫기"
              @click="openModal = null"
            >
              <X class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div class="p-8 overflow-y-auto max-h-[calc(85vh-5rem)]">
            <ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <li v-for="link in site.links" :key="link.name">
                <a
                  :href="link.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="block p-4 text-center text-krds-gray-70 border border-krds-gray-10 rounded-md hover:text-krds-primary-60 hover:border-krds-primary-20 hover:bg-krds-primary-5 transition-colors"
                >
                  {{ link.name }}
                  <span class="sr-only"> (새 창 열기)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </Teleport>
  </footer>
</template>
