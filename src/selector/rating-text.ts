export const RatingTextNode = () => {
  const node = document.querySelector<HTMLSpanElement>('span.avg_rating')

  if (!node) throw new Error('Rating node not found')

  return node
}
