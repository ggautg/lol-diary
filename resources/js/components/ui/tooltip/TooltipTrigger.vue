<script setup>
import { TooltipTrigger } from "reka-ui";
const props = defineProps({
	reference: {
		type: Object,
		required: false
	},
	asChild: {
		type: Boolean,
		required: false
	},
	as: {
		type: [
			String,
			Object,
			Function
		],
		required: false
	}
});
</script>

<template>
  <TooltipTrigger
    data-slot="tooltip-trigger"
    v-bind="props"
  >
    <slot />
  </TooltipTrigger>
</template>
