export const BarMaskNode = () => {
  const node = document.createElement('div')

  node.id = 'userscript-bar-mask'
  node.style.backgroundColor = '#f2f2f2'
  // node.style.transition = 'width 400ms cubic-bezier(.02, 1.3, 1, 1.1)' // bounce easing
  node.style.transition = 'width 400ms cubic-bezier(.25, 1, 0.5, 1)' // ease-in-out easing

  return node
}
