import { SettingsPanelBuilder } from '@dom/settings-panel-builder'
import { BarBuilder } from 'dom/bar-builder'

console.log('🔄 Loading the userscript...')

const barBuilder = new BarBuilder()
const settingsPanelBuilder = new SettingsPanelBuilder()

barBuilder.build()
settingsPanelBuilder.build()

console.log('✅ Userscript loaded!')
