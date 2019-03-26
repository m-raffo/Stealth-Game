/**
 * Define the camera namespace for rendering the world
 * @namespace
 */
let camera = {

  /**
   * The x coordinate of the camera in the world FROM THE TOP LEFT!!!
   * @type {Number}
   */
  x: 0,

  /**
   * The y coordinate of the camera in the world FROM THE TOP LEFT!!!
   * @type {Number}
   */
  y: 0,

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
    camera.drawBox(10, 10, 100, 100);

    camera.setFill('#1f2a08');
    camera.drawBox(5, 10, 10, 10);

    // Draw the player
    // TODO: Draw the player sprite (instead of box)
    camera.setFill('#b5a60f');
    camera.drawBox(player.x, player.y, 10, 10);

    // Draw the player (rendering properly)
    camera.setFill('#2eaff4');
    camera.renderRect(player.x, player.y, 10, 10);


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
  }

 };
