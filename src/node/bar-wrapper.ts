export const BarWrapperNode = () => {
  const node = document.createElement('div')
  node.setAttribute('userscript-node', 'true')

  node.id = 'userscript-bar-wrapper'
  node.style.display = 'flex'
  node.style.alignItems = 'center'
  node.style.flexShrink = '0'
  node.style.boxSizing = 'border-box'
  node.style.height = '30px'
  node.style.width = '100%'
  node.style.marginTop = '10px'
  node.style.borderRadius = '5px'
  node.style.border = '1px solid #dbdbdb'
  node.style.overflow = 'hidden'
  node.style.fontSize = '0'

  return node
}
