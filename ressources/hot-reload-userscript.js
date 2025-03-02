// ==UserScript==
// @name         Dev Script Loader
// @namespace    http://localhost
// @version      2025-03-02
// @description  Hot reload a local script
// @author       You
// @match        https://rateyourmusic.com/release/album/*/*/
// @run-at       document-start
// @grant        GM.xmlHttpRequest
// ==/UserScript==

;(async () => {
  setInterval(() => {
    GM.xmlHttpRequest({
      method: 'GET',
      url: `http://localhost:3000/script.user.js?cb=${Date.now()}`,
      onload: async (response) => {
        const code = response.responseText

        try {
          const blob = new Blob([code], { type: 'application/javascript' })
          const url = URL.createObjectURL(blob)
          import(url).catch(console.error)
        } catch (error) {
          console.error('❌ Error in script:', error)
        }
      },
    })
  }, 500)
})()
