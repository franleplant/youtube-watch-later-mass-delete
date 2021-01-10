import { browser } from "webextension-polyfill-ts";

// doc https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage
browser.runtime.onMessage.addListener((message, sender) => {
  console.log(
    sender.tab
      ? "from a content script:" + sender.tab.url
      : "from the extension"
  );
  if (message.greeting == "hello") {
    return Promise.resolve({ farewell: "goodbye" });
  }
});
