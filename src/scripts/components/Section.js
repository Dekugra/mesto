export class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {
    items.forEach(this._renderer);
  }

  addItem(place, element) {
    if (place == 'append') this._container.append(element);
    else this._container.prepend(element);
  }
}
