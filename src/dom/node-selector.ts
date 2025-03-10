export class NodeSelector {
  public getRatingNode(): HTMLSpanElement {
    const node = document.querySelector<HTMLSpanElement>('.avg_rating')
    if (!node) throw new Error('Rating node not found')
    return node
  }

  public getReleaseInfoLabelsNodes(): NodeListOf<HTMLTableCellElement> {
    const nodes = document.querySelectorAll<HTMLTableCellElement>('.info_hdr')
    if (!nodes.length) throw new Error('Release info labels not found')
    return nodes
  }

  public getReleaseInfoLabelsAdNode(): HTMLTableCellElement | null {
    return document.querySelector<HTMLTableCellElement>(
      '.album_info_outer > tbody > tr > td:nth-of-type(2)',
    )
  }

  public getBarWrapperNode(): HTMLDivElement {
    const node = document.querySelector<HTMLDivElement>('#userscript-bar-wrapper')
    if (!node) throw new Error('Bar wrapper node not found')
    return node
  }

  public getSettingsPanelContainerNode(): HTMLDivElement {
    const node = document.querySelector<HTMLDivElement>('#userscript-settings-panel-container')
    if (!node) throw new Error('Settings panel container node not found')
    return node
  }
}
