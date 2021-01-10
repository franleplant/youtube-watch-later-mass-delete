import "regenerator-runtime/runtime.js";
import { browser } from "webextension-polyfill-ts";

const form = document.querySelector('form')
const videoInput = form?.querySelector('#n_videos')
const feedback = form?.querySelector('#msg')


if (!form || !videoInput) {
  alert('Could not select elements in the extension popup, something went wrong')

  throw new Error('bad popup')
}

let videosToDelete = 0

videoInput.addEventListener('change', (event) => {
  videosToDelete = Number((event.target as any)?.value)
})

form.onsubmit = async (event) => {
  event.preventDefault()

  const tabs = await browser.tabs.query({ active: true, currentWindow: true });
  const activeTab = tabs[0]
  deleteStart()
  try {
    const res = await browser.tabs.sendMessage(activeTab.id!, { videosToDelete });
    deleteEnd()
  } catch (err) {
    setError(err)
  }
}

function deleteStart() {
  feedback!.innerHTML = "Deleting..."
}

function deleteEnd() {
  feedback!.innerHTML = ""
}

function setError(err: any) {
  feedback!.innerHTML = `Something went wrong ${err}`
}
