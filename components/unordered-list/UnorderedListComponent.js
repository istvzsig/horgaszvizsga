import HTMLElement from '../HTMLElement.js';
import EventManager from '../../EventManager.js';
import ListItemComponent from './ListItemComponent.js';
import { SET_ANSWER, SET_STYLE } from '../../config.js';


export default class UnOrderedListComponent extends HTMLElement {
  constructor() {
    super('ul', 'answer-options');
    this.activeItem = null;
    this.items = [];

    this.activeStyle = {
      transparent: "rgba(0, 0, 0, 0)",
      backgroundColor: "rgba(0, 0, 0, 50%)",
    }

  }
  handleActiveItem(item) {
    console.log(this.activeItem === item)
    if (this.activeItem === item) {
      this.activeItem.style.backgroundColor = 'yellow'
    }
  }
  setActiveItem(item) {
    this.activeItem = item;
  }
  createList(question) {
    const itemList = [];

    question.options.forEach((option, index) => {
      const newListItemComponent = new ListItemComponent({
        text: option,
        eventType: SET_ANSWER,
        index: index,
      });

      newListItemComponent.render(this);

      EventManager.createEventListener({
        element: window,
        eventType: SET_STYLE,
        handlerFunc: (event) => newListItemComponent.changeStyle(event, this.activeStyle)
      });
    });
  }
}