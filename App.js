import HTMLElement from './components/HTMLElement.js';
import Player from './components/player/Player.js';
import QuestionComponent from "./components/question/QuestionComponent.js";

export default class App {
  constructor() {
    this.app = new HTMLElement('div', this.constructor.name);
    this.player = new Player();
    this.questionComponent = new QuestionComponent();
  }
  update() {
    if (this.player.answerValue !== undefined) {
      this.questionComponent.submitAnswerButton.setIsDisabled(false);
      this.questionComponent.errorComponent.changeText("You choose: " + this.player.answerValue)
    }
    window.requestAnimationFrame(this.update.bind(this));
  }
  start() {
    document.body.append(this.app.element);
    this.player.addAnswerValueEvent();
    this.player.saveQuestion();
    this.questionComponent.render(this.app);

    this.update();
  }
}