export default class EventManager {
  static emit({ element, eventName, handlerFunc, ...args }) {
    element.addEventListener(eventName, handlerFunc, args);
  }
  static dispatch(eventName, data = null) {
    const event = data ? new CustomEvent(eventName, { detail: data }) : new Event(eventName);
    console.log("dispatching:", event.type);
    window.dispatchEvent(event);
  }
}