import { Themes } from './enum/theme'
import { OptionsMenu } from './options-menu'
import { Localstorage } from './service/localstorage'
import { RGBColor } from './type/color'
import { BarOptions } from './type/option'
import { ThemeName, ThemeStyleName } from './type/theme'

const localstorageClient = new Localstorage(localStorage)

class VisualRatingBar {
  // Default values
  barOptions: BarOptions = {
    animation: true,
    borderRadius: 6,
    theme: 'vibrant',
    height: 20,
    shadow: true,
    style: 'gradual',
  }

  constructor() {
    // Parsing options values
    const animationValue = localstorageClient.getValue('animation-option')
    if (animationValue !== undefined) this.barOptions.animation = animationValue === 'true'

    const borderRadiusValue = localstorageClient.getValue('border-radius-option')
    if (borderRadiusValue === 'false') {
      this.barOptions.borderRadius = 0
    } else if (borderRadiusValue !== undefined) {
      this.barOptions.borderRadius = parseInt(borderRadiusValue)
    }

    const themeValue = localstorageClient.getValue('theme-option')
    if (themeValue !== undefined && Object.keys(Themes).includes(themeValue)) {
      this.barOptions.theme = themeValue as ThemeName
    }

    const styleValue = localstorageClient.getValue('color-style-option')
    if (styleValue !== undefined) this.barOptions.style = styleValue as ThemeStyleName

    const heightOption = localstorageClient.getValue('height-option')
    if (heightOption !== undefined) this.barOptions.height = parseInt(heightOption)

    const shadowValue = localstorageClient.getValue('shadow-option')
    if (shadowValue !== undefined) this.barOptions.shadow = shadowValue === 'true'
  }

  getBackgroundColor = (): RGBColor => {
    const elementNode: Element | null = document.querySelector('.release_right_column')
    if (!elementNode) throw new Error("Can't find the .release_right_column element")
    return window.getComputedStyle(elementNode).backgroundColor as RGBColor
  }

  getThemeMode = (): string | null => {
    const currentThemeMode = localstorageClient.getValue('theme')
    if (!currentThemeMode) return null
    if (!['eve', 'night', 'light'].includes(currentThemeMode)) return null
    return currentThemeMode
  }

  buildGradient = (): string => {
    const { theme, style } = this.barOptions
    const colorsCount = Themes[theme].length
    const colorCodes = Themes[theme]

    const gradientStep = 100 / colorsCount

    const cssValues: string[] = []
    let currentStep = 0

    colorCodes.forEach((color, index) => {
      cssValues.push(`${color} ${currentStep}%`)

      if (style === 'gradual' && index + 1 < colorsCount) {
        cssValues.push(`${color} ${currentStep + gradientStep}%`)
      }

      // Needed to prevent artifacts from elements superposition with a border radius
      if (index + 1 == colorsCount) {
        cssValues.push(`${color} 98%`)
        cssValues.push('transparent 98%')
        cssValues.push('transparent 100%')
      }

      currentStep += gradientStep
    })

    return cssValues.join(', ')
  }

  init(): void {
    const ratingNode = document.querySelector('span.avg_rating')
    if (!ratingNode) return

    const { animation, height, borderRadius, shadow } = this.barOptions

    const ratingText = ratingNode?.textContent

    if (!ratingText) throw new Error("Can't retrieve the rating text of element span.avg_rating")

    const rymThemeMode = this.getThemeMode()

    const rating = parseFloat(ratingText.trim())
    const ratingPercentage = (rating * 100) / 5

    // Bar wrapper
    const barWrapper: HTMLDivElement = document.createElement('div')
    barWrapper.id = 'userscript-bar-wrapper'
    barWrapper.style.height = `${height}px`
    barWrapper.style.cursor = 'pointer'
    barWrapper.style.position = 'relative'
    barWrapper.style.marginTop = '6px'
    barWrapper.title = `${rating}/5 (${ratingPercentage}%)`

    // Bar mask
    const barMask = document.createElement('div')
    barMask.style.width = animation ? '90%' : `${100 - ratingPercentage}%`
    barMask.style.height = '100%'
    barMask.style.backgroundColor = this.getBackgroundColor()
    barMask.style.marginTop = `-${height}px`
    barMask.style.right = '0'
    barMask.style.position = 'absolute'
    barMask.style.filter = 'contrast(70%)'
    if (animation) barMask.style.transition = 'width 500ms cubic-bezier(0.250, 0.460, 0.450, 0.940)'
    if (borderRadius) barMask.style.borderTopRightRadius = `${borderRadius}px`
    if (borderRadius) barMask.style.borderBottomRightRadius = `${borderRadius}px`
    if (shadow) barMask.style.boxShadow = '#00000063 0px 0px 3px 0px inset'

    // Bar gradient
    const barGradient: HTMLDivElement = document.createElement('div')
    barGradient.style.height = '100%'
    barGradient.style.background = `linear-gradient(90deg, ${this.buildGradient()})`
    if (borderRadius) barGradient.style.borderRadius = `${borderRadius}px`
    if (rymThemeMode !== 'light') barGradient.style.filter = 'saturate(50%)'
    if (shadow) barGradient.style.boxShadow = '#0000009c 0px 0px 4px 0px inset'

    const ratingNodeParent = ratingNode?.parentNode?.parentNode
    ratingNodeParent?.appendChild(barWrapper)
    barWrapper.appendChild(barGradient)
    barWrapper.appendChild(barMask)

    // Bar animation
    const visibilityCheckInterval = window.setInterval(function () {
      const barWrapperNode = document.getElementById('userscript-bar-wrapper')
      if (barWrapperNode) {
        barMask.style.width = `${100 - ratingPercentage}%`
        window.clearInterval(visibilityCheckInterval)
      }
    }, 50)

    // Handling RYM theme mode switching
    document.querySelectorAll('div.header_theme_button')[1]?.addEventListener('click', () => {
      const themeMode = this.getThemeMode()
      barMask.style.backgroundColor = this.getBackgroundColor()
      barGradient.style.filter = `saturate(${themeMode === 'light' ? 100 : 50}%)`
    })

    // Options menu
    const optionsMenu = new OptionsMenu()
    document.body.appendChild(optionsMenu.build())

    document.getElementById('userscript-bar-wrapper')?.addEventListener('click', () => {
      optionsMenu.show()
    })

    console.log('[USERSCRIPT] RateYourMusic Visual Rating Bar added')
  }
}

const visualRatingBar = new VisualRatingBar()
visualRatingBar.init()
