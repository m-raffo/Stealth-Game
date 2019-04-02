function Node(x, y){
  this.x = x;
  this.y = y;
  this.adjacent = [];
}

game.world.nodes = [];

{
  var index = {
    x: 0,
    y: 0
  };

  // create all nodes
  for (var i = -1000; i < 2500; i += 125) {
    game.world.nodes.push([]);
    index.x = 0;
    for (var j = 0; j < 2500; j += 125) {

      var node = new Node(i, j);
      game.world.nodes[index.y][index.x] = node;

      index.x += 1;

    }

    index.y += 1;
  }

  // TODO: delete any nodes that are touching the a wall

  // connect all nodes
  for (var i = 0; i < game.world.nodes.length; i++) {
    for(var j = 0; j < game.world.nodes[i].length; j++) {
      var node = game.world.nodes[i][j];

      if (i > 0) {
        node.adjacent.push(game.world.nodes[i-1][j]);
      }

      if(i < game.world.nodes.length-1) {
        node.adjacent.push(game.world.nodes[i+1][j]);

      }

      if(j > 0) {
        node.adjacent.push(game.world.nodes[i][j-1]);

      }

      if(j < game.world.nodes[i].length-1) {
        node.adjacent.push(game.world.nodes[i][j+1]);
      }

    }
  }

}
