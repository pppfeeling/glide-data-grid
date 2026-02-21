import clamp from "lodash/clamp.js";
import { itemsAreEqual } from "./render/data-grid-lib.js";
const hoverTime = 80;
function easeOutCubic(x) {
  const x1 = x - 1;
  return x1 * x1 * x1 + 1;
}
export class AnimationManager {
  constructor(callback) {
    this.callback = void 0;
    this.currentHoveredItem = undefined;
    this.leavingItems = [];
    this.lastAnimationTime = void 0;
    this.addToLeavingItems = item => {
      const isAlreadyLeaving = this.leavingItems.some(i => itemsAreEqual(i.item, item.item));
      if (isAlreadyLeaving) {
        return;
      }
      this.leavingItems.push(item);
    };
    this.removeFromLeavingItems = item => {
      var _leavingItem$hoverAmo;
      const leavingItem = this.leavingItems.find(e => itemsAreEqual(e.item, item));
      this.leavingItems = this.leavingItems.filter(i => i !== leavingItem);
      return (_leavingItem$hoverAmo = leavingItem === null || leavingItem === void 0 ? void 0 : leavingItem.hoverAmount) !== null && _leavingItem$hoverAmo !== void 0 ? _leavingItem$hoverAmo : 0;
    };
    this.cleanUpLeavingElements = () => {
      this.leavingItems = this.leavingItems.filter(i => i.hoverAmount > 0);
    };
    this.shouldStep = () => {
      const hasLeavingItems = this.leavingItems.length > 0;
      const currentHoveredIsAnimating = this.currentHoveredItem !== undefined && this.currentHoveredItem.hoverAmount < 1;
      return hasLeavingItems || currentHoveredIsAnimating;
    };
    this.getAnimatingItems = () => {
      if (this.currentHoveredItem !== undefined) {
        return [...this.leavingItems, this.currentHoveredItem];
      }
      return this.leavingItems.map(x => ({
        ...x,
        hoverAmount: easeOutCubic(x.hoverAmount)
      }));
    };
    this.step = timestamp => {
      if (this.lastAnimationTime === undefined) {
        this.lastAnimationTime = timestamp;
      } else {
        const step = timestamp - this.lastAnimationTime;
        const delta = step / hoverTime;
        for (const item of this.leavingItems) {
          item.hoverAmount = clamp(item.hoverAmount - delta, 0, 1);
        }
        if (this.currentHoveredItem !== undefined) {
          this.currentHoveredItem.hoverAmount = clamp(this.currentHoveredItem.hoverAmount + delta, 0, 1);
        }
        const animating = this.getAnimatingItems();
        this.callback(animating);
        this.cleanUpLeavingElements();
      }
      if (this.shouldStep()) {
        this.lastAnimationTime = timestamp;
        window.requestAnimationFrame(this.step);
      } else {
        this.lastAnimationTime = undefined;
      }
    };
    this.setHovered = item => {
      var _this$currentHoveredI;
      if (itemsAreEqual((_this$currentHoveredI = this.currentHoveredItem) === null || _this$currentHoveredI === void 0 ? void 0 : _this$currentHoveredI.item, item)) {
        return;
      }
      if (this.currentHoveredItem !== undefined) {
        this.addToLeavingItems(this.currentHoveredItem);
      }
      if (item !== undefined) {
        const hoverAmount = this.removeFromLeavingItems(item);
        this.currentHoveredItem = {
          item,
          hoverAmount
        };
      } else {
        this.currentHoveredItem = undefined;
      }
      if (this.lastAnimationTime === undefined) {
        window.requestAnimationFrame(this.step);
      }
    };
    this.callback = callback;
  }
}
//# sourceMappingURL=animation-manager.js.map