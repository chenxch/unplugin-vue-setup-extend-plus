import { basename, parse as pathParse } from 'path'
import { compileScript, parse } from '@vue/compiler-sfc'
import MagicString from 'magic-string'
import type { Options } from '../types'

export function supportScriptName(code: string, id: string, options: Options) {
  const { mode } = options
  let s: MagicString | undefined
  const str = () => s || (s = new MagicString(code))
  const { descriptor } = parse(code)
  if (!descriptor.script && descriptor.scriptSetup && !descriptor.scriptSetup.attrs?.extendIgnore) {
    const result = compileScript(descriptor, { id })
    const name = typeof result.attrs.name === 'string' ? result.attrs.name : nameProcess(id, mode)
    const lang = result.attrs.lang
    const inheritAttrs = result.attrs.inheritAttrs
    if (name || inheritAttrs) {
      str().appendLeft(
        0,
        `<script ${lang ? `lang="${lang}"` : ''}>
import { defineComponent } from 'vue'
export default defineComponent({
  ${name ? `name: "${name}",` : ''}
  ${inheritAttrs ? `inheritAttrs: ${inheritAttrs !== 'false'},` : ''}
})
</script>\n`,
      )
    }

    const map = str().generateMap({ hires: true })
    const filename = basename(id)

    map.file = filename
    map.sources = [filename]

    return {
      map,
      code: str().toString(),
    }
  }
  else {
    return null
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
