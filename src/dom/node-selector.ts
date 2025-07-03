import type { NodeDefinition } from 'type/node-definition'

export const dom = {
  getNodes<T extends HTMLElement = never>(selector: string): NodeListOf<T> {
    const nodes = document.querySelectorAll<T>(selector)
    if (!nodes.length) throw new Error(`Node '${selector}' not found`)
    return nodes
  },

  getNode<T extends HTMLElement = never>(selector: string): T {
    const node = document.querySelector<T>(selector)
    if (!node) throw new Error(`Node '${selector}' not found`)
    return node
  },
  // TODO : à bouger dans un autre fichier
  createNode<T extends HTMLElement = never>(nodeDefinition: NodeDefinition): T {
    const node = document.createElement(nodeDefinition.tag) as T
    node.id = nodeDefinition.id

    // Styles
    if (nodeDefinition.style) Object.assign(node.style, nodeDefinition.style)

    // Attributes
    if (nodeDefinition.removeOnHotReload) node.setAttribute('userscript-node', 'true')
    if (nodeDefinition.title) node.setAttribute('title', nodeDefinition.title)
    if (nodeDefinition.htmlFor) node.setAttribute('for', nodeDefinition.htmlFor)

    // Values
    if (nodeDefinition.textContent) node.textContent = nodeDefinition.textContent

    // Events
    if (nodeDefinition.onMouseOver) node.onmouseover = () => nodeDefinition.onMouseOver!(node)
    if (nodeDefinition.onMouseOut) node.onmouseout = () => nodeDefinition.onMouseOut!(node)
    if (nodeDefinition.onClick) node.onclick = () => nodeDefinition.onClick!(node)

    return node
  },
}
