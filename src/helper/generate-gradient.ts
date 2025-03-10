import type { ThemeStyleValue } from '@constant/theme'

type GradientStyle = 'gradient' | 'block'

/**
 * Generate a vertical `linear-gradient` value from the specified colors.
 *
 * Note: uses the transparent color stop hack to prevent the background color
 * from bleeding.
 * See https://dev.to/rashidshamloo/css-fixing-background-color-bleed-in-rounded-corners-2kh4
 *
 * @param colors [ThemeStyleValue] - The colors to generate the gradient from.
 * @param style [GradientStyle] - The style of the gradient ('blend' or 'gradual').
 * @returns [string] - The generated gradient.
 */
export const generateGradientValues = (colors: ThemeStyleValue, style: GradientStyle): string => {
  if (!Array.isArray(colors)) {
    return `linear-gradient(to right, ${colors} 0%, transparent 98%)`
  }

  const stepPercentage = 100 / colors.length
  let currentStepPercentage = 0

  const gradientColors = colors.map((color) => {
    let cssValue = ''
    let nextStepPercentage = currentStepPercentage + stepPercentage

    if (currentStepPercentage >= 100) currentStepPercentage = 98
    if (nextStepPercentage >= 100) nextStepPercentage = 98

    switch (style) {
      case 'gradient':
        cssValue = `${color} ${currentStepPercentage}%`
        break
      case 'block':
        cssValue = `${color} ${currentStepPercentage}%, ${color} ${nextStepPercentage}%`
        break
      default:
        cssValue = `${color} ${currentStepPercentage}%`
        break
    }

    currentStepPercentage = nextStepPercentage
    return cssValue
  })

  // Add the transparent color stop to prevent background color bleed
  gradientColors.push('transparent 98%')

  return `linear-gradient(to right, ${gradientColors.join(', ')})`
}
