/**
 * The ideal height for the camera, it is adjusted to meet the player's screen
 *   dimentions
 * @type {Number}
 * @constant
 * @default
 */
const CAM_TARGET_HEIGHT = 3500;
/**
 * The ideal width for the camera, it is adjusted to meet the player's screen
 *   dimentions
 * @type {Number}
 * @constant
 * @default
 */
const CAM_TARGET_WIDTH = 6200;

/**
 * Define the camera namespace for rendering the world
 * @namespace
 */
let camera = {

  /**
   * The x coordinate of the camera in the world FROM THE TOP LEFT!!!
   * @type {Number}
   */
  x: 10,

  /**
   * The y coordinate of the camera in the world FROM THE TOP LEFT!!!
   * @type {Number}
   */
  y: -10,

  /**
   * The width of the camera (in world units)
   * @type {Number}
   */
  width: 100,

  /**
   * The height of the camera (in world units)
   * @type {Number}
   */
  height: 100,

  /**
   * Draws the current world state to the screen
   * @return {undefined} no return value
   */
  draw: function() {
    // Clear canvas
    camera.clear();


    box.element.style.left = box.pos + 'px';


    // draw 2 boxes for testing
    camera.setFill('#cd0477');
    camera.renderRect(10, 10, 100, 100);

    camera.setFill('#1f2a08');
    camera.renderRect(5, 10, 10, 10);

    // Draw the player
    // TODO: Draw the player sprite (instead of box)
    // camera.setFill('#b5a60f');
    // camera.drawBox(player.x, player.y, 10, 10);

    // Draw the player (rendering properly)
    camera.setFill('#2eaff4');
    // camera.renderRect(player.x, player.y, 100, 100);
    camera.renderEllipse(player.x, player.y, 100, 100);


    // Draw all bullets
    for (var i = 0; i < game.bullets.length; i++) {
      var bullet = game.bullets[i];
      camera.renderEllipse(bullet.x, bullet.y, 10, 10);
    }

  },

  /**
   * Draws a rectangle to the screen of the current fill color.
   * @param  {Number} x      x of the upper left corner of the rectanlge
   * @param  {Number} y      y of the upper left corner of the rectangle
   * @param  {Number} width  width of the rectangle
   * @param  {Number} height height of the rectangle
   * @return {undefined}     no return value
   */
  drawBox: function(x, y, width, height) {
    game.canvas.ctx.beginPath();
    game.canvas.ctx.rect(x, y, width, height);
    game.canvas.ctx.fill();
    game.canvas.ctx.closePath();
  },

  /**
   * Draws an ellipse to the screen
   * @param  {Number} x       x position of the center of the ellipse
   * @param  {number} y       y position of the center of the ellipse
   * @param  {Number} radiusX x radius of the ellipse
   * @param  {Number} radiusY y radius of the ellipse
   * @return {undefined}         no return value
   */
  drawEllipse: function(x, y, radiusX, radiusY) {
    game.canvas.ctx.beginPath();
    game.canvas.ctx.ellipse(x, y, radiusX, radiusY, 0, 0, 2 * Math.PI);
    game.canvas.ctx.fill();
    game.canvas.ctx.closePath();
  },

  /**
   * Sets the fill color to the given color
   * @param  {color} color the color to fill
   * @return {undefined}       no return value
   */
  setFill: function(color) {
    game.canvas.ctx.fillStyle = color;
  },

  /**
   * Clears the canvas of all drawings
   * @return {undefined} no return value
   */
  clear: function() {
    game.canvas.ctx.clearRect(0, 0, game.canvas.element.width, game.canvas.element.height);
  },

  /**
   * Draws a rectangle to the screen taking input in world units
   * @param  {Number} x      x coordinate (in world units) of the top left corner
   * @param  {Number} y      y coordinate (in world units) of the top left corner
   * @param  {Number} width  width in world units
   * @param  {Number} height height in world units
   * @return {undefined}        no return value
   */
  renderRect: function(x, y, width, height) {
    /**
     * (wu = world units)
     * number of wu on screen = x - camera.x
     * number of wu on screen / camera.width = ?(num pixels on screen) / camera.pixelWidths
     *
     *
     * (number of wu on screen * camera.pixelWidth) / camera.width = num pixel on screen
     * ((x - camera.x) * camera.pixelWidth) / camera.width = num pixel on screen
     */
    // see math above for explanation
    var pixelX = ((x - camera.x) * game.canvas.element.width) / camera.width;
    var pixelY = ((y - camera.y) * game.canvas.element.height) / camera.height;

    /*
    width / camera.width = ?(pixelWidth) / canvas.width
    (width / camera.width) * canvas.width = ?(pixelWidth)
     */
    var pixelWidth = (width / camera.width) * game.canvas.element.width;
    var pixelHeight = (height / camera.height) * game.canvas.element.height;


    camera.drawBox(pixelX, pixelY, pixelWidth, pixelHeight);
  },

  /**
   * Same as renderRect(), but for ellipse instead
   * @param  {Number} x       x position (in wu)
   * @param  {Number} y       y position (in wu)
   * @param  {Number} radiusX x radius (in wu)
   * @param  {Number} radiusY y radius (in wu)
   * @return {undefined}         no return value
   */
  renderEllipse: function(x, y, radiusX, radiusY) {
    // See renderRect() for math

    var pixelX = ((x - camera.x) * game.canvas.element.width) / camera.width;
    var pixelY = ((y - camera.y) * game.canvas.element.height) / camera.height;

    var pixelWidth = (radiusX / camera.width) * game.canvas.element.width;
    var pixelHeight = (radiusY / camera.height) * game.canvas.element.height;


    camera.drawEllipse(pixelX, pixelY, pixelWidth, pixelHeight);
  },

  /**
   * Determines if the given point is on the screen
   * @param  {Number} x the x coordinate
   * @param  {Number} y y coordinate
   * @return {Boolean}  true if onscreen, false if not
   */
  isOnScreen: function(x, y) {
    // NOTE: The function could be condensed, it is written this way to improve readability
    if (x >= this.x && x < this.x + this.width) {
      if (y >= this.y && y < this.y + this.height) {
        return true;
      }

    }
    return false;
  },

  /**
   * Updates the size of the camera to match the size of the window.
   * Aims to keep the screen in a proportion of 1920*1080.
   * Keeps the ratio of the sides square, to prevent dilation in one axis.
   * @return {undefined} No return value
   */

  updateSize: function() {

    game.canvas.element.width = window.innerWidth;
    game.canvas.element.height = window.innerHeight;

    var windowWidth = game.canvas.element.width;
    var windowHeight = game.canvas.element.height;

    if (windowWidth / windowHeight > 1.7) {
      this.width = CAM_TARGET_WIDTH;
      this.height = CAM_TARGET_WIDTH * windowHeight / windowWidth;
    } else {
      this.width = CAM_TARGET_HEIGHT * windowWidth / windowHeight;
      this.height = CAM_TARGET_HEIGHT;
    }
  },

  /**
   * Converts a point on the screen to a position in the world.
   * @return {Array.Number} A two number list of the coordinates (x,y)
   */
  //// TODO: finish this function
  screenToWorldPoint: function() {

  },

  /**
   * Maps the input in the range to the output
   * @param  {Number} x       [description]
   * @param  {Number} in_min  [description]
   * @param  {Number} in_max  [description]
   * @param  {Number} out_min [description]
   * @param  {Number} out_max [description]
   * @return {Number}         [description]
   */
  map: function(x, in_min, in_max, out_min, out_max) {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }
 };
