const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''

interface GoogleCredentialResponse {
  credential: string
  select_by: string
  clientId: string
}

interface GoogleAccounts {
  id: {
    initialize: (config: {
      client_id: string
      callback: (response: GoogleCredentialResponse) => void
      auto_select?: boolean
      cancel_on_tap_outside?: boolean
    }) => void
    prompt: (callback?: (notification: { isNotDisplayed: () => boolean; isSkippedMoment: () => boolean }) => void) => void
    renderButton: (
      element: HTMLElement,
      config: {
        type?: 'standard' | 'icon'
        theme?: 'outline' | 'filled_blue' | 'filled_black'
        size?: 'large' | 'medium' | 'small'
        text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin'
        shape?: 'rectangular' | 'pill' | 'circle' | 'square'
        logo_alignment?: 'left' | 'center'
        width?: number
        locale?: string
      }
    ) => void
    disableAutoSelect: () => void
  }
}

declare global {
  interface Window {
    google?: GoogleAccounts
  }
}

export class GoogleAuthService {
  private initialized = false
  private initPromise: Promise<void> | null = null

  async init(): Promise<void> {
    if (this.initialized) return
    if (this.initPromise) return this.initPromise

    this.initPromise = new Promise((resolve, reject) => {
      if (!GOOGLE_CLIENT_ID) {
        reject(new Error('Google Client ID not configured'))
        return
      }

      // Check if script already loaded
      if (window.google?.id) {
        this.initialized = true
        resolve()
        return
      }

      // Load Google Identity Services script
      const script = document.createElement('script')
      script.src = 'https://accounts.google.com/gsi/client'
      script.async = true
      script.defer = true

      script.onload = (): void => {
        this.initialized = true
        resolve()
      }

      script.onerror = (): void => {
        reject(new Error('Failed to load Google Identity Services'))
      }

      document.head.appendChild(script)
    })

    return this.initPromise
  }

  async signIn(): Promise<string> {
    await this.init()

    return new Promise((resolve, reject) => {
      if (!window.google?.id) {
        reject(new Error('Google Identity Services not loaded'))
        return
      }

      window.google.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: (response: GoogleCredentialResponse): void => {
          if (response.credential) {
            resolve(response.credential)
          } else {
            reject(new Error('No credential received from Google'))
          }
        },
        auto_select: false,
        cancel_on_tap_outside: true,
      })

      window.google.id.prompt((notification): void => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          reject(new Error('Google Sign-In was cancelled or not displayed'))
        }
      })
    })
  }

  renderButton(element: HTMLElement): void {
    if (!window.google?.id) {
      console.error('Google Identity Services not loaded')
      return
    }

    window.google.id.renderButton(element, {
      type: 'standard',
      theme: 'filled_blue',
      size: 'large',
      text: 'continue_with',
      shape: 'rectangular',
      width: 300,
    })
  }
}

export const googleAuthService = new GoogleAuthService()
