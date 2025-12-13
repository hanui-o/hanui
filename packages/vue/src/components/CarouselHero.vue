<script setup lang="ts">
/**
 * CarouselHero 컴포넌트
 * Hero 스타일 캐러셀 - 메인 비주얼/인트로 배너용
 */
import { ref, computed } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Autoplay, A11y } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-vue-next';
import { cn } from '@/lib/utils';

// Swiper CSS
import 'swiper/css';
import 'swiper/css/navigation';

export interface HeroCarouselSlide {
  /** 슬라이드 고유 ID */
  id: string | number;
  /** 메인 타이틀 */
  title: string;
  /** 설명 텍스트 */
  description?: string;
  /** 이미지 URL */
  imageSrc?: string;
  /** 이미지 alt 텍스트 */
  imageAlt?: string;
  /** CTA 버튼 텍스트 */
  buttonText?: string;
  /** CTA 버튼 링크 */
  buttonHref?: string;
}

const props = withDefaults(
  defineProps<{
    /** 슬라이드 데이터 배열 */
    slides: HeroCarouselSlide[];
    /** 자동 재생 여부 */
    autoPlay?: boolean;
    /** 자동 재생 간격 (ms) */
    interval?: number;
    /** 무한 루프 */
    loop?: boolean;
    /** 화살표 표시 여부 */
    showArrows?: boolean;
    /** 페이지네이션 표시 여부 */
    showPagination?: boolean;
    /** 재생/정지 버튼 표시 여부 */
    showPlayPause?: boolean;
    /** 호버시 자동재생 일시정지 */
    pauseOnHover?: boolean;
    /** 추가 className */
    class?: string;
  }>(),
  {
    autoPlay: false,
    interval: 5000,
    loop: true,
    showArrows: true,
    showPagination: true,
    showPlayPause: false,
    pauseOnHover: true,
  }
);

const emit = defineEmits<{
  (e: 'slideChange', index: number): void;
  (e: 'buttonClick', slide: HeroCarouselSlide): void;
}>();

const swiperInstance = ref<SwiperType | null>(null);
const isPlaying = ref(props.autoPlay);
const activeIndex = ref(0);

const modules = [Navigation, Autoplay, A11y];

const hasMultipleSlides = computed(() => props.slides.length > 1);

const autoplayConfig = computed(() => {
  if (!props.autoPlay || !hasMultipleSlides.value) return false;
  return {
    delay: props.interval,
    disableOnInteraction: false,
    pauseOnMouseEnter: props.pauseOnHover,
  };
});

const navigationConfig = computed(() => {
  if (!props.showArrows || !hasMultipleSlides.value) return false;
  return {
    nextEl: '.hero-carousel-button-next',
    prevEl: '.hero-carousel-button-prev',
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
  activeIndex.value = swiper.realIndex;
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

function goToSlide(index: number) {
  if (swiperInstance.value) {
    swiperInstance.value.slideToLoop(index);
  }
}

const buttonBaseClass = cn(
  'flex items-center justify-center',
  'w-12 h-12 rounded-full',
  'bg-[rgba(255,255,255,0.5)]',
  'hover:bg-krds-gray-10 active:bg-krds-gray-20',
  'disabled:bg-krds-gray-10 disabled:cursor-not-allowed',
  'transition-colors'
);
</script>

<template>
  <div :class="cn('bg-krds-white', props.class)">
    <div class="relative">
      <Swiper
        :modules="modules"
        :slides-per-view="1"
        :space-between="0"
        :speed="400"
        :loop="loop && hasMultipleSlides"
        :autoplay="autoplayConfig"
        :navigation="navigationConfig"
        :pagination="false"
        :a11y="a11yConfig"
        class="w-full"
        @swiper="onSwiper"
        @slide-change="onSlideChange"
      >
        <SwiperSlide v-for="slide in slides" :key="slide.id">
          <!-- Hero 슬라이드: 배경 이미지 + 텍스트 오버레이 -->
          <div class="relative min-h-96 flex items-center py-10 overflow-hidden">
            <!-- 배경 이미지 (mask-image로 자연스러운 페이드) -->
            <img
              v-if="slide.imageSrc"
              :src="slide.imageSrc"
              alt=""
              aria-hidden="true"
              class="absolute top-0 right-0 bottom-0 w-2/3 h-full object-cover object-center [mask-image:linear-gradient(to_right,transparent,black_50%)]"
            />
            <!-- 텍스트 영역 -->
            <div class="relative z-10 max-w-screen-xl w-full mx-auto text-center md:text-left">
              <h2 class="text-krds-display-md font-bold text-krds-gray-90 mb-3">
                {{ slide.title }}
              </h2>
              <p
                v-if="slide.description"
                class="text-krds-body-lg text-krds-gray-60 mb-6"
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
          </div>
        </SwiperSlide>
      </Swiper>

      <!-- Navigation Arrows (텍스트 영역 기준 외부 배치) -->
      <template v-if="showArrows && hasMultipleSlides">
        <div class="absolute inset-0 max-w-screen-xl mx-auto pointer-events-none">
          <button
            type="button"
            :class="cn(
              buttonBaseClass,
              'hero-carousel-button-prev',
              'absolute -left-20 top-1/2 -translate-y-1/2 z-10 pointer-events-auto'
            )"
            aria-label="이전"
          >
            <ChevronLeft class="w-8 h-8 text-krds-primary-60" />
          </button>
          <button
            type="button"
            :class="cn(
              buttonBaseClass,
              'hero-carousel-button-next',
              'absolute -right-20 top-1/2 -translate-y-1/2 z-10 pointer-events-auto'
            )"
            aria-label="다음"
          >
            <ChevronRight class="w-8 h-8 text-krds-primary-60" />
          </button>
        </div>
      </template>

      <!-- Indicator (페이지네이션 + 컨트롤) -->
      <div
        v-if="(showPagination || showPlayPause) && hasMultipleSlides"
        class="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex items-center justify-center gap-3 mt-4"
      >
        <!-- 커스텀 Pagination -->
        <div v-if="showPagination" class="flex items-center justify-center gap-2">
          <button
            v-for="(_, index) in slides"
            :key="index"
            type="button"
            :aria-label="`${index + 1}번째 슬라이드로 이동`"
            :class="cn(
              'h-2 rounded-full transition-all duration-300',
              activeIndex === index
                ? 'w-6 bg-krds-primary-60'
                : 'w-2 bg-krds-gray-30 hover:bg-krds-gray-40'
            )"
            @click="goToSlide(index)"
          />
        </div>

        <!-- Play/Pause 버튼 -->
        <button
          v-if="showPlayPause"
          type="button"
          class="flex items-center justify-center w-6 h-6 hover:opacity-70 transition-opacity"
          :aria-label="isPlaying ? '슬라이드 멈춤' : '슬라이드 재생'"
          @click="toggleAutoplay"
        >
          <Pause
            v-if="isPlaying"
            class="w-4 h-4 text-krds-gray-40"
            fill="currentColor"
          />
          <Play
            v-else
            class="w-4 h-4 text-krds-gray-40"
            fill="currentColor"
          />
        </button>
      </div>
    </div>
  </div>
</template>
