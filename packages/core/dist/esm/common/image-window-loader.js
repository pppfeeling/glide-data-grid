import { CellSet } from "../internal/data-grid/cell-set.js";
import throttle from "lodash/throttle.js";
import { packColRowToNumber, unpackNumberToColRow, WindowingTrackerBase } from "./render-state-provider.js";
const imgPool = [];
class ImageWindowLoaderImpl extends WindowingTrackerBase {
  constructor() {
    super(...arguments);
    this.imageLoaded = () => undefined;
    this.loadedLocations = [];
    this.cache = {};
    this.sendLoaded = throttle(() => {
      this.imageLoaded(new CellSet(this.loadedLocations));
      this.loadedLocations = [];
    }, 20);
    this.clearOutOfWindow = () => {
      const keys = Object.keys(this.cache);
      for (const key of keys) {
        const obj = this.cache[key];
        let keep = false;
        for (let j = 0; j < obj.cells.length; j++) {
          const packed = obj.cells[j];
          if (this.isInWindow(packed)) {
            keep = true;
            break;
          }
        }
        if (keep) {
          obj.cells = obj.cells.filter(this.isInWindow);
        } else {
          obj.cancel();
          delete this.cache[key];
        }
      }
    };
  }
  setCallback(imageLoaded) {
    this.imageLoaded = imageLoaded;
  }
  loadImage(url, col, row, key) {
    var _imgPool$pop;
    let loaded = false;
    const img = (_imgPool$pop = imgPool.pop()) !== null && _imgPool$pop !== void 0 ? _imgPool$pop : new Image();
    let canceled = false;
    const result = {
      img: undefined,
      cells: [packColRowToNumber(col, row)],
      url,
      cancel: () => {
        if (canceled) return;
        canceled = true;
        if (imgPool.length < 12) {
          imgPool.unshift(img);
        } else if (!loaded) {
          img.src = "";
        }
      }
    };
    const loadPromise = new Promise(r => img.addEventListener("load", () => r(null)));
    requestAnimationFrame(async () => {
      try {
        img.src = url;
        await loadPromise;
        await img.decode();
        const toWrite = this.cache[key];
        if (toWrite !== undefined && !canceled) {
          toWrite.img = img;
          for (const packed of toWrite.cells) {
            this.loadedLocations.push(unpackNumberToColRow(packed));
          }
          loaded = true;
          this.sendLoaded();
        }
      } catch {
        result.cancel();
      }
    });
    this.cache[key] = result;
  }
  loadOrGetImage(url, col, row) {
    const key = url;
    const current = this.cache[key];
    if (current !== undefined) {
      const packed = packColRowToNumber(col, row);
      if (!current.cells.includes(packed)) {
        current.cells.push(packed);
      }
      return current.img;
    } else {
      this.loadImage(url, col, row, key);
    }
    return undefined;
  }
}
export default ImageWindowLoaderImpl;
//# sourceMappingURL=image-window-loader.js.map