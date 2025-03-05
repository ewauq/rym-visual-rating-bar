export const BarContainerNode = () => {
  const node = document.createElement('div')
  node.setAttribute('userscript-node', 'true')

  node.id = 'userscript-bar-container'
  node.style.display = 'flex'
  node.style.justifyContent = 'right'
  node.style.boxSizing = 'border-box'
  node.style.height = '30px'
  node.style.width = '100%'
  node.style.marginTop = '10px'
  node.style.borderRadius = '5px'
  node.style.border = '1px solid #dbdbdb'
  node.style.background = 'linear-gradient(to right,rgb(255, 0, 0) 0%,rgb(0, 189, 16) 100%)'
  node.style.overflow = 'hidden'
  node.style.fontSize = '0'

  return node
}
