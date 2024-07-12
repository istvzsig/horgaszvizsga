import HTMLElement from './components/HTMLElement.js';
import EventManager from '../../EventManager.js';

export default class Button extends HTMLElement {
  constructor({ text = "", eventType = "", isDisabled = false }) {
    super('button', 'btn')
    this.changeText(text);
    this.eventType = eventType;
    this.element.disabled = isDisabled;
    this.element.addEventListener('mousedown', this.handleMouseDown.bind(this));
    this.element.addEventListener('mouseup', this.handleMouseUp.bind(this));
  }
  setIsDisabled(value) {
    this.element.disabled = value;
  }
  handleMouseDown(event) {
    event.preventDefault();
    EventManager.dispatchEvent({ eventType: this.eventType });
  }
  handleMouseUp(event) {
    event.preventDefault();

  }
}