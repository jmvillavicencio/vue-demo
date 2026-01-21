import { describe, it, expect } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import SocialLoginButton from '@/components/SocialLoginButton.vue'
import type { SocialLoginButtonProps } from '@/types'

describe('SocialLoginButton', () => {
  const createWrapper = (props: SocialLoginButtonProps): VueWrapper => {
    return mount(SocialLoginButton, { props })
  }

  it('renders the label text', (): void => {
    const wrapper = createWrapper({
      provider: 'google',
      icon: 'mdi-google',
      label: 'Continue with Google',
      color: '#4285f4',
    })
    expect(wrapper.text()).toContain('Continue with Google')
  })

  it('renders the provider icon', (): void => {
    const wrapper = createWrapper({
      provider: 'apple',
      icon: 'mdi-apple',
      label: 'Continue with Apple',
      color: '#000000',
    })
    expect(wrapper.html()).toContain('mdi-apple')
  })

  it('emits click event when clicked', async (): Promise<void> => {
    const wrapper = createWrapper({
      provider: 'google',
      icon: 'mdi-google',
      label: 'Continue with Google',
      color: '#4285f4',
    })

    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('renders as a block button', (): void => {
    const wrapper = createWrapper({
      provider: 'apple',
      icon: 'mdi-apple',
      label: 'Continue with Apple',
      color: '#000000',
    })
    expect(wrapper.html()).toContain('v-btn--block')
  })
})
