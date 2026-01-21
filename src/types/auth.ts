// Request DTOs
export interface RegisterRequest {
  email: string
  name: string
  password: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface GoogleAuthRequest {
  idToken: string
}

export interface AppleAuthRequest {
  identityToken: string
  authorizationCode: string
  firstName?: string
  lastName?: string
}

export interface RefreshTokenRequest {
  refreshToken: string
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ResetPasswordRequest {
  token: string
  newPassword: string
}

export interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
}

// Response DTOs
export interface UserInfo {
  id: string
  email: string
  name: string
  provider: 'email' | 'google' | 'apple'
  createdAt: string
}

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  user: UserInfo
  expiresIn: number
}

export interface MessageResponse {
  success: boolean
  message: string
}

// Structured error response from the API
export interface ApiError {
  code: string
  statusCode: number
  message: string
  field?: string
  error?: string
  timestamp?: string
  path?: string
}
