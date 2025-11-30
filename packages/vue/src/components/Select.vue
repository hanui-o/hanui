<script setup lang="ts">
import { computed, ref } from 'vue';
import { ChevronDown, Check } from 'lucide-vue-next';
import { cn } from '../lib/utils';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

const props = withDefaults(
  defineProps<{
    options: SelectOption[];
    modelValue?: string;
    placeholder?: string;
    disabled?: boolean;
    status?: 'error' | 'success' | 'info';
    size?: 'lg' | 'md' | 'sm';
    label?: string;
    class?: string;
  }>(),
  {
    placeholder: '선택하세요',
    disabled: false,
    size: 'lg',
  }
);

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const isOpen = ref(false);

const sizeClasses = {
  lg: 'h-14',
  md: 'h-12',
  sm: 'h-10',
} as const;

const selectedOption = computed(() => props.options.find((opt) => opt.value === props.modelValue));

const hasError = computed(() => props.status === 'error');

const triggerClasses = computed(() =>
  cn(
    'flex w-full items-center justify-between rounded-md border bg-krds-white pl-4 pr-12 py-2 text-krds-body-lg leading-[150%] shadow-sm transition-colors relative',
    sizeClasses[props.size],
    'focus:outline-none focus:ring-2 focus:ring-krds-primary-60 focus:ring-offset-2',
    hasError.value
      ? 'border-krds-danger-60 focus:ring-krds-danger-60'
      : 'border-krds-gray-60 hover:border-krds-gray-40',
    props.disabled && 'cursor-not-allowed bg-krds-gray-5 text-krds-gray-40'
  )
);

const dropdownClasses = computed(() =>
  cn(
    'absolute z-50 max-h-96 min-w-[8rem] w-full overflow-hidden rounded-md border bg-krds-white text-krds-body-md leading-[150%] shadow-md mt-1',
    'animate-in fade-in-0 zoom-in-95'
  )
);

const handleSelect = (option: SelectOption) => {
  if (option.disabled) return;
  emit('update:modelValue', option.value);
  isOpen.value = false;
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    isOpen.value = false;
  } else if (e.key === 'Enter' || e.key === ' ') {
    isOpen.value = !isOpen.value;
  }
};

const handleClickOutside = () => {
  isOpen.value = false;
};
</script>

<template>
  <div :class="cn('relative', props.class)" v-click-outside="handleClickOutside">
    <!-- Label -->
    <label
      v-if="label"
      class="block text-krds-body-sm leading-[150%] font-medium text-krds-gray-70 mb-1"
    >
      {{ label }}
    </label>

    <!-- Trigger Button -->
    <button
      type="button"
      :class="triggerClasses"
      :disabled="disabled"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
      @click="isOpen = !isOpen"
      @keydown="handleKeyDown"
    >
      <span :class="!selectedOption && 'text-krds-gray-50'">
        {{ selectedOption?.label || placeholder }}
      </span>
      <ChevronDown
        class="h-6 w-6 absolute right-4 top-1/2 -translate-y-1/2 transition-transform"
        :class="isOpen && 'rotate-180'"
      />
    </button>

    <!-- Dropdown -->
    <Transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div v-if="isOpen" :class="dropdownClasses" role="listbox">
        <div class="p-1">
          <div
            v-for="option in options"
            :key="option.value"
            :class="
              cn(
                'relative flex cursor-pointer select-none items-center rounded-sm py-2 pl-8 pr-2 outline-none',
                'hover:bg-krds-primary-60 hover:text-krds-white',
                option.disabled && 'pointer-events-none opacity-50',
                option.value === modelValue && 'bg-krds-primary-5'
              )
            "
            role="option"
            :aria-selected="option.value === modelValue"
            :aria-disabled="option.disabled"
            @click="handleSelect(option)"
          >
            <!-- Check Icon -->
            <span
              v-if="option.value === modelValue"
              class="absolute left-2 flex w-4 items-center justify-center"
            >
              <Check class="h-4 w-4" />
            </span>
            {{ option.label }}
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
