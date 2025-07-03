import type { NodeDefinition } from '@type/node-definition'

export const barContainer: NodeDefinition = {
  tag: 'div',
  id: 'userscript-bar-container',
  style: {
    borderRadius: '5px',
    boxShadow: 'rgba(0, 0, 0, 0.4) 0px 0px 4px 0px inset',
    boxSizing: 'border-box',
    display: 'flex',
    fontSize: '0',
    height: '16px',
    justifyContent: 'right',
    overflow: 'hidden',
    width: '100%',
  },
}
