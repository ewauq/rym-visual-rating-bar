export const SettingsButtonNode = () => {
  const node = document.createElement('button')

  node.id = 'userscript-settings-button'
  node.style.backgroundColor = 'blue'
  node.style.border = '0'
  node.style.cursor = 'pointer'
  node.style.fontSize = '16px'
  node.style.height = '16px'
  node.style.margin = '0'
  node.style.width = '16px'

  // Icon
  node.style.background =
    'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAApUlEQVR4nK2T4Q3CIBCFvwH8JT+pe3SM7qHdzugA3QDH6BAYzCMhVyW0+BIS4N49HscBv+GAqHGmASfAF+uxEEjzDC/uJnkBVmACZiAUAkF7kziLFfEKxMaxGrcfTDsEEneDeYfAzVZ7BF6GdJfNAXiYWFCOo3JKSsy4VHh0CzjZKZ8tyvag5GftCt1F/Msz+t5Gsq2cLNpWvtZaOYsc/kzf0PSd3/xGibT0C78vAAAAAElFTkSuQmCC) no-repeat'
  node.style.backgroundSize = 'contain'
  node.style.opacity = '0.2'
  // node.setAttribute('class', 'has_tip')
  node.setAttribute('title', 'Open the visual bar settings')

  // Behaviors
  node.onmouseover = () => (node.style.opacity = '0.6')
  node.onmouseout = () => (node.style.opacity = '0.2')

  return node
}

// SettingsButtonNode = new HTMLNode()
// SettingsButtonNode.setId('userscript-settings-button')
// SettingsButtonNode.setStyle({
//   backgroundColor: 'blue',
//   border: '0',
//   cursor: 'pointer',
//   fontSize: '16px',
//   height: '16px',
//   margin: '0',
//   width: '16px',
//   background: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAApUlEQVR4nK2T4Q3CIBCFvwH8JT+pe3SM7qHdzugA3QDH6BAYzCMhVyW0+BIS4N49HscBv+GAqHGmASfAF+uxEEjzDC/uJnkBVmACZiAUAkF7kziLFfEKxMaxGrcfTDsEEneDeYfAzVZ7BF6GdJfNAXiYWFCOo3JKSsy4VHh0CzjZKZ8tyvag5GftCt1F/Msz+t5Gsq2cLNpWvtZaOYsc/kzf0PSd3/xGibT0C78vAAAAAElFTkSuQmCC) no-repeat',
//   backgroundSize: 'contain',
//   opacity: '0.2',
// })
// SettingsButtonNode.setClass('has_tip')
// SettingsButtonNode.setTitle('Visual bar settings')
