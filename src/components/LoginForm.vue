<template lang="pug">
v-form(ref="formRef" @submit.prevent="onSubmit")
  v-text-field.mb-3(
    v-model="username"
    label="Username or Email"
    prepend-inner-icon="mdi-account"
    variant="outlined"
    density="comfortable"
    :rules="usernameRules"
    autocomplete="username"
  )

  v-text-field.mb-2(
    v-model="password"
    label="Password"
    prepend-inner-icon="mdi-lock"
    :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
    :type="showPassword ? 'text' : 'password'"
    variant="outlined"
    density="comfortable"
    :rules="passwordRules"
    autocomplete="current-password"
    @click:append-inner="showPassword = !showPassword"
  )

  .d-flex.justify-space-between.align-center.mb-4
    v-checkbox(
      v-model="rememberMe"
      label="Remember me"
      density="compact"
      hide-details
      color="primary"
    )
    a.text-primary.text-body-2.text-decoration-none(href="#") Forgot password?

  v-btn(
    type="submit"
    color="primary"
    size="large"
    block
    :loading="loading"
  ) Sign In
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { VForm } from 'vuetify/components'
import type { LoginCredentials, ValidationRule } from '@/types'

const emit = defineEmits<{
  submit: [credentials: LoginCredentials]
}>()

const formRef = ref<VForm | null>(null)
const username = ref<string>('')
const password = ref<string>('')
const showPassword = ref<boolean>(false)
const rememberMe = ref<boolean>(false)
const loading = ref<boolean>(false)

const usernameRules: ValidationRule[] = [
  (v: string): boolean | string => !!v || 'Username is required',
  (v: string): boolean | string => v.length >= 3 || 'Username must be at least 3 characters',
]

const passwordRules: ValidationRule[] = [
  (v: string): boolean | string => !!v || 'Password is required',
  (v: string): boolean | string => v.length >= 6 || 'Password must be at least 6 characters',
]

const onSubmit = async (): Promise<void> => {
  if (!formRef.value) return

  const { valid } = await formRef.value.validate()
  if (!valid) return

  loading.value = true
  setTimeout((): void => {
    emit('submit', { username: username.value, password: password.value })
    loading.value = false
  }, 1000)
}
</script>
