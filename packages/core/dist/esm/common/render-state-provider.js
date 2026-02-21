import { deepEqual } from "./support.js";
const rowShift = 1 << 21;
export function packColRowToNumber(col, row) {
  return (row + 2) * rowShift + col;
}
export function unpackCol(packed) {
  return packed % rowShift;
}
export function unpackRow(packed) {
  return Math.floor(packed / rowShift) - 2;
}
export function unpackNumberToColRow(packed) {
  const col = unpackCol(packed);
  const row = unpackRow(packed);
  return [col, row];
}
export class WindowingTrackerBase {
  constructor() {
    this.visibleWindow = {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };
    this.freezeCols = 0;
    this.freezeRows = [];
    this.isInWindow = packed => {
      const col = unpackCol(packed);
      const row = unpackRow(packed);
      const w = this.visibleWindow;
      const colInWindow = col >= w.x && col <= w.x + w.width || col < this.freezeCols;
      const rowInWindow = row >= w.y && row <= w.y + w.height || this.freezeRows.includes(row);
      return colInWindow && rowInWindow;
    };
  }
  setWindow(newWindow, freezeCols, freezeRows) {
    if (this.visibleWindow.x === newWindow.x && this.visibleWindow.y === newWindow.y && this.visibleWindow.width === newWindow.width && this.visibleWindow.height === newWindow.height && this.freezeCols === freezeCols && deepEqual(this.freezeRows, freezeRows)) return;
    this.visibleWindow = newWindow;
    this.freezeCols = freezeCols;
    this.freezeRows = freezeRows;
    this.clearOutOfWindow();
  }
}
export class RenderStateProvider extends WindowingTrackerBase {
  constructor() {
    super(...arguments);
    this.cache = new Map();
    this.setValue = (location, state) => {
      this.cache.set(packColRowToNumber(location[0], location[1]), state);
    };
    this.getValue = location => {
      return this.cache.get(packColRowToNumber(location[0], location[1]));
    };
    this.clearOutOfWindow = () => {
      for (const [key] of this.cache.entries()) {
        if (!this.isInWindow(key)) {
          this.cache.delete(key);
        }
      }
    };
  }
}
//# sourceMappingURL=render-state-provider.js.map