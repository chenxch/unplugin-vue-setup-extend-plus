import type { App, VNode, VNodeProps } from 'vue'

function proxyDefine(
  context: Record<string, any>,
  proxyContext: Record<string, any>,
  proxyKey: string,
) {
  const proxyKeys = Object.keys(context[proxyKey])
  proxyKeys.forEach((key) => {
    Object.defineProperty(proxyContext, key, {
      get() {
        return context[proxyKey][key]
      },
      set(newValue) {
        context[proxyKey][key] = newValue
      },
    })
  })
}

function defineDev(context: Record<string, any>) {
  const proxy = {}
  proxyDefine(context, proxy, 'exposed')
  proxyDefine(context, proxy, 'setupState')
  return proxy
}

const hasOwn = (val: Record<string, any>, key: string) =>
  Object.prototype.hasOwnProperty.call(val, key)

function helpProxy(
  context: Record<string, any>,
  key: string,
  update: boolean,
  value?: any,
) {
  const get = (proxyContext: Record<string, any>) => {
    return proxyContext[key]
  }
  const set = (proxyContext: Record<string, any>, value: any) => {
    proxyContext[key] = value
    return true
  }
  if (context.exposed && hasOwn(context.exposed, key))
    return update ? set(context.exposed, value) : get(context.exposed)
  if (hasOwn(context.setupState, key))
    return update ? set(context.setupState, value) : get(context.setupState)
  return context[key]
}
const onVnodeBeforeMountRef_: VNodeProps['onVnodeBeforeMount'] = (
  VNode: VNode,
) => {
  const { component } = VNode as any
  if (component) {
    const proxyContext = process.env.NODE_ENV !== 'production' ? defineDev(component) : {}
    component.exposeProxy = new Proxy(proxyContext, {
      get(_, key: string) {
        return helpProxy(component, key, false)
      },
      set(_, key: string, value: any) {
        return helpProxy(component, key, true, value)
      },
    })
  }
}

export default (app: App) => {
  app.config.globalProperties.onVnodeBeforeMountRef_ = onVnodeBeforeMountRef_
}
