<template lang="pug">
v-container.fill-height(fluid)
  v-row(justify="center" align="center")
    v-col(cols="12" sm="8" md="6" lg="4")
      v-card.pa-6(color="surface" elevation="8")
        //- Header
        .text-center.mb-6
          v-icon.mb-4(size="64" color="primary") mdi-account-circle
          h1.text-h4.font-weight-bold {{ $t('auth.signIn') }}
          p.text-body-2.text-grey-lighten-1.mt-2 Welcome back! Please sign in to continue.

        //- Login Form
        LoginForm(
          ref="loginFormRef"
          @submit="handleLogin"
          @forgot-password="handleForgotPassword"
        )

        //- Divider
        .d-flex.align-center.my-6
          v-divider.flex-grow-1
          span.mx-4.text-grey-lighten-1.text-body-2.text-no-wrap {{ $t('auth.continueWith') }}
          v-divider.flex-grow-1

        //- Social Login Buttons
        .d-flex.flex-column.gap-3
          SocialLoginButton(
            ref="googleBtnRef"
            provider="google"
            icon="mdi-google"
            label="Continue with Google"
            color="white"
            @click="handleGoogleLogin"
          )
          SocialLoginButton(
            ref="appleBtnRef"
            provider="apple"
            icon="mdi-apple"
            label="Continue with Apple"
            color="white"
            @click="handleAppleLogin"
          )

        //- Footer
        .text-center.mt-6
          p.text-body-2.text-grey-lighten-1
            | {{ $t('auth.noAccount') }}
            |
            router-link.text-primary.text-decoration-none(to="/register") {{ $t('auth.signUp') }}

        //- Back to Home
        .text-center.mt-4
          v-btn(
            variant="text"
            color="grey-lighten-1"
            to="/"
            prepend-icon="mdi-arrow-left"
            size="small"
          ) {{ $t('common.back') }}

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
import { useI18n } from 'vue-i18n'
import LoginForm from '@/components/LoginForm.vue'
import SocialLoginButton from '@/components/SocialLoginButton.vue'
import { useAuthStore } from '@/stores/auth'
import { googleAuthService } from '@/services/google-auth'
import { appleAuthService } from '@/services/apple-auth'
import { ApiServiceError } from '@/services/api'
import { useErrorTranslation } from '@/composables/useErrorTranslation'

const { t } = useI18n()
const { translateError } = useErrorTranslation()
const router = useRouter()
const authStore = useAuthStore()

const loginFormRef = ref<InstanceType<typeof LoginForm> | null>(null)
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

const handleLogin = async (credentials: { email: string; password: string }): Promise<void> => {
  loginFormRef.value?.setLoading(true)

  try {
    await authStore.login(credentials)
    showSnackbar(t('auth.loginSuccess'))
    router.push('/')
  } catch (error) {
    if (error instanceof ApiServiceError) {
      // Pass the full ApiError to the form for proper i18n handling
      loginFormRef.value?.setError(error.apiError)
    } else {
      const message = error instanceof Error ? error.message : t('errors.UNKNOWN_ERROR')
      loginFormRef.value?.setError(message)
    }
  } finally {
    loginFormRef.value?.setLoading(false)
  }
}

const handleGoogleLogin = async (): Promise<void> => {
  googleBtnRef.value?.setLoading(true)

  try {
    const idToken = await googleAuthService.signIn()
    await authStore.googleAuth(idToken)
    showSnackbar(t('auth.loginSuccess'))
    router.push('/')
  } catch (error) {
    const message = error instanceof ApiServiceError
      ? translateError(error.apiError)
      : error instanceof Error
        ? error.message
        : t('errors.UNKNOWN_ERROR')
    showSnackbar(message, 'error')
  } finally {
    googleBtnRef.value?.setLoading(false)
  }
}

const handleAppleLogin = async (): Promise<void> => {
  appleBtnRef.value?.setLoading(true)

  try {
    const result = await appleAuthService.signIn()
    await authStore.appleAuth(
      result.identityToken,
      result.authorizationCode,
      result.firstName,
      result.lastName
    )
    showSnackbar(t('auth.loginSuccess'))
    router.push('/')
  } catch (error) {
    const message = error instanceof ApiServiceError
      ? translateError(error.apiError)
      : error instanceof Error
        ? error.message
        : t('errors.UNKNOWN_ERROR')
    showSnackbar(message, 'error')
  } finally {
    appleBtnRef.value?.setLoading(false)
  }
}

const handleForgotPassword = (): void => {
  showSnackbar('Password reset feature coming soon', 'info')
}
</script>

<style scoped>
.gap-3 {
  gap: 12px;
}
</style>
