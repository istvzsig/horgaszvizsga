import { SET_ANSWER, SUBMIT_ANSWER, SAVE_QUESTION } from '../../config.js';
import EventManager from '../../EventManager.js';

export default class Player {
  constructor(name = "N00b", question) {
    this.name = name;
    this.question = question
    this.correctAnswers = [];
    this.savedQuestions = [];
    this.answerValue = undefined;

    EventManager.createEventListener({
      element: window,
      eventType: SET_ANSWER,
      handlerFunc: (event) => {
        this.setAnswerValue(Number(event.detail.answerValue));
      }
    });

    EventManager.createEventListener({
      element: window,
      eventType: SAVE_QUESTION,
      handlerFunc: () => this.save(),
    });

    EventManager.createEventListener({
      element: window,
      eventType: SUBMIT_ANSWER,
      handlerFunc: () => {
        if (this.answerValue === this.question.correctAnswerId) {
          this.correctAnswers.push(this.question);
          this.save();
        }
      },
    });
  }
  save() {
    window.localStorage.setItem('playerSave', JSON.stringify({
      savedQuestions: { ...this.savedQuestions },
      submittedQuestions: { ...this.submittedQuestions },
    }));
  }
  setAnswerValue(value) {
    this.answerValue = value;
  }
  getAnswerValue() {
    return this.answerValue;
  }
}
