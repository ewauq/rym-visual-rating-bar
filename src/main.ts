import { BarContainerNode } from '@builder/bar/bar-container'
import { BarMaskNode } from '@builder/bar/bar-mask'
import { BarWrapperNode } from '@builder/bar/bar-wrapper'
import { SettingsButtonNode } from '@builder/settings/settings-button'
import { SettingsContainerNode } from '@builder/settings/settings-container'
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

const barWrapperNode = BarWrapperNode()
const barContainerNode = BarContainerNode()
const barMaskNode = BarMaskNode()
const settingsButtonNode = SettingsButtonNode()
const settingsContainerNode = SettingsContainerNode()

const ratingText = ratingNode.textContent?.trim()
if (!ratingText) throw new Error('Rating text not found')

const releaseRating = parseFloat(ratingText)
const releaseRatingPercentage = (releaseRating * 100) / 5

// Do the magic
releaseInfoLabelsNodes.forEach((node) => (node.style.verticalAlign = 'top'))
releaseInfoLabelsAdNode?.remove() // remove the ad node on the release info block

barContainerNode.appendChild(barMaskNode)
barWrapperNode.appendChild(barContainerNode)
barWrapperNode.appendChild(settingsButtonNode)
ratingNodeParent?.appendChild(barWrapperNode)

// Settings Panel
barWrapperNode.after(settingsContainerNode)

barMaskNode.style.width = ANIMATION ? `100%` : `${100 - releaseRatingPercentage}%`
barContainerNode.title = `${releaseRating}/5 (${releaseRatingPercentage.toFixed(2)}%)`
barContainerNode.style.background = generateLinearGradientValue(themes.default10, 'block')

const visibilityCheckInterval = window.setInterval(function () {
  if (barContainerNode) {
    barMaskNode.style.width = `${100 - releaseRatingPercentage}%`
    window.clearInterval(visibilityCheckInterval)
  }
}, 100)

settingsButtonNode.onclick = () =>
  (settingsContainerNode.style.display =
    settingsContainerNode.style.display === 'none' ? 'flex' : 'none')
