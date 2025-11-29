<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '../lib/utils';

const alignmentClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

const props = withDefaults(
  defineProps<{
    align?: 'left' | 'center' | 'right';
    sortable?: boolean;
    sortDirection?: 'asc' | 'desc' | null;
    class?: string;
  }>(),
  {
    align: 'left',
    sortable: false,
  }
);

const emit = defineEmits<{
  sort: [];
}>();

const handleClick = () => {
  if (props.sortable) {
    emit('sort');
  }
};

const classes = computed(() =>
  cn(
    'px-4 py-2 align-middle text-[15px] font-bold text-krds-gray-95',
    alignmentClasses[props.align],
    '[&:has([role=checkbox])]:pr-0',
    props.sortable && 'cursor-pointer select-none hover:bg-krds-primary-5',
    props.class
  )
);
</script>

<template>
  <th :class="classes" @click="handleClick">
    <div v-if="sortable" class="flex items-center">
      <span><slot /></span>
      <span class="ml-2 inline-flex flex-col">
        <svg
          :class="cn(
            'h-3 w-3 -mb-1',
            sortDirection === 'asc' ? 'text-krds-gray-90' : 'text-krds-gray-40'
          )"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" />
        </svg>
        <svg
          :class="cn(
            'h-3 w-3 -mt-1',
            sortDirection === 'desc' ? 'text-krds-gray-90' : 'text-krds-gray-40'
          )"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" />
        </svg>
      </span>
    </div>
    <slot v-else />
  </th>
</template>
