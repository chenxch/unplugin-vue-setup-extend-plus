# unplugin-vue-setup-extend-plus

[![NPM version](https://img.shields.io/npm/v/unplugin-vue-setup-extend-plus?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-vue-setup-extend-plus)

Make the vue script setup syntax support the name attribute

## CHANGELOG

[0.3.1]
- Fix legacy node `replaceAll`[#5](https://github.com/chenxch/unplugin-vue-setup-extend-plus/issues/5)

[0.3.0]
- Feature[#4](https://github.com/chenxch/unplugin-vue-setup-extend-plus/issues/4)
- Expanded the function of automatic name generation
`For details, refer to Options and extendIgnore`

[0.2.5]
- Fix cjs exports

[0.2.1]
- Fix webpack require error. [#1](https://github.com/chenxch/unplugin-vue-setup-extend-plus/issues/1)

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

## Options

```ts
vueSetupExtend({
  // Advanced mode for name, not necessary
  mode?: 'none' | 'fileName' | 'relativeName' | Function
  // none: Cancel the setting of name.
  //       e.g.
  //       <script setup name="CustomName"> 'CustomName' will be ignored
  // fileName: Automatically read file names
  //       e.g.
  //       /user/demo/src/user/login.vue  => Login
  // relativeName: Automatically read relative path names
  //       e.g.
  //       /user/demo/src/user/login.vue  => UserLogin
  // Function: support a custom function
  // (fileId: string) => {
  //    let name = ''
  //    ...
  //    return name
  // }
  //  fileId e.g. /user/demo/src/user/login.vue
})

```

## extendIgnore

`Since the user may define the name attribute of the component in the script tag, this conflicts with the default name set by this plugin. So you need to add a switch attribute to the script setup.`

```html
<template>
  <div>hello world {{ a }}</div>
</template>

// name="App" will be invalid
<script lang="ts" setup name="App" inheritAttrs="false" extendIgnore>
  const a = 1
</script>
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
