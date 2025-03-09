import { BarContainerNode } from '@builder/bar-container'
import { BarMaskNode } from '@builder/bar-mask'
import { themes } from '@constant/theme'
import { generateLinearGradientValue } from '@helper/generate-gradient'
import { RatingTextNode } from '@selector/rating-text'
import { ReleaseInfoLabelsNode } from '@selector/release-info-labels'
import { ReleaseInfoLabelsAdNode } from '@selector/release-info-labels-ad'

const ANIMATION = true

// Nodes
const releaseInfoLabelsNodes = ReleaseInfoLabelsNode()
const releaseInfoLabelsAdNode = ReleaseInfoLabelsAdNode()
const ratingNode = RatingTextNode()
const ratingNodeParent = ratingNode?.parentNode?.parentNode
const barContainerNode = BarContainerNode()
const barMaskNode = BarMaskNode()

const ratingText = ratingNode.textContent?.trim()
if (!ratingText) throw new Error('Rating text not found')

const releaseRating = parseFloat(ratingText)
const releaseRatingPercentage = (releaseRating * 100) / 5

// Do the magic
releaseInfoLabelsNodes.forEach((node) => (node.style.verticalAlign = 'top'))
releaseInfoLabelsAdNode?.remove() // remove the ad node on the release info block

ratingNodeParent?.appendChild(barContainerNode)
barContainerNode?.appendChild(barMaskNode)

barMaskNode.style.width = ANIMATION ? `90%` : `${100 - releaseRatingPercentage}%`
barContainerNode.title = `${releaseRating}/5 (${releaseRatingPercentage.toFixed(2)}%)`
barContainerNode.style.background = generateLinearGradientValue(themes.default10, 'gradual')

const visibilityCheckInterval = window.setInterval(function () {
  if (barContainerNode) {
    barMaskNode.style.width = `${100 - releaseRatingPercentage}%`
    window.clearInterval(visibilityCheckInterval)
  }
}, 50)
