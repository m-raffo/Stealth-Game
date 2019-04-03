/*
Guard behaviour modes:
1. STATION
  Guard remains around the same location. Some looking around, mostly same place

  Deault

2. PATROL
  Guard walks around a set path, looking where he is going

  Default

3. INVEST
  Guard is walking toward a point to investigate

  After the guard arrives at the point, if they find no player, they will look around, then return to staion/patrol

  Triggered by hearing a noise, maybe seeing the player from a distance

4. FIGHT
  Guard is aware of the player, and fighting against them.

  Triggered only by seeing the player

  If the guard loses sight of the player, activate alarm -or- try to find them


 */

/**
 * The speed the guard changes angles
 * @type {Number}
 * @constant
 * @default
 */
const GUARD_PIVOT_SPEED = 5;

function Guard(startX, startY, direction){
  this.x = startX;
  this.y = startY;
  this.direction = direction;

  this.width = 100;
  this.height = 100;

  this.mode = 'STATION';

  this.path = [];

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

  this.target = {
    x: startX,
    y: startY,
    direction: 0
  };


  this.update = function() {



    if (this.mode === 'STATION') {
      if (this.target.x !== this.station.x || this.target.y !== this.station.y) {
        this.target.x = this.station.x;
        this.target.y = this.station.y;
        this.setPath(this.target.x, this.target.y);
      }

      // Check for noise
      for (var i = 0; i < game.world.noise.length; i++) {
        if(camera.distance(game.world.noise[i].x, game.world.noise[i].y, this.x, this.y) <= game.world.noise[i].amount) {
          console.log("I can hear you!");
        }
      }

    }

    // Move toward target defined by this.target.x and this.target.y

    if (this.path.length > 0) {
      var newCoords = camera.moveToward(this.x, this.y, this.path[this.path.length - 1].x, this.path[this.path.length - 1].y, 5);

      var changeX = this.x - newCoords[0];
      var changeY = this.y - newCoords[1];
      var m = changeY / changeX;

      this.target.direction = camera.slopeToAngle(m);



      this.x = newCoords[0];
      this.y = newCoords[1];


    }

    // Change direction
    if (this.direction !== this.target.direction) {
      // only use the x value of this function
      this.direction = camera.moveToward(this.direction, 0, this.target.direction, 0, GUARD_PIVOT_SPEED)[0];
    }

    if(this.path.length > 0 && camera.distance(this.x, this.y, this.path[this.path.length - 1].x, this.path[this.path.length - 1].y) < 100) {
      this.path.pop();
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
