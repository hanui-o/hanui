<script setup lang="ts">
/**
 * SectionHeader 컴포넌트
 * 섹션 내부 제목과 설명 컴포넌트
 */
import { computed } from 'vue';
import { cn } from '@/lib/utils';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5';

const props = withDefaults(
  defineProps<{
    /** Heading 레벨 (h1-h5) */
    level: HeadingLevel;
    /** 제목 텍스트 */
    title: string;
    /** 설명 텍스트 (선택사항) */
    description?: string;
    /** HTML id 속성 (선택사항) */
    id?: string;
    /** 추가 className */
    class?: string;
  }>(),
  {}
);

/**
 * 텍스트에서 URL-friendly ID 생성
 */
function generateId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s가-힣-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * 레벨에 따른 heading 스타일
 */
function getHeadingStyles(level: HeadingLevel): string {
  const styles: Record<HeadingLevel, string> = {
    h1: 'text-[28px] md:text-[40px]',
    h2: 'text-[24px] md:text-[32px]',
    h3: 'text-[22px] md:text-[24px]',
    h4: 'text-krds-body-lg',
    h5: 'text-krds-body-md',
  };
  return styles[level];
}

/**
 * 제목과 설명 사이 간격
 */
function getTitleBodySpacing(level: HeadingLevel): string {
  const spacing: Record<HeadingLevel, string> = {
    h1: 'gap-4 md:gap-6',
    h2: 'gap-3 md:gap-5',
    h3: 'gap-3 md:gap-5',
    h4: 'gap-3 md:gap-5',
    h5: 'gap-2 md:gap-4',
  };
  return spacing[level];
}

/**
 * 레벨에 따른 margin bottom
 */
function getMarginBottom(level: HeadingLevel): string {
  const margins: Record<HeadingLevel, string> = {
    h1: 'mb-4 md:mb-6',
    h2: 'mb-3 md:mb-5',
    h3: 'mb-3 md:mb-5',
    h4: 'mb-3 md:mb-5',
    h5: 'mb-2 md:mb-4',
  };
  return margins[level];
}

const headingId = computed(() => props.id || generateId(props.title));

const headingClasses = computed(() =>
  cn(
    'font-bold leading-[150%] text-krds-gray-95',
    getHeadingStyles(props.level)
  )
);

const descriptionClasses = 'text-krds-gray-70 leading-relaxed text-krds-body-md';
</script>

<template>
  <div
    v-if="description || $slots.default"
    :class="cn('flex flex-col', getTitleBodySpacing(level), getMarginBottom(level), props.class)"
  >
    <component :is="level" :id="headingId" :class="headingClasses">
      {{ title }}
    </component>
    <p v-if="description" :class="descriptionClasses">
      {{ description }}
    </p>
    <slot />
  </div>
  <div v-else :class="cn(getMarginBottom(level), props.class)">
    <component :is="level" :id="headingId" :class="headingClasses">
      {{ title }}
    </component>
  </div>
</template>
