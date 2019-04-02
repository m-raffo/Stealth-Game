/**
 * Finds a path from the given x and y position to the target x and y.
 * @param  {Number} x       index of the game.world.nodes array of node to start
 * @param  {Number} y       index of the game.world.nodes array of node to start
 * @param  {Number} targetX index of the game.world.nodes array of node to end at
 * @param  {Number} targetY index of the game.world.nodes array of node to end at
 * @return {[Array.Object.Node]}         A list of nodes to travel to
 */
game.world.findPath = function(x, y, targetX, targetY) {
  // Create a copy of the nodes for calculation
  // TODO: Is this way of copying too slow?
  var nodes =  JSON.parse(JSON.stringify(game.world.nodes));

  var startNode = nodes[y][x];
  var targetNode = nodes[targetY][targetX];
  

  var openList = [];
  var closedList = [];
}
