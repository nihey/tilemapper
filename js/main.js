// XXX This code needs heavy refactoring

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
    var elapsed = this.timer.getElapsed() / 1000;

    if (this.x >= (this.canvas.width / 2)) {
      this.offset.x -= this.speedX * elapsed;
    }
    else {
      this.x += this.speedX * elapsed;
    }
    if (this.y >= (this.canvas.height / 2)) {
      this.offset.y -= this.speedY * elapsed;
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

  entity.canvas = canvas;
  entity.context = canvas.getContext('2d');

  var tileMap = new TileMap({
    canvas: canvas,
    images: [document.getElementById('tileset')],
    map: window.Map,
    entities: [entity],
  });

  setInterval(function() {
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    tileMap.draw(entity.offset.x, entity.offset.y);
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
});
