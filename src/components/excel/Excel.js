export class Excel {
  constructor(selector, options) {
    this.$el = document.querySelector(selector);
    this.components = options.components || [];
  }

  getRoot() {
    const $root = document.createElement("div");

    this.components.forEach((Components) => {
      const component = new Components();
      $root.insertAdjacentHTML("beforeend", component.toHTML());
    });

    return $root;
  }

  render() {
    // afterbegin, afterend, beforeend, beforebegin
    //this.$el.insertAdjacentHTML("afterbegin", `<h1>Test</h1>`);
    // или
    // const node = document.createElement("h1");
    // node.textContent = "test";
    this.$el.append(this.getRoot());
  }
}
