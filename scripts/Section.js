export default class Section {
    constructor ({ items, renderer }, containerSelector) {  
      this._initialCards = items;
      this._renderer = renderer;
      
      this._container = document.querySelector(containerSelector);
    }

    renderItems() {
        this._initialCards.forEach(item => {
            const element = this._renderer(item);
            this._container.append(element);
        });
    }

    addItem(element) {
      this._container.prepend(element);
    }
}