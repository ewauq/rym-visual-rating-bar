export const BarContainerNode = () => {
  const node = document.createElement('div')
  node.setAttribute('userscript-node', 'true')

  node.id = 'userscript-bar-container'
  node.style.borderRadius = '25px'
  node.style.boxSizing = 'border-box'
  node.style.display = 'flex'
  node.style.fontSize = '0'
  node.style.height = '30px'
  node.style.justifyContent = 'right'
  node.style.marginTop = '10px'
  node.style.overflow = 'hidden'
  node.style.width = '100%'

  return node
}
