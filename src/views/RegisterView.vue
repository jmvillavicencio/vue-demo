<template lang="pug">
v-container.fill-height(fluid)
  v-row(justify="center" align="center")
    v-col(cols="12" sm="8" md="6" lg="4")
      v-card.pa-6(color="surface" elevation="8")
        //- Header
        .text-center.mb-6
          v-icon.mb-4(size="64" color="primary") mdi-account-plus
          h1.text-h4.font-weight-bold Create Account
          p.text-body-2.text-grey-lighten-1.mt-2 Sign up to get started with our platform.

        //- Register Form
        RegisterForm(
          ref="registerFormRef"
          @submit="handleRegister"
        )

        //- Divider
        .d-flex.align-center.my-6
          v-divider.flex-grow-1
          span.mx-4.text-grey-lighten-1.text-body-2.text-no-wrap or sign up with
          v-divider.flex-grow-1

        //- Social Login Buttons
        .d-flex.flex-column.gap-3
          SocialLoginButton(
            ref="googleBtnRef"
            provider="google"
            icon="mdi-google"
            label="Continue with Google"
            color="#4285f4"
            @click="handleGoogleSignup"
          )
          SocialLoginButton(
            ref="appleBtnRef"
            provider="apple"
            icon="mdi-apple"
            label="Continue with Apple"
            color="#000000"
            @click="handleAppleSignup"
          )

        //- Footer
        .text-center.mt-6
          p.text-body-2.text-grey-lighten-1
            | Already have an account?
            |
            router-link.text-primary.text-decoration-none(to="/login") Sign in

        //- Back to Home
        .text-center.mt-4
          v-btn(
            variant="text"
            color="grey-lighten-1"
            to="/"
            prepend-icon="mdi-arrow-left"
            size="small"
          ) Back to Home

  //- Snackbar for notifications
  v-snackbar(
    v-model="snackbar.show"
    :color="snackbar.color"
    :timeout="3000"
  ) {{ snackbar.message }}
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import RegisterForm from '@/components/RegisterForm.vue'
import SocialLoginButton from '@/components/SocialLoginButton.vue'
import { useAuthStore } from '@/stores/auth'
import { googleAuthService } from '@/services/google-auth'
import { appleAuthService } from '@/services/apple-auth'

const router = useRouter()
const authStore = useAuthStore()

const registerFormRef = ref<InstanceType<typeof RegisterForm> | null>(null)
const googleBtnRef = ref<InstanceType<typeof SocialLoginButton> | null>(null)
const appleBtnRef = ref<InstanceType<typeof SocialLoginButton> | null>(null)

const snackbar = reactive({
  show: false,
  message: '',
  color: 'success',
})

const showSnackbar = (message: string, color: string = 'success'): void => {
  snackbar.message = message
  snackbar.color = color
  snackbar.show = true
}

const handleRegister = async (data: { name: string; email: string; password: string }): Promise<void> => {
  registerFormRef.value?.setLoading(true)

  try {
    await authStore.register(data)
    showSnackbar('Account created successfully!')
    router.push('/')
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Registration failed'
    registerFormRef.value?.setError(message)
  } finally {
    registerFormRef.value?.setLoading(false)
  }
}

const handleGoogleSignup = async (): Promise<void> => {
  googleBtnRef.value?.setLoading(true)

  try {
    const idToken = await googleAuthService.signIn()
    await authStore.googleAuth(idToken)
    showSnackbar('Account created successfully!')
    router.push('/')
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Google signup failed'
    showSnackbar(message, 'error')
  } finally {
    googleBtnRef.value?.setLoading(false)
  }
}

const handleAppleSignup = async (): Promise<void> => {
  appleBtnRef.value?.setLoading(true)

  try {
    const result = await appleAuthService.signIn()
    await authStore.appleAuth(
      result.identityToken,
      result.authorizationCode,
      result.firstName,
      result.lastName
    )
    showSnackbar('Account created successfully!')
    router.push('/')
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Apple signup failed'
    showSnackbar(message, 'error')
  } finally {
    appleBtnRef.value?.setLoading(false)
  }
}
</script>

<style scoped>
.gap-3 {
  gap: 12px;
}
</style>
