import "regenerator-runtime/runtime.js";
import "./options_storage";
import { browser } from "webextension-polyfill-ts";

browser.runtime.onInstalled.addListener(() => {
  browser.declarativeContent.onPageChanged.removeRules(undefined, () => {
    browser.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new browser.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: "https://www.youtube.com" },
          }),
        ],
        actions: [new browser.declarativeContent.ShowPageAction()],
      },
    ]);
  });
});
