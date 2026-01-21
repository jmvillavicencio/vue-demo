import type {
  RegisterRequest,
  LoginRequest,
  GoogleAuthRequest,
  AppleAuthRequest,
  RefreshTokenRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
  AuthResponse,
  MessageResponse,
  UserInfo,
  ApiError,
} from '@/types/auth'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

class ApiService {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    // Merge existing headers
    if (options.headers) {
      const existingHeaders = options.headers as Record<string, string>
      Object.assign(headers, existingHeaders)
    }

    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`
    }

    const response = await fetch(url, {
      ...options,
      headers,
    })

    const data = await response.json()

    if (!response.ok) {
      const error = data as ApiError
      throw new Error(error.message || 'An error occurred')
    }

    return data as T
  }

  // Auth endpoints
  async register(data: RegisterRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async login(data: LoginRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async googleAuth(data: GoogleAuthRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>('/api/auth/google', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async appleAuth(data: AppleAuthRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>('/api/auth/apple', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async refreshToken(data: RefreshTokenRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>('/api/auth/refresh', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async logout(data: RefreshTokenRequest): Promise<MessageResponse> {
    return this.request<MessageResponse>('/api/auth/logout', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async forgotPassword(data: ForgotPasswordRequest): Promise<MessageResponse> {
    return this.request<MessageResponse>('/api/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async resetPassword(data: ResetPasswordRequest): Promise<MessageResponse> {
    return this.request<MessageResponse>('/api/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async changePassword(data: ChangePasswordRequest): Promise<MessageResponse> {
    return this.request<MessageResponse>('/api/auth/change-password', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async getProfile(): Promise<UserInfo> {
    return this.request<UserInfo>('/api/auth/me', {
      method: 'GET',
    })
  }
}

export const apiService = new ApiService(API_BASE_URL)
