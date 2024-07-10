import ErrorComponent from './components/ErrorComponent.js';
import HTMLElement from './components/HTMLElement.js';
import Player from './components/player/Player.js';
import EventManager from './EventManager.js';
import QuestionComponent from "./components/question/QuestionComponent.js";
import QuestionsList from './components/question/QuestionsList.js';
import Button from './Button.js';
import { SET_ANSWER, SUBMIT_ANSWER, SAVE_QUESTION } from './config.js';

export default class App {
  constructor() {
    this.app = new HTMLElement('div', this.constructor.name);
    this.player = new Player();
    this.errorTextComponent = new ErrorComponent();
    this.questionComponent = new QuestionComponent();

    EventManager.emit({
      element: window,
      eventName: SAVE_QUESTION,
      handlerFunc: () => this.renderRandomQuestion(),
    })
  }
  renderRandomQuestion() {
    this.player.setAnswerValue(undefined);
    // this.player.setQuestionAnswer(this.randomQuestion);
    this.errorTextComponent.addText("XXX");
    this.questionComponent.render(this.app);
  }
  update() {
    if (this.player.answerValue !== undefined) {
      // this.submitAnswerButton.setDisabled(false);
    }
    window.requestAnimationFrame(this.update.bind(this));
  }
  start() {
    this.renderRandomQuestion();
    this.update();
    document.body.append(this.app.element);

  }
}