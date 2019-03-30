requestAnimationFrame(game.mainLoop);

/**
 * The canvas element.
 * @type {Object}
 */
game.canvas = {
    element: document.getElementById("myCanvas")
}

game.canvas.ctx = game.canvas.element.getContext("2d");
game.world.rooms[0].items.push(new Item(500, 500, 250, 250, '#d7451e'));
