import { findProp } from '@vue/compiler-core'
import type { NodeTransform } from '@vue/compiler-core'
import type { Plugin } from './compose'

const onVnodeBeforeMountRef = ' :onVnodeBeforeMount="onVnodeBeforeMountRef_" '

export const supportTransformRef: Plugin = (_SFCParseResult, magicString, options, registerCompile) => {
  const { descriptor } = _SFCParseResult
  if (descriptor.template) {
    const { loc: templateLocStart } = descriptor.template
    const onRefNode: NodeTransform = (node) => {
      if (node.type === 1 /** NodeTypes.ELEMENT */) {
        const ref = findProp(node, 'ref')
        if (ref && ref.type === 6 /**  NodeTypes.ATTRIBUTE */) {
          const { loc } = ref
          magicString.appendLeft(
            loc.end.offset + templateLocStart.start.offset,
            onVnodeBeforeMountRef,
          )
        }
      }
    }
    registerCompile.templates.push(onRefNode)
  }
}
