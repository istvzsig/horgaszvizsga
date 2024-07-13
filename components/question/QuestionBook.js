import QUESTIONS from './questions.js';
import QuestionComponent from "./QuestionComponent.js";

export default class QuestionBook {
  static questions = QUESTIONS || [];

  static addQuestion(question) {
    this.questions = [...this.questions, question];
  }
  static getRandomQuestion() {
    const randomIndex = Math.random() * this.questions.length - 1 | 0;
    return this.questions[randomIndex];
  }
  static getQuestionById(id) {
    return this.questions.find(question => question.id === id);
  }
  static saveQuestionForPlayer(question, player) {
    // player.questions
  }
  static deleteQuestionById(id) {
    this.questions = this.questions.filter(question => question.id !== id);
  }
}