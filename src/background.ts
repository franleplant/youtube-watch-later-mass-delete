import "regenerator-runtime/runtime.js";
import { browser } from "webextension-polyfill-ts";

browser.runtime.onInstalled.addListener(() => {
  browser.declarativeContent.onPageChanged.removeRules(undefined, () => {
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
