export class Emitter {
  constructor() {
    this.listeners = {};
  }

  //  dispatch, fire, trigger
  //  Уведомляем слушателей, если они есть
  //  table.subscribe('table:select', {a: 1})
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false;
    }
    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
    return true;
  }

  //  on, listen
  //  Подписываемся на уведомление
  //  Добавляем нового слушателя
  //  formula.subscribe('table:select', () => {})
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);

    //  очистка памяти
    return () => {
      this.listeners[event] = this.listeners[event].filter(
        (listener) => listener !== fn
      );
    };
  }
}

// Example
// const emitter = new Emitter();

// emitter.subscribe("alex", (data) => console.log("Sub:", data));
// emitter.emit("alex", 44);

// setTimeout(() => {
//     emitter.emit("alex", 'After 2 second');
// }, 2000);

// setTimeout(() => {
//     unsub()
// }, 3000);

// setTimeout(() => {
//     emitter.emit("alex", 'After 4 second');
// }, 4000);
