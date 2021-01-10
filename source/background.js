const browser = require("webextension-polyfill");

console.log("background babay");

browser.runtime.onInstalled.addListener(function () {
  browser.declarativeContent.onPageChanged.removeRules(undefined, function () {
    browser.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          //new browser.declarativeContent.PageStateMatcher({
          //pageUrl: { hostEquals: "*" },
          //}),
        ],
        actions: [new browser.declarativeContent.ShowPageAction()],
      },
    ]);
  });
});
