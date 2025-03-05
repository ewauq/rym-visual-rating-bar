export const BarWrapperNode = () => {
  const node = document.createElement('div')
  node.setAttribute('userscript-node', 'true')

  node.id = 'userscript-bar-wrapper'
  node.style.height = '30px'
  node.style.width = '100%'
  node.style.backgroundColor = 'orange'
  node.style.marginTop = '10px'
  node.innerText = 'Hello '

  return node
}
