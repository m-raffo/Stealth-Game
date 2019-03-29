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
 * The speed at which the camera tracks the player's movements
 * @type {Number}
 * @constant
 * @default
 */
const CAM_TRACK_SPEED = 0.125;

/**
 * The speed for a room to become dark/light after you enter/ leave
 * @type {Number}
 * @constant
 * @default
 */
const ROOM_HIDE_SPEED = 0.1;

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
   * Sets the camera x position so that the given coordinate is in the center
   * @param  {Number} x x coordinate to set
   * @return {undefined}   no return value
   */
  setCenterX: function(x) {
    this.x = x - (this.width / 2);
  },

  /**
   * Sets the camera y position so that the given coordinate is in the center
   * @param  {Number} y y coordinate to set
   * @return {undefined}   no return value
   */
  setCenterY: function(y) {
    this.y = y - (this.height / 2);
  },

  /**
   * Sets the camera position to center around the given coordinates
   * @param  {Number} x x coordinate
   * @param  {Number} y y coordinate
   * @return {undefined}   no return value
   */
  setCenter: function(x, y) {
    this.setCenterX(x);
    this.setCenterY(y);
  },

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

    // Draw all rooms
    for (var i = 0; i < game.world.rooms.length; i++) {
      var currentRoom = game.world.rooms[i];
      this.renderRoom(currentRoom);

      // If inside room, make brighter
      if (this.pointInRect(player.x, player.y, currentRoom.x, currentRoom.y, currentRoom.width, currentRoom.height)) {
        currentRoom.visibility -= ROOM_HIDE_SPEED;
      } else {
        currentRoom.visibility += ROOM_HIDE_SPEED;
      }

      if (currentRoom.visibility < 0) {
        currentRoom.visibility = 0;
      } else if (currentRoom.visibility > 1) {
        currentRoom.visibility = 1;
      }

    }


    // draw 2 boxes for testing
    camera.setFill('#cd0477');
    camera.renderRect(10, 10, 100, 100);

    camera.setFill('#1f2a08');
    camera.renderRect(5, 10, 10, 10);


    // TODO: Draw the player sprite (instead of box)

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
   * Renders the inputted room to the screen
   * @param  {Object.Room} room The room to be drawn
   * @return {undefined}      no return value
   */
  renderRoom: function(room) {
    // Draw floor
    this.setFill('#ff0000');
    this.renderRect(room.x, room.y, room.width, room.height);

    // Draw hidden
    this.setFill('rgba(71, 71, 71, ' + room.visibility + ')');
    this.renderRect(room.x, room.y, room.width, room.height);

    this.setFill('#358c67');
    // Draw walls
    for (var i = 0; i < room.walls.length; i++) {
      var wall = room.walls[i];
      console.log(wall);

      this.renderRect(wall.x, wall.y, wall.width, wall.height);
    }

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
  screenToWorldPoint: function(x, y) {
    var x1 = this.map(x, 0, game.canvas.element.width, this.x, this.x + this.width);
    var y1 = this.map(y, 0, game.canvas.element.height, this.y, this.y + this.height);

    return [x1, y1];
  },

  /**
   * Calculates the linear interlopation between the two given points and the percentage given
   * @param  {Number} x1         x coordinate of point 1
   * @param  {numebr} y1         y coordinate of point 1
   * @param  {Number} x2         x coordinate of point 2
   * @param  {Number} y2         y coordinate of point 2
   * @param  {Number} percentage percent (range from 0 - 1)
   * @return {Array.Number}      A two element array of the result. [x, y]
   */
  lerp: function(x1, y1, x2, y2, percentage) {
    var x = x1 + ((x2 - x1) * percentage);
    var y = y1 + ((y2 - y1) * percentage);

    return [x, y];
  },

  /**
   * Determines if the world is inside
   * @param  {Number} x1     the x position of the point
   * @param  {Number} y1     the y position of the point
   * @param  {Number} x      the x of the upper left of the rectangle
   * @param  {Number} y      the y of the upper left of the rectangle
   * @param  {Number} width  width of rectagle
   * @param  {Number} height height of rectangle
   * @return {Boolean}        True if inside, false if outside
   */
  pointInRect: function(x1, y1, x, y, width, height) {
    if (x1 >= x && x1 <= x + width) {
      if (y1 >= y && y1 <= y + height) {
        return true;
      }
    }

    return false;
  },

  /**
   * Checks if the given line passes through the circle
   * @param  {Number} x  x coordinate of the center of the circle
   * @param  {Number} y  y coordinate of the center of the circle
   * @param  {Number} r  radius of the circle
   * @param  {Number} x1 one point of the line coordinate
   * @param  {Number} y1 one point of the line coordinate
   * @param  {Number} x2 one point of the line coordinate
   * @param  {Number} y2 one point of the line coordinate
   * @return {Boolean}    true if passes through, false if not.
   */
  circleLineCollision: function(x, y, r, x1, y1, x2, y2) {

    // First, convert (x1, y1) and (x2, y2) into ax + by + c = 0;
    var m = (y2 - y1) / (x2 - x1);  // slope

    // OLD!!! Don't use these
    // ax + by + c = 0;
    // var a = (y2 - y1) * -1;
    // var b = (x2 - x1);
    // var c = (m * (0 - x1) + y1) * -1 / b;  // calculate y intercept

    // ax + by + c = 0;
    // TODO:  Check these equations for accuracy
    var a = -1 * m;
    var b = 1;
    var c = -1 * (m * (0 - x1) + y1);  // calculate y intercept

    // NOTE: See: https://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line


    // y = m(x - x1) + y1



    return true;
  }

  updatePosition: function() {
    var position = this.lerp(this.x + (this.width / 2), this.y + (this.height / 2), player.x, player.y, CAM_TRACK_SPEED);
    this.setCenter(position[0], position[1]);
  },

  /**
   * Maps the input in the range to the output
   * @param  {Number} x       the inputted value
   * @param  {Number} in_min  the minimun possible for the inputted value
   * @param  {Number} in_max  the maximun possible for the inputted value
   * @param  {Number} out_min the minimun output value
   * @param  {Number} out_max the maximum output value
   * @return {Number}         The outputed value
   */
  map: function(x, in_min, in_max, out_min, out_max) {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }
 };
