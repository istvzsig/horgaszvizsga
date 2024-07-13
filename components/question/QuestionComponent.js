import HTMLElement from '../HTMLElement.js';
import UnOrderedListComponent from '../unordered-list/UnOrderedListComponent.js';
import QuestionBook from './QuestionBook.js';
import EventButton from '../Button.js';
import EventManager from '../../EventManager.js';
import ErrorComponent from '../ErrorComponent.js';
import { SET_ANSWER, SUBMIT_ANSWER, SAVE_QUESTION } from '../../config.js';

export default class QuestionComponent extends HTMLElement {
  constructor(question) {
    super('div', 'question');
    this.question = question;
    this.errorComponent = new ErrorComponent();
    this.h1 = new HTMLElement('h1', 'question-title');
    this.ul = new UnOrderedListComponent(question);

    this.submitAnswerButton = new EventButton({
      text: "Submit Answer",
      eventType: SUBMIT_ANSWER,
      isDisabled: true,
      data: this.question,
    });

    this.saveQuestionButton = new EventButton({
      text: "Save for later",
      eventType: SAVE_QUESTION,
      isDisabled: false,
      data: this.question,
    });
  }
  getRandomQuestion() {
    return QuestionBook.getRandomQuestion();
  }
  render(parentComponent) {
    this.h1.changeText(`${this.question.id}. ${this.question.question}`);
    this.ul.createList(this.question, true);
    [
      this.h1,
      this.ul,
      this.saveQuestionButton,
      this.submitAnswerButton
    ]
      .forEach(element => element.render(this));

    this.errorComponent.changeText("Please select one of the");
    this.errorComponent.render(this);

    const element = parentComponent.element;
    if (element.children.length > 0) {
      return element.firstChild.replaceWith(this.element);
    }
    return element.append(this.element);
  }
  update(player) {
    if (player.answerValue === undefined) {
      return this.submitAnswerButton.setIsDisabled(true);
    }
    this.errorComponent.changeText(`You choose: ${player.answerValue}`);
    this.submitAnswerButton.setIsDisabled(false);
  }
}