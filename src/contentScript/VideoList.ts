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
      throw new Error("not found");
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
    const menu = document.querySelector("#sort-filter-menu");
    if (!menu) {
      throw new Error("not found");
    }

    return menu as HTMLElement;
  }

  getOpenSortMenu(): HTMLElement {
    const open = this.getSortMenu().querySelector("paper-button");
    if (!open) {
      throw new Error("not found");
    }

    return open as HTMLElement;
  }

  getSortOptions(): Array<HTMLElement> {
    const elements = this.getSortMenu().querySelectorAll(
      "#dropdown paper-listbox > a"
    );

    const options = Array.from(elements);
    if (!options.length) {
      throw new Error("not found");
    }

    return options as Array<HTMLElement>;
  }

  sortByOldest(): void {
    this.getOpenSortMenu().click();
    const sortByOldest = this.getSortOptions().find((e) =>
      e.innerHTML.toLowerCase().includes("oldest")
    );
    sortByOldest?.click();
  }

  async removeFromWatchLater(itemsToDelete: number): Promise<void> {
    this.getAll();
    for (const item of this.items.slice(0, itemsToDelete)) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      item.removeFromWatchLater();
    }

    const remainingToDelete = itemsToDelete - this.items.length;
    if (remainingToDelete > 0) {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      await this.removeFromWatchLater(remainingToDelete);
    }
  }
}
