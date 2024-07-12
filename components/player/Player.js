import { SET_ANSWER, SUBMIT_ANSWER, SAVE_QUESTION } from '../../config.js';
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
    EventManager.addEvent({
      element: window,
      eventType: SET_ANSWER,
      handlerFunc: (event) => {
        this.setAnswerValue(event.detail.answerValue);
      }
    });
  }
  addSubmitAnswerEvent() {
    EventManager.addEvent({
      element: window,
      eventType: SUBMIT_ANSWER,
      handlerFunc: (event) => {
        if (this.answerValue) {
          this.questions = [...this.questions, {
            question: this.question,
            isCorrectlyAnswered:
              this.answerValue === this.question.correctAnswerId,
          }];
          console.log("kabare'")
        }
      },
    });
  }
  addSaveQuestionEvent() {
    EventManager.addEvent({
      element: window,
      eventType: SAVE_QUESTION,
      handleFunc: () => {
        this.savedQuestions = [...this.savedQuestion, { ...this.question, savedAnswer: this.answerValue }];
        console.log("addSaveQuestionEvent");
      }
    })
  }
}
