<script setup>
import { AvatarImage } from "reka-ui";
const props = defineProps({
	src: {
		type: String,
		required: true
	},
	referrerPolicy: {
		type: String,
		required: false
	},
	crossOrigin: {
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
	}
});
</script>

<template>
  <AvatarImage
    data-slot="avatar-image"
    v-bind="props"
    class="aspect-square size-full"
  >
    <slot />
  </AvatarImage>
</template>
