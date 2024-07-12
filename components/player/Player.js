import { SAVE_QUESTION, SET_ANSWER, SUBMIT_ANSWER } from '../../config.js';
import EventManager from '../../EventManager.js';

export default class Player {
  constructor(name = "") {
    this.name = name;
    this.question = null;
    this.questions = [];
    this.savedQuestions = [];
    this.setAnswerValue(undefined);
  }
  setAnswerValue(value) {
    this.answerValue = value;
  }
  getAnswerValue() {
    return this.answerValue;
  }
  addAnswerValueEvent() {
    EventManager.createEvent({
      element: window,
      eventName: SET_ANSWER,
      handlerFunc: (event) => {
        this.setAnswerValue(event.detail.answerValue);
      }
    });
  }
  addSubmitAnswerEvent() {
    EventManager.createEvent({
      element: window,
      eventName: SUBMIT_ANSWER,
      handlerFunc: () => {
        if (this.answerValue) {
          this.questions = [...this.questions, {
            question: this.question,
            isCorrectlyAnswered:
              this.answerValue === this.question.correctAnswerId,
          }];
        }
      },
    });
  }
  addSaveQuestionEvent() {
    EventManager.createEvent({
      element: window,
      eventName: SAVE_QUESTION,
      handleFunc: () => {
        this.savedQuestions = [...this.savedQuestion, { ...this.question, savedAnswer: this.answerValue }];
        console.log("addSaveQuestionEvent");
      }
    })
  }
}
