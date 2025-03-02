import { build } from 'bun'
import { watch, writeFileSync } from 'fs'
import { banner } from './src/banner.ts'

const bundle = async () => {
  console.log('📦 Bundling the userscript...')

  await build({
    entrypoints: ['src/main.ts'],
    outdir: 'dist',
    minify: false,
    format: 'iife',
    target: 'browser',
  })

  const content = Bun.file('dist/main.js').text()
  writeFileSync('dist/script.user.js', banner + (await content))

  console.log('🎉 Userscript bundled!')
}

await bundle()

watch('src', { recursive: true }, async (event, filename) => {
  console.log(`📦 Event: ${event}`)
  console.log(`🔄 File changed: ${filename}`)
  await bundle()
})
