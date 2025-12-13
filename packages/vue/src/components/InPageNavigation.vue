<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { cn } from '@/lib/utils';

export interface InPageNavLink {
  label: string;
  href: string;
  active?: boolean;
}

const props = withDefaults(
  defineProps<{
    caption: string;
    title: string;
    links: InPageNavLink[];
    action?: {
      label: string;
      info?: string;
    };
    class?: string;
  }>(),
  {}
);

const emit = defineEmits<{
  action: [];
}>();

const activeLink = ref<string>(props.links.find((link) => link.active)?.href || props.links[0]?.href || '');

// Track scroll position and update active link
const handleScroll = () => {
  const sections = props.links
    .map((link) => {
      const id = link.href.replace('#', '');
      const element = document.getElementById(id);
      return element
        ? { id: link.href, top: element.getBoundingClientRect().top }
        : null;
    })
    .filter((s): s is { id: string; top: number } => s !== null);

  const current = sections.find((section) => section.top >= 0) || sections[sections.length - 1];

  if (current) {
    activeLink.value = current.id;
  }
};

const handleLinkClick = (e: MouseEvent, href: string) => {
  e.preventDefault();
  activeLink.value = href;

  const id = href.replace('#', '');
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.pushState(null, '', href);
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div
    :class="
      cn(
        'relative w-full',
        'lg:fixed lg:top-[120px] lg:right-0 lg:w-[280px] lg:z-[100]',
        'xl:w-[320px]',
        'max-lg:static max-lg:w-full max-lg:mb-8',
        'print:hidden',
        props.class
      )
    "
  >
    <div class="bg-krds-white p-6">
      <!-- Header -->
      <div class="mb-5 pb-4 border-b border-krds-gray-20">
        <p class="text-[13px] font-medium text-krds-gray-70 m-0 mb-2 tracking-tight">
          {{ caption }}
        </p>
        <p class="text-lg font-bold text-krds-gray-90 m-0 leading-[1.4] tracking-tight">
          {{ title }}
        </p>
      </div>

      <!-- Navigation List -->
      <nav class="mb-5" aria-label="In-page navigation">
        <ul class="list-none p-0 m-0">
          <li v-for="(link, index) in links" :key="index" class="m-0 p-0 last:mb-0 mb-1">
            <a
              :href="link.href"
              :class="
                cn(
                  'block py-2.5 px-3 text-[15px] font-medium text-krds-gray-70 no-underline rounded-md transition-all leading-[1.5] tracking-tight relative',
                  'hover:text-krds-primary-60 hover:bg-krds-primary-5',
                  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-krds-primary-60 focus-visible:outline-offset-2',
                  activeLink === link.href && 'text-krds-primary-80 bg-krds-primary-5 font-bold'
                )
              "
              :aria-current="activeLink === link.href ? 'location' : undefined"
              @click="(e) => handleLinkClick(e, link.href)"
            >
              {{ link.label }}
            </a>
          </li>
        </ul>
      </nav>

      <!-- Action -->
      <div v-if="action" class="pt-4 border-t border-krds-gray-20">
        <button
          type="button"
          class="w-full inline-flex items-center justify-center px-4 py-3 text-[15px] font-semibold text-white bg-krds-primary-60 rounded-md hover:bg-krds-primary-70 active:bg-krds-primary-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-krds-primary-60 focus-visible:outline-offset-2 transition-all tracking-tight"
          @click="emit('action')"
        >
          {{ action.label }}
        </button>
        <p
          v-if="action.info"
          class="text-[13px] text-krds-gray-70 mt-2 mb-0 text-center leading-[1.4]"
          v-html="action.info"
        />
      </div>
    </div>
  </div>
</template>
