import type { NodeDefinition } from '@type/node-definition'

export const barWrapper: NodeDefinition = {
  tag: 'div',
  id: 'userscript-bar-wrapper',
  style: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px',
    width: '100%',
  },
  removeOnHotReload: true,
}
