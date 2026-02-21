import React from "react";
import { marked } from "marked";
import { MarkdownContainer } from "./private/markdown-container.js";
export default class MarkdownDiv extends React.PureComponent {
  constructor() {
    super(...arguments);
    this.targetElement = null;
    this.containerRefHook = element => {
      this.targetElement = element;
      this.renderMarkdownIntoDiv();
    };
  }
  renderMarkdownIntoDiv() {
    const {
      targetElement,
      props
    } = this;
    if (targetElement === null) return;
    const {
      contents,
      createNode
    } = props;
    const innerHTML = marked(contents);
    const childRange = document.createRange();
    childRange.selectNodeContents(targetElement);
    childRange.deleteContents();
    let newChild = createNode === null || createNode === void 0 ? void 0 : createNode(innerHTML);
    if (newChild === undefined) {
      const childDoc = document.createElement("template");
      childDoc.innerHTML = innerHTML;
      newChild = childDoc.content;
    }
    targetElement.append(newChild);
    const tags = targetElement.getElementsByTagName("a");
    for (const tag of tags) {
      tag.target = "_blank";
      tag.rel = "noreferrer noopener";
    }
  }
  render() {
    this.renderMarkdownIntoDiv();
    return React.createElement(MarkdownContainer, {
      ref: this.containerRefHook
    });
  }
}
//# sourceMappingURL=markdown-div.js.map