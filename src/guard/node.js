function Node(x, y, gridX, gridY){
  this.x = x;
  this.y = y;
  this.adjacent = [];
  this.adjacentDistances = [];

  this.gridX = gridX;
  this.gridY = gridY;

  this.radius = 125;

  this.score = {
    g:0,  // current cost
    h:0,  // estimated cost
    f:0   // total cost
  }

  this.parent = undefined; // parent node for path finding.

  /**
   * Determines if this node is touching a wall
   * @return {[type]} [description]
   */
  this.isTouchingWall = function() {
    // Check all rooms
    for (var i = 0; i < game.world.rooms.length; i++) {
      // Loop through all walls in the room
      for (var j = 0; j < game.world.rooms[i].walls.length; j++) {
        if (this.checkCollision(game.world.rooms[i].walls[j])) {
          return true;
        }
      }

      // don't check doors, because guards can walk through

    }
    // TODO: Remake node map after a crate is opened?
    // Check crates
    for (var i = 0; i < game.world.crates.length; i++) {
      if(this.checkCollision(game.world.crates[i])) {
        return true;
      }
    }

  }


  this.checkCollision = function(wall) {

    /*
    If in collision, one of these must be true:
    1. Player's center is inside the rectangle
    2. One rectangle edge is on the circle
     */

    // TODO: Allow the player to "roll" off hard edges (easier to move around)

    // Case 1:
    if (camera.pointInRect(this.x, this.y, wall.x, wall.y, wall.width, wall.height)) {
      return true;
    }

    // TODO: Finish the checkCollision function
    // Case 2:
    // See: https://www.geeksforgeeks.org/check-line-touches-intersects-circle/
    // Find perpendiclar from player center and each rectangle side. Then get distance. If the distance is <= circle radius, they are in collision

    // NOTE: assumes that the player is perfectly round, and uses the width value

    // Top edge
    if (camera.circleLineCollision(this.x, this.y, this.radius, wall.x, wall.y, wall.x + wall.width, wall.y)) {
      return true;
    }

    // Left edge
    if (camera.circleLineCollision(this.x, this.y, this.radius, wall.x, wall.y, wall.x, wall.y + wall.height)) {
      return true;
    }


    // Right edge
    if (camera.circleLineCollision(this.x, this.y, this.radius, wall.x + wall.width, wall.y, wall.x + wall.width, wall.y + wall.height)) {
      return true;
    }



    // Bottom edge
    if (camera.circleLineCollision(this.x, this.y, this.radius, wall.x, wall.y + wall.height, wall.x + wall.width, wall.y + wall.height)) {
      return true;
    }


    return false;
  }
}

function defineNodes() {
  var index = {
    x: 0,
    y: 0
  };

  // create all nodes
  for (var i = -3000; i < 3500; i += 60) {
    // TODO: Remove nodes that are not in a room to improve guard pathfinding time
    game.world.nodes.push([]);
    index.x = 0;
    for (var j = -5000; j < 1700; j += 60) {

      var node = new Node(i, j, index.x, index.y);
      if (!node.isTouchingWall()) {
        game.world.nodes[index.y][index.x] = node;
      } else {
        game.world.nodes[index.y][index.x] = undefined;

      }


      index.x += 1;


    }

    index.y += 1;
  }


  // connect all nodes
  for (var i = 0; i < game.world.nodes.length; i++) {
    for(var j = 0; j < game.world.nodes[i].length; j++) {
      var node = game.world.nodes[i][j];
      if (node) {
        if (i > 0) {
          node.adjacent.push(game.world.nodes[i-1][j]);
          node.adjacentDistances.push(1);
        }

        if(i < game.world.nodes.length-1) {
          node.adjacent.push(game.world.nodes[i+1][j]);
          node.adjacentDistances.push(1);

        }

        if(j > 0) {
          node.adjacent.push(game.world.nodes[i][j-1]);
          node.adjacentDistances.push(1);

        }

        if(j < game.world.nodes[i].length-1) {
          node.adjacent.push(game.world.nodes[i][j+1]);
          node.adjacentDistances.push(1);

        }

        // diagonal connections
        if (i > 0 && j > 0) {
          node.adjacent.push(game.world.nodes[i-1][j-1]);
          node.adjacentDistances.push(2);

        }

        if(i < game.world.nodes.length-1 && j > 0) {
          node.adjacent.push(game.world.nodes[i+1][j-1]);

          node.adjacentDistances.push(2);

        }

        if(j < game.world.nodes.length-1 && i > 0) {
          node.adjacent.push(game.world.nodes[i-1][j+1]);
          node.adjacentDistances.push(2);

        }

        if(j < game.world.nodes.length-1 && i < game.world.nodes.length-1) {
          node.adjacent.push(game.world.nodes[i+1][j+1]);
          node.adjacentDistances.push(2);

        }


      }



    }
  }

}
