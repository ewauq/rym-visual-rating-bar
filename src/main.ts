import { NodeCreator } from '@dom/node-creator'
import { NodeSelector } from '@dom/node-selector'
import { SettingsPanelBuilder } from '@dom/settings-panel-builder'
import { BarBuilder } from 'dom/bar-builder'

console.log('🔄 Loading the userscript...')

const nodeSelector = new NodeSelector()
const nodeCreator = new NodeCreator(nodeSelector)

const barBuilder = new BarBuilder(nodeSelector, nodeCreator)
const settingsPanelBuilder = new SettingsPanelBuilder(nodeSelector, nodeCreator)

barBuilder.build()
settingsPanelBuilder.build()

console.log('✅ Userscript loaded!')
