<script setup lang="ts">
/**
 * Carousel 컴포넌트
 * KRDS 캐러셀 - 슬라이드 형태의 배너
 */
import { ref, computed, watch } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { cn } from '@/lib/utils';

// Swiper CSS
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export interface CarouselSlide {
  id: string | number;
  title: string;
  description?: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
  buttonText?: string;
  buttonHref?: string;
}

export type CarouselVariant = 'visual' | 'card';
export type PaginationType = 'bullets' | 'fraction';

const props = withDefaults(
  defineProps<{
    /** 슬라이드 데이터 */
    slides: CarouselSlide[];
    /** variant */
    variant?: CarouselVariant;
    /** 자동 재생 */
    autoPlay?: boolean;
    /** 자동 재생 간격 (ms) */
    interval?: number;
    /** 무한 루프 */
    loop?: boolean;
    /** 화살표 표시 */
    showArrows?: boolean | 'auto';
    /** 페이지네이션 표시 */
    showPagination?: boolean | 'auto';
    /** 페이지네이션 타입 */
    paginationType?: PaginationType;
    /** 재생/정지 버튼 */
    showPlayPause?: boolean;
    /** 더보기 링크 */
    moreHref?: string;
    /** 호버시 일시정지 */
    pauseOnHover?: boolean;
    /** 섹션 타이틀 */
    sectionTitle?: string;
    /** 추가 클래스 */
    class?: string;
  }>(),
  {
    variant: 'visual',
    autoPlay: false,
    interval: 5000,
    loop: true,
    showArrows: 'auto',
    showPagination: 'auto',
    paginationType: 'bullets',
    showPlayPause: false,
    pauseOnHover: true,
  }
);

const emit = defineEmits<{
  (e: 'slideChange', index: number): void;
  (e: 'buttonClick', slide: CarouselSlide): void;
}>();

const swiperInstance = ref<SwiperType | null>(null);
const isPlaying = ref(props.autoPlay);

const modules = [Navigation, Pagination, Autoplay, A11y];

const hasMultipleSlides = computed(() => props.slides.length > 1);

const shouldShowArrows = computed(() =>
  props.showArrows === 'auto' ? hasMultipleSlides.value : props.showArrows
);

const shouldShowPagination = computed(() =>
  props.showPagination === 'auto' ? hasMultipleSlides.value : props.showPagination
);

const autoplayConfig = computed(() => {
  if (!props.autoPlay || !hasMultipleSlides.value) return false;
  return {
    delay: props.interval,
    disableOnInteraction: false,
    pauseOnMouseEnter: props.pauseOnHover,
  };
});

const navigationConfig = computed(() => {
  if (!shouldShowArrows.value) return false;
  return {
    nextEl: '.carousel-button-next',
    prevEl: '.carousel-button-prev',
  };
});

const paginationConfig = computed(() => {
  if (!shouldShowPagination.value) return false;
  return {
    el: '.carousel-pagination',
    clickable: props.paginationType === 'bullets',
    type: props.paginationType,
  };
});

const a11yConfig = {
  prevSlideMessage: '이전 슬라이드',
  nextSlideMessage: '다음 슬라이드',
  firstSlideMessage: '첫 번째 슬라이드',
  lastSlideMessage: '마지막 슬라이드',
  paginationBulletMessage: '{{index}}번째 슬라이드로 이동',
};

function onSwiper(swiper: SwiperType) {
  swiperInstance.value = swiper;
}

function onSlideChange(swiper: SwiperType) {
  emit('slideChange', swiper.realIndex);
}

function toggleAutoplay() {
  if (!swiperInstance.value) return;

  if (isPlaying.value) {
    swiperInstance.value.autoplay.stop();
    isPlaying.value = false;
  } else {
    swiperInstance.value.autoplay.start();
    isPlaying.value = true;
  }
}

const buttonBaseClass = cn(
  'flex items-center justify-center',
  'w-9 h-9 rounded-full',
  'border border-krds-gray-30 bg-white',
  'hover:bg-krds-gray-10 active:bg-krds-gray-20',
  'disabled:bg-krds-gray-10 disabled:cursor-not-allowed',
  'transition-colors'
);

const paginationClass = computed(() =>
  cn(
    'carousel-pagination',
    'flex items-center',
    props.paginationType === 'bullets' &&
      'gap-1.5 h-9 px-3 bg-krds-gray-90/10 rounded-full',
    props.paginationType === 'fraction' &&
      'gap-2 px-4 h-9 border border-krds-gray-30 rounded-full bg-white font-bold text-krds-body-sm',
    '[&_.swiper-pagination-bullet]:w-2 [&_.swiper-pagination-bullet]:h-2',
    '[&_.swiper-pagination-bullet]:bg-krds-gray-40 [&_.swiper-pagination-bullet]:rounded-full',
    '[&_.swiper-pagination-bullet]:opacity-100',
    '[&_.swiper-pagination-bullet-active]:w-8 [&_.swiper-pagination-bullet-active]:bg-krds-primary-60',
    '[&_.swiper-pagination-current]:text-krds-primary-60'
  )
);
</script>

<template>
  <div :class="cn(variant === 'visual' && 'bg-krds-gray-5', props.class)">
    <div :class="cn(variant === 'visual' && 'max-w-screen-xl mx-auto px-4')">
      <!-- Card variant 섹션 타이틀 -->
      <h2
        v-if="variant === 'card' && sectionTitle"
        class="text-krds-heading-sm font-bold text-krds-gray-90 mb-4"
      >
        {{ sectionTitle }}
      </h2>

      <div class="relative">
        <Swiper
          :modules="modules"
          :slides-per-view="1"
          :space-between="variant === 'card' ? 16 : 0"
          :speed="400"
          :loop="loop && hasMultipleSlides"
          :autoplay="autoplayConfig"
          :navigation="navigationConfig"
          :pagination="paginationConfig"
          :a11y="a11yConfig"
          class="w-full"
          @swiper="onSwiper"
          @slide-change="onSlideChange"
        >
          <SwiperSlide v-for="slide in slides" :key="slide.id">
            <!-- Visual Banner 슬라이드 -->
            <div
              v-if="variant === 'visual'"
              class="flex flex-col md:flex-row items-center justify-between gap-6 py-10 px-4"
            >
              <div class="flex-1 text-center md:text-left">
                <p class="text-krds-heading-lg font-bold text-krds-gray-90 mb-3">
                  {{ slide.title }}
                </p>
                <p
                  v-if="slide.description"
                  class="text-krds-body-md text-krds-gray-60 mb-6"
                >
                  {{ slide.description }}
                </p>
                <a
                  v-if="slide.buttonText"
                  :href="slide.buttonHref || '#'"
                  :class="cn(
                    'inline-flex items-center justify-center',
                    'px-6 py-3 rounded-lg',
                    'bg-krds-primary-60 text-white font-medium',
                    'hover:bg-krds-primary-70 transition-colors'
                  )"
                  @click="emit('buttonClick', slide)"
                >
                  {{ slide.buttonText }}
                </a>
              </div>
              <div v-if="slide.image" class="flex-shrink-0">
                <img
                  :src="slide.image"
                  :alt="slide.imageAlt || slide.title"
                  class="max-w-[243px] h-auto rounded-lg"
                />
              </div>
            </div>

            <!-- Card 슬라이드 -->
            <div
              v-else
              class="bg-white rounded-lg overflow-hidden border border-krds-gray-20 p-4"
            >
              <div class="mb-3">
                <p
                  v-if="slide.subtitle"
                  class="text-krds-body-sm text-krds-gray-50 mb-1"
                >
                  {{ slide.subtitle }}
                </p>
                <p class="text-krds-body-lg font-semibold text-krds-gray-90">
                  {{ slide.title }}
                </p>
              </div>
              <div
                v-if="slide.image"
                class="aspect-video rounded-lg overflow-hidden bg-krds-gray-10"
              >
                <img
                  :src="slide.image"
                  :alt="slide.imageAlt || slide.title"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        <!-- Navigation Arrows (Visual variant - 외부 배치) -->
        <template v-if="shouldShowArrows && variant === 'visual'">
          <button
            type="button"
            :class="cn(
              buttonBaseClass,
              'carousel-button-prev',
              'absolute left-2 top-1/2 -translate-y-1/2 z-10'
            )"
            aria-label="이전"
          >
            <svg class="w-5 h-5 text-krds-gray-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            :class="cn(
              buttonBaseClass,
              'carousel-button-next',
              'absolute right-2 top-1/2 -translate-y-1/2 z-10'
            )"
            aria-label="다음"
          >
            <svg class="w-5 h-5 text-krds-gray-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </template>

        <!-- Indicator -->
        <div
          v-if="shouldShowPagination || shouldShowArrows || showPlayPause || moreHref"
          :class="cn(
            'flex items-center gap-3 mt-4',
            variant === 'visual' ? 'justify-center' : 'justify-end'
          )"
        >
          <!-- Pagination -->
          <div v-if="shouldShowPagination" :class="paginationClass" />

          <!-- Play/Pause 버튼 -->
          <div v-if="showPlayPause && hasMultipleSlides" class="flex items-center gap-2">
            <button
              type="button"
              :class="buttonBaseClass"
              :aria-label="isPlaying ? '슬라이드 멈춤' : '슬라이드 재생'"
              @click="toggleAutoplay"
            >
              <!-- Pause icon -->
              <svg v-if="isPlaying" class="w-4 h-4 text-krds-gray-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect width="4" height="16" x="6" y="4" />
                <rect width="4" height="16" x="14" y="4" />
              </svg>
              <!-- Play icon -->
              <svg v-else class="w-4 h-4 text-krds-gray-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </button>
          </div>

          <!-- Card variant Navigation -->
          <div v-if="shouldShowArrows && variant === 'card'" class="flex items-center gap-2">
            <button
              type="button"
              :class="cn(buttonBaseClass, 'carousel-button-prev')"
              aria-label="이전"
            >
              <svg class="w-5 h-5 text-krds-gray-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              :class="cn(buttonBaseClass, 'carousel-button-next')"
              aria-label="다음"
            >
              <svg class="w-5 h-5 text-krds-gray-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>

          <!-- More 버튼 -->
          <a
            v-if="moreHref"
            :href="moreHref"
            :class="buttonBaseClass"
            aria-label="더 보기"
          >
            <svg class="w-5 h-5 text-krds-gray-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
