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
      const li = new ListItemComponent({ option, index });
      // this.list.push(li.element);
      // EventManager.emit({
      //   element: li.element,
      //   eventName: "",
      //   handlerFunc: () => li.changeColor(),
      // })
      li.render(this);
      li.handleMouseDown();
    });
  }
}

class ListItemComponent extends HTMLElement {
  constructor({ option, index }) {
    super('li', 'answer-options-item');
    this.attributeName = 'anwser-option-index';
    this.element.innerText = option;
    this.element.setAttribute(this.attributeName, index);

  }
  changeColor(color = 'red') {
    this.element.style.backgroundColor = color;
  }
  handleMouseDown() {
    this.element.addEventListener('mousedown', event => {
      event.preventDefault();
      const data = {
        detail: { answerValue: event.target.getAttribute(this.attributeName) }
      };
      window.dispatchEvent(new CustomEvent(SET_ANSWER, data))
      window.dispatchEvent(new Event('changecolor'));
    });
  }
}
