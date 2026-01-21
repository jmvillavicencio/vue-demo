<template lang="pug">
v-form(ref="formRef" @submit.prevent="onSubmit")
  v-text-field.mb-3(
    v-model="name"
    label="Full Name"
    prepend-inner-icon="mdi-account"
    variant="outlined"
    density="comfortable"
    :rules="nameRules"
    autocomplete="name"
    bg-color="surface"
  )

  v-text-field.mb-3(
    v-model="email"
    label="Email"
    prepend-inner-icon="mdi-email"
    variant="outlined"
    density="comfortable"
    :rules="emailRules"
    autocomplete="email"
    type="email"
    bg-color="surface"
  )

  v-text-field.mb-3(
    v-model="password"
    label="Password"
    prepend-inner-icon="mdi-lock"
    :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
    :type="showPassword ? 'text' : 'password'"
    variant="outlined"
    density="comfortable"
    :rules="passwordRules"
    autocomplete="new-password"
    bg-color="surface"
    @click:append-inner="showPassword = !showPassword"
  )

  v-text-field.mb-4(
    v-model="confirmPassword"
    label="Confirm Password"
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
    @click:close="errorMessage = ''"
  ) {{ errorMessage }}

  v-btn(
    type="submit"
    color="primary"
    size="large"
    block
    :loading="loading"
    :disabled="loading"
  ) Create Account
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { VForm } from 'vuetify/components'
import type { ValidationRule } from '@/types'

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
const errorMessage = ref<string>('')

const nameRules: ValidationRule[] = [
  (v: string): boolean | string => !!v || 'Name is required',
  (v: string): boolean | string => v.length >= 2 || 'Name must be at least 2 characters',
]

const emailRules: ValidationRule[] = [
  (v: string): boolean | string => !!v || 'Email is required',
  (v: string): boolean | string => /.+@.+\..+/.test(v) || 'Please enter a valid email',
]

const passwordRules: ValidationRule[] = [
  (v: string): boolean | string => !!v || 'Password is required',
  (v: string): boolean | string => v.length >= 8 || 'Password must be at least 8 characters',
  (v: string): boolean | string => /[A-Z]/.test(v) || 'Password must contain an uppercase letter',
  (v: string): boolean | string => /[a-z]/.test(v) || 'Password must contain a lowercase letter',
  (v: string): boolean | string => /[0-9]/.test(v) || 'Password must contain a number',
]

const confirmPasswordRules: ValidationRule[] = [
  (v: string): boolean | string => !!v || 'Please confirm your password',
  (v: string): boolean | string => v === password.value || 'Passwords do not match',
]

const setLoading = (value: boolean): void => {
  loading.value = value
}

const setError = (message: string): void => {
  errorMessage.value = message
}

const onSubmit = async (): Promise<void> => {
  if (!formRef.value) return

  const { valid } = await formRef.value.validate()
  if (!valid) return

  emit('submit', {
    name: name.value,
    email: email.value,
    password: password.value,
  })
}

defineExpose({
  setLoading,
  setError,
})
</script>
