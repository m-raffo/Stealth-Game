requestAnimationFrame(game.mainLoop);

/**
 * The canvas element.
 * @type {Object}
 */
game.canvas = {
    element: document.getElementById("myCanvas")
}

game.canvas.ctx = game.canvas.element.getContext("2d");
