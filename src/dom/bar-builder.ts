import { theme } from '@constant/theme'
import { dom } from '@dom/node-selector'
import { generateGradientValues } from '@helper/generate-gradient'
import { getReleaseRating } from '@helper/get-release-rating'
import { barContainer } from 'node/bar-container'
import { barMask } from 'node/bar-mask'
import { barWrapper } from 'node/bar-wrapper'

const ANIMATION = true

export class BarBuilder {
  public build(): void {
    //Style adjustments
    dom
      .getNodes<HTMLTableCellElement>('.info_hdr')
      .forEach((node) => (node.style.verticalAlign = 'top'))

    // TODO: Add a setting to enable/disable this
    try {
      dom
        .getNode<HTMLTableCellElement>('.album_info_outer > tbody > tr > td:nth-of-type(2)')
        .remove()
    } catch (e) {}

    const ratingNode = dom.getNode<HTMLSpanElement>('.avg_rating')
    const ratingParentNode = ratingNode.parentNode?.parentNode
    const barWrapperNode = dom.createNode<HTMLDivElement>(barWrapper)
    const barContainerNode = dom.createNode<HTMLDivElement>(barContainer)
    const barMaskNode = dom.createNode<HTMLDivElement>(barMask)

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
