import { describe, it, expect } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import TechBadge from '@/components/TechBadge.vue'
import type { TechBadgeProps } from '@/types'

describe('TechBadge', () => {
  const createWrapper = (props: TechBadgeProps): VueWrapper => {
    return mount(TechBadge, { props })
  }

  it('renders the technology name', (): void => {
    const wrapper = createWrapper({
      name: 'Vue.js',
      icon: 'mdi-vuejs',
      color: '#42b883',
    })
    expect(wrapper.text()).toContain('Vue.js')
  })

  it('applies custom color styling', (): void => {
    const wrapper = createWrapper({
      name: 'TypeScript',
      icon: 'mdi-language-typescript',
      color: '#3178c6',
    })
    expect(wrapper.html()).toContain('#3178c6')
  })

  it('includes the technology icon', (): void => {
    const wrapper = createWrapper({
      name: 'Node.js',
      icon: 'mdi-nodejs',
      color: '#339933',
    })
    expect(wrapper.html()).toContain('mdi-nodejs')
  })
})
