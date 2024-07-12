import HTMLElement from '../HTMLElement.js';
import UnOrderedListComponent from '../unordered-list/UnOrderedListComponent.js';
import QuestionsList from './QuestionsList.js';
import Button from '../../Button.js';
import EventManager from '../../EventManager.js';
import ErrorComponent from '../ErrorComponent.js';

import { SET_ANSWER, SUBMIT_ANSWER, SAVE_QUESTION } from '../../config.js';

export default class QuestionComponent extends HTMLElement {
  constructor() {
    super('div', 'question');
    this.question = this.getRandomQuestion();
    this.h1 = new HTMLElement('h1', 'question-title');
    this.ul = new UnOrderedListComponent();
    this.errorComponent = new ErrorComponent();

    this.submitAnswerButton = new Button({
      text: "Submit Answer",
      eventName: SUBMIT_ANSWER,
      isDisabled: true,
    });

    this.saveQuestionButton = new Button({
      text: "Save for later",
      eventName: SAVE_QUESTION,
      isDisabled: false,
    });
  }
  getRandomQuestion() {
    return QuestionsList.getRandomQuestion();
  }
  render(parentComponent) {
    const newQuestionComponent = new QuestionComponent();
    const newRandomQuestion = this.getRandomQuestion();
    newQuestionComponent.h1.changeText(`${newRandomQuestion.id}. ${newRandomQuestion.question}`);
    newQuestionComponent.ul.createList(newRandomQuestion, true);
    [
      newQuestionComponent.h1,
      newQuestionComponent.ul,
      this.saveQuestionButton,
      this.submitAnswerButton
    ]
      .forEach(element => element.render(newQuestionComponent));

    this.errorComponent.changeText("Please select one of the")
    this.errorComponent.render(newQuestionComponent);
    if (parentComponent.element.children.length > 0) {
      return parentComponent.element.firstChild.replaceWith(newQuestionComponent.element)
    }
    return parentComponent.element.append(newQuestionComponent.element)
  }
}