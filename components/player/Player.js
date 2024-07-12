import { SAVE_QUESTION, SET_ANSWER, SUBMIT_ANSWER } from '../../config.js';
import EventManager from '../../EventManager.js';

export default class Player {
  constructor(name = "") {
    this.name = name;
    this.question = null;
    this.questions = [];
    this.skippedQuestions = [];
    this.answerValue = undefined;
  }
  setAnswerValue(value) {
    this.answerValue = value;
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
  submitAnswer() {
    EventManager.createEvent({
      element: window,
      eventName: SUBMIT_ANSWER,
      handlerFunc: () => {
        if (this.answerValue) {
          this.questions.push({
            question: this.question,
            isCorrectlyAnswered:
              this.answerValue === this.question.correctAnswerId,
          });
        }
      },
    });
  }
  saveQuestion() {
    EventManager.createEvent({
      element: window,
      eventName: SAVE_QUESTION,
      handleFunc: () => console.log(SAVE_QUESTION)
    })
  }
}
