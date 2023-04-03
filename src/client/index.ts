import type { App, VNode, VNodeProps } from 'vue'
const hasOwn = (val: Record<string, any>, key: string) =>
  Object.prototype.hasOwnProperty.call(val, key)
const onVnodeBeforeMountRef_: VNodeProps['onVnodeBeforeMount'] = (
  VNode: VNode,
) => {
  const { component } = VNode as any
  if (component) {
    component.exposeProxy = new Proxy(
      {},
      {
        get(_, key: string) {
          if (component.exposed && hasOwn(component.exposed, key))
            return component.exposed[key]
          if (hasOwn(component.setupState, key))
            return component.setupState[key]
          return component.proxy[key]
        },
      },
    )
  }
}

export default (app: App) => {
  app.config.globalProperties.onVnodeBeforeMountRef_ = onVnodeBeforeMountRef_
}
