//code from http://www.datchley.name/es6-eventemitter/

class Event {

  constructor() {
    this.listeners = new Map();
  }

  on(label, callback) {
    this.listeners.has(label) || this.listeners.set(label, []);
    this.listeners.get(label).push(callback);
  }

  remove(label, callback) {
    let listeners = this.listeners.get(label),
        index;

    if (listeners && listeners.length) {
      index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
        return true;
      }
    }
    return false;
  }

  clear() {
    this.listeners.clear();
  }

  emit(label, ...args) {
    let listeners = this.listeners.get(label);
    if (listeners && listeners.length) {
      listeners.forEach(listener => {
        listener(...args);
      });
      return true;
    }
    return false;
  }

}

export default Event;