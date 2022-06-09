# unplugin-vue-setup-extend-plus

[![NPM version](https://img.shields.io/npm/v/unplugin-vue-setup-extend-plus?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-vue-setup-extend-plus)

Make the vue script setup syntax support the name attribute

## CHANGELOG
[0.2.0]
- Automatically convert based on name and inheritAttrs
## Feature 

- support name
- support inheritAttrs
- precise breakpoints
## Usage
### Basic example

```html
<template>
  <div>hello world {{ a }}</div>
</template>

<script lang="ts" setup name="App" inheritAttrs="false">
  const a = 1
</script>
```
## Install

```bash
npm i unplugin-vue-setup-extend-plus
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import vueSetupExtend from 'unplugin-vue-setup-extend-plus/vite'

export default defineConfig({
  plugins: [
    vueSetupExtend({ /* options */ }),
  ],
})
```

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import vueSetupExtend from 'unplugin-vue-setup-extend-plus/rollup'

export default {
  plugins: [
    vueSetupExtend({ /* options */ }),
  ],
}
```

<br></details>


<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-vue-setup-extend-plus/webpack')({ /* options */ })
  ]
}
```

<br></details>

<details>
<summary>Nuxt</summary><br>

```ts
// nuxt.config.js
export default {
  buildModules: [
    ['unplugin-vue-setup-extend-plus/nuxt', { /* options */ }],
  ],
}
```

> This module works for both Nuxt 2 and [Nuxt Vite](https://github.com/nuxt/vite)

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require('unplugin-vue-setup-extend-plus/webpack')({ /* options */ }),
    ],
  },
}
```

<br></details>

## Expansion based on [vite-plugin-vue-setup-extend](https://github.com/vbenjs/vite-plugin-vue-setup-extend)

## License

MIT
