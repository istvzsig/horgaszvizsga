export default class EventManager {
  static createEvent({ element, eventName, handlerFunc, ...args }) {
    element.addEventListener(eventName, handlerFunc, args);
  }
  static dispatchCustomEvent(eventName, data = {}) {
    // console.log("dispatchEvent:", eventName);
    // console.log("data:", data);
    window.dispatchEvent(new CustomEvent(eventName, {
      detail: data
    }))
  }
  static dispatchEvent(eventName) {
    // console.log("dispatchEvent:", eventName);
    window.dispatchEvent(new Event(eventName));
  }
}