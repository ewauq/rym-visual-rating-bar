import { dom } from '@dom/node-selector'
import { settingsButton } from 'node/setting-button'
import { settingsInputsWrapper } from 'node/settings-inputs-wrapper'
import { settingsPanelContainer } from 'node/settings-panel-container'
import { settingsPanelHeader } from 'node/settings-panel-header'

interface SettingInputProperties {
  id: `userscript-${string}`
  label: string
  type: 'text'
  unit?: string | string[]
  placeholder?: string
  parent: HTMLDivElement
  onChange: (event: Event) => void
}

export class SettingsPanelBuilder {
  public build(): void {
    const barWrapperNode = dom.getNode<HTMLDivElement>('#userscript-bar-wrapper')
    const barContainerNode = dom.getNode<HTMLDivElement>('#userscript-bar-container')

    const settingsPanelContainerNode = dom.createNode<HTMLDivElement>(settingsPanelContainer)
    barWrapperNode.after(settingsPanelContainerNode)

    const settingsPanelHeaderNode = dom.createNode<HTMLHeadingElement>(settingsPanelHeader)
    settingsPanelContainerNode.appendChild(settingsPanelHeaderNode)

    const settingsButtonNode = dom.createNode<HTMLButtonElement>(settingsButton)
    barWrapperNode.appendChild(settingsButtonNode)

    const settingsInputsWrapperNode = dom.createNode<HTMLDivElement>(settingsInputsWrapper)
    settingsPanelContainerNode.appendChild(settingsInputsWrapperNode)

    // Inputs
    this.addSettingInputNode('input', {
      id: 'userscript-height',
      label: 'Height',
      type: 'text',
      unit: 'px',
      placeholder: 'Height in pixels',
      parent: settingsInputsWrapperNode,
      onChange: (event: Event): void => {
        const value = (event.target as HTMLInputElement).value
        barContainerNode.style.height = `${value}px`
      },
    })

    this.addSettingInputNode('input', {
      id: 'userscript-width',
      label: 'Width',
      type: 'text',
      unit: ['px', '%'],
      placeholder: 'Width in pixels or %',
      parent: settingsInputsWrapperNode,
      onChange: (event: Event): void => {
        const value = (event.target as HTMLInputElement).value
        const unitElement = document.getElementById(`userscript-width-unit`) as HTMLSelectElement
        const width = `${value}${unitElement?.value ? unitElement.value : 'px'}`
        barContainerNode.style.width = width

        unitElement.onchange = (event: Event): void => {
          const unit = (event.target as HTMLSelectElement).value
          const width = `${value}${unit ? unit : 'px'}`
          barContainerNode.style.width = width
        }
      },
    })

    this.addSettingInputNode('input', {
      id: 'userscript-border-radius',
      label: 'Border Radius',
      type: 'text',
      unit: 'px',
      placeholder: 'Border radius in pixels',
      parent: settingsInputsWrapperNode,
      onChange: (event: Event): void => {
        const value = (event.target as HTMLInputElement).value
        barContainerNode.style.borderRadius = `${value}px`
      },
    })

    // const widthSettingInput = this.buildSettingInputNode({
    //   name: 'width',
    //   label: 'Width',
    //   onChange: this.onWidthInputValueChange,
    // })
    // settingsInputsWrapperNode.appendChild(widthSettingInput)

    // const borderRadiusSettingInput = this.buildSettingInputNode({
    //   name: 'border-radius',
    //   label: 'Border Radius',
    //   onChange: this.onBorderRadiusInputValueChange,
    // })
    // settingsInputsWrapperNode.appendChild(borderRadiusSettingInput)
  }

  // Event handlers
  // private onWidthInputValueChange = (event: Event): void => {
  //   const barContainerNode = dom.getNode<HTMLDivElement>('#userscript-bar-container')
  //   const value = (event.target as HTMLInputElement).value
  //   barContainerNode.style.width = `${value}px`
  // }

  // private onBorderRadiusInputValueChange = (event: Event): void => {
  //   const barContainerNode = dom.getNode<HTMLDivElement>('#userscript-bar-container')
  //   const value = (event.target as HTMLInputElement).value
  //   barContainerNode.style.borderRadius = `${value}px`
  // }

  private addSettingInputNode(tag: 'input' | 'checkbox', properties: SettingInputProperties) {
    const settingWrapperNode = document.createElement('div')
    Object.assign(settingWrapperNode.style, {
      display: 'flex',
      flexDirection: 'column',
      // backgroundColor: 'yellow',
      gap: '6px',
      marginTop: '10px',
      flexGrow: '1',
    })

    // Label
    const settingLabelNode = document.createElement('label')
    settingLabelNode.id = properties.id
    settingLabelNode.textContent = properties.label
    settingLabelNode.htmlFor = properties.id
    Object.assign(settingLabelNode.style, {
      display: 'block',
      fontSize: '16px',
      fontWeight: 'bold',
      width: '100%',
      color: '#1f2228',
    })
    settingWrapperNode.appendChild(settingLabelNode)

    switch (tag) {
      case 'input':
        const inputWrapperNode = document.createElement('div')
        Object.assign(inputWrapperNode.style, {
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          border: '1px solid #ccc',
          borderRadius: '4px',
          gap: '2px',
          backgroundColor: 'white',
        })

        const inputNode = document.createElement('input')
        inputNode.id = properties.id
        inputNode.type = properties.type
        inputNode.onchange = (event) => properties.onChange(event)
        Object.assign(inputNode.style, {
          width: '100%',
          padding: '5px',
          border: 'none',
          fontSize: '16px',
        })
        if (properties.placeholder) inputNode.placeholder = properties.placeholder

        inputWrapperNode.appendChild(inputNode)

        if (properties.unit && typeof properties.unit === 'string') {
          const unitNode = document.createElement('span')
          unitNode.textContent = properties.unit
          Object.assign(unitNode.style, {
            display: 'flex',
            alignItems: 'center',
            fontSize: '16px',
            color: '#1f2228',
            borderLeft: '1px solid #ccc',
            padding: '5px 10px',
            backgroundColor: '#F0F0F0',
            borderRadius: '0px 4px 4px 0px',
          })
          Object.assign(inputNode.style, {
            borderRadius: '4px 0px 0px 4px',
          })
          inputWrapperNode.appendChild(unitNode)
        }

        if (properties.unit && Array.isArray(properties.unit)) {
          const unitNode = document.createElement('select')
          unitNode.id = `${properties.id}-unit`
          unitNode.onchange = (event) => properties.onChange(event)
          Object.assign(unitNode.style, {
            border: 'none',
            padding: '5px 10px',
            borderLeft: '1px solid #ccc',
            borderRadius: '0px 4px 4px 0px',
            minWidth: 'none',
          })
          Object.assign(inputNode.style, {
            borderRadius: '4px 0px 0px 4px',
          })

          properties.unit.forEach((unit) => {
            const optionNode = document.createElement('option')
            optionNode.value = unit
            optionNode.textContent = unit
            unitNode.appendChild(optionNode)
          })

          inputWrapperNode.appendChild(unitNode)
        }

        settingWrapperNode.appendChild(inputWrapperNode)
        break
      case 'checkbox':
        // TODO : checkbox
        break
      default:
        throw new Error(`Unknown tag: ${tag}`)
    }

    properties.parent.appendChild(settingWrapperNode)

    return settingWrapperNode
  }
}
