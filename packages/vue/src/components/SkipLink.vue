<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { cn } from '../lib/utils';

export interface SkipLinkItem {
  href: string;
  label: string;
}

const props = withDefaults(
  defineProps<{
    links?: SkipLinkItem[];
    variant?: 'visible' | 'hidden';
    class?: string;
  }>(),
  {
    links: () => [{ href: '#main-content', label: '본문 바로가기' }],
    variant: 'hidden',
  }
);

onMounted(() => {
  if (import.meta.env.DEV && props.links.length > 3) {
    console.warn(
      'SkipLink: 최대 3개 링크를 권장합니다. 현재 개수:',
      props.links.length
    );
  }
});

const handleClick = (e: MouseEvent, href: string) => {
  e.preventDefault();

  const targetId = href.replace('#', '');
  const targetElement = document.getElementById(targetId);

  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

    const firstFocusable = targetElement.querySelector(
      'button:not([disabled]), [href]:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    ) as HTMLElement;

    setTimeout(() => {
      if (firstFocusable) {
        firstFocusable.focus();
      } else {
        targetElement.setAttribute('tabindex', '-1');
        targetElement.focus();
      }
    }, 100);

    if (window.history.pushState) {
      window.history.pushState(null, '', href);
    } else {
      window.location.hash = href;
    }
  }
};

const hiddenLinkClass =
  'fixed left-0 -top-full z-[9999] w-full h-8 px-4 py-2 text-[15px] text-center ' +
  'bg-krds-gray-90 text-white ' +
  'focus:top-0 focus:outline-none focus:ring-2 focus:ring-krds-func-info focus:ring-offset-2';

const visibleLinkClass =
  'block w-full px-4 py-2 text-sm text-center ' +
  'bg-krds-gray-90 text-white ' +
  'hover:bg-krds-gray-80 ' +
  'focus:outline-none focus:ring-2 focus:ring-krds-func-info focus:ring-offset-2';

const navClasses = computed(() =>
  cn(props.variant === 'visible' && 'flex flex-col', props.class)
);
</script>

<template>
  <nav
    id="krds-skip-link"
    aria-label="건너뛰기 링크"
    :class="navClasses"
  >
    <a
      v-for="link in links"
      :key="link.href"
      :href="link.href"
      @click="handleClick($event, link.href)"
      :class="variant === 'visible' ? visibleLinkClass : hiddenLinkClass"
    >
      {{ link.label }}
    </a>
  </nav>
</template>
