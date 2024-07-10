import HTMLElement from './components/HTMLElement.js';
import EventManager from '../../EventManager.js';

export default class Button extends HTMLElement {
  constructor({ text = "", eventName = "", isDisabled = false }) {
    super('button', 'btn')
    this.addText(text);
    this.eventName = eventName;
    this.element.disabled = isDisabled;
    this.element.addEventListener('mousedown', this.handleMouseDown.bind(this));
    this.element.addEventListener('mouseup', this.handleMouseUp.bind(this));
  }
  setDisabled(value) {
    this.element.disabled = value;
  }
  handleMouseDown(event) {
    event.preventDefault();
    EventManager.dispatch(this.eventName);
  }
  handleMouseUp(event) {
    event.preventDefault();
  }
}