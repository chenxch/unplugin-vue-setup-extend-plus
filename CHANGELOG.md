## Changelog

[1.0.1]
- Fix: auto expose type

[1.0.0]
- Feat: support auto expose(by [@so11y](https://github.com/so11y))

[0.4.9]
- Fix: webpack transformInclude reg

[0.4.8]
- Fix: script tag

[0.4.7]
- Fix: webpack conversion script parsing lost

[0.4.6]
- Fix: webpack parsing failed resulting in process termination[#12](https://github.com/chenxch/unplugin-vue-setup-extend-plus/issues/12)

[0.4.5]
- Fix: commonjs

[0.4.4]
- Fix: types

[0.4.1]
- Feature: suppot vite@4

[0.3.2]
- Fix: use more specific function types[#6](https://github.com/chenxch/unplugin-vue-setup-extend-plus/issues/6)
- Remove `fileName` mode (Because its performance is consistent with the performance of Vue itself, it is a repetitive thing.)

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