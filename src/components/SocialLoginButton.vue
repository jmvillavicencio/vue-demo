<template lang="pug">
v-btn.social-btn(
  :color="color"
  variant="outlined"
  size="large"
  block
  :prepend-icon="icon"
  :loading="loading"
  :disabled="loading"
  @click="handleClick"
) {{ label }}
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { SocialLoginButtonProps } from '@/types'

const props = defineProps<SocialLoginButtonProps>()

const emit = defineEmits<{
  click: []
}>()

const loading = ref<boolean>(false)

const setLoading = (value: boolean): void => {
  loading.value = value
}

const handleClick = (): void => {
  emit('click')
}

defineExpose({
  setLoading,
})
</script>

<style scoped>
.social-btn {
  text-transform: none;
  letter-spacing: normal;
}
</style>
