import type { NodeDefinition } from '@type/node-definition'

export const settingsPanelContainer: NodeDefinition = {
  tag: 'div',
  id: 'userscript-settings-panel-container',
  style: {
    backgroundColor: '#FAFAFA',
    border: '1px solid #D8D8D8',
    borderRadius: '5px',
    marginTop: '10px',
    padding: '8px',
    width: '100%',
  },
  removeOnHotReload: true,
}
