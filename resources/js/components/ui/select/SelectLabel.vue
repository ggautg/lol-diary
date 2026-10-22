<script setup>
import { SelectLabel } from "reka-ui";
import { cn } from "@/lib/utils";
const props = defineProps({
	for: {
		type: String,
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
	},
	class: {
		type: [
			String,
			Boolean,
			Object,
			Array
		],
		required: false
	}
});
</script>

<template>
  <SelectLabel
    data-slot="select-label"
    :class="cn('text-muted-foreground px-2 py-1.5 text-xs', props.class)"
  >
    <slot />
  </SelectLabel>
</template>
