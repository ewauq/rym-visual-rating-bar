import type { NodeDefinition } from '@type/node-definition'

export const settingsPanelHeader: NodeDefinition = {
  tag: 'h2',
  id: 'userscript-settings-panel-header',
  style: {
    backgroundColor: '#f2f2f2',
    borderRadius: '5px',
    color: '#555555',
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '0',
    padding: '10px',
    width: '100%',
  },
  textContent: 'Visual Bar Settings',
}
