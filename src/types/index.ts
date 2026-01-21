export interface ProfileBadgeProps {
  icon: string
  label: string
  color: string
}

export interface TechBadgeProps {
  name: string
  icon: string
  color: string
}

export interface SocialButtonProps {
  name: string
  icon: string
  color: string
  href: string
}

export interface SocialLoginButtonProps {
  provider: SocialProvider
  icon: string
  label: string
  color: string
}

export interface StatItem {
  value: string
  label: string
}

export interface LoginCredentials {
  username: string
  password: string
}

export type SocialProvider = 'google' | 'apple'

export type ValidationRule = (value: string) => boolean | string
