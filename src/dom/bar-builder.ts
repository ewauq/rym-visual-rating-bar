import { theme } from '@constant/theme'
import { NodeCreator } from '@dom/node-creator'
import { NodeSelector } from '@dom/node-selector'
import { generateGradientValues } from '@helper/generate-gradient'
import { getReleaseRating } from '@helper/get-release-rating'

const ANIMATION = true

export class BarBuilder {
  private nodeSelector: NodeSelector
  private nodeCreator: NodeCreator

  constructor(nodeSelector: NodeSelector, nodeCreator: NodeCreator) {
    this.nodeSelector = nodeSelector
    this.nodeCreator = nodeCreator
  }

  public build(): void {
    //Style adjustments
    this.nodeSelector.getReleaseInfoLabelsNodes().forEach((node) => {
      node.style.verticalAlign = 'top'
    })
    this.nodeSelector.getReleaseInfoLabelsAdNode()?.remove() // TODO: Add a setting to enable/disable this

    const ratingNode = this.nodeSelector.getRatingNode()
    const barWrapperNode = this.nodeCreator.createBarWrapperNode()
    const ratingParentNode = ratingNode.parentNode?.parentNode
    const barContainerNode = this.nodeCreator.createBarContainerNode()
    const barMaskNode = this.nodeCreator.createBarMaskNode()

    barContainerNode.appendChild(barMaskNode)
    barWrapperNode.appendChild(barContainerNode)
    ratingParentNode?.appendChild(barWrapperNode)

    const { releaseRating, releaseRatingPercentage } = getReleaseRating(ratingNode)

    barMaskNode.style.width = ANIMATION ? `100%` : `${100 - releaseRatingPercentage}%`
    barContainerNode.title = `${releaseRating}/5 (${releaseRatingPercentage.toFixed(2)}%)`
    barContainerNode.style.background = generateGradientValues(theme.default10, 'block')

    // Animation effect timer
    const visibilityCheckInterval = window.setInterval(function () {
      if (barContainerNode) {
        barMaskNode.style.width = `${100 - releaseRatingPercentage}%`
        window.clearInterval(visibilityCheckInterval)
      }
    }, 100)
  }
}
