function Guard(startX, startY, direction){
  this.x = startX;
  this.y = startY;
  this.direction = direction;

  this.width = 100;
  this.height = 100;

  // TODO: Make the guard's movement seem more natural by adding a speedX and speedY, and changing them similar to the way the player does

  /**
   * Color for the guard (if no texture)
   * @type {String}
   * @default
   */
  this.color = '#c31515';

  this.station = {
    x: startX,
    y: startY,
    direction: direction
  };

  this.path = undefined;

  this.update = function() {

    if(controls.rightMouseDown) {
      var worldMouseX = camera.screenToWorldPoint(controls.mouseX, controls.mouseY);

      var worldMouseY = worldMouseX[1];
      worldMouseX = worldMouseX[0];
      this.setPath(worldMouseX, worldMouseY);
    }

    if(this.path === undefined) {
      this.path = game.world.astar.findPath(3, 6, 23, 23);
    } else {

      if(this.path.length > 0 && camera.distance(this.x, this.y, this.path[this.path.length - 1].x, this.path[this.path.length - 1].y) < 10) {
        this.path.pop();
      }

      if (this.path.length > 0) {
        var newCoords = camera.moveToward(this.x, this.y, this.path[this.path.length - 1].x, this.path[this.path.length - 1].y, 10);
        this.x = newCoords[0];
        this.y = newCoords[1];
      }
    }
  };

  this.findClosestNode = function() {
    var nodes = game.world.nodes;
    var best = {
      node: undefined,
      distance: 1000000000000
    };

    for (var i = 0; i < nodes.length; i++) {
      for (var j = 0; j < nodes[i].length; j++) {
        var node = nodes[i][j];
        if(!node) {
          continue;
        }
        if (camera.distance(this.x, this.y, node.x, node.y) <= best.distance) {
          best.node = node;
          best.distance = camera.distance(this.x, this.y, node.x, node.y);
        }
      }
    }

    return best.node;
  };

  /**
   * Sets the guards path to the node closest to the given point
   * @param  {Number} x The coordinate to go to (in world units)
   * @param  {Number} y The coordinate to go to (in world units)
   * @return {undefined}   no return value
   */
  this.setPath = function(x, y) {
    var currentNode = this.findClosestNode();
    var targetNode = camera.findNodeAtPoint(x, y);
    this.path = game.world.astar.findPath(currentNode.gridX, currentNode.gridY, targetNode.gridX, targetNode.gridY);
  };




}
