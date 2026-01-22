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

/**
 * Custom error class that preserves the full API error response.
 * Use this to access error codes for i18n translation.
 */
export class ApiServiceError extends Error {
  public readonly apiError: ApiError

  constructor(apiError: ApiError) {
    super(apiError.message)
    this.name = 'ApiServiceError'
    this.apiError = apiError
  }

  get code(): string {
    return this.apiError.code
  }

  get field(): string | undefined {
    return this.apiError.field
  }

  get statusCode(): number {
    return this.apiError.statusCode
  }
}

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

    let response: Response
    try {
      response = await fetch(url, {
        ...options,
        headers,
      })
    } catch {
      // Network error (no connection, DNS failure, etc.)
      throw new ApiServiceError({
        code: 'NETWORK_ERROR',
        statusCode: 0,
        message: 'Unable to connect to the server',
      })
    }

    const data = await response.json()

    if (!response.ok) {
      // The response is now a structured error
      const apiError: ApiError = {
        code: data.code || 'UNKNOWN_ERROR',
        statusCode: data.statusCode || response.status,
        message: data.message || 'An error occurred',
        field: data.field,
        error: data.error,
        timestamp: data.timestamp,
        path: data.path,
      }
      throw new ApiServiceError(apiError)
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

  async checkEmailAvailability(email: string): Promise<{ available: boolean }> {
    return this.request<{ available: boolean }>(`/api/auth/check-email?email=${encodeURIComponent(email)}`, {
      method: 'GET',
    })
  }
}

export const apiService = new ApiService(API_BASE_URL)
