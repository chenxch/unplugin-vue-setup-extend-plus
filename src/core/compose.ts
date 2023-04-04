import { basename } from 'path'
import type { SFCParseResult } from '@vue/compiler-sfc'
import { MagicString, compileTemplate, parse } from '@vue/compiler-sfc'
import type { SourceMap } from 'magic-string'
import type { NodeTransform } from '@vue/compiler-core'
import type { Options } from '../types'

// SourceMap
interface PluginsOptions {
  code: string
  id: string
  options: Options
}
interface RegisterCompile {
  templates: NodeTransform[]
}

export type Plugin = (
  _SFCParseResult: SFCParseResult,
  magicString: MagicString,
  options: PluginsOptions,
  registerCompile: RegisterCompile
) => void

export const compose = (
  pluginsOption: PluginsOptions,
  plugins: Array<Plugin>,
): {
  map: SourceMap
  code: string
} => {
  const magicString = new MagicString(pluginsOption.code)
  const _SFCParseResult = parse(pluginsOption.code)
  const registerCompile: RegisterCompile = {
    templates: [],
  }
  plugins.forEach(plugin =>
    plugin(_SFCParseResult, magicString, pluginsOption, registerCompile),
  )

  if (registerCompile.templates.length && _SFCParseResult.descriptor) {
    const { descriptor } = _SFCParseResult!
    if (descriptor.template) {
      compileTemplate({
        filename: pluginsOption.id,
        source: descriptor.template!.content,
        id: pluginsOption.id,
        compilerOptions: {
          nodeTransforms: registerCompile.templates,
        },
      })
    }
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
