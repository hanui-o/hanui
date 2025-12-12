<script setup lang="ts">
import { cn } from '../lib/utils';

const props = defineProps<{
  class?: string;
}>();
</script>

<template>
  <div :class="cn('-mx-1 my-1 h-px bg-krds-gray-20', props.class)" role="separator" />
</template>
