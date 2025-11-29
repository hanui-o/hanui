<script setup lang="ts">
import { computed, ref } from 'vue';
import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-vue-next';
import { cn } from '../lib/utils';

interface Labels {
  first?: string;
  previous?: string;
  next?: string;
  last?: string;
  page?: string;
  goTo?: string;
  loadMore?: string;
  invalidInput?: string;
  loading?: string;
}

const props = withDefaults(
  defineProps<{
    variant?: 'default' | 'direct-input' | 'load-more';
    currentPage: number;
    totalPages: number;
    siblingCount?: number;
    showFirstLast?: boolean;
    showPreviousNext?: boolean;
    labels?: Labels;
    hasMore?: boolean;
    isLoading?: boolean;
    class?: string;
  }>(),
  {
    variant: 'default',
    siblingCount: 1,
    showFirstLast: true,
    showPreviousNext: true,
    labels: () => ({}),
    hasMore: true,
    isLoading: false,
  }
);

const emit = defineEmits<{
  'update:currentPage': [page: number];
  pageChange: [page: number];
  loadMore: [];
}>();

const defaultLabels = {
  first: '처음',
  previous: '이전',
  next: '다음',
  last: '마지막',
  page: '페이지',
  goTo: '이동',
  loadMore: '더 보기',
  invalidInput: '유효하지 않은 페이지 번호입니다',
  loading: '콘텐츠를 불러오는 중',
};

const mergedLabels = computed(() => ({ ...defaultLabels, ...props.labels }));

const directInputValue = ref('');
const inputError = ref('');
const announceMessage = ref('');

function generatePaginationRange(
  currentPage: number,
  totalPages: number,
  siblingCount: number
): (number | 'ellipsis')[] {
  const totalPageNumbers = siblingCount + 5;

  if (totalPageNumbers >= totalPages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const shouldShowLeftEllipsis = leftSiblingIndex > 2;
  const shouldShowRightEllipsis = rightSiblingIndex < totalPages - 1;

  if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, 'ellipsis', totalPages];
  }

  if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => totalPages - rightItemCount + i + 1
    );
    return [1, 'ellipsis', ...rightRange];
  }

  if (shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i
    );
    return [1, 'ellipsis', ...middleRange, 'ellipsis', totalPages];
  }

  return [];
}

const paginationRange = computed(() =>
  generatePaginationRange(props.currentPage, props.totalPages, props.siblingCount)
);

const handlePageChange = (page: number) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('update:currentPage', page);
    emit('pageChange', page);
    announceMessage.value = `${page} 페이지로 이동했습니다`;
  }
};

const handleDirectInput = () => {
  const pageNum = parseInt(directInputValue.value, 10);

  if (!directInputValue.value.trim()) {
    inputError.value = '';
    return;
  }

  if (isNaN(pageNum) || pageNum < 1 || pageNum > props.totalPages) {
    inputError.value = mergedLabels.value.invalidInput;
    announceMessage.value = mergedLabels.value.invalidInput;
    return;
  }

  inputError.value = '';
  handlePageChange(pageNum);
  directInputValue.value = '';
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    handleDirectInput();
  }
};

const handleLoadMore = () => {
  emit('loadMore');
};

const isFirstPage = computed(() => props.currentPage === 1);
const isLastPage = computed(() => props.currentPage === props.totalPages);

const buttonClass = computed(() =>
  cn(
    'inline-flex items-center justify-center',
    'min-w-[2.5rem] h-10 px-3',
    'font-medium',
    'rounded-md',
    'transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-krds-primary-50 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50'
  )
);

const activeClass = 'bg-krds-secondary-70 text-krds-white hover:bg-krds-secondary-60';
const inactiveClass = 'bg-krds-white text-krds-gray-90 hover:bg-krds-gray-5';
</script>

<template>
  <!-- Load more variant -->
  <div
    v-if="variant === 'load-more'"
    :class="cn('flex flex-col items-center gap-2', props.class)"
  >
    <button
      type="button"
      @click="handleLoadMore"
      :disabled="!hasMore || isLoading"
      :aria-busy="isLoading"
      :class="cn(
        'inline-flex items-center justify-center gap-2',
        'px-6 h-12',
        'font-medium',
        'rounded-md',
        'transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-krds-primary-50 focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        'bg-krds-white text-krds-gray-90 border border-krds-gray-30 hover:bg-krds-gray-5'
      )"
      :aria-label="`${mergedLabels.loadMore} (${currentPage}/${totalPages})`"
    >
      <span>{{ isLoading ? mergedLabels.loading : mergedLabels.loadMore }}</span>
      <span class="text-krds-gray-60">({{ currentPage }}/{{ totalPages }})</span>
    </button>
    <div role="status" aria-live="polite" aria-atomic="true" class="sr-only">
      {{ announceMessage }}
    </div>
  </div>

  <!-- Direct input variant -->
  <nav
    v-else-if="variant === 'direct-input'"
    role="navigation"
    aria-label="Pagination Navigation"
    :class="cn('flex flex-col items-center gap-2', props.class)"
  >
    <div class="flex items-center gap-1">
      <button
        v-if="showFirstLast"
        type="button"
        @click="handlePageChange(1)"
        :disabled="isFirstPage"
        :aria-label="`${mergedLabels.first} ${mergedLabels.page}`"
        :class="cn(buttonClass, inactiveClass)"
      >
        <ChevronsLeft class="w-4 h-4 mr-1" />
        {{ mergedLabels.first }}
      </button>

      <button
        v-if="showPreviousNext"
        type="button"
        @click="handlePageChange(currentPage - 1)"
        :disabled="isFirstPage"
        :aria-label="`${mergedLabels.previous} ${mergedLabels.page}`"
        :class="cn(buttonClass, inactiveClass)"
      >
        <ChevronLeft class="w-4 h-4 mr-1" />
        {{ mergedLabels.previous }}
      </button>

      <div class="flex items-center gap-2 mx-2">
        <input
          type="number"
          :min="1"
          :max="totalPages"
          v-model="directInputValue"
          @keydown="handleKeyDown"
          :placeholder="String(currentPage)"
          :aria-label="`${mergedLabels.page} 번호 입력`"
          :aria-invalid="!!inputError"
          :class="cn(
            'w-16 h-10 px-3',
            'text-center font-medium',
            'rounded-md',
            'border',
            inputError
              ? 'border-krds-red-50 focus-visible:ring-krds-red-50'
              : 'border-krds-gray-30 focus-visible:ring-krds-primary-50',
            'bg-krds-white text-krds-gray-90',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
            'placeholder:text-krds-gray-50'
          )"
        />
        <span class="text-krds-gray-60">/ {{ totalPages }}</span>
        <button
          type="button"
          @click="handleDirectInput"
          :aria-label="mergedLabels.goTo"
          :class="cn(buttonClass, inactiveClass)"
        >
          {{ mergedLabels.goTo }}
        </button>
      </div>

      <button
        v-if="showPreviousNext"
        type="button"
        @click="handlePageChange(currentPage + 1)"
        :disabled="isLastPage"
        :aria-label="`${mergedLabels.next} ${mergedLabels.page}`"
        :class="cn(buttonClass, inactiveClass)"
      >
        {{ mergedLabels.next }}
        <ChevronRight class="w-4 h-4 ml-1" />
      </button>

      <button
        v-if="showFirstLast"
        type="button"
        @click="handlePageChange(totalPages)"
        :disabled="isLastPage"
        :aria-label="`${mergedLabels.last} ${mergedLabels.page}`"
        :class="cn(buttonClass, inactiveClass)"
      >
        {{ mergedLabels.last }}
        <ChevronsRight class="w-4 h-4 ml-1" />
      </button>
    </div>

    <div
      v-if="inputError"
      role="alert"
      aria-live="assertive"
      class="text-krds-red-50 text-sm"
    >
      {{ inputError }}
    </div>

    <div role="status" aria-live="polite" aria-atomic="true" class="sr-only">
      {{ announceMessage }}
    </div>
  </nav>

  <!-- Default variant -->
  <div
    v-else
    :class="cn('flex flex-col items-center gap-2', props.class)"
  >
    <nav
      role="navigation"
      aria-label="Pagination Navigation"
      class="flex items-center justify-center gap-1"
    >
      <button
        v-if="showFirstLast"
        type="button"
        @click="handlePageChange(1)"
        :disabled="isFirstPage"
        :aria-label="`${mergedLabels.first} ${mergedLabels.page}`"
        :class="cn(buttonClass, inactiveClass)"
      >
        <ChevronsLeft class="w-4 h-4 mr-1" />
        {{ mergedLabels.first }}
      </button>

      <button
        v-if="showPreviousNext"
        type="button"
        @click="handlePageChange(currentPage - 1)"
        :disabled="isFirstPage"
        :aria-label="`${mergedLabels.previous} ${mergedLabels.page}`"
        :class="cn(buttonClass, inactiveClass)"
      >
        <ChevronLeft class="w-4 h-4 mr-1" />
        {{ mergedLabels.previous }}
      </button>

      <template v-for="(pageNumber, index) in paginationRange" :key="`page-${index}`">
        <span
          v-if="pageNumber === 'ellipsis'"
          class="inline-flex items-center justify-center w-10 h-10 text-krds-gray-60"
          aria-hidden="true"
        >
          ...
        </span>
        <button
          v-else
          type="button"
          @click="handlePageChange(pageNumber as number)"
          :aria-current="currentPage === pageNumber ? 'page' : undefined"
          :aria-label="`${mergedLabels.page} ${pageNumber}`"
          :class="cn(
            buttonClass,
            currentPage === pageNumber ? activeClass : inactiveClass
          )"
        >
          {{ pageNumber }}
        </button>
      </template>

      <button
        v-if="showPreviousNext"
        type="button"
        @click="handlePageChange(currentPage + 1)"
        :disabled="isLastPage"
        :aria-label="`${mergedLabels.next} ${mergedLabels.page}`"
        :class="cn(buttonClass, inactiveClass)"
      >
        {{ mergedLabels.next }}
        <ChevronRight class="w-4 h-4 ml-1" />
      </button>

      <button
        v-if="showFirstLast"
        type="button"
        @click="handlePageChange(totalPages)"
        :disabled="isLastPage"
        :aria-label="`${mergedLabels.last} ${mergedLabels.page}`"
        :class="cn(buttonClass, inactiveClass)"
      >
        {{ mergedLabels.last }}
        <ChevronsRight class="w-4 h-4 ml-1" />
      </button>
    </nav>

    <div role="status" aria-live="polite" aria-atomic="true" class="sr-only">
      {{ announceMessage }}
    </div>
  </div>
</template>
