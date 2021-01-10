import { browser } from "webextension-polyfill-ts"

let changeColor = document.getElementById("changeColor");

changeColor.addEventListener("click", async (element) => {
  console.log("click");
  const tabs = await browser.tabs.query({ active: true, currentWindow: true });

  const res = await browser.tabs.sendMessage(tabs[0].id, { greeting: "hello" });
  console.log(res);
});
