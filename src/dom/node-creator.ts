import type { NodeSelector } from './node-selector'

export class NodeCreator {
  private nodeSelector: NodeSelector

  constructor(nodeSelector: NodeSelector) {
    this.nodeSelector = nodeSelector
  }

  public createBarWrapperNode(): HTMLDivElement {
    const node = document.createElement('div')
    node.setAttribute('userscript-node', 'true')

    node.id = 'userscript-bar-wrapper'
    node.style.display = 'flex'
    node.style.gap = '10px'
    node.style.marginTop = '10px'
    node.style.width = '100%'

    return node
  }

  public createBarContainerNode(): HTMLDivElement {
    const node = document.createElement('div')

    node.id = 'userscript-bar-container'
    node.style.borderRadius = '5px'
    node.style.boxShadow = 'rgba(0, 0, 0, 0.4) 0px 0px 4px 0px inset'
    node.style.boxSizing = 'border-box'
    node.style.display = 'flex'
    node.style.fontSize = '0'
    node.style.height = '16px'
    node.style.justifyContent = 'right'
    node.style.overflow = 'hidden'
    node.style.width = '100%'
    // node.style.filter = 'saturate(1.2) brightness(0.9) contrast(0.9)'

    return node
  }

  public createBarMaskNode(): HTMLDivElement {
    const node = document.createElement('div')

    node.id = 'userscript-bar-mask'
    node.style.backgroundColor = '#f2f2f2'
    // node.style.transition = 'width 400ms cubic-bezier(.02, 1.3, 1, 1.1)' // bounce easing
    node.style.transition = 'width 400ms cubic-bezier(.25, 1, 0.5, 1)' // ease-in-out easing

    return node
  }

  public createSettingsButtonNode(): HTMLButtonElement {
    const node = document.createElement('button')

    node.id = 'userscript-settings-button'
    node.style.backgroundColor = 'blue'
    node.style.border = '0'
    node.style.cursor = 'pointer'
    node.style.fontSize = '16px'
    node.style.height = '16px'
    node.style.margin = '0'
    node.style.width = '16px'

    // Icon
    node.style.background =
      'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAApUlEQVR4nK2T4Q3CIBCFvwH8JT+pe3SM7qHdzugA3QDH6BAYzCMhVyW0+BIS4N49HscBv+GAqHGmASfAF+uxEEjzDC/uJnkBVmACZiAUAkF7kziLFfEKxMaxGrcfTDsEEneDeYfAzVZ7BF6GdJfNAXiYWFCOo3JKSsy4VHh0CzjZKZ8tyvag5GftCt1F/Msz+t5Gsq2cLNpWvtZaOYsc/kzf0PSd3/xGibT0C78vAAAAAElFTkSuQmCC) no-repeat'
    node.style.backgroundSize = 'contain'
    node.style.opacity = '0.2'

    node.setAttribute('title', 'Open the visual bar settings')

    // Behaviors
    node.onmouseover = () => (node.style.opacity = '0.6')
    node.onmouseout = () => (node.style.opacity = '0.2')

    const settingsContainerNode = this.nodeSelector.getSettingsPanelContainerNode()

    node.onclick = () =>
      (settingsContainerNode.style.display =
        settingsContainerNode.style.display === 'none' ? 'flex' : 'none')

    return node
  }

  public createSettingsPanelContainerNode(): HTMLDivElement {
    const node = document.createElement('div')
    node.setAttribute('userscript-node', 'true')

    node.id = 'userscript-settings-panel-container'
    node.style.padding = '10px'
    node.style.border = '1px solid red'
    node.style.marginTop = '10px'
    node.style.width = '100%'
    node.style.backgroundColor = '#fbfbfb'
    node.style.border = '1px solid #dddddd'
    node.style.borderRadius = '5px'
    node.style.display = 'none'

    return node
  }
}
