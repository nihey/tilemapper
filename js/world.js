export default class World {
  constructor(options) {
    this.load = options.load;
    this.init = options.init;

    // Object that will hold loaded images
    this.images = {};

    // Provides image loading functionalities
    this.image = {pending: 0};
    this.image.load = (name, url) => {
      this.image.pending += 1;
      this.images[name] = new Image();
      this.images[name].onload = () => {
        this.image.pending -= 1;
        this.tryInit();
      };
      this.images[name].src = url;
    };

    this.load();
    this.tryInit();
  }

  tryInit() {
    this.image.pending || this.init();
  }
}
