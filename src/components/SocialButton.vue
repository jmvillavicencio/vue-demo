<template lang="pug">
v-btn(
  :icon="icon"
  :color="color"
  variant="flat"
  size="small"
  :href="href"
  target="_blank"
  :aria-label="name"
)
</template>

<script setup lang="ts">
import type { SocialButtonProps } from '@/types'

defineProps<SocialButtonProps>()
</script>
