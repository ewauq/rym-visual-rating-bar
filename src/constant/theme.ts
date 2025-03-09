type RGBColor = `rgb(${number}, ${number}, ${number})`
type HEXColor = `#${string}`

type ThemeName = 'default5' | 'default10'
export type ThemeStyleValue = RGBColor | HEXColor | RGBColor[] | HEXColor[]

type Theme = { [key in ThemeName]: ThemeStyleValue }

// To match with the rating step, the theme should have 5 colors or 10.
export const themes: Theme = {
  default5: ['#dc231c', '#fd7902', '#fdd514', '#62bd21', '#018ea6'],
  default10: [
    '#dc231c',
    '#f03c03',
    '#fd7902',
    '#fda506',
    '#fdd514',
    '#62bd21',
    '#0b9e53',
    '#018ea6',
    '#015ca1',
    '#163993',
  ],
}
