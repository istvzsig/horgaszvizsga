import HTMLElement from '../HTMLElement.js';
import EventManager from '../../EventManager.js';
import { SET_ANSWER } from '../../config.js';



export default class UnOrderedListComponent extends HTMLElement {
  constructor() {
    super('ul', 'answer-options');
    this.list = [];
  }
  createList(item, showCorrect = false) {
    item.options.forEach((option, index) => {
      const li = new ListItemComponent({
        text: option,
        eventType: SET_ANSWER,
        index: index,
      });
      li.render(this);
      li.setStyle();
    });
  }
}

class ListItemComponent extends HTMLElement {
  constructor({ text = "", eventType = "", index = null }) {
    const optionIndex = index === 0 ? "A" : index === 1 ? "B" : "C"
    super('li', 'answer-options-item');
    this.eventType = eventType;
    this.attributeName = 'option-index';
    this.changeText(`${optionIndex}: ${text}`);
    this.element.setAttribute(this.attributeName, optionIndex);
    this.element.addEventListener('mousedown', this.handleMouseDown.bind(this));
    this.element.addEventListener('mouseup', this.handleMouseUp.bind(this));
    this.isActive = false;
  }
  setStyle() {
    if (this.isActive) {
      this.element.style.backgroundColor = 'red';
    }
  }
  handleMouseDown(event) {
    event.preventDefault();
    this.isActive = true;
    EventManager.dispatchEvent({
      eventType: this.eventType,
      data: { answerValue: this.element.getAttribute(this.attributeName) }
    });
  }
  handleMouseUp(event) {
    event.preventDefault();
    // this.setStyle();
  }
}
