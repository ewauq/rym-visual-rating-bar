export const getReleaseRating = (ratingNode: HTMLSpanElement) => {
  const ratingText = ratingNode.textContent?.trim()
  if (!ratingText) throw new Error('Rating text not found')

  const releaseRating = parseFloat(ratingText)
  const releaseRatingPercentage = (releaseRating * 100) / 5

  return { releaseRating, releaseRatingPercentage }
}
