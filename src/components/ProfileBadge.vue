<template lang="pug">
v-chip(
  :color="color"
  variant="flat"
  size="small"
  :prepend-icon="icon"
) {{ label }}
</template>

<script setup lang="ts">
import type { ProfileBadgeProps } from '@/types'

defineProps<ProfileBadgeProps>()
</script>
