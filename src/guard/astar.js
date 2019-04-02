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

    // create empty array to store scores in
    var scores = [];
    for (var i = 0; i < nodes.length; i++) {
      scores.push([]);
      for (var j = 0; j < nodes[i].length; j++) {
        scores[i].push([]);
      }
    }

    // calculate all h scores for the tiles
    for (var i = 0; i < nodes.length; i++) {
      for (var j = 0; j < nodes[i].length; j++) {
        scores[i][j] = new Score(undefined, Math.abs(targetY - i) + Math.abs(targetX - j), Math.abs(targetY - i) + Math.abs(targetX - j));
      }
    }

    /**
     * Finds the tile in the open list with the lowest F score
     * @return {Object.Node} the node with the lowest f score
     */
    var getLowestFScore = function() {
      // TODO: Write this function
    }

    openList.push(startNode);



    do {

    } while (true);

    return startNode === targetNode;
  },

  // TODO: Reset node scores in between findPath runs


};
