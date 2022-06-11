import { createUnplugin } from 'unplugin'
import { supportScriptName } from './core/transform'

export default createUnplugin(() => ({
  name: 'unplugin-vue-setup-extend-plus',
  enforce: 'pre',

  transformInclude(id) {
    return id.endsWith('.vue')
  },

  async transform(code, id) {
    if (!/\.vue$/.test(id))
      return null

    return supportScriptName.call(this, code, id)
  },
}))
