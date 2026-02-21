import * as React from "react";
export default class ClickOutsideContainer extends React.PureComponent {
  constructor() {
    super(...arguments);
    this.wrapperRef = React.createRef();
    this.clickOutside = event => {
      if (this.props.isOutsideClick && !this.props.isOutsideClick(event)) {
        return;
      }
      if (this.wrapperRef.current !== null && !this.wrapperRef.current.contains(event.target)) {
        let node = event.target;
        while (node !== null) {
          if (node.classList.contains("click-outside-ignore")) {
            return;
          }
          node = node.parentElement;
        }
        this.props.onClickOutside();
      }
    };
  }
  componentDidMount() {
    var _this$props$customEve;
    const eventTarget = (_this$props$customEve = this.props.customEventTarget) !== null && _this$props$customEve !== void 0 ? _this$props$customEve : document;
    eventTarget.addEventListener("pointerdown", this.clickOutside, true);
    eventTarget.addEventListener("contextmenu", this.clickOutside, true);
  }
  componentWillUnmount() {
    var _this$props$customEve2;
    const eventTarget = (_this$props$customEve2 = this.props.customEventTarget) !== null && _this$props$customEve2 !== void 0 ? _this$props$customEve2 : document;
    eventTarget.removeEventListener("pointerdown", this.clickOutside, true);
    eventTarget.removeEventListener("contextmenu", this.clickOutside, true);
  }
  render() {
    const {
      onClickOutside,
      isOutsideClick,
      customEventTarget,
      ...rest
    } = this.props;
    return React.createElement("div", {
      ...rest,
      ref: this.wrapperRef
    }, this.props.children);
  }
}
//# sourceMappingURL=click-outside-container.js.map