<script setup>
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
  <nav
    aria-label="breadcrumb"
    data-slot="breadcrumb"
    :class="props.class"
  >
    <slot />
  </nav>
</template>
