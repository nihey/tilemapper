var Resources = {};

Resources.ImageLoader = class ImageLoader {
  constructor(onFinished) {
    this.resources = {};
    this._pending = 0;
    this.onFinished = onFinished;
  }

  /*
   *  Private API
   */

  _tryInit() {
      this._pending || this.onFinished();
  }

  /*
   *  Public API
   */

  load(name, url) {
    this._pending += 1;
    this.resources[name] = new Image();
    this.resources[name].onload = () => {
      this._pending -= 1;
      this._tryInit();
    };
    this.resources[name].src = url;
  }
};

export default Resources;
