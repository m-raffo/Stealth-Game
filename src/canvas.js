/**
 * The global namespace for all game variables
 * @type {Object}
 */
window.game = {};

window.onload = function() {

  /**
   * The namespace for all of the canvas related elements
   * @type {Object}
   */
  window.game.canvas = {};


  /**
   * The canvas that the game is drawn on
   * @type {Object}
   */
  window.game.canvas.element = document.getElementById('game-canvas');

  /**
   * The context of the canvas
   * @type {Object}
   */
  window.game.canvas.ctx = window.game.canvas.element.getContext('2d');

  /**
   * Fills the entire canvas with the given color
   * @param  {string} color the color to fill the background with
   * @return {undefined}       no return value
   */
  window.game.canvas.fillBackground = function(color) {
    window.game.canvas.ctx.fillRect(0, 0, this.element.width, this.element.height);
  }

  /**
   * Resizes the game canvas to the given size
   * @param  {number} newWidth  the new width of the canvas
   * @param  {number} newHeight the new height of the canvas
   * @return {undefined}           no return value
   */
  window.game.canvas.resizeCanvas = function(newWidth, newHeight) {
    this.element.width = newWidth;
    this.element.height = newHeight;
  }





  // TODO: Move all game variables over the the window.game namespace

  // Set the width and height of the canvas
  window.game.canvas.resizeCanvas(window.innerWidth, window.innerHeight);

  // Just a test fill color
  window.game.canvas.ctx.fillStyle = '#38b6bf';
  window.game.canvas.ctx.fillRect(0, 0, window.game.canvas.element.width,
    window.game.canvas.element.height);


};
