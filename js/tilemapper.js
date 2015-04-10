(function() {
  var TileMap = function(options) {
    this.canvas = options.canvas;
    this.context = this.canvas.getContext('2d');
    this.images = options.images;
    this.map = options.map;

    // Normalize layers to a zero indexed map
    this.map.layers.forEach(function(layer) {
      layer.data.forEach(function(number, index, layer) {
        layer[index] = number - 1;
      });
    });
  }

  TileMap.prototype.clip = function(index) {
    // TODO Generalize for multiple tilesets
    var tileset = this.map.tilesets[0];
    var row = Math.floor((index * tileset.tilewidth) / tileset.imagewidth);

    return {
      image: this.images[0],
      x: (index * tileset.tilewidth) % tileset.imagewidth,
      y: (row * tileset.tileheight) % tileset.imageheight,
      width: tileset.tilewidth,
      height: tileset.tileheight,
    }
  }

  TileMap.prototype.draw = function() {
    this.map.layers.forEach(function(layer) {
      layer.data.forEach(function(number, index) {
        var x = index % layer.width;
        var y = Math.floor(index / layer.width);
        var clip = this.clip(number);
        this.context.drawImage(clip.image, clip.x, clip.y, clip.width, clip.height,
                               x * Map.tilewidth, y * Map.tileheight, Map.tilewidth, Map.tileheight);
      }, this)
    }, this);
  }

  window.TileMap = TileMap;
})();
