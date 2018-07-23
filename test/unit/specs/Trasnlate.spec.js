import { createLocalVue } from 'vue-test-utils'
import Translate from '@/Translate'
import MultiLanguage from '@/index'

const Vue = createLocalVue()
describe('Translate component', () => {
  const defaultText = 'Default Text'
  const locale = {
    abc: 'CDB',
    level1: {
      level2: 'this is level 2'
    }
  }
  describe('without plugins', () => {
    const _Vue = createLocalVue()
    it('should render default contents', () => {
      const anyKeyFromNothing = 'any.key.from.nothing'
      const Constructor = _Vue.extend({
        template: `<div><translate get="${anyKeyFromNothing}">${defaultText}</translate></div>`,
        components: { Translate }
      })
      const vm = new Constructor().$mount()
      expect(vm.$el.textContent).to.equal(defaultText)
    })
    it('should render empty string', () => {
      const anyKeyFromNothing = 'any.key.from.nothing'
      const Constructor = _Vue.extend({
        template: `<div><translate get="${anyKeyFromNothing}"></translate></div>`,
        components: { Translate }
      })
      const vm = new Constructor().$mount()
      expect(vm.$el.textContent).to.equal('')
    })
  })
  describe('with plugin installed', () => {
    Vue.use(MultiLanguage, locale)
    it('should render default contents', () => {
      const anyKeyFromNothing = 'any.key.from.nothing'
      const Constructor = Vue.extend({
        template: `<div><translate get="${anyKeyFromNothing}">${defaultText}</translate></div>`,
        components: { Translate }
      })
      const vm = new Constructor().$mount()
      expect(vm.$el.textContent).to.equal(defaultText)
    })

    it('should render empty string', () => {
      const anyKeyFromNothing = 'any.key.from.nothing'
      const Constructor = Vue.extend({
        template: `<div><translate get="${anyKeyFromNothing}"></translate></div>`,
        components: { Translate }
      })
      const vm = new Constructor().$mount()
      expect(vm.$el.textContent).to.equal('')
    })

    it('should render correct contents with language source', () => {
      Vue.use(MultiLanguage, locale)
      const Constructor = Vue.extend({
        template: `<div><translate get="abc">${defaultText}</translate></div>`,
        components: { Translate }
      })
      const vm = new Constructor().$mount()
      expect(vm.$el.textContent).to.equal(locale.abc)
    })
    it('should render correct contents with deep level', () => {
      const Constructor = Vue.extend({
        template: `<div><translate get="level1.level2">${defaultText}</translate></div>`,
        components: { Translate }
      })
      const vm = new Constructor().$mount()
      expect(vm.$el.textContent).to.equal(locale.level1.level2)
    })
  })
})
