import World from 'world';

export default class extends World {
  load() {
    // This is where you should load all your resources
    this.loaders.image('tree', 'img/tree.png');
  }

  start() {
    // This is a initial oportunity to set things up before looping
  }

  update() {
    // This is where the application will run its main loop
  }
};
