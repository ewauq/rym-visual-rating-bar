import { BarContainerNode } from '@builder/bar-container'
import { BarMaskNode } from '@builder/bar-mask'
import { themes } from '@constant/theme'
import { RatingTextNode } from '@selector/rating-text'
import { ReleaseInfoLabelsNode } from '@selector/release-info-labels'
import { ReleaseInfoLabelsAdNode } from '@selector/release-info-labels-ad'
import { generateLinearGradientValue } from 'helper/generate-gradient'

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
const releaseRatingPercentage = ((releaseRating * 100) / 5).toFixed(2)

// Do the magic
releaseInfoLabelsNodes.forEach((node) => (node.style.verticalAlign = 'top'))
releaseInfoLabelsAdNode?.remove() // remove the ad node on the release info block

ratingNodeParent?.appendChild(barContainerNode)
barContainerNode?.appendChild(barMaskNode)

barMaskNode.style.width = `${releaseRatingPercentage}%`
barMaskNode.style.width = `${100 - parseFloat(releaseRatingPercentage)}%`
barContainerNode.title = `${releaseRating} / 5 (${releaseRatingPercentage}%)`
barContainerNode.style.background = generateLinearGradientValue(themes.default10, 'gradual')
