<script setup>
import { reactiveOmit } from "@vueuse/core";
import { Primitive } from "reka-ui";
import { cn } from "@/lib/utils";
import { badgeVariants } from ".";
const props = defineProps({
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
	variant: {
		type: String,
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
const delegatedProps = reactiveOmit(props, "class");
</script>

<template>
  <Primitive
    data-slot="badge"
    :class="cn(badgeVariants({ variant }), props.class)"
    v-bind="delegatedProps"
  >
    <slot />
  </Primitive>
</template>
