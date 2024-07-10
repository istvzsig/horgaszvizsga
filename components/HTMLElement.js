export default class HTMLElement {
  constructor(type, classname) {
    this.type = type;
    this.element = document.createElement(this.type);
    this.element.className = classname;
  }
  addText(text) {
    this.element.innerText = text;
  }
  render(parentComponent) {
    parentComponent.element.append(this.element);
  }
}