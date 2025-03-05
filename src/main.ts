import { RatingTextNode } from '@/node/rating-text'
import { BarWrapperNode } from '@/node/bar-wrapper'
import { BarMaskNode } from '@/node/bar-mask'
import { BarProgressionNode } from '@/node/bar-progression'
import { ReleaseInfoLabels } from './node/release-info-labels'

// Nodes
const releaseInfoLabelsNodes = ReleaseInfoLabels()
const ratingNode = RatingTextNode()
const ratingNodeParent = ratingNode?.parentNode?.parentNode
const barWrapperNode = BarWrapperNode()
const barProgressionNode = BarProgressionNode()
const barMaskNode = BarMaskNode()

const ratingText = ratingNode.textContent?.trim()
if (!ratingText) throw new Error('Rating text not found')

const releaseRating = parseFloat(ratingText)
const releaseRatingPercentage = ((releaseRating * 100) / 5).toFixed(2)

// Do the magic
releaseInfoLabelsNodes.forEach((node) => (node.style.verticalAlign = 'top'))
ratingNodeParent?.appendChild(barWrapperNode)
barWrapperNode?.appendChild(barProgressionNode)
barWrapperNode?.appendChild(barMaskNode)

barProgressionNode.style.width = `${releaseRatingPercentage}%`
barProgressionNode.title = `${releaseRating} / 5 (${releaseRatingPercentage}%)`
// barMaskNode.style.width = `${100 - parseFloat(releaseRatingPercentage)}%`

console.log(ratingText, releaseRatingPercentage)
