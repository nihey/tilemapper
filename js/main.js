var entity = {
  x: 100,
  y: 100,
  speedX: 0,
  speedY: 0,
  draw: function() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.context.fillRect(this.x, this.y, 32, 32);
  },
  getZIndex: function() {
    return this.y + 32;
  },
}


$(document).ready(function() {
  var canvas = document.getElementById('canvas');
  canvas.width = Map.width * Map.tilewidth;
  canvas.height = Map.height * Map.tileheight;

  entity.context = canvas.getContext('2d');

  var tileMap = new TileMap({
    canvas: canvas,
    images: [document.getElementById('tileset')],
    map: window.Map,
    entities: [entity],
  });

  setInterval(function() {
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    tileMap.draw(0, 0);
  }, 50);

  // Setup entity movement interactivity
  $(document).keydown(function(event) {
    var speed = 1;
    switch(event.which) {
      case 38: // Up
        entity.speedY += -speed;
      break;
      case 37: // Left
        entity.speedX += -speed;
      break;
      case 40: // Down
        entity.speedY += speed;
      break;
      case 39: // Right
        entity.speedX += speed;
      break;
    }
  });
});
