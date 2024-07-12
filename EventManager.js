export default class EventManager {
  static createEvent({ element, eventName, handlerFunc, ...args }) {
    element.addEventListener(eventName, handlerFunc, args);
  }
  static dispatchEvent({ eventName, data = null }) {
    // console.log("dispatchEvent:", eventName);
    window.dispatchEvent(data
      ? new CustomEvent(eventName, { detail: data })
      : new Event(eventName));
  }
}