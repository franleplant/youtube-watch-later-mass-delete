const browser = require("webextension-polyfill");
console.log("this is a content script");

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(
    sender.tab
      ? "from a content script:" + sender.tab.url
      : "from the extension"
  );
  if (request.greeting == "hello") {
    return { farewell: "goodbye" }
  }
});
