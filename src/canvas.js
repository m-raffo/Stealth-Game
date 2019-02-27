/**
 * The global namespace for all game variables
 * @namespace
 */
let game = {};

/**
 * Sets up all of the canvas variables. Is called once after the page has loaded
 * @return {undefined} no return value
 */
function canvasInitilization() {



  /**
   * The namespace for all of the canvas related elements
   * @namespace
   */
  game.canvas = {};


  /**
   * The canvas that the game is drawn on
   * @type {Object}
   */
  game.canvas.element = document.getElementById('game-canvas');

  /**
   * The context of the canvas
   * @type {Object}
   */
  game.canvas.ctx = game.canvas.element.getContext('2d');

  /**
   * Fills the entire canvas with the given color
   * @param  {string} color the color to fill the background with
   * @return {undefined}       no return value
   */
  game.canvas.fillBackground = function(color) {
    game.canvas.ctx.fillStyle = color;
    game.canvas.ctx.fillRect(0, 0, game.canvas.element.width, game.canvas.element.height);
  }


  /**
   * Resizes the game canvas to the given size
   * @param  {number} newWidth  the new width of the canvas
   * @param  {number} newHeight the new height of the canvas
   * @return {undefined}           no return value
   */
  game.canvas.resizeCanvas = function(newWidth, newHeight) {
    game.canvas.element.width = newWidth;
    game.canvas.element.height = newHeight;
  }

  // game.canvas.resizeCanvas(document.innerWidth, document.innerHeight);
  game.canvas.resizeCanvas(100, 100);

  game.canvas.fillBackground('#4ae4a1');

}
