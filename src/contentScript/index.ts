import "regenerator-runtime/runtime.js";
import { browser } from "webextension-polyfill-ts";

// doc https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage
browser.runtime.onMessage.addListener((message, sender) => {
  if (sender.tab) {
    console.log("received a message from other tab, skipping")
    return
  }

  // received message from the extension


  const {videosToDelete} = message
  if (!videosToDelete) {
    console.log("no videos to delete", videosToDelete)
    return
  }

  console.log("deleting videos")

  if (message.greeting == "hello") {
    return Promise.resolve({ farewell: "goodbye" });
  }
});
