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
  canvas.width = $('#tileset').width();
  canvas.height = $('#tileset').height();
});
