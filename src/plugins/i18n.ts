import { createI18n } from 'vue-i18n'
import { messages, defaultLocale } from '@/locales'

export const i18n = createI18n({
  legacy: false, // Use Composition API
  locale: defaultLocale,
  fallbackLocale: defaultLocale,
  messages,
})

export default i18n
