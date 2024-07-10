import { SET_ANSWER, SUBMIT_ANSWER } from '../../config.js';
import EventManager from '../../EventManager.js';

export default class Player {
  constructor(name = "") {
    this.name = name;
    this.question = null;
    this.questions = [];
    this.answerValue = undefined;
  }
  setAnswerValue(value) {
    EventManager.emit({
      element: window,
      eventName: SET_ANSWER,
      handlerFunc: (event) => {
        event.stopImmediatePropagation();
        this.answerValue = Number(event.detail.answerValue);
        console.log("answer value:", this.answerValue)
      },
    });
  }
  setQuestionAnswer() {
    EventManager.emit({
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
}
