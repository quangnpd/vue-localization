export default {
  name: 'Translate',
  props: {
    get: {
      type: String,
      default: ''
    }
  },
  render: function(h, context) {
    let children = this.$slots.default ? this.$slots.default[0] : ''
    if (this.$lang !== undefined) {
      return this._v(this.$lang.get(this.get, children.text || ''))
    }
    return this._v(children.text || '')
  }
}
