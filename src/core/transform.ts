import { parse as pathParse } from 'path'
import { compileScript } from '@vue/compiler-sfc'
import type { Options } from '../types'
import type { Plugin } from './compose'

export const supportScriptName: Plugin = (_SFCParseResult, magicString, options) => {
  const { mode } = options.options
  const { descriptor } = _SFCParseResult
  if (!descriptor.script && descriptor.scriptSetup && !descriptor.scriptSetup.attrs?.extendIgnore) {
    const result = compileScript(descriptor, { id: options.id })
    const name = typeof result.attrs.name === 'string' ? result.attrs.name : nameProcess(options.id, mode)
    const lang = result.attrs.lang
    const inheritAttrs = result.attrs.inheritAttrs
    if (name || inheritAttrs) {
      magicString.appendLeft(
        0,
        `<script${lang ? ` lang="${lang}"` : ''}>
import { defineComponent } from 'vue'
export default defineComponent({
  ${name ? `name: "${name}",` : ''}
  ${inheritAttrs ? `inheritAttrs: ${inheritAttrs !== 'false'},` : ''}
})
</script>\n`,
      )
    }
  }
}

function nameProcess(id: string, mode: Options['mode']) {
  const commonId = id.replace(/\\/g, '/').split('?')[0]
  if (typeof mode === 'string') {
    const parseUrl = pathParse(commonId)
    const fileName = parseUrl.name
    const relativeName = parseUrl.dir.split('/').at(-1)
    // if (mode === 'fileName')
    //   return camelize(fileName)

    if (mode === 'relativeName')
      return camelize(`${relativeName}-${fileName}`)
  }

  if (typeof mode === 'function')
    return mode(commonId)

  return ''
}

function camelize(str: string) {
  return str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '').replace(/(\w)/, (_, c) => c.toUpperCase())
}
