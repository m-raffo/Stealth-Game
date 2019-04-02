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
        nodes[i][j].score.h = Math.abs(j - targetX) + Math.abs(i - targetY);
        nodes[i][j].score.f = Math.abs(j - targetX) + Math.abs(i - targetY);
        nodes[i][j].score.g = undefined;
      }
    }

    /**
     * Finds the tile in the open list with the lowest F score
     * @return {Object.Node} the node with the lowest f score
     */
    var getLowestFScore = function() {
      // TODO: Write this function
      var best = {
        index: undefined,
        score: 1000000000000 // a really big number so that the first compared to is smaller // TODO: <----- maybe change this
      }

      for (var i = 0; i < openList.length; i++) {
        if(openList[i].score.f <= best.score) {
          best.score = openList[i].score.f;
          best.index = i;
        }
      }

      return openList[best.index];
    }

    openList.push(startNode);



    do {
      var currentTile = getLowerFScore();

    } while (true);

    return startNode === targetNode;
  },

  // TODO: Reset node scores in between findPath runs


};
