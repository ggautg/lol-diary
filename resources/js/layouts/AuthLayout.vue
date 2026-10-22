<script setup>
import AuthLayout from '@/layouts/auth/AuthSimpleLayout.vue';
const { title = '', description = '' } = defineProps({
    title: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
});
</script>

<template>
    <AuthLayout :title="title" :description="description">
        <slot />
    </AuthLayout>
</template>
