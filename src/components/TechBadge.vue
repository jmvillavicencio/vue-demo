<template lang="pug">
v-chip.tech-badge(
  variant="outlined"
  size="small"
  :prepend-icon="icon"
  :style="{ borderColor: color, color: color }"
) {{ name }}
</template>

<script setup lang="ts">
import type { TechBadgeProps } from '@/types'

defineProps<TechBadgeProps>()
</script>

<style scoped>
.tech-badge {
  border-width: 2px;
}
</style>
