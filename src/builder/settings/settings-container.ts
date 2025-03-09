export const SettingsContainerNode = () => {
  const node = document.createElement('div')
  node.setAttribute('userscript-node', 'true')

  node.id = 'userscript-settings-container'
  node.style.padding = '10px'
  node.style.border = '1px solid red'
  node.style.marginTop = '10px'
  node.style.width = '100%'
  node.style.backgroundColor = '#fbfbfb'
  node.style.border = '1px solid #dddddd'
  node.style.borderRadius = '5px'

  return node
}
