function tilesetClip(tileset, number) {
  var index = number - 1;
  var row = Math.floor((index * tileset.tilewidth) / tileset.imagewidth);

  return {
    x: (index * tileset.tilewidth) % tileset.imagewidth,
    y: (row * tileset.tileheight) % tileset.imageheight,
    width: tileset.tilewidth,
    height: tileset.tileheight,
  }
}

$(document).ready(function() {
  var canvas = document.getElementById('canvas');
  var image = document.getElementById('tileset');
  canvas.width = Map.width * Map.tilewidth;
  canvas.height = Map.height * Map.tileheight;

  var context = canvas.getContext('2d');

  var tileset = Map.tilesets[0];
  var layer = Map.layers[0];
  for(var i = 0; i < layer.data.length; i++) {
    var x = i % layer.width;
    var y = Math.floor(i / layer.width);
    var clip = tilesetClip(tileset, layer.data[i]);
    context.drawImage(image, clip.x, clip.y, clip.width, clip.height,
                      x * Map.tilewidth, y * Map.tileheight, Map.tilewidth, Map.tileheight);
  }
});
