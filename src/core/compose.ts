import { basename } from 'path'
import type { SFCParseResult } from '@vue/compiler-sfc'
import { MagicString, parse } from '@vue/compiler-sfc'
// import type { SourceMap } from 'magic-string'
import type { Options } from '../types'

// SourceMap
interface PluginsOptions {
  code: string
  id: string
  options: Options
}

export type Plugin = (_SFCParseResult: SFCParseResult, magicString: MagicString, options: PluginsOptions) => void

export const compose = (pluginsOption: PluginsOptions, plugins: Array<Plugin>) => {
  const magicString = new MagicString(pluginsOption.code)
  const _SFCParseResult = parse(pluginsOption.code)
  for (let index = 0; index < plugins.length; index++) {
    const plugin = plugins[index]
    plugin(_SFCParseResult, magicString, pluginsOption)
  }
  const map = magicString.generateMap({ hires: true })
  const filename = basename(pluginsOption.id)

  map.file = filename
  map.sources = [filename]

  return {
    map,
    code: magicString.toString(),
  }
}
