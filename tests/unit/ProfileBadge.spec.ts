import { describe, it, expect } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import ProfileBadge from '@/components/ProfileBadge.vue'
import type { ProfileBadgeProps } from '@/types'

describe('ProfileBadge', () => {
  const createWrapper = (props: ProfileBadgeProps): VueWrapper => {
    return mount(ProfileBadge, { props })
  }

  it('renders the label correctly', (): void => {
    const wrapper = createWrapper({
      icon: 'mdi-map-marker',
      label: 'Buenos Aires',
      color: 'info',
    })
    expect(wrapper.text()).toContain('Buenos Aires')
  })

  it('applies the correct color', (): void => {
    const wrapper = createWrapper({
      icon: 'mdi-calendar',
      label: 'Est. 2024',
      color: 'success',
    })
    expect(wrapper.html()).toContain('success')
  })

  it('includes the icon', (): void => {
    const wrapper = createWrapper({
      icon: 'mdi-translate',
      label: 'English',
      color: 'warning',
    })
    expect(wrapper.html()).toContain('mdi-translate')
  })
})
