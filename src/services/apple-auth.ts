const APPLE_CLIENT_ID = import.meta.env.VITE_APPLE_CLIENT_ID || ''
const APPLE_REDIRECT_URI = import.meta.env.VITE_APPLE_REDIRECT_URI || window.location.origin

interface AppleIDAuthorization {
  code: string
  id_token: string
  state?: string
  user?: {
    email?: string
    name?: {
      firstName?: string
      lastName?: string
    }
  }
}

interface AppleIDError {
  error: string
}

interface AppleIDAuthConfig {
  clientId: string
  scope: string
  redirectURI: string
  state?: string
  nonce?: string
  usePopup: boolean
}

interface AppleID {
  auth: {
    init: (config: AppleIDAuthConfig) => void
    signIn: () => Promise<AppleIDAuthorization>
  }
}

declare global {
  interface Window {
    AppleID?: AppleID
  }
}

export interface AppleAuthResult {
  identityToken: string
  authorizationCode: string
  firstName?: string
  lastName?: string
}

export class AppleAuthService {
  private initialized = false
  private initPromise: Promise<void> | null = null

  async init(): Promise<void> {
    if (this.initialized) return
    if (this.initPromise) return this.initPromise

    this.initPromise = new Promise((resolve, reject) => {
      if (!APPLE_CLIENT_ID) {
        reject(new Error('Apple Client ID not configured'))
        return
      }

      // Check if script already loaded
      if (window.AppleID?.auth) {
        this.initializeAppleID()
        this.initialized = true
        resolve()
        return
      }

      // Load Apple Sign In script
      const script = document.createElement('script')
      script.src = 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js'
      script.async = true
      script.defer = true

      script.onload = (): void => {
        this.initializeAppleID()
        this.initialized = true
        resolve()
      }

      script.onerror = (): void => {
        reject(new Error('Failed to load Apple Sign In SDK'))
      }

      document.head.appendChild(script)
    })

    return this.initPromise
  }

  private initializeAppleID(): void {
    if (!window.AppleID?.auth) return

    window.AppleID.auth.init({
      clientId: APPLE_CLIENT_ID,
      scope: 'name email',
      redirectURI: APPLE_REDIRECT_URI,
      usePopup: true,
    })
  }

  async signIn(): Promise<AppleAuthResult> {
    await this.init()

    if (!window.AppleID?.auth) {
      throw new Error('Apple Sign In SDK not loaded')
    }

    try {
      const response = await window.AppleID.auth.signIn()

      return {
        identityToken: response.id_token,
        authorizationCode: response.code,
        firstName: response.user?.name?.firstName,
        lastName: response.user?.name?.lastName,
      }
    } catch (error) {
      const appleError = error as AppleIDError
      if (appleError.error === 'popup_closed_by_user') {
        throw new Error('Sign in was cancelled')
      }
      throw new Error(appleError.error || 'Apple Sign In failed')
    }
  }
}

export const appleAuthService = new AppleAuthService()
