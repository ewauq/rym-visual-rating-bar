export const BarContainerNode = () => {
  const node = document.createElement('div')

  node.id = 'userscript-bar-container'
  node.style.borderRadius = '5px'
  node.style.boxShadow = 'rgba(0, 0, 0, 0.4) 0px 0px 4px 0px inset'
  node.style.boxSizing = 'border-box'
  node.style.display = 'flex'
  node.style.fontSize = '0'
  node.style.height = '16px'
  node.style.justifyContent = 'right'
  node.style.overflow = 'hidden'
  node.style.width = '100%'
  // node.style.filter = 'saturate(1.2) brightness(0.9) contrast(0.9)'

  return node
}
