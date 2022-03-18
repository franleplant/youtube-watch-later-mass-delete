import VideoItem from "./VideoItem";

export default class VideoList {
  items: Array<VideoItem>;

  constructor() {
    this.items = this.getAll();
  }

  getAll(): Array<VideoItem> {
    const elements = document.querySelectorAll("ytd-playlist-video-renderer");
    this.items = Array.from(elements).map((element) => new VideoItem(element));
    return this.items;
  }

  getEndOfList(): HTMLElement {
    const eol = document.querySelector("ytd-continuation-item-renderer");
    if (!eol) {
      throw new Error("EndOfList not found");
    }

    return eol as HTMLElement;
  }

  loadMore(): void {
    this.getEndOfList().scrollIntoView();
  }

  isLoadingMore(): boolean {
    const activeAttr = this.getEndOfList()
      ?.querySelector("paper-spinner")
      ?.getAttribute("active");
    const isActive = activeAttr !== null;
    return isActive;
  }

  getSortMenu(): HTMLElement {
    // TODO we could easily check that the tooltip is not opened already by checking `aria-expanded=false or true`
    const menu = document.querySelector("[role=button][aria-label=Ordering]");
    console.debug("Found sort menu", menu);
    if (!menu) {
      throw new Error("getSortMenu not found");
    }

    return menu as HTMLElement;
  }

  isSortMenuOpen(): boolean {
    const menu = this.getSortMenu();
    const isOpen = menu.getAttribute("aria-expanded") === "true";

    return isOpen;
  }

  //getOpenSortMenu(): HTMLElement {
  //const open = this.getSortMenu().querySelector("#trigger");
  //if (!open) {
  //throw new Error("OpenSortMenu not found");
  //}

  //return open as HTMLElement;
  //}

  getSortOptions(): Array<HTMLElement> {
    const optionsParent = this.getSortMenu().closest("[aria-haspopup=true]");
    console.log("found options parent", optionsParent);
    if (!optionsParent) {
      throw new Error("SortOptionsParent not found");
    }

    const elements = optionsParent.querySelectorAll("[role=option]");

    const options = Array.from(elements);
    if (!options.length) {
      throw new Error("SortOptions not found");
    }

    return options as Array<HTMLElement>;
  }

  sortByOldest(): void {
    const menu = this.getSortMenu();
    if (!this.isSortMenuOpen()) {
      menu.click();
    }
    const sortByOldest = this.getSortOptions().find((e) =>
      e.innerHTML.toLowerCase().includes("oldest")
    );
    sortByOldest?.click();
  }

  async removeFromWatchLater(itemsToDelete: number): Promise<void> {
    this.getAll();
    for (const [index, item] of this.items.slice(0, itemsToDelete).entries()) {
      console.log(`Removing video ${index}...`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      item.removeFromWatchLater();
      console.log(`Removing video ${index} DONE!!!`);
      console.log(`===========================`);
      console.log(`===========================\n\n `);
    }

    const remainingToDelete = itemsToDelete - this.items.length;
    if (remainingToDelete > 0) {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      await this.removeFromWatchLater(remainingToDelete);
    }
  }
}
