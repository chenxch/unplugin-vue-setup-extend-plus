import { createUnplugin } from 'unplugin'
import type { Options } from '../types'
import { supportScriptName } from './transform'

export default createUnplugin((options: Options = {}, meta) => {
  return {
    name: 'unplugin-vue-setup-extend-plus',
    enforce: 'pre',

    transformInclude(id) {
      return id.endsWith('.vue')
    },

    async transform(code, id) {
      try {
        if (options.mode && options.mode === 'none')
          return null
        if (/\.vue$/.test(id) || /\.vue\?.*type=script.*/.test(id))
          return supportScriptName.call(this, code, id, options)
        return null
      }
      catch (e) {
        if (meta.framework === 'webpack') {
          console.error(e)
          return null
        }
      }
    },
  }
})
