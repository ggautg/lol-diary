<script setup>
import { cn } from "@/lib/utils";
const props = defineProps({ class: {
	type: [
		String,
		Boolean,
		Object,
		Array
	],
	required: false
} });
</script>

<template>
  <li
    data-slot="breadcrumb-item"
    :class="cn('inline-flex items-center gap-1.5', props.class)"
  >
    <slot />
  </li>
</template>
