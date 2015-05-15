export default class World {
  constructor() {
    // Object that will hold loaded images
    this.images = {};

    // Provides image loading functionalities
    this.image = {pending: 0};
    this.image.load = (name, url) => {
      this.image.pending += 1;
      this.images[name] = new Image();
      this.images[name].onload = function() {
        this.image.pending -= 1;
      }.bind(this);
      this.images[name].src = url;
    };
  }
}
