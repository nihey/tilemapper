// XXX This code needs heavy refactoring

import TileMap from 'tilemapper';
import Map from 'map';
import World from 'world';


function Timer() {
  this.time = new Date();
}

Timer.prototype.getElapsed = function() {
  return new Date().getTime() - this.time.getTime();
}

Timer.prototype.reset = function() {
  this.time = new Date();
}

var entity = {
  offset: {
    x: 0,
    y: 0,
  },
  x: 100,
  y: 100,
  speedX: 0,
  speedY: 0,
  timer: new Timer(),
  draw: function() {
    // XXX This code needs heavy refactoring
    var elapsed = this.timer.getElapsed() / 1000;

    // calculate the real character coordinates on the grid
    var realX = this.x - this.offset.x + 16;
    var realY = this.y - this.offset.y + 16;

    // If x coordinate is beyond viewport.width / 2 and before (Map.width
    // - viewport.width / 2) Global offset should be changed, instead of local
    // x
    //
    // Example: area inside x will have global offset changed
    //
    // #---------------###############################
    // |      x        |                       x     #
    // |      x        |                       x     #
    // |      x        |                       x     #
    // |      x        |                       x     #
    // #------x--------                        x     #
    // #      x                                x     #
    // #      x                                x     #
    // #      x                                x     #
    // #      x                                x     #
    // #      x                                x     #
    // #      x                                x     #
    // #      x                                x     #
    // #      x                                x     #
    // #      x                                x     #
    // ###############################################
    //
    // Offset checks are useful to avoid the area inside x be dislocated
    if (realX >= (this.canvas.width / 2) &&
        (realX <= (Map.width * Map.tilewidth - (this.canvas.width / 2))) &&
        (this.offset.x <= 0) &&
        (this.offset.x >= (-Map.width * Map.tilewidth + this.canvas.width))) {
      this.offset.x -= this.speedX * elapsed;
      if (this.offset.x > 0) {
        this.x += this.speedX * elapsed;
        this.offset.x = 0;
      }
      if (this.offset.x < (-Map.width * Map.tilewidth + this.canvas.width)) {
        this.x += this.speedX * elapsed;
        this.offset.x = -Map.width * Map.tilewidth + this.canvas.width;
      }
    }
    else {
      this.x += this.speedX * elapsed;
    }

    // This checks are the same for the analogous version for y coordinate
    if (realY >= (this.canvas.height / 2) &&
        (realY <= (Map.height * Map.tileheight - (this.canvas.height / 2))) &&
        (this.offset.y <= 0) &&
        (this.offset.y >= (-Map.height * Map.tileheight + this.canvas.height))) {
      this.offset.y -= this.speedY * elapsed;
      if (this.offset.y > 0) {
        this.y += this.speedY * elapsed;
        this.offset.y = 0;
      }
      if (this.offset.y < (-Map.height * Map.tileheight + this.canvas.height)) {
        this.y += this.speedY * elapsed;
        this.offset.y = -Map.height * Map.tileheight + this.canvas.height;
      }
    }
    else {
      this.y += this.speedY * elapsed;
    }
    this.context.fillRect(this.x, this.y, 32, 32);
    this.timer.reset();
  },
  getZIndex: function() {
    return this.y + 32;
  },
}

$(document).ready(function() {
  var canvas = document.getElementById('canvas');
  canvas.width = 600;
  canvas.height = 600;

  var tileMap;

  var world = new World({
    load: function() {
      this.image.load('tiles', 'img/tiles.jpg');
      this.image.load('tree', 'img/tree.png');
    },
    init: function() {
      entity.canvas = canvas;
      entity.context = canvas.getContext('2d');

      tileMap = new TileMap({
        canvas: canvas,
        images: [this.images['tiles']],
        map: Map,
        entities: [entity],
      });

      setInterval(function() {
      }, 50);

      // Setup entity movement interactivity
      $(document).keydown(function(event) {
        var speed = 140;
        switch(event.which) {
          case 38: // Up
            entity.speedY = -speed;
          break;
          case 37: // Left
            entity.speedX = -speed;
          break;
          case 40: // Down
            entity.speedY = speed;
          break;
          case 39: // Right
            entity.speedX = speed;
          break;
        }
      });
      $(document).keyup(function(event) {
        if ($.inArray(event.which, [37, 39]) !== -1) {
          entity.speedX = 0;
        }
        if ($.inArray(event.which, [38, 40]) !== -1) {
          entity.speedY = 0;
        }
      });
    },
    loop: function() {
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
      tileMap.draw(entity.offset.x, entity.offset.y);
    }
  });
});
