function Score(g, h, f) {
  this.g = g; // amount traveled
  this.h = h; // estimate
  this.f = f; // sum of g + h
}

game.world.astar = {
  /**
   * Finds a path from the given x and y position to the target x and y.
   * @param  {Number} x       index of the game.world.nodes array of node to start
   * @param  {Number} y       index of the game.world.nodes array of node to start
   * @param  {Number} targetX index of the game.world.nodes array of node to end at
   * @param  {Number} targetY index of the game.world.nodes array of node to end at
   * @return {[Array.Object.Node]}         A list of nodes to travel to
   */
  findPath: function(x, y, targetX, targetY) {
    // NOTE: Assumes that all nodes are evenly spaced on a grid
    var nodes = game.world.nodes;
    var startNode = nodes[y][x];
    var targetNode = nodes[targetY][targetX];


    var openList = [startNode];
    var closedList = [];

    // calculate all h scores for the tiles
    for (var i = 0; i < nodes.length; i++) {
      for (var j = 0; j < nodes[i].length; j++) {
        if(nodes[i][j] !== undefined) {
          nodes[i][j].score.h = Math.abs(j - targetX) + Math.abs(i - targetY);
          nodes[i][j].score.f = Math.abs(j - targetX) + Math.abs(i - targetY);
          nodes[i][j].score.g = 0;
          nodes[i][j].parent = undefined;
        }

      }
    }

    /**
     * Finds the tile in the open list with the lowest F score
     * @return {Object.Node} the node with the lowest f score
     */
    var getLowestFScore = function() {
      var best = {
        index: undefined,
        score: 1000000000000 // a really big number so that the first compared to is smaller // TODO: <----- maybe change this
      }

      for (var i = 0; i < openList.length; i++) {
        if(openList[i] && openList[i].score.f <= best.score) {
          best.score = openList[i].score.f;
          best.index = i;
        }
      }
      return openList[best.index];
    }

    openList.push(startNode);

    // NOTE: Only removes the first instance
    var removeFromOpenList = function(tile) {
      for (var i = 0; i < openList.length; i++) {
        if(openList[i] === tile) {
          openList.splice(i, 1);
          return true;

        }
      }

      return false;
    };

    var checkIfContains = function(list, tile) {
      for (var i = 0; i < list.length; i++) {
        if(list[i] === tile) {
          return true;
        }
      }

      return false;
    }


    var currentTile;
    do {
      currentTile = getLowestFScore();
      closedList.push(currentTile);
      removeFromOpenList(currentTile);

      if(checkIfContains(closedList, targetNode)){
        break;
      }

      var adjacentTiles = currentTile.adjacent;

      for (var i = 0; i < adjacentTiles.length; i++) {
        var aSquare = adjacentTiles[i];
        if(aSquare == undefined) {
          continue;
        }

        if(checkIfContains(closedList, aSquare)) { // if the adjacent square is already in the closedList, ignore it
          continue;
        }

        if(!checkIfContains(openList, aSquare)) { // if not in open list, add to open list and update score
          aSquare.score.g = currentTile.score.g + 1;
          aSquare.score.f = aSquare.score.g + aSquare.score.h;
          aSquare.parent = currentTile;
          openList.push(aSquare);
        } else {
          // TODO: Check if using the correct g score to calculate the f
        }
      }

    } while (openList.length > 0);

    // console.log("Moving past first loop");

    var finishedPath = [];
    while(currentTile) {
      finishedPath.push(currentTile);
      currentTile = currentTile.parent;
    }
    return finishedPath;
  },

  // TODO: Reset node scores in between findPath runs


};
