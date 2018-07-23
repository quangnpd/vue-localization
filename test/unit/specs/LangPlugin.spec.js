import { createLocalVue } from 'vue-test-utils'
import MultiLanguage from '@/index'

const Vue = createLocalVue()

const locale = {
  label: 'Root label',
  action: 'action',
  text: 'Text',
  actions: {
    edit: 'Edit'
  }
}

const extendLocale = {
  extends: {
    label: 'Extended Label',
    other: {
      letitbe: 'Let it be'
    }
  }
}

describe('MultiLanguage plugin', () => {
  before(() => {
    Vue.use(MultiLanguage)
  })

  it('Language plugin should be install correctly', () => {
    expect(Vue.$lang).to.be.an('object')
    expect(Vue.prototype.$lang).to.be.an('object')
  })

  it('Language source should be empty', () => {
    let keys = Object.keys(Vue.$lang).filter(key => key !== 'get')
    expect(keys).to.have.length(0)
  })

  it('should set language source correctly', () => {
    Vue.setLocale(locale)
    expect(Vue.$lang).to.deep.include(locale)
  })

  it('should return empty string when get key name is empty', () => {
    const value = Vue.$lang.get()
    expect(value).to.equal('')
  })

  it('should return empty string when get key name is [get]', () => {
    const value = Vue.$lang.get('get')
    expect(value).to.equal('')
  })

  it('should return correct value when get key name with Symbol style', () => {
    const value = Vue.$lang.get('actions[edit]')
    expect(value).to.equal(locale.actions.edit)
  })

  it('should return empty string when key is not exists without default value', () => {
    const value = Vue.$lang.get('actions.add.invalid_key')
    expect(value).to.equal('')
  })

  it('should be extend other source', () => {
    Vue.extendLocale(extendLocale)
    expect(Vue.$lang.extends).to.deep.include(extendLocale.extends)
  })
})
