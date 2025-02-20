import { Themes } from './enum/theme'
import { Localstorage } from './service/localstorage'
import { RGBColor } from './type/color'
import { OptionsElements } from './type/option'

const localstorageClient = new Localstorage(localStorage)

export class OptionsMenu {
  getBackgroundColor = (): RGBColor => {
    const elementNode: Element | null = document.querySelector('.release_right_column')
    if (!elementNode) throw new Error("Can't find the .release_right_column element")
    return window.getComputedStyle(elementNode).backgroundColor as RGBColor
  }

  show() {
    const overlayNode = document.getElementById('userscript-options-menu')
    const containerNode: HTMLElement | null = document.querySelector(
      '#userscript-options-menu > div',
    )
    const headerNode = document.getElementById('page_header')
    const pageWrapper = document.getElementById('content_wrapper_outer')
    document.body.style.overflow = 'hidden'
    if (containerNode) containerNode.style.backgroundColor = this.getBackgroundColor()
    if (overlayNode) overlayNode.style.display = 'flex'
    if (headerNode) headerNode.style.filter = 'blur(3px)'
    if (pageWrapper) pageWrapper.style.filter = 'blur(3px)'
  }

  hide() {
    const optionsMenuOverlayNode = document.getElementById('userscript-options-menu')
    const headerNode = document.getElementById('page_header')
    const pageWrapper = document.getElementById('content_wrapper_outer')

    document.body.style.overflow = 'visible'
    if (optionsMenuOverlayNode) optionsMenuOverlayNode.style.display = 'none'
    if (headerNode) headerNode.style.filter = 'none'
    if (pageWrapper) pageWrapper.style.filter = 'none'

    location.reload()
  }

  build(): HTMLDivElement {
    const optionsMenuOverlay = document.createElement('div')
    optionsMenuOverlay.id = 'userscript-options-menu'
    optionsMenuOverlay.style.width = '100%'
    optionsMenuOverlay.style.height = '100%'
    optionsMenuOverlay.style.zIndex = '1010'
    optionsMenuOverlay.style.top = '0'
    optionsMenuOverlay.style.left = '0'
    optionsMenuOverlay.style.position = 'fixed'
    optionsMenuOverlay.style.display = 'none'
    optionsMenuOverlay.style.justifyContent = 'center'
    optionsMenuOverlay.style.fontFamily = 'Roboto, Helvetica, Arial, sans-serif'
    optionsMenuOverlay.style.fontSize = '16px'
    optionsMenuOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'

    const optionsMenuContainer = document.createElement('div')
    optionsMenuContainer.style.width = '450px'
    optionsMenuContainer.style.margin = '300px auto auto auto'
    optionsMenuContainer.style.padding = '20px'
    optionsMenuContainer.style.zIndex = '1020'
    optionsMenuContainer.style.backgroundColor = '#FFFFFF'
    optionsMenuContainer.style.borderRadius = '6px'
    optionsMenuContainer.style.outline = '6px solid rgba(0,0,0,0.3)'

    const optionsMenuSectionTitle = document.createElement('h2')
    optionsMenuSectionTitle.style.fontSize = '20px'
    optionsMenuSectionTitle.style.marginBottom = '10px'
    optionsMenuSectionTitle.style.fontWeight = 'bold'
    optionsMenuSectionTitle.innerHTML = 'Options'

    const optionsElements: OptionsElements[] = [
      {
        type: 'checkbox',
        name: 'animation-option',
        label: 'Animate the bar on display',
        default: true,
      },
      {
        type: 'select',
        name: 'theme-option',
        options: Object.keys(Themes),
        label: 'Color theme',
        default: 'vibrant',
      },
      {
        type: 'select',
        name: 'color-style-option',
        options: ['gradual', 'blend'],
        label: 'Color mode',
        default: 'gradual',
      },
      { type: 'number', name: 'height-option', min: 0, max: 100, label: 'Bar height', default: 20 },
      {
        type: 'number',
        name: 'border-radius-option',
        min: 0,
        label: 'Bar border radius',
        default: 6,
      },
      {
        type: 'checkbox',
        name: 'shadow-option',
        label: 'Display a shadow on the bar',
        default: true,
      },
    ]

    optionsMenuContainer.appendChild(optionsMenuSectionTitle)

    const optionsElementsWrapper = document.createElement('div')
    optionsElementsWrapper.style.display = 'flex'
    optionsElementsWrapper.style.flexDirection = 'column'
    optionsMenuContainer.appendChild(optionsElementsWrapper)

    let input: HTMLInputElement | HTMLSelectElement

    optionsElements.forEach((element) => {
      let storedValue = localstorageClient.getValue(element.name)
      if (!storedValue) {
        localstorageClient.setValue(element.name, element.default)
        storedValue = String(element.default)
      }

      if (element.type == 'checkbox') {
        const label = document.createElement('label')
        label.style.fontWeight = 'normal'
        label.style.padding = '10px 0px'
        label.htmlFor = element.name
        label.innerHTML = element.label

        input = document.createElement('input')
        input.type = 'checkbox'
        input.id = element.name
        input.checked = storedValue === 'true'
        input.style.marginRight = '10px'
        input.style.height = '14px'
        input.style.width = '14x'

        optionsElementsWrapper.appendChild(label)
        label.prepend(input)

        input.addEventListener('change', (event) => {
          const target = <HTMLInputElement>event.target
          localstorageClient.setValue(element.name, String(target.checked))
        })
      } else if (element.type == 'number') {
        const label = document.createElement('label')
        label.style.fontWeight = 'normal'
        label.style.padding = '10px 0px'
        label.htmlFor = element.name
        label.innerHTML = element.label

        input = document.createElement('input')
        input.type = 'number'
        input.min = String(element.min)
        input.max = String(element.max)
        input.id = element.name
        input.value = storedValue
        input.style.marginLeft = '10px'
        input.style.width = '50px'

        optionsElementsWrapper.appendChild(label)
        label.appendChild(input)

        input.addEventListener('change', (event) => {
          const target = <HTMLInputElement>event.target
          localStorage.setItem(element.name, target.value)
        })
      } else if (element.type == 'select') {
        const label = document.createElement('label')
        label.style.fontWeight = 'normal'
        label.style.padding = '10px 0px'
        label.htmlFor = element.name
        label.innerHTML = element.label

        input = document.createElement('select')
        input.id = element.name
        input.style.marginLeft = '10px'

        element.options?.forEach((option) => {
          const selectOption = document.createElement('option')
          selectOption.value = option
          selectOption.innerHTML = option
          if (option == storedValue) selectOption.defaultSelected = true
          input.appendChild(selectOption)
        })

        optionsElementsWrapper.appendChild(label)
        label.appendChild(input)

        input.addEventListener('change', (event) => {
          const target = <HTMLSelectElement>event.target
          localstorageClient.setValue(element.name, target.value)
        })
      }

      optionsMenuOverlay.addEventListener('click', (event) => {
        const target = <HTMLDivElement>event.target
        if (target.id === 'userscript-options-menu') this.hide()
      })

      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') this.hide()
      })
    })

    const footerInformation = document.createElement('div')
    footerInformation.style.color = 'gray'
    footerInformation.style.fontSize = '13px'
    footerInformation.style.marginTop = '16px'
    footerInformation.innerHTML = `Your settings are automatically saved in your browser local storage.
    <br/>
    Press ESC or click out the window to close it and reload the page.`

    optionsMenuOverlay.appendChild(optionsMenuContainer)
    optionsMenuContainer.appendChild(footerInformation)

    return optionsMenuOverlay
  }
}
