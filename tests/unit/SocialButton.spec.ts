import { describe, it, expect } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import SocialButton from '@/components/SocialButton.vue'
import type { SocialButtonProps } from '@/types'

describe('SocialButton', () => {
  const createWrapper = (props: SocialButtonProps): VueWrapper => {
    return mount(SocialButton, { props })
  }

  it('renders with the correct icon', (): void => {
    const wrapper = createWrapper({
      name: 'GitHub',
      icon: 'mdi-github',
      color: '#333',
      href: 'https://github.com',
    })
    expect(wrapper.html()).toContain('mdi-github')
  })

  it('has the correct href attribute', (): void => {
    const wrapper = createWrapper({
      name: 'LinkedIn',
      icon: 'mdi-linkedin',
      color: '#0077b5',
      href: 'https://linkedin.com',
    })
    expect(wrapper.html()).toContain('https://linkedin.com')
  })

  it('has aria-label for accessibility', (): void => {
    const wrapper = createWrapper({
      name: 'Twitter',
      icon: 'mdi-twitter',
      color: '#1da1f2',
      href: 'https://twitter.com',
    })
    expect(wrapper.html()).toContain('aria-label="Twitter"')
  })
})
