import {ImageLoader} from 'loaders';

export default class World {
  constructor(options) {
    this._loadersObjects = {};
    this.loaders = {};
    this.resources = {};

    this._addLoader('image', new ImageLoader(this.run.bind(this)));
    this.load();
  }

  _addLoader(name, loader) {
    this._loadersObjects[name] = loader;
    this.loaders[name] = loader.load.bind(loader);
    this.resources[name] = loader.resources;
  }

  run() {
    this.start();
    setInterval(this.update, 50);
  }
};
