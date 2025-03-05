import { RatingTextNode } from '@/node/rating-text'
import { BarContainerNode } from '@/node/bar-container'
import { BarMaskNode } from '@/node/bar-mask'
import { ReleaseInfoLabels } from '@/node/release-info-labels'

// Nodes
const releaseInfoLabelsNodes = ReleaseInfoLabels()
const ratingNode = RatingTextNode()
const ratingNodeParent = ratingNode?.parentNode?.parentNode
const barContainerNode = BarContainerNode()
const barMaskNode = BarMaskNode()

const ratingText = ratingNode.textContent?.trim()
if (!ratingText) throw new Error('Rating text not found')

const releaseRating = parseFloat(ratingText)
const releaseRatingPercentage = ((releaseRating * 100) / 5).toFixed(2)

// Do the magic
releaseInfoLabelsNodes.forEach((node) => (node.style.verticalAlign = 'top'))
ratingNodeParent?.appendChild(barContainerNode)
barContainerNode?.appendChild(barMaskNode)

barMaskNode.style.width = `${releaseRatingPercentage}%`
barMaskNode.style.width = `${100 - parseFloat(releaseRatingPercentage)}%`
barContainerNode.title = `${releaseRating} / 5 (${releaseRatingPercentage}%)`

console.log(ratingText, releaseRatingPercentage)
