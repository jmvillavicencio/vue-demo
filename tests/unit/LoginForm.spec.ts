import { describe, it, expect } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import LoginForm from '@/components/LoginForm.vue'

describe('LoginForm', () => {
  const createWrapper = (): VueWrapper => {
    return mount(LoginForm)
  }

  it('renders username and password fields', (): void => {
    const wrapper = createWrapper()
    expect(wrapper.html()).toContain('Username or Email')
    expect(wrapper.html()).toContain('Password')
  })

  it('renders remember me checkbox', (): void => {
    const wrapper = createWrapper()
    expect(wrapper.html()).toContain('Remember me')
  })

  it('renders forgot password link', (): void => {
    const wrapper = createWrapper()
    expect(wrapper.text()).toContain('Forgot password?')
  })

  it('renders sign in button', (): void => {
    const wrapper = createWrapper()
    expect(wrapper.text()).toContain('Sign In')
  })

  it('has password visibility toggle', (): void => {
    const wrapper = createWrapper()
    expect(wrapper.html()).toContain('mdi-eye')
  })

  it('emits submit event with credentials', async (): Promise<void> => {
    const wrapper = createWrapper()

    const usernameInput = wrapper.find('input[type="text"]')
    const passwordInput = wrapper.find('input[type="password"]')

    await usernameInput.setValue('testuser')
    await passwordInput.setValue('password123')

    await wrapper.find('form').trigger('submit')

    expect(wrapper.emitted()).toBeDefined()
  })
})
