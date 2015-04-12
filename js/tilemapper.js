(function() {
  var TileMap = function(options) {
    this.canvas = options.canvas;
    this.context = this.canvas.getContext('2d');
    this.map = options.map;
    this.entities = options.entities || [],

    // Add each image to the appropriate tileset and patch a function to verify
    // it's index boundaries
    this.map.tilesets.forEach(function(tileset, index, tilesets) {
      var tiles = Math.floor(tileset.imagewidth / tileset.tilewidth) *
                  Math.floor(tileset.imageheight / tileset.tileheight);

      tilesets[index].image = options.images[index];
      tilesets[index].min = tileset.firstgid - 1;
      tilesets[index].max = tilesets[index].min + tiles;

      // Check whether the 'number' is in this tileset or not
      tilesets[index].inside = function(number) {
        return number >= this.min && this.max >= number;
      }.bind(tileset);
    });

    // Sepparate tile layers from image layers
    this.tileLayers = this.map.layers.filter(function(layer) {
      return layer.type === 'tilelayer';
    });

    // Filter image layers
    this.imageLayers = this.map.layers.filter(function(layer) {
      return layer.type === 'imagelayer';
    });

    // Normalize layers to a zero indexed map
    this.tileLayers.forEach(function(layer) {
      layer.data.forEach(function(number, index, layer) {
        layer[index] = number - 1;
      });
    });

    // Load image from their id
    this.imageLayers.forEach(function(layer, index, layers) {
      layers[index].image = document.getElementById(layer.image);
      layers[index].context = this.context;
      layers[index].getZIndex = function() {
        return this.y + this.image.height;
      }.bind(layers[index]);
      layers[index].draw = function() {
        this.context.drawImage(this.image, this.x, this.y);
      }.bind(layers[index]);
    }, this);
  }

  TileMap.prototype.clip = function(index) {
    var tileset = null;
    this.map.tilesets.forEach(function(set) {
      if (set.inside(index)) {
        tileset = set;
      }
    });
    var row = Math.floor((index * tileset.tilewidth) / tileset.imagewidth);

    return {
      image: tileset.image,
      x: (index * tileset.tilewidth) % tileset.imagewidth,
      y: (row * tileset.tileheight) % tileset.imageheight,
      width: tileset.tilewidth,
      height: tileset.tileheight,
    }
  }

  TileMap.prototype.draw = function(offsetX, offsetY) {
    // First, draw tile layers
    this.tileLayers.forEach(function(layer) {
      layer.data.forEach(function(number, index) {
        if (number < 0) {
          return;
        }

        var x = (index % layer.width);
        var y = Math.floor(index / layer.width);
        var clip = this.clip(number);
        this.context.drawImage(clip.image, clip.x, clip.y, clip.width, clip.height,
                               (x * Map.tilewidth) + offsetX, (y * Map.tileheight) + offsetY,
                               Map.tilewidth, Map.tileheight);
      }, this);
    }, this);

    // Prepare objects drawing order
    var objects = this.entities.concat(this.imageLayers);
    objects.sort(function(a, b) {
      return a.getZIndex() - b.getZIndex();
    });

    // Draw movable objects
    objects.forEach(function(object) {
      object.draw();
    });
  }

  window.TileMap = TileMap;
})();
