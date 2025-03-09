export const BarWrapperNode = () => {
  const node = document.createElement('div')
  node.setAttribute('userscript-node', 'true')

  node.id = 'userscript-bar-wrapper'
  //   node.style.border = '1px solid red'
  node.style.display = 'flex'
  node.style.gap = '10px'
  node.style.marginTop = '10px'
  node.style.width = '100%'

  return node
}
