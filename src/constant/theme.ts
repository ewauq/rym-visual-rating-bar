type RGBColor = `rgb(${number}, ${number}, ${number})`
type HEXColor = `#${string}`

type ThemeName = 'default5' | 'default10'
export type ThemeStyleValue = RGBColor | HEXColor | RGBColor[] | HEXColor[]

type Theme = { [key in ThemeName]: ThemeStyleValue }

// To match with the rating step, the theme should have 5 colors or 10.
export const themes: Theme = {
  default5: ['#ea4335', '#f27f1d', '#fbbc04', '#98b22b', '#34a853'],
  default10: [
    '#ea4335',
    '#ee6129',
    '#f27f1d',
    '#f69d11',
    '#fbbc04',
    '#cab717',
    '#98b22b',
    '#66ad3f',
    '#34a853',
    '#34a853',
  ],
}
