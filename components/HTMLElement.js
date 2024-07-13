export default class HTMLElement {
  constructor(type, classname) {
    this.type = type;
    this.element = document.createElement(this.type);
    this.element.className = classname;
  }
  changeText(text) {
    this.element.innerText = text;
  }
  changeStyle({ property, value }) {
    this.element.style[property] = value;
  }
  render(parentComponent) {
    parentComponent.element.append(this.element);
  }
}