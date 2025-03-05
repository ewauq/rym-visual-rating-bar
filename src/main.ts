import { RatingTextNode } from '@/node/rating-text'
import { BarWrapperNode } from '@/node/bar-wrapper'

// Nodes
const ratingNode = RatingTextNode()
const ratingNodeParent = ratingNode?.parentNode?.parentNode
const barWrapperNode = BarWrapperNode()

const ratingText = ratingNode.textContent?.trim()
if (!ratingText) throw new Error('Rating text not found')

const releaseRating = parseFloat(ratingText)
const releaseRatingPercentage = ((releaseRating * 100) / 5).toFixed(2)

// Do the magic
ratingNodeParent?.appendChild(barWrapperNode)

console.log(ratingText, releaseRatingPercentage)
