import HTMLElement from './components/HTMLElement.js';
import Player from './components/player/Player.js';
import QuestionComponent from "./components/question/QuestionComponent.js";

export default class App {
  constructor() {
    this.app = new HTMLElement('div', this.constructor.name);
    this.player = new Player("Silent Bob");
    this.questionComponent = new QuestionComponent(this.player);
  }
  update() {
    if (this.player.getAnswerValue() !== undefined) {
      this.questionComponent.update();
    }
    window.requestAnimationFrame(this.update.bind(this));
  }
  start() {
    this.player.addSaveQuestionEvent();
    this.player.addAnswerValueEvent();
    this.questionComponent.render(this.app);
    document.body.append(this.app.element);

    this.update();
  }
}