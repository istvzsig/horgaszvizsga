export default class EventManager {
  static addEvent({ element, eventType, handlerFunc, ...args }) {
    element.addEventListener(eventType, handlerFunc, args);
  }
  static removeEvent() {

  }
  static dispatchEvent({ eventType, data = null }) {
    console.log("dispatchEvent:", eventType);
    window.dispatchEvent(data
      ? new CustomEvent(eventType, { detail: data })
      : new Event(eventType));
  }
}