import "regenerator-runtime/runtime.js";
import { browser } from "webextension-polyfill-ts";
import VideoList from "./VideoList";

console.log("YouTube Watch Later mass delete extension: content script loaded");

// doc https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage
browser.runtime.onMessage.addListener((message, sender) => {
  if (sender.tab) {
    console.log("received a message from other tab, skipping");
    return;
  }

  // received message from the extension

  const { videosToDelete } = message;
  if (!videosToDelete) {
    console.log("no videos to delete", videosToDelete);
    return;
  }

  return removeFromWatchLater(videosToDelete);
});

async function removeFromWatchLater(videosToDelete: number) {
  console.log("Selecting video list from DOM");
  const list = new VideoList();
  console.log("Sorting by oldest");
  list.sortByOldest();
  console.log("deleting videos");
  await list.removeFromWatchLater(videosToDelete);
  console.log("done");

  return { ok: true };
}
