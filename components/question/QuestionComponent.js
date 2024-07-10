import HTMLElement from '../HTMLElement.js';
import UnorderedListComponent from '../unordered-list/UnorderedListComponent.js';
import QuestionsList from './QuestionsList.js';
import Button from '../../Button.js';
import EventManager from '../../EventManager.js';

import { SET_ANSWER, SUBMIT_ANSWER, SAVE_QUESTION } from '../../config.js';

export default class QuestionComponent extends HTMLElement {
  constructor() {
    super('div', 'question');
    this.question = this.getRandomQuestion();
    this.h1 = new HTMLElement('h1', 'question-title');
    this.ul = new UnorderedListComponent();

    this.submitAnswerButton = new Button({
      text: "SUBMIT ANSWER",
      eventName: SUBMIT_ANSWER,
      isDisabled: true,
    });

    this.nextQuestionButton = new Button({
      text: "SAVE_QUESTION",
      eventName: SAVE_QUESTION,
      isDisabled: false,
    });
  }
  getRandomQuestion() {
    return QuestionsList.getRandomQuestion();
  }
  render(parentComponent) {
    const newQuestionComponent = new QuestionComponent();
    const newRandomQuestion = this.getRandomQuestion()
    newQuestionComponent.h1.addText(`${newRandomQuestion.id}. ${newRandomQuestion.question}`);
    newQuestionComponent.ul.createList(newRandomQuestion, true);

    [
      newQuestionComponent.h1,
      newQuestionComponent.ul,
      this.nextQuestionButton,
      this.submitAnswerButton
    ]
      .forEach(element => element.render(newQuestionComponent));

    if (parentComponent.element.children.length > 0) {
      return parentComponent.element.firstChild.replaceWith(newQuestionComponent.element)
    }
    return parentComponent.element.append(newQuestionComponent.element)
  }
}