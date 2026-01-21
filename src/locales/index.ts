import en from './en.json'

export const messages = {
  en,
}

export const defaultLocale = 'en'
export const supportedLocales = ['en'] as const
export type SupportedLocale = (typeof supportedLocales)[number]
