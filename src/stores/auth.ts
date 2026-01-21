import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apiService, ApiServiceError } from '@/services/api'
import type { UserInfo, RegisterRequest, LoginRequest, ApiError } from '@/types/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<UserInfo | null>(null)
  const accessToken = ref<string | null>(null)
  const refreshToken = ref<string | null>(null)
  const loading = ref<boolean>(false)
  const error = ref<ApiError | null>(null)

  const isAuthenticated = computed((): boolean => !!accessToken.value && !!user.value)

  // Initialize from localStorage
  const init = (): void => {
    const storedToken = localStorage.getItem('accessToken')
    const storedRefreshToken = localStorage.getItem('refreshToken')
    const storedUser = localStorage.getItem('user')

    if (storedToken) accessToken.value = storedToken
    if (storedRefreshToken) refreshToken.value = storedRefreshToken
    if (storedUser) user.value = JSON.parse(storedUser)
  }

  // Save to localStorage
  const saveTokens = (access: string, refresh: string, userInfo: UserInfo): void => {
    accessToken.value = access
    refreshToken.value = refresh
    user.value = userInfo

    localStorage.setItem('accessToken', access)
    localStorage.setItem('refreshToken', refresh)
    localStorage.setItem('user', JSON.stringify(userInfo))
  }

  // Clear storage
  const clearAuth = (): void => {
    accessToken.value = null
    refreshToken.value = null
    user.value = null

    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
  }

  // Helper to create ApiError from any error
  const createApiError = (err: unknown, fallbackMessage: string): ApiError => {
    if (err instanceof ApiServiceError) {
      return err.apiError
    }
    return {
      code: 'UNKNOWN_ERROR',
      statusCode: 500,
      message: err instanceof Error ? err.message : fallbackMessage,
    }
  }

  // Register
  const register = async (data: RegisterRequest): Promise<void> => {
    loading.value = true
    error.value = null

    try {
      const response = await apiService.register(data)
      saveTokens(response.accessToken, response.refreshToken, response.user)
    } catch (err) {
      error.value = createApiError(err, 'Registration failed')
      throw err
    } finally {
      loading.value = false
    }
  }

  // Login
  const login = async (data: LoginRequest): Promise<void> => {
    loading.value = true
    error.value = null

    try {
      const response = await apiService.login(data)
      saveTokens(response.accessToken, response.refreshToken, response.user)
    } catch (err) {
      error.value = createApiError(err, 'Login failed')
      throw err
    } finally {
      loading.value = false
    }
  }

  // Google Auth
  const googleAuth = async (idToken: string): Promise<void> => {
    loading.value = true
    error.value = null

    try {
      const response = await apiService.googleAuth({ idToken })
      saveTokens(response.accessToken, response.refreshToken, response.user)
    } catch (err) {
      error.value = createApiError(err, 'Google authentication failed')
      throw err
    } finally {
      loading.value = false
    }
  }

  // Apple Auth
  const appleAuth = async (
    identityToken: string,
    authorizationCode: string,
    firstName?: string,
    lastName?: string
  ): Promise<void> => {
    loading.value = true
    error.value = null

    try {
      const response = await apiService.appleAuth({
        identityToken,
        authorizationCode,
        firstName,
        lastName,
      })
      saveTokens(response.accessToken, response.refreshToken, response.user)
    } catch (err) {
      error.value = createApiError(err, 'Apple authentication failed')
      throw err
    } finally {
      loading.value = false
    }
  }

  // Logout
  const logout = async (): Promise<void> => {
    loading.value = true

    try {
      if (refreshToken.value) {
        await apiService.logout({ refreshToken: refreshToken.value })
      }
    } catch {
      // Ignore logout errors
    } finally {
      clearAuth()
      loading.value = false
    }
  }

  // Refresh token
  const refresh = async (): Promise<void> => {
    if (!refreshToken.value) {
      clearAuth()
      throw new Error('No refresh token')
    }

    try {
      const response = await apiService.refreshToken({ refreshToken: refreshToken.value })
      saveTokens(response.accessToken, response.refreshToken, response.user)
    } catch {
      clearAuth()
      throw new Error('Token refresh failed')
    }
  }

  return {
    user,
    accessToken,
    refreshToken,
    loading,
    error,
    isAuthenticated,
    init,
    register,
    login,
    googleAuth,
    appleAuth,
    logout,
    refresh,
    clearAuth,
  }
})
