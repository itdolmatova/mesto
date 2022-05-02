export default class Section {
    constructor ({ items, renderer }, containerSelector) {  
      this._initialElements = items;
      this._renderer = renderer;
      
      this._container = document.querySelector(containerSelector);
    }

    renderItems() {
        this._initialElements.forEach(item => {
            const element = this._renderer(item);
            this._container.append(element);
        });
    }

    addItem(element) {
      this._container.prepend(element);
    }
}