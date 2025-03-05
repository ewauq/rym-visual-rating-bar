// ==UserScript==
// @name         Dev Script Loader
// @namespace    http://localhost
// @version      2025-03-02
// @description  Hot reload a local script
// @author       You
// @match        https://rateyourmusic.com/release/album/*/*/
// @run-at       document-start
// @grant        GM.xmlHttpRequest
// @grant        GM.setValue
// ==/UserScript==

;(async () => {
  let lastLoadedCode = null

  setInterval(() => {
    GM.xmlHttpRequest({
      method: 'GET',
      url: `http://localhost:3000/script.user.js?cb=${Date.now()}`,
      onload: async (response) => {
        const newCode = response.responseText

        if (newCode !== lastLoadedCode) {
          console.log('🔄 Script updated, reloading...')

          lastLoadedCode = newCode
          await GM.setValue('cached_script', newCode)
          const blob = new Blob([newCode], { type: 'application/javascript' })
          const url = URL.createObjectURL(blob)
          document.querySelectorAll('[userscript-node]').forEach((element) => element.remove())
          import(url).catch(console.error)
        }
      },
    })
  }, 500)
})()
