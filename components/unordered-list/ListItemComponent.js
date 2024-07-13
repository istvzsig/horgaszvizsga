import HTMLElement from '../HTMLElement.js';
import EventManager from '../../EventManager.js';
import { SET_STYLE } from '../../config.js';

export default class ListItemComponent extends HTMLElement {
  constructor({ text = "", eventType = "", index = null }) {
    super('li', 'answer-options-item');
    this.eventType = eventType;
    this.attributeName = 'option-index';
    this.changeText(`${index}: ${text}`);

    this.element.setAttribute(this.attributeName, index);
    this.element.addEventListener('mousedown', this.handleMouseDown.bind(this));
    this.element.addEventListener('mouseup', this.handleMouseUp.bind(this));
  }
  changeStyle(event, newStyle) {
    if (event.detail.activeItem === this.element) {
      return this.element.style.backgroundColor = newStyle.backgroundColor
    }
    return this.element.style.backgroundColor = newStyle.transparent;
  }
  handleMouseDown(event) {
    event.preventDefault();
    // this.isActive = !this.isActive;

    EventManager.dispatchEvent({
      eventType: SET_STYLE,
      data: { activeItem: this.element }
    });

    EventManager.dispatchEvent({
      eventType: this.eventType,
      data: { answerValue: this.element.getAttribute(this.attributeName) }
    });
  }
  handleMouseUp(event) {
    event.preventDefault();
  }
}
