import HTMLElement from './HTMLElement.js';
import EventManager from '../../EventManager.js';

export default class Button extends HTMLElement {
  constructor({ text = "", eventType = "", data = null, isDisabled = false }) {
    super('button', 'btn')
    this.changeText(text);
    this.eventType = eventType;
    this.data = data;
    this.element.disabled = isDisabled;
    this.element.addEventListener('mousedown', this.handleMouseDown.bind(this));
    this.element.addEventListener('mouseup', this.handleMouseUp.bind(this));
  }
  setIsDisabled(value) {
    this.element.disabled = value;
  }
  handleMouseDown(event) {
    event.preventDefault();
    EventManager.dispatchEvent({
      eventType: this.eventType,
      data: this.data
    });
  }
  handleMouseUp(event) {
    event.preventDefault();

  }
}