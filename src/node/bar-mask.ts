export const BarMaskNode = () => {
  const node = document.createElement('div')

  node.id = 'userscript-bar-mask'
  node.style.display = 'flex'
  node.style.flexShrink = '0'
  node.style.flexGrow = '1'
  node.style.flexBasis = '0px'
  node.style.alignSelf = 'stretch'
  node.style.backgroundColor = 'white'

  return node
}
