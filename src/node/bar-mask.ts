import type { NodeDefinition } from '@type/node-definition'

export const barMask: NodeDefinition = {
  tag: 'div',
  id: 'userscript-bar-mask',
  style: {
    backgroundColor: '#f2f2f2',
    transition: 'width 400ms cubic-bezier(.25, 1, 0.5, 1)', // ease-in-out easing
  },
}
