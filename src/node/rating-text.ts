export const RatingTextNode = () => {
  const node = document.querySelector<HTMLSpanElement>('span.avg_rating')

  if (!node) throw new Error('Rating node not found')

  if (node) {
    node.style.color = 'blue'
    node.style.backgroundColor = 'white'
  }

  return node
}
