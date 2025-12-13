<script setup lang="ts">
/**
 * SearchModal 컴포넌트
 * KRDS 통합검색 모달 (전체화면 검색)
 */
import { ref, computed, watch, nextTick } from 'vue';
import {
  Search,
  SearchCheck,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  X,
  Minus,
  SquareArrowOutUpRight,
} from 'lucide-vue-next';
import { cn } from '@/lib/utils';
import Button from './Button.vue';
import VisuallyHidden from './VisuallyHidden.vue';

// ============================================================================
// Types
// ============================================================================

export type RankingState = 'up' | 'down' | 'same';

export interface PopularKeyword {
  text: string;
  state: RankingState;
  change?: number;
}

export interface RecentKeyword {
  text: string;
}

export interface SearchSuggestion {
  text: string;
  highlight?: string;
  url?: string;
}

// ============================================================================
// Props & Emits
// ============================================================================

const props = withDefaults(
  defineProps<{
    /** 모달 열림 상태 */
    open?: boolean;
    /** 인기검색어 목록 */
    popularKeywords?: PopularKeyword[];
    /** 최근검색어 목록 */
    recentKeywords?: RecentKeyword[];
    /** 자동완성 결과 목록 */
    suggestions?: SearchSuggestion[];
    /** 추가 className */
    class?: string;
  }>(),
  {
    open: false,
    popularKeywords: () => [],
    recentKeywords: () => [],
    suggestions: () => [],
  }
);

const emit = defineEmits<{
  (e: 'update:open', open: boolean): void;
  (e: 'searchChange', value: string): void;
  (e: 'search', value: string): void;
  (e: 'deleteRecentKeyword', keyword: string): void;
  (e: 'deleteAllRecentKeywords'): void;
}>();

// ============================================================================
// State
// ============================================================================

const searchValue = ref('');
const internalRecentKeywords = ref<RecentKeyword[]>([...props.recentKeywords]);
const inputRef = ref<HTMLInputElement | null>(null);

// ============================================================================
// Computed
// ============================================================================

const showSuggestions = computed(() =>
  searchValue.value.length > 0 && props.suggestions.length > 0
);

// ============================================================================
// Watchers
// ============================================================================

// props 변경 시 내부 상태 동기화
watch(
  () => props.recentKeywords,
  (val) => {
    internalRecentKeywords.value = [...val];
  }
);

// 모달 열릴 때 input 포커스
watch(
  () => props.open,
  async (isOpen) => {
    if (isOpen) {
      await nextTick();
      setTimeout(() => inputRef.value?.focus(), 100);
    } else {
      searchValue.value = '';
    }
  }
);

// ============================================================================
// Handlers
// ============================================================================

function handleClose() {
  emit('update:open', false);
}

function handleDeleteRecentKeyword(keyword: string) {
  internalRecentKeywords.value = internalRecentKeywords.value.filter(
    (item) => item.text !== keyword
  );
  emit('deleteRecentKeyword', keyword);
}

function handleDeleteAllRecentKeywords() {
  internalRecentKeywords.value = [];
  emit('deleteAllRecentKeywords');
}

function handleInputChange(e: Event) {
  const value = (e.target as HTMLInputElement).value;
  searchValue.value = value;
  emit('searchChange', value);
}

function handleSearch() {
  emit('search', searchValue.value);
}

function handleKeyDown(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    handleSearch();
  }
  if (e.key === 'Escape') {
    handleClose();
  }
}

function highlightText(text: string): string {
  if (!searchValue.value) return text;
  return text.replace(
    new RegExp(`(${searchValue.value})`, 'gi'),
    '<span class="font-bold text-krds-primary-60">$1</span>'
  );
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200"
      leave-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        :class="cn(
          'fixed inset-0 z-[1010] w-full h-full',
          'bg-krds-gray-5',
          props.class
        )"
        role="dialog"
        aria-modal="true"
        aria-labelledby="search-modal-title"
      >
        <!-- modal-dialog (full type) -->
        <div class="flex items-center relative z-[1020] w-full h-full mx-auto p-0">
          <!-- modal-content (full type) -->
          <div class="flex flex-col items-center relative w-full h-full max-h-full bg-transparent border-none rounded-none mx-auto">
            <!-- Accessibility: VisuallyHidden Title & Description -->
            <VisuallyHidden>
              <h2 id="search-modal-title">통합검색</h2>
              <p>
                검색어를 입력하여 통합검색을 수행할 수 있습니다.
                인기검색어와 최근검색어를 확인할 수 있습니다.
              </p>
            </VisuallyHidden>

            <!-- modal contents (full type) -->
            <div class="flex flex-col relative overflow-y-auto w-full p-0">
              <!-- 통합검색 -->
              <div class="max-w-[860px] w-full mx-auto px-4 pt-16 pb-12 md:px-6 md:pt-24">
                <!-- 통합검색 정보입력 영역 -->
                <div class="mb-6">
                  <!-- 검색어 타이틀 -->
                  <div class="flex items-center justify-between mb-4">
                    <label
                      for="search-total-input"
                      class="text-krds-heading-sm font-bold text-krds-gray-90 md:text-krds-heading-md"
                    >
                      검색어를 입력해주세요
                    </label>
                    <button
                      type="button"
                      class="inline-flex items-center gap-1 text-krds-body-md font-medium text-krds-gray-70 hover:text-krds-primary-60 transition-colors cursor-pointer bg-transparent border-none p-0"
                    >
                      검색에 어려움이 있으신가요?
                      <ChevronRight class="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>

                  <!-- 검색어 입력 폼 -->
                  <div class="flex flex-col gap-3">
                    <div class="relative flex items-center">
                      <input
                        ref="inputRef"
                        id="search-total-input"
                        type="text"
                        :class="cn(
                          'w-full px-6 pr-16 rounded-xl',
                          'bg-white border border-krds-gray-20',
                          'text-krds-body-md text-krds-gray-90 placeholder:text-krds-gray-50 md:text-krds-body-lg',
                          'focus:outline-none focus:ring-2 focus:ring-krds-primary-60 focus:border-transparent',
                          'transition-all duration-200',
                          'h-14 md:h-16'
                        )"
                        placeholder="검색어를 입력해주세요."
                        :value="searchValue"
                        @input="handleInputChange"
                        @keydown="handleKeyDown"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        class="absolute right-4 w-10 h-10 min-w-0 text-krds-gray-70 hover:text-krds-primary-60"
                        aria-label="검색"
                        @click="handleSearch"
                      >
                        <Search class="w-6 h-6" aria-hidden="true" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      class="self-start min-w-0 h-auto !px-1 text-krds-gray-70 hover:text-krds-primary-60 hover:bg-transparent"
                    >
                      <SearchCheck class="w-4 h-4" aria-hidden="true" />
                      고급검색
                    </Button>
                  </div>
                </div>

                <!-- 구분선 -->
                <hr class="border-t border-krds-gray-20 my-6" />

                <!-- 검색어 리스트 -->
                <div>
                  <!-- 검색어 입력 전 - 2컬럼 레이아웃 -->
                  <div v-if="!showSuggestions" class="flex flex-col gap-6 md:flex-row md:gap-8">
                    <!-- 인기검색어 -->
                    <div class="flex-1">
                      <h3 class="text-krds-body-lg font-bold text-krds-gray-90 mb-4">
                        인기검색어
                      </h3>
                      <ol class="space-y-2">
                        <li
                          v-for="(keyword, index) in popularKeywords"
                          :key="index"
                          class="flex items-center gap-3 py-1"
                        >
                          <span class="w-6 text-krds-body-md text-krds-gray-60 tabular-nums">
                            {{ index + 1 }}
                          </span>
                          <span class="flex-1 text-krds-body-md text-krds-gray-90">
                            {{ keyword.text }}
                          </span>
                          <span
                            :class="cn(
                              'text-krds-body-sm tabular-nums',
                              keyword.state === 'up' && 'text-krds-accent-50',
                              keyword.state === 'down' && 'text-krds-primary-60',
                              keyword.state === 'same' && 'text-krds-gray-50'
                            )"
                          >
                            <em class="sr-only">
                              {{ keyword.state === 'up' ? '상승' : keyword.state === 'down' ? '하락' : '동일' }}
                            </em>
                            <template v-if="keyword.state === 'up'">
                              <ArrowUp class="w-3 h-3 inline" aria-hidden="true" />
                              {{ keyword.change }}
                            </template>
                            <template v-else-if="keyword.state === 'down'">
                              <ArrowDown class="w-3 h-3 inline" aria-hidden="true" />
                              {{ keyword.change }}
                            </template>
                            <Minus v-else class="w-3 h-3 inline" aria-hidden="true" />
                          </span>
                        </li>
                      </ol>
                    </div>

                    <!-- 최근검색어 -->
                    <div class="flex-1 flex flex-col border-t border-krds-gray-20 pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                      <h3 class="text-krds-body-lg font-bold text-krds-gray-90 mb-4">
                        최근검색어
                      </h3>
                      <ul class="space-y-2" aria-live="polite">
                        <li
                          v-for="(keyword, index) in internalRecentKeywords"
                          :key="index"
                          class="flex items-center justify-between py-1"
                        >
                          <span class="text-krds-body-md text-krds-gray-90">
                            {{ keyword.text }}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            class="w-6 h-6 min-w-0 text-krds-gray-50 hover:text-krds-gray-70"
                            aria-label="삭제"
                            @click="handleDeleteRecentKeyword(keyword.text)"
                          >
                            <X class="w-4 h-4" aria-hidden="true" />
                          </Button>
                        </li>
                      </ul>
                      <Button
                        v-if="internalRecentKeywords.length > 0"
                        variant="ghost"
                        size="sm"
                        class="mt-auto self-start"
                        @click="handleDeleteAllRecentKeywords"
                      >
                        최근검색어 전체 삭제
                        <X class="w-4 h-4" aria-hidden="true" />
                      </Button>
                    </div>
                  </div>

                  <!-- 검색어 입력 후 - 자동완성 -->
                  <ul v-else class="space-y-1" aria-live="polite">
                    <li
                      v-for="(suggestion, index) in suggestions"
                      :key="index"
                      class="py-3 px-2 rounded-lg hover:bg-krds-gray-10 transition-colors cursor-pointer"
                    >
                      <div class="flex items-center justify-between">
                        <p
                          class="text-krds-body-md text-krds-gray-90"
                          v-html="highlightText(suggestion.text)"
                        />
                        <a
                          v-if="suggestion.url"
                          :href="suggestion.url"
                          target="_blank"
                          rel="noopener noreferrer"
                          class="inline-flex items-center gap-1 text-krds-body-sm font-medium text-krds-primary-60 hover:text-krds-primary-70 transition-colors max-w-[200px] truncate"
                          @click.stop
                        >
                          {{ suggestion.url }}
                          <SquareArrowOutUpRight
                            class="inline-block ml-1 flex-shrink-0"
                            :size="14"
                            aria-hidden="true"
                          />
                          <span class="sr-only"> (새 창 열림)</span>
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- close button (full type) -->
            <Button
              variant="ghost"
              size="icon"
              :class="cn(
                'absolute z-[901]',
                'top-6 right-6 md:top-7 md:right-7',
                'w-12 h-12 min-w-0 md:w-14 md:h-14'
              )"
              aria-label="닫기"
              @click="handleClose"
            >
              <X class="w-5 h-5 md:w-10 md:h-10" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
