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
    const menu = this.root.querySelector("[aria-label='Action menu']");
    console.log("VideItem.getOpenMenu", menu);
    if (!menu) {
      console.error(`couldnt find menu button`, this.root);
      throw new Error(`couldnt find menu button`);
    }
    return menu as HTMLElement;
  }

  getRemoveButton(): HTMLElement {
    const menuContent = document.querySelector("#items[role=listbox]");
    console.log("VideItem.getRemoveButton menuContent", menuContent);
    if (!menuContent) {
      throw new Error(`couldnt find menu content`);
    }

    const menuItems = menuContent.querySelectorAll("[role=menuitem]");
    console.log("VideItem.getRemoveButton menuItems", menuItems);

    const isRemoveButton = (e: Element) =>
      e.innerHTML.toLowerCase().includes("remove");
    const removeButton = Array.from(menuItems || []).find(isRemoveButton);

    console.log("VideItem.getRemoveButton removeButton", removeButton);
    if (!removeButton) {
      throw new Error(`couldnt find remove button`);
    }
    return removeButton as HTMLElement;
  }

  removeFromWatchLater(): void {
    this.getOpenMenu().click();
    this.getRemoveButton().click();
  }
}
