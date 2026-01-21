<template lang="pug">
v-btn.social-btn(
  :color="color"
  variant="outlined"
  size="large"
  block
  :prepend-icon="icon"
  @click="$emit('click')"
) {{ label }}
</template>

<script setup lang="ts">
import type { SocialLoginButtonProps } from '@/types'

defineProps<SocialLoginButtonProps>()

defineEmits<{
  click: []
}>()
</script>

<style scoped>
.social-btn {
  text-transform: none;
  letter-spacing: normal;
}
</style>
