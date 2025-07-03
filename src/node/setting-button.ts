import { dom } from '@dom/node-selector'
import type { NodeDefinition } from '@type/node-definition'

export const settingsButton: NodeDefinition = {
  tag: 'button',
  id: 'userscript-settings-button',
  title: 'Open the visual bar settings',
  style: {
    backgroundColor: 'blue',
    border: '0',
    cursor: 'pointer',
    fontSize: '16px',
    height: '16px',
    margin: '0',
    width: '16px',
    background:
      'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAApUlEQVR4nK2T4Q3CIBCFvwH8JT+pe3SM7qHdzugA3QDH6BAYzCMhVyW0+BIS4N49HscBv+GAqHGmASfAF+uxEEjzDC/uJnkBVmACZiAUAkF7kziLFfEKxMaxGrcfTDsEEneDeYfAzVZ7BF6GdJfNAXiYWFCOo3JKSsy4VHh0CzjZKZ8tyvag5GftCt1F/Msz+t5Gsq2cLNpWvtZaOYsc/kzf0PSd3/xGibT0C78vAAAAAElFTkSuQmCC) no-repeat',
    backgroundSize: 'contain',
    opacity: '0.2',
  },
  onMouseOver: (node: HTMLElement) => (node.style.opacity = '0.6'),
  onMouseOut: (node: HTMLElement) => (node.style.opacity = '0.2'),
  onClick: () => {
    const settingsContainerNode = dom.getNode('#userscript-settings-panel-container')
    const heightInputSettingNode = dom.getNode<HTMLInputElement>('[name=us-vrb-height]')
    const widthInputSettingNode = dom.getNode<HTMLInputElement>('[name=us-vrb-width]')
    const barContainerNode = dom.getNode('#userscript-bar-container')

    heightInputSettingNode.value = barContainerNode.offsetHeight.toString()
    widthInputSettingNode.value = barContainerNode.offsetWidth.toString()

    settingsContainerNode.style.display =
      settingsContainerNode.style.display === 'none' ? 'block' : 'none'
  },
}
