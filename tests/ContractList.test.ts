import { mount } from '@vue/test-utils'
import ContractList from '@/views/ContractList.vue'
import { describe, it, expect } from 'vitest'

describe('ContractList', () => {
  it('renders the title', () => {
    const wrapper = mount(ContractList, {
      global: {
        mocks: {
          $t: (msg: string) => msg, // mock simples para i18n
        },
      },
    })

    expect(wrapper.text()).toContain('title-contracts-list')
  })
})
