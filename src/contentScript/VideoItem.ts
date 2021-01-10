export default class VideoItem {
  static fromSelector(selector: string) {
    const element = document.querySelector(selector);
    if (!element) {
      throw new Error("Element not found");
    }
    return new VideoItem(element);
  }

  constructor(public root: Element) {}

  getOpenMenu(): HTMLElement {
    const menu = this.root.querySelector("#menu button");
    if (!menu) {
      console.error(`couldnt find menu button`, this.root);
      throw new Error(`couldnt find menu button`);
    }
    return menu as HTMLElement;
  }

  getRemoveButton(): HTMLElement {
    const menuPopup = document.querySelector("ytd-popup-container");
    const menuOptions = menuPopup?.querySelectorAll(
      "ytd-menu-service-item-renderer"
    );
    const isRemoveButton = (e: Element) =>
      e.innerHTML.toLowerCase().includes("watch later");
    const removeButton = Array.from(menuOptions || []).find(isRemoveButton);

    if (!removeButton) {
      console.error(`couldnt find remove button`, menuPopup);
      throw new Error(`couldnt find remove button`);
    }
    return removeButton as HTMLElement;
  }

  removeFromWatchLater(): void {
    this.getOpenMenu().click();
    this.getRemoveButton().click();
  }
}
