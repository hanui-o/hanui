<script setup lang="ts">
/**
 * CarouselContent 컴포넌트
 * Content 스타일 캐러셀 - 카드형 섹션 배너용
 */
import { ref, computed } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { ChevronLeft, ChevronRight, Play, Pause, Plus } from 'lucide-vue-next';
import { cn } from '../lib/utils';

// Swiper CSS
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export interface ContentCarouselSlide {
  /** 슬라이드 고유 ID */
  id: string | number;
  /** 메인 타이틀 */
  title: string;
  /** 서브타이틀 (카테고리 등) */
  subtitle?: string;
  /** 이미지 URL */
  imageSrc?: string;
  /** 이미지 alt 텍스트 */
  imageAlt?: string;
  /** 클릭 링크 */
  href?: string;
}

const props = withDefaults(
  defineProps<{
    /** 슬라이드 데이터 배열 */
    slides: ContentCarouselSlide[];
    /** 자동 재생 여부 */
    autoPlay?: boolean;
    /** 자동 재생 간격 (ms) */
    interval?: number;
    /** 무한 루프 */
    loop?: boolean;
    /** 화살표 표시 여부 */
    showArrows?: boolean;
    /** 페이지네이션 타입 - bullets: 도트, fraction: 분수형 */
    paginationType?: 'bullets' | 'fraction';
    /** 재생/정지 버튼 표시 여부 */
    showPlayPause?: boolean;
    /** 더보기 버튼 링크 */
    moreHref?: string;
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
    paginationType: 'fraction',
    showPlayPause: false,
    pauseOnHover: true,
  }
);

const emit = defineEmits<{
  (e: 'slideChange', index: number): void;
  (e: 'slideClick', slide: ContentCarouselSlide): void;
}>();

const swiperInstance = ref<SwiperType | null>(null);
const isPlaying = ref(props.autoPlay);

const modules = [Navigation, Pagination, Autoplay, A11y];

const hasMultipleSlides = computed(() => props.slides.length > 1);

const autoplayConfig = computed(() => {
  if (!props.autoPlay || !hasMultipleSlides.value) return false;
  return {
    delay: props.interval,
    disableOnInteraction: false,
    pauseOnMouseEnter: props.pauseOnHover,
  };
});

const paginationConfig = computed(() => {
  if (!hasMultipleSlides.value) return false;
  return {
    el: '.content-carousel-pagination',
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
  'flex items-center justify-center flex-shrink-0',
  'w-9 h-9 rounded-full',
  'border border-krds-gray-30 bg-white',
  'hover:bg-krds-gray-10 active:bg-krds-gray-20',
  'disabled:bg-krds-gray-10 disabled:cursor-not-allowed',
  'transition-colors'
);

const paginationClass = computed(() =>
  cn(
    'content-carousel-pagination',
    'flex items-center justify-end',
    props.paginationType === 'bullets' &&
      'gap-1.5 h-9 px-3 bg-krds-gray-90/10 rounded-full',
    props.paginationType === 'fraction' && 'gap-2 px-4 h-9 font-bold',
    // Swiper bullet 커스텀 스타일
    '[&_.swiper-pagination-bullet]:w-2 [&_.swiper-pagination-bullet]:h-2',
    '[&_.swiper-pagination-bullet]:bg-krds-gray-40 [&_.swiper-pagination-bullet]:rounded-full',
    '[&_.swiper-pagination-bullet]:opacity-100',
    '[&_.swiper-pagination-bullet-active]:w-8 [&_.swiper-pagination-bullet-active]:bg-krds-primary-60',
    // Fraction 스타일
    '[&_.swiper-pagination-current]:text-krds-primary-60'
  )
);
</script>

<template>
  <div :class="cn(props.class)">
    <div class="relative">
      <Swiper
        :modules="modules"
        :slides-per-view="1"
        :space-between="16"
        :speed="400"
        :loop="loop && hasMultipleSlides"
        :autoplay="autoplayConfig"
        :pagination="paginationConfig"
        :a11y="a11yConfig"
        class="w-full"
        @swiper="onSwiper"
        @slide-change="onSlideChange"
      >
        <SwiperSlide v-for="slide in slides" :key="slide.id">
          <component
            :is="slide.href ? 'a' : 'div'"
            :href="slide.href"
            class="block"
            @click="emit('slideClick', slide)"
          >
            <!-- Card 슬라이드 -->
            <div>
              <div class="mb-3">
                <p
                  v-if="slide.subtitle"
                  class="text-krds-body-sm text-krds-gray-50 mb-1"
                >
                  {{ slide.subtitle }}
                </p>
                <strong class="block text-krds-heading-md font-semibold text-krds-gray-90 line-clamp-2">
                  {{ slide.title }}
                </strong>
              </div>
              <div
                v-if="slide.imageSrc"
                class="aspect-video rounded-lg overflow-hidden bg-krds-gray-10 mt-10"
              >
                <img
                  :src="slide.imageSrc"
                  :alt="slide.imageAlt || slide.title"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
          </component>
        </SwiperSlide>
      </Swiper>

      <!-- Indicator (페이지네이션 + 컨트롤) -->
      <div v-if="hasMultipleSlides" class="flex items-center justify-end gap-2 mt-4">
        <!-- Pagination -->
        <div :class="paginationClass" />

        <!-- Play/Pause 버튼 -->
        <button
          v-if="showPlayPause"
          type="button"
          :class="buttonBaseClass"
          :aria-label="isPlaying ? '슬라이드 멈춤' : '슬라이드 재생'"
          @click="toggleAutoplay"
        >
          <Pause
            v-if="isPlaying"
            class="w-4 h-4 text-krds-gray-70"
            fill="currentColor"
          />
          <Play
            v-else
            class="w-4 h-4 text-krds-gray-70"
            fill="currentColor"
          />
        </button>

        <!-- Navigation -->
        <div v-if="showArrows" class="flex items-center gap-2">
          <button
            type="button"
            :class="buttonBaseClass"
            aria-label="이전"
            @click="swiperInstance?.slidePrev()"
          >
            <ChevronLeft class="w-5 h-5 text-krds-gray-70" />
          </button>
          <button
            type="button"
            :class="buttonBaseClass"
            aria-label="다음"
            @click="swiperInstance?.slideNext()"
          >
            <ChevronRight class="w-5 h-5 text-krds-gray-70" />
          </button>
        </div>

        <!-- More 버튼 -->
        <a
          v-if="moreHref"
          :href="moreHref"
          :class="buttonBaseClass"
          aria-label="더 보기"
        >
          <Plus class="w-5 h-5 text-krds-gray-70" />
        </a>
      </div>
    </div>
  </div>
</template>
