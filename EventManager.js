export default class EventManager {
  static createEventListener({ element, eventType, handlerFunc, ...args }) {
    element.addEventListener(eventType, handlerFunc, args);
  }
  static removeEvent() {

  }
  static dispatchEvent({ eventType, data = null }) {
    // console.log({ eventType, data })
    window.dispatchEvent(data
      ? new CustomEvent(eventType, { detail: data })
      : new Event(eventType));
  }
}