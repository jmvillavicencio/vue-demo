<template lang="pug">
v-container.fill-height(fluid)
  v-row(justify="center" align="center")
    v-col(cols="12" md="8" lg="6")
      .text-center
        //- Profile Header
        v-avatar.mb-4(size="120")
          v-icon(size="80" color="primary") mdi-account-circle

        h1.text-h3.font-weight-bold.text-primary.mb-2 Welcome to Vue Demo

        p.text-subtitle-1.text-grey-lighten-1.mb-6 Full Stack Engineering Demo Application

        //- Info Badges
        .d-flex.flex-wrap.justify-center.gap-2.mb-8
          ProfileBadge(
            v-for="badge in infoBadges"
            :key="badge.label"
            :icon="badge.icon"
            :label="badge.label"
            :color="badge.color"
          )

        //- Tech Stack Section
        h3.text-h5.font-weight-medium.mb-4 Tech Stack
        .d-flex.flex-wrap.justify-center.gap-2.mb-8
          TechBadge(
            v-for="tech in techStack"
            :key="tech.name"
            :name="tech.name"
            :icon="tech.icon"
            :color="tech.color"
          )

        //- Stats Cards
        v-row.mb-8(justify="center")
          v-col(v-for="stat in stats" :key="stat.label" cols="6" sm="4")
            v-card.pa-4(color="surface")
              .text-h4.font-weight-bold.text-primary {{ stat.value }}
              .text-caption.text-grey-lighten-1 {{ stat.label }}

        //- Social Links
        h3.text-h5.font-weight-medium.mb-4 Connect
        .d-flex.flex-wrap.justify-center.gap-3.mb-8
          SocialButton(
            v-for="social in socialLinks"
            :key="social.name"
            :name="social.name"
            :icon="social.icon"
            :color="social.color"
            :href="social.href"
          )

        //- Login Link
        v-btn.mt-4(
          color="primary"
          size="large"
          variant="elevated"
          to="/login"
          prepend-icon="mdi-login"
        ) Go to Login Demo
</template>

<script setup lang="ts">
import ProfileBadge from '@/components/ProfileBadge.vue'
import TechBadge from '@/components/TechBadge.vue'
import SocialButton from '@/components/SocialButton.vue'
import type {
  ProfileBadgeProps,
  TechBadgeProps,
  SocialButtonProps,
  StatItem,
} from '@/types'

const infoBadges: ProfileBadgeProps[] = [
  { icon: 'mdi-map-marker', label: 'Buenos Aires, Argentina', color: 'info' },
  { icon: 'mdi-calendar', label: 'Est. 2024', color: 'success' },
  { icon: 'mdi-translate', label: 'Spanish & English', color: 'warning' },
]

const techStack: TechBadgeProps[] = [
  { name: 'Vue.js', icon: 'mdi-vuejs', color: '#42b883' },
  { name: 'TypeScript', icon: 'mdi-language-typescript', color: '#3178c6' },
  { name: 'Vuetify', icon: 'mdi-vuetify', color: '#1867c0' },
  { name: 'Vite', icon: 'mdi-lightning-bolt', color: '#646cff' },
  { name: 'Node.js', icon: 'mdi-nodejs', color: '#339933' },
  { name: 'Git', icon: 'mdi-git', color: '#f05032' },
]

const stats: StatItem[] = [
  { value: '10+', label: 'Projects' },
  { value: '5+', label: 'Years Exp' },
  { value: '100%', label: 'Passion' },
]

const socialLinks: SocialButtonProps[] = [
  { name: 'LinkedIn', icon: 'mdi-linkedin', color: '#0077b5', href: '#' },
  { name: 'GitHub', icon: 'mdi-github', color: '#333', href: '#' },
  { name: 'Twitter', icon: 'mdi-twitter', color: '#1da1f2', href: '#' },
  { name: 'Email', icon: 'mdi-gmail', color: '#ea4335', href: 'mailto:demo@example.com' },
]
</script>

<style scoped>
.gap-2 {
  gap: 8px;
}
.gap-3 {
  gap: 12px;
}
</style>
