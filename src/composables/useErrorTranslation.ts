import { useI18n } from 'vue-i18n'
import type { ApiError } from '@/types/auth'
import { ApiServiceError } from '@/services/api'

/**
 * Composable for translating API error codes to user-friendly messages.
 * Uses i18n to provide localized error messages.
 */
export function useErrorTranslation() {
  const { t, te } = useI18n()

  /**
   * Translates an API error code to a user-friendly message.
   * Falls back to the raw message if no translation exists.
   */
  const translateError = (error: ApiError | ApiServiceError | Error | string): string => {
    // Handle string errors
    if (typeof error === 'string') {
      return error
    }

    // Handle ApiServiceError
    if (error instanceof ApiServiceError) {
      const translationKey = `errors.${error.code}`
      if (te(translationKey)) {
        return t(translationKey)
      }
      return error.message
    }

    // Handle standard Error objects (not ApiServiceError)
    if (error instanceof Error && !('code' in error)) {
      return error.message
    }

    // Handle ApiError with code
    const apiError = error as ApiError
    const errorCode = apiError.code

    if (errorCode) {
      const translationKey = `errors.${errorCode}`
      if (te(translationKey)) {
        return t(translationKey)
      }
    }

    // Fallback to raw message or generic error
    return apiError.message || t('errors.UNKNOWN_ERROR')
  }

  /**
   * Extracts the field name from an API error for form validation.
   */
  const getErrorField = (error: ApiError | ApiServiceError): string | undefined => {
    if (error instanceof ApiServiceError) {
      return error.field
    }
    return error.field
  }

  /**
   * Creates a field-specific error map for form validation.
   * Returns null if the error doesn't have a field.
   */
  const createFieldErrors = (
    error: ApiError | ApiServiceError
  ): Record<string, string> | null => {
    const field = getErrorField(error)
    if (!field) return null

    return {
      [field]: translateError(error),
    }
  }

  return {
    translateError,
    getErrorField,
    createFieldErrors,
  }
}
