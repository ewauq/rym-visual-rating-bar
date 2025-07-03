export type NodeDefinition = {
  id: string
  tag: keyof HTMLElementTagNameMap
  title?: string
  style?: Partial<CSSStyleDeclaration>
  textContent?: string
  removeOnHotReload?: boolean
  htmlFor?: string
  onMouseOver?: (node: HTMLElement) => void
  onMouseOut?: (node: HTMLElement) => void
  onClick?: (node: HTMLElement) => void
}
