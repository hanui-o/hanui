<script setup lang="ts">
/**
 * CarouselPreview 컴포넌트
 * Preview 스타일 캐러셀 - 부분적으로 다음 슬라이드가 보이는 캐러셀
 */
import { ref, computed } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, A11y } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';
import { cn } from '../lib/utils';

// Swiper CSS
import 'swiper/css';
import 'swiper/css/navigation';

export interface PreviewCarouselBreakpoints {
  /** 모바일 (기본) */
  mobile?: number;
  /** 태블릿 (768px 이상) */
  tablet?: number;
  /** 데스크톱 (1024px 이상) */
  desktop?: number;
}

export interface PreviewCarouselSlide {
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
  /** 클릭 링크 */
  href?: string;
}

const props = withDefaults(
  defineProps<{
    /** 슬라이드 데이터 배열 */
    slides: PreviewCarouselSlide[];
    /** 반응형 slidesPerView 설정 */
    slidesPerView?: PreviewCarouselBreakpoints | number;
    /** 슬라이드 간격 (px) */
    spaceBetween?: number;
    /** 무한 루프 */
    loop?: boolean;
    /** 화살표 표시 여부 */
    showArrows?: boolean;
    /** 페이지네이션 표시 여부 */
    showPagination?: boolean;
    /** 추가 className */
    class?: string;
  }>(),
  {
    slidesPerView: () => ({ mobile: 1.2, tablet: 2.2, desktop: 3.2 }),
    spaceBetween: 16,
    loop: false,
    showArrows: false,
    showPagination: false,
  }
);

const emit = defineEmits<{
  (e: 'slideChange', index: number): void;
  (e: 'slideClick', slide: PreviewCarouselSlide): void;
}>();

const swiperInstance = ref<SwiperType | null>(null);
const activeIndex = ref(0);

const modules = [Navigation, A11y];

const hasMultipleSlides = computed(() => props.slides.length > 1);

// slidesPerView 설정 처리
const getSlidesPerView = computed(() => {
  if (typeof props.slidesPerView === 'number') {
    return props.slidesPerView;
  }
  return props.slidesPerView.mobile ?? 1.2;
});

// breakpoints 설정
const getBreakpoints = computed(() => {
  if (typeof props.slidesPerView === 'number') {
    return undefined;
  }
  return {
    768: {
      slidesPerView: props.slidesPerView.tablet ?? 2.2,
    },
    1024: {
      slidesPerView: props.slidesPerView.desktop ?? 3.2,
    },
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

function goToSlide(index: number) {
  if (swiperInstance.value) {
    swiperInstance.value.slideToLoop(index);
  }
}

function handlePrev() {
  swiperInstance.value?.slidePrev();
}

function handleNext() {
  swiperInstance.value?.slideNext();
}

const buttonBaseClass = cn(
  'flex items-center justify-center flex-shrink-0',
  'w-9 h-9 rounded-full',
  'border border-krds-gray-30 bg-white',
  'hover:bg-krds-gray-10 active:bg-krds-gray-20',
  'disabled:bg-krds-gray-10 disabled:cursor-not-allowed',
  'transition-colors'
);
</script>

<template>
  <div :class="cn('relative', props.class)">
    <Swiper
      :modules="modules"
      :slides-per-view="getSlidesPerView"
      :space-between="spaceBetween"
      :speed="400"
      :loop="loop && hasMultipleSlides"
      :breakpoints="getBreakpoints"
      :a11y="a11yConfig"
      class="w-full"
      @swiper="onSwiper"
      @slide-change="onSlideChange"
    >
      <SwiperSlide v-for="slide in slides" :key="slide.id">
        <component
          :is="slide.href ? 'a' : 'div'"
          :href="slide.href"
          class="block h-full"
          @click="emit('slideClick', slide)"
        >
          <div class="bg-white h-full">
            <div
              v-if="slide.imageSrc"
              class="aspect-square relative overflow-hidden rounded-lg after:content-[''] after:absolute after:inset-0 after:border after:border-krds-gray-20 after:rounded-[inherit] after:bg-black/5"
            >
              <img
                :src="slide.imageSrc"
                :alt="slide.imageAlt || slide.title"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="py-4">
              <h3 class="text-krds-heading-sm font-semibold text-krds-gray-90 mb-2">
                {{ slide.title }}
              </h3>
              <p
                v-if="slide.description"
                class="text-krds-body-sm text-krds-gray-60 line-clamp-2 min-h-11"
              >
                {{ slide.description }}
              </p>
            </div>
          </div>
        </component>
      </SwiperSlide>
    </Swiper>

    <!-- 컨트롤 영역 -->
    <div
      v-if="(showArrows || showPagination) && hasMultipleSlides"
      class="flex items-center justify-end gap-3 mt-4"
    >
      <!-- 커스텀 Pagination -->
      <div v-if="showPagination" class="flex items-center gap-1.5">
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

      <!-- Navigation Arrows -->
      <div v-if="showArrows" class="flex items-center gap-2">
        <button
          type="button"
          :class="buttonBaseClass"
          aria-label="이전"
          @click="handlePrev"
        >
          <ChevronLeft class="w-5 h-5 text-krds-gray-70" />
        </button>
        <button
          type="button"
          :class="buttonBaseClass"
          aria-label="다음"
          @click="handleNext"
        >
          <ChevronRight class="w-5 h-5 text-krds-gray-70" />
        </button>
      </div>
    </div>
  </div>
</template>
