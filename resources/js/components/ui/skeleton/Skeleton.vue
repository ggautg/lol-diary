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
  <div
    data-slot="skeleton"
    :class="cn('animate-pulse rounded-md bg-primary/10', props.class)"
  />
</template>
