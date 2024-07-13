import HTMLElement from './components/HTMLElement.js';
import Player from './components/player/Player.js';
import QuestionBook from './components/question/QuestionBook.js';
import QuestionComponent from './components/question/QuestionComponent.js';

export default class App {
  constructor() {
    this.app = new HTMLElement('div', this.constructor.name);
    const randomQuestion = QuestionBook.getRandomQuestion();
    this.player = new Player("Silent Bob", randomQuestion);
    this.questionComponent = new QuestionComponent(randomQuestion);
  }
  start() {
    document.body.append(this.app.element);
    this.questionComponent.render(this.app);
    this.update();
  }
  update() {
    if (this.player.getAnswerValue() !== undefined) {
      this.questionComponent.update(this.player);
    }
    window.requestAnimationFrame(this.update.bind(this));
  }
}