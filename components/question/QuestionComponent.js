import HTMLElement from '../HTMLElement.js';
import UnOrderedListComponent from '../unordered-list/UnOrderedListComponent.js';
import QuestionsList from './QuestionsList.js';
import Button from '../../Button.js';
import EventManager from '../../EventManager.js';
import ErrorComponent from '../ErrorComponent.js';

import { SET_ANSWER, SUBMIT_ANSWER, SAVE_QUESTION } from '../../config.js';

export default class QuestionComponent extends HTMLElement {
  constructor(player) {
    super('div', 'question');
    this.player = player;
    this.h1 = new HTMLElement('h1', 'question-title');
    this.ul = new UnOrderedListComponent();
    this.errorComponent = new ErrorComponent();
    this.question = this.getRandomQuestion();

    this.submitAnswerButton = new Button({
      text: "Submit Answer",
      eventType: SUBMIT_ANSWER,
      isDisabled: true,
    });

    this.saveQuestionButton = new Button({
      text: "Save for later",
      eventType: SAVE_QUESTION,
      isDisabled: false,
    });
  }
  getRandomQuestion() {
    return QuestionsList.getRandomQuestion();
  }
  render(parentComponent) {
    const newQuestionComponent = new QuestionComponent();
    const newRandomQuestion = this.getRandomQuestion();
    newQuestionComponent.h1.changeText(
      `${newRandomQuestion.id}. ${newRandomQuestion.question}`
    );
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

    const element = parentComponent.element;
    if (element.children.length > 0) {
      return element.firstChild.replaceWith(newQuestionComponent.element)
    }
    return element.append(newQuestionComponent.element)
  }
  update() {
    if (!this.player.answerValue) {
      return this.submitAnswerButton.setIsDisabled(true);
    }
    this.errorComponent.changeText(`You choose: ${this.player.answerValue}`);
    this.submitAnswerButton.setIsDisabled(false);
  }
}