export const BarProgressionNode = () => {
  const node = document.createElement('div')

  node.id = 'userscript-bar-progression'
  node.style.backgroundColor = '#388e3c'
  node.style.flexShrink = '0'
  node.style.alignSelf = 'stretch'

  return node
}
