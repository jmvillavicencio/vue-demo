<template lang="pug">
v-container.fill-height(fluid)
  v-row(justify="center" align="center")
    v-col(cols="12" sm="8" md="6" lg="4")
      v-card.pa-6(color="surface" elevation="8")
        //- Header
        .text-center.mb-6
          v-icon.mb-4(size="64" color="primary") mdi-account-circle
          h1.text-h4.font-weight-bold Sign In
          p.text-body-2.text-grey-lighten-1.mt-2 Welcome back! Please sign in to continue.

        //- Login Form
        LoginForm(@submit="handleLogin")

        //- Divider
        .d-flex.align-center.my-6
          v-divider.flex-grow-1
          span.mx-4.text-grey-lighten-1.text-body-2 or continue with
          v-divider.flex-grow-1

        //- Social Login Buttons
        .d-flex.flex-column.gap-3
          SocialLoginButton(
            provider="google"
            icon="mdi-google"
            label="Continue with Google"
            color="#4285f4"
            @click="handleSocialLogin('google')"
          )
          SocialLoginButton(
            provider="apple"
            icon="mdi-apple"
            label="Continue with Apple"
            color="#000000"
            @click="handleSocialLogin('apple')"
          )

        //- Footer
        .text-center.mt-6
          p.text-body-2.text-grey-lighten-1
            | Don't have an account?
            |
            a.text-primary.text-decoration-none(href="#") Sign up

        //- Back to Home
        .text-center.mt-4
          v-btn(
            variant="text"
            color="grey-lighten-1"
            to="/"
            prepend-icon="mdi-arrow-left"
            size="small"
          ) Back to Home
</template>

<script setup lang="ts">
import LoginForm from '@/components/LoginForm.vue'
import SocialLoginButton from '@/components/SocialLoginButton.vue'
import type { LoginCredentials, SocialProvider } from '@/types'

const handleLogin = (credentials: LoginCredentials): void => {
  console.log('Login attempt:', credentials.username)
  alert(`Login demo: ${credentials.username}`)
}

const handleSocialLogin = (provider: SocialProvider): void => {
  console.log('Social login with:', provider)
  alert(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login demo`)
}
</script>

<style scoped>
.gap-3 {
  gap: 12px;
}
</style>
