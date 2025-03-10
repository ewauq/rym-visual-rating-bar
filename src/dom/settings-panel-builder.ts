import type { NodeCreator } from './node-creator'
import type { NodeSelector } from './node-selector'

export class SettingsPanelBuilder {
  private nodeSelector: NodeSelector
  private nodeCreator: NodeCreator

  constructor(nodeSelector: NodeSelector, nodeCreator: NodeCreator) {
    this.nodeSelector = nodeSelector
    this.nodeCreator = nodeCreator
  }

  public build(): void {
    const barWrapperNode = this.nodeSelector.getBarWrapperNode()

    const settingsPanelContainerNode = this.nodeCreator.createSettingsPanelContainerNode()
    barWrapperNode.after(settingsPanelContainerNode)

    const settingsButtonNode = this.nodeCreator.createSettingsButtonNode()
    barWrapperNode.appendChild(settingsButtonNode)
  }
}
