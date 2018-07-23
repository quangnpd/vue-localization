import TranslateComponent from './Translate'
export default {
  install(Vue, langJson = {}) {
    Vue.setLocale = locale => {
      Vue.$lang = locale
      Vue.prototype.$lang = Vue.$lang
      Vue.prototype.$lang.get = (key = '', def) => {
        if (key === 'get') return ''
        key = key.replace(/\[([^[]+)\]/gm, (fullMatch, $1) => {
          return `.${$1}`
        })

        let stackKeys = key.split('.').reverse()
        let tmpValue = Object.assign({}, Vue.$lang)
        while (stackKeys.length && tmpValue) {
          tmpValue = tmpValue[stackKeys.pop()]
        }
        return tmpValue || def || ''
      }
    }

    Vue.extendLocale = locale => {
      const currentLang = { ...Vue.$lang }
      delete currentLang.get
      const lang = {
        ...currentLang,
        ...locale
      }
      Vue.setLocale(lang)
    }

    Vue.setLocale(langJson)
    Vue.component(TranslateComponent.name, TranslateComponent)
  }
}
