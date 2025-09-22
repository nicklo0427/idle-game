import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProgressBar from '../ProgressBar.vue'

describe('ProgressBar', () => {
  describe('Basic functionality', () => {
    it('renders with default props', () => {
      const wrapper = mount(ProgressBar)
      expect(wrapper.find('.progress-container').exists()).toBe(true)
      expect(wrapper.find('.progress-track-wrapper').exists()).toBe(true)
      expect(wrapper.find('.progress-fill').exists()).toBe(true)
    })

    it('displays correct percentage', () => {
      const wrapper = mount(ProgressBar, {
        props: {
          value: 50,
          max: 100,
          showValue: true,
          label: 'Progress'
        }
      })
      expect(wrapper.text()).toContain('50%')
    })

    it('handles edge cases correctly', () => {
      const wrapper = mount(ProgressBar, {
        props: {
          value: 150, // 超出最大值
          max: 100,
          showValue: true,
          label: 'Progress'
        }
      })
      expect(wrapper.text()).toContain('100%')
    })

    it('handles negative values correctly', () => {
      const wrapper = mount(ProgressBar, {
        props: {
          value: -50,
          max: 100,
          showValue: true,
          label: 'Progress'
        }
      })
      expect(wrapper.text()).toContain('0%')
    })
  })

  describe('Variants', () => {
    it('applies health variant classes', () => {
      const wrapper = mount(ProgressBar, {
        props: { variant: 'health' }
      })
      expect(wrapper.find('.progress-fill--health').exists()).toBe(true)
    })

    it('applies experience variant classes', () => {
      const wrapper = mount(ProgressBar, {
        props: { variant: 'experience' }
      })
      expect(wrapper.find('.progress-fill--experience').exists()).toBe(true)
    })

    it('applies explore variant classes', () => {
      const wrapper = mount(ProgressBar, {
        props: { variant: 'explore' }
      })
      expect(wrapper.find('.progress-fill--explore').exists()).toBe(true)
    })
  })

  describe('Sizes', () => {
    it('applies correct size classes', () => {
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
      
      sizes.forEach(size => {
        const wrapper = mount(ProgressBar, {
          props: { size }
        })
        expect(wrapper.find(`.progress-container--${size}`).exists()).toBe(true)
        expect(wrapper.find(`.progress-track--${size}`).exists()).toBe(true)
      })
    })
  })

  describe('Radius', () => {
    it('applies correct radius classes', () => {
      const radiuses = ['none', 'sm', 'md', 'lg', 'full'] as const
      
      radiuses.forEach(radius => {
        const wrapper = mount(ProgressBar, {
          props: { radius }
        })
        expect(wrapper.find(`.progress-track--radius-${radius}`).exists()).toBe(true)
        expect(wrapper.find(`.progress-fill--radius-${radius}`).exists()).toBe(true)
      })
    })
  })

  describe('Indeterminate mode', () => {
    it('shows indeterminate animation when enabled', () => {
      const wrapper = mount(ProgressBar, {
        props: { indeterminate: true }
      })
      expect(wrapper.find('.progress-indeterminate').exists()).toBe(true)
      expect(wrapper.find('.progress-indeterminate-animation').exists()).toBe(true)
    })

    it('hides percentage when indeterminate', () => {
      const wrapper = mount(ProgressBar, {
        props: {
          indeterminate: true,
          showValue: true,
          value: 50
        }
      })
      expect(wrapper.text()).not.toContain('50%')
    })
  })

  describe('Buffer mode', () => {
    it('shows buffer bar when bufferValue is provided', () => {
      const wrapper = mount(ProgressBar, {
        props: {
          value: 30,
          bufferValue: 60,
          max: 100
        }
      })
      expect(wrapper.find('.progress-buffer').exists()).toBe(true)
    })

    it('applies correct buffer width', () => {
      const wrapper = mount(ProgressBar, {
        props: {
          value: 30,
          bufferValue: 60,
          max: 100
        }
      })
      const bufferElement = wrapper.find('.progress-buffer')
      expect(bufferElement.attributes('style')).toContain('width: 60%')
    })
  })

  describe('Segments', () => {
    it('shows segment markers when segments are provided', () => {
      const wrapper = mount(ProgressBar, {
        props: {
          segments: [25, 50, 75],
          max: 100
        }
      })
      expect(wrapper.find('.progress-segments').exists()).toBe(true)
      expect(wrapper.findAll('.progress-segment-marker')).toHaveLength(3)
    })
  })

  describe('Label and slots', () => {
    it('displays label text', () => {
      const wrapper = mount(ProgressBar, {
        props: { label: 'Loading...' }
      })
      expect(wrapper.text()).toContain('Loading...')
    })

    it('supports label slot', () => {
      const wrapper = mount(ProgressBar, {
        slots: {
          label: '<span class="custom-label">Custom Label</span>'
        }
      })
      expect(wrapper.find('.custom-label').exists()).toBe(true)
      expect(wrapper.text()).toContain('Custom Label')
    })
  })

  describe('Animation', () => {
    it('applies animated classes when enabled', () => {
      const wrapper = mount(ProgressBar, {
        props: { animated: true }
      })
      expect(wrapper.find('.progress-fill--animated').exists()).toBe(true)
    })

    it('does not apply animated classes when disabled', () => {
      const wrapper = mount(ProgressBar, {
        props: { animated: false }
      })
      expect(wrapper.find('.progress-fill--animated').exists()).toBe(false)
    })
  })

  describe('Error handling', () => {
    it('handles NaN values gracefully', () => {
      const wrapper = mount(ProgressBar, {
        props: {
          value: NaN,
          max: NaN,
          showValue: true,
          label: 'Progress'
        }
      })
      expect(wrapper.text()).toContain('0%')
    })

    it('handles zero or negative max values', () => {
      const wrapper = mount(ProgressBar, {
        props: {
          value: 50,
          max: 0,
          showValue: true,
          label: 'Progress'
        }
      })
      expect(wrapper.text()).toContain('50%') // 應該使用預設的 max=100
    })
  })
})