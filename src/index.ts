import { createUnplugin } from 'unplugin'
import { supportScriptName } from './core/transform'
import type { Options } from './types'

export default createUnplugin<Options>((options = {}) => ({
  name: 'unplugin-vue-setup-extend-plus',
  enforce: 'pre',

  async transform(code, id) {
    if (!/\.vue$/.test(id))
      return null

    const { name = true } = options
    if (name)
      return supportScriptName.call(this, code, id)

    return null
  },
}))
