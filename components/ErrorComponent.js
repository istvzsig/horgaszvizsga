import HTMLElement from './HTMLElement.js';

export default class ErrorComponent extends HTMLElement {
  constructor(text) {
    super('h1', 'error-text')
    this.text = text;
  }
}