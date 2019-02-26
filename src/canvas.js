/**
 * The global namespace for all game variables
 * @namespace
 */
let game = {};
window.onload = function() {



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
    game.canvas.ctx.fillRect(0, 0, this.element.width, this.element.height);
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


  //
  // // TODO: Move all game variables over the the window.game namespace
  //
  // // Set the width and height of the canvas
  // window.game.canvas.resizeCanvas(window.innerWidth, window.innerHeight);
  //
  // // Just a test fill color
  // window.game.canvas.ctx.fillStyle = '#38b6bf';
  // window.game.canvas.ctx.fillRect(0, 0, window.game.canvas.element.width,
  //   window.game.canvas.element.height);
  //
