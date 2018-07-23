# orgchart

> A Muli-language for Vue.js App

## Installation

#### ES6 Module

```bash
npm i -s vue-multilanguage
```

#### Built bundle file

```
import 'vue-multilanguage/dist/multilanguage.js
```

## Usage

```javascript
import Vue from 'vue'
import MultiLanguage from 'vue-multilanguage'
import LocaleSource from './locale/en.json'

Vue.use(MultiLanguage, LocaleSource)
```

or

```javascript
Vue.use(MultiLanguege)
Vue.setLang(LocalSource)
```

### Extend other local source

```javascript
const extraLocaleSource = {
  extends: {
    some_label: 'Some label from other local source'
  }
}
Vue.extendLang(extraLocaleSource)

// Get value
Vue.$lang.get('extends.some_label')
```

### Controller

```javascript
/**
 * Local Source
 * {
 *    label: {
 *      helloworld: 'Bonjour le monde'
 *    }
 * }
 **/
export default {
  name: 'hello-world',
  render: function(createElement) {
    let default_hello_world_label = 'Hello World'
    return createElement(
      'span',
      {
        class: 'some-class'
      },
      [this.$lang.get('label.helloworld', default_hello_world_label)]
    )
  }
}
```

### Translte Component for template

```html
<translate get="label.helloworld">Hello World</translate>
```

### Result

```
Bonjour le monde
```

## Build

```bash
# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## Tests

```bash
# run tests
npm i
npm run test
```

Coverage Report

```
/test/unit/coverage/lcov-report/index.html
```
