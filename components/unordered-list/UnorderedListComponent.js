import HTMLElement from '../HTMLElement.js';
import EventManager from '../../EventManager.js';
import { SET_ANSWER } from '../../config.js';

export default class UnorderedListComponent extends HTMLElement {
  constructor(item) {
    super('ul', 'answer-options');
    this.list = [];
  }
  createList(item, showCorrect = false) {
    item.options.forEach((option, index) => {
      const li = new ListItemComponent({
        text: option,
        eventName: SET_ANSWER,
        index: index,
      });
      li.render(this);
    });
  }
}

class ListItemComponent extends HTMLElement {
  constructor({ text = "", eventName = "", index = null }) {
    super('li', 'answer-options-item');
    this.eventName = eventName;
    this.attributeName = 'option-index';
    this.addText(text);
    this.element.setAttribute(this.attributeName, index);
    this.element.addEventListener('mousedown', this.handleMouseDown.bind(this));
    this.element.addEventListener('mouseup', this.handleMouseUp.bind(this));
  }
  setStyle(style = { property, value }) {
    this.element.style[property] = value;
  }
  handleMouseDown(event) {
    event.preventDefault();
    EventManager.dispatchCustomEvent(
      this.eventName,
      { answerValue: this.element.getAttribute(this.attributeName) }
    );
  }
  handleMouseUp(event) {
    event.preventDefault();
  }
}
