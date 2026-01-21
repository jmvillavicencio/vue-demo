<template lang="pug">
v-form(ref="formRef" @submit.prevent="onSubmit")
  v-text-field.mb-3(
    v-model="name"
    :label="$t('auth.fullName')"
    prepend-inner-icon="mdi-account"
    variant="outlined"
    density="comfortable"
    :rules="nameRules"
    :error-messages="fieldErrors.name"
    autocomplete="name"
    bg-color="surface"
  )

  v-text-field.mb-3(
    v-model="email"
    :label="$t('auth.email')"
    prepend-inner-icon="mdi-email"
    variant="outlined"
    density="comfortable"
    :rules="emailRules"
    :error-messages="fieldErrors.email"
    autocomplete="email"
    type="email"
    bg-color="surface"
  )

  v-text-field.mb-3(
    v-model="password"
    :label="$t('auth.password')"
    prepend-inner-icon="mdi-lock"
    :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
    :type="showPassword ? 'text' : 'password'"
    variant="outlined"
    density="comfortable"
    :rules="passwordRules"
    :error-messages="fieldErrors.password"
    autocomplete="new-password"
    bg-color="surface"
    @click:append-inner="showPassword = !showPassword"
  )

  v-text-field.mb-4(
    v-model="confirmPassword"
    :label="$t('auth.confirmPassword')"
    prepend-inner-icon="mdi-lock-check"
    :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
    :type="showConfirmPassword ? 'text' : 'password'"
    variant="outlined"
    density="comfortable"
    :rules="confirmPasswordRules"
    autocomplete="new-password"
    bg-color="surface"
    @click:append-inner="showConfirmPassword = !showConfirmPassword"
  )

  .text-caption.text-grey-lighten-1.mb-4
    | Password must be at least 8 characters with uppercase, lowercase, and a number.

  v-alert.mb-4(
    v-if="errorMessage"
    type="error"
    variant="tonal"
    density="compact"
    closable
    @click:close="clearError"
  ) {{ errorMessage }}

  v-btn(
    type="submit"
    color="primary"
    size="large"
    block
    :loading="loading"
    :disabled="loading"
  ) {{ $t('auth.signUp') }}
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { VForm } from 'vuetify/components'
import type { ValidationRule } from '@/types'
import type { ApiError } from '@/types/auth'
import { useErrorTranslation } from '@/composables/useErrorTranslation'

const { t } = useI18n()
const { translateError, createFieldErrors } = useErrorTranslation()

const emit = defineEmits<{
  submit: [data: { name: string; email: string; password: string }]
}>()

const formRef = ref<VForm | null>(null)
const name = ref<string>('')
const email = ref<string>('')
const password = ref<string>('')
const confirmPassword = ref<string>('')
const showPassword = ref<boolean>(false)
const showConfirmPassword = ref<boolean>(false)
const loading = ref<boolean>(false)
const apiError = ref<ApiError | null>(null)

// Computed error message using i18n
const errorMessage = computed((): string => {
  if (!apiError.value) return ''
  return translateError(apiError.value)
})

// Field-specific errors for inline validation
const fieldErrors = computed(() => {
  if (!apiError.value) {
    return { name: '', email: '', password: '' }
  }
  const errors = createFieldErrors(apiError.value)
  return {
    name: errors?.name || '',
    email: errors?.email || '',
    password: errors?.password || '',
  }
})

const nameRules: ValidationRule[] = [
  (v: string): boolean | string => !!v || t('errors.VALIDATION_ERROR'),
  (v: string): boolean | string => v.length >= 2 || t('errors.VALIDATION_ERROR'),
]

const emailRules: ValidationRule[] = [
  (v: string): boolean | string => !!v || t('errors.VALIDATION_ERROR'),
  (v: string): boolean | string => /.+@.+\..+/.test(v) || t('errors.VALIDATION_ERROR'),
]

const passwordRules: ValidationRule[] = [
  (v: string): boolean | string => !!v || t('errors.VALIDATION_ERROR'),
  (v: string): boolean | string => v.length >= 8 || t('errors.PASSWORD_TOO_WEAK'),
  (v: string): boolean | string => /[A-Z]/.test(v) || t('errors.PASSWORD_TOO_WEAK'),
  (v: string): boolean | string => /[a-z]/.test(v) || t('errors.PASSWORD_TOO_WEAK'),
  (v: string): boolean | string => /[0-9]/.test(v) || t('errors.PASSWORD_TOO_WEAK'),
]

const confirmPasswordRules: ValidationRule[] = [
  (v: string): boolean | string => !!v || t('errors.VALIDATION_ERROR'),
  (v: string): boolean | string => v === password.value || t('errors.VALIDATION_ERROR'),
]

const setLoading = (value: boolean): void => {
  loading.value = value
}

const setError = (error: ApiError | string): void => {
  if (typeof error === 'string') {
    apiError.value = {
      code: 'UNKNOWN_ERROR',
      statusCode: 400,
      message: error,
    }
  } else {
    apiError.value = error
  }
}

const clearError = (): void => {
  apiError.value = null
}

const onSubmit = async (): Promise<void> => {
  if (!formRef.value) return

  const { valid } = await formRef.value.validate()
  if (!valid) return

  clearError()
  emit('submit', {
    name: name.value,
    email: email.value,
    password: password.value,
  })
}

defineExpose({
  setLoading,
  setError,
  clearError,
})
</script>
