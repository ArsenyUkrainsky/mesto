// отвечает за отрисовку элементов на странице
export class Section {
  constructor({ renderer }, containerSelector) {
    this._container = containerSelector
    this._renderer = renderer
  }
  renderItems(item) {
    item.forEach((item) => {
      this._renderer(item)
    })
  }
  addItem(element) {
    this._container.append(element)
  }
  addNewItem(element) {
    this._container.prepend(element)
  }
}
