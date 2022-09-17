import { ThemeName, ThemeStyleName } from './theme'

export type BarOptions = {
  animation: boolean
  borderRadius: number | false
  theme: ThemeName
  height: number
  shadow: boolean
  style: ThemeStyleName
}

export type OptionsElements = {
  type: 'number' | 'checkbox' | 'select'
  name: string
  label: string
  default: number | string | boolean
  min?: number
  max?: number
  options?: string[]
}
