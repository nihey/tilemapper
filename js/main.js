$(document).ready(function() {
  var canvas = document.getElementById('canvas');
  canvas.width = Map.width * Map.tilewidth;
  canvas.height = Map.height * Map.tileheight;
  var tileMap = new TileMap({
    canvas: canvas,
    images: [document.getElementById('tileset')],
    map: window.Map,
  });
  tileMap.draw(0, 0);
});
