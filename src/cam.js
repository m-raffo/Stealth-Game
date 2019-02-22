/**
 * The ideal height for the camera, it is adjusted to meet the player's screen
 *   dimentions
 * @type {Number}
 * @constant
 */
const CAM_TARGET_HEIGHT = 3500;
/**
 * The ideal width for the camera, it is adjusted to meet the player's screen
 *   dimentions
 * @type {Number}
 * @constant
 */
const CAM_TARGET_WIDTH = 6200;

/**
 * The camera object for the world.
 * @type {Object}
 */
let cam = {
  /**
   * x position of the camera in the world (from the center)
   * @type {Number}
   * @default
   */
  x: 0,

  /**
   * y position of the camera in the world (from the center)
   * @type {Number}
   * @default
   */
  y: 0,

  /**
   * width of the camera (in world units, not pixels)
   * @type {Number}
   */
  width: 2000,

  /**
   * height of the camera (in world units, not pixels)
   * @type {Number}
   */
  height: 2000,

  /**
   * Determines if a point is on screen
   * @param  {Number} pointX x coordinate of the point
   * @param  {Number} pointY y coordinate of the point
   * @return {Boolean}        True if on the screen, False if not
   */
  onScreen: function(pointX, pointY) {
    if (pointX < this.originX() || pointY < this.originY() ||
    pointX > this.originX() + this.width
    || pointY > this.originY() + this.height) {
      return false;
    } else {
      return true;
    }
  },

  /**
   * Determines if the object if on the onScreen
   * @param  {Object} item  the item to be checked
   * @return {Boolean}      True if onscreen, False if not
   */
  objectOnScreen: function(item) {
    if (this.onScreen(item.x - (item.width/2), item.y - (item.height/2)) ||
        this.onScreen(item.x + (item.width/2), item.y - (item.height/2)) ||
        this.onScreen(item.x - (item.width/2), item.y + (item.height/2)) ||
        this.onScreen(item.x + (item.width/2), item.y + (item.height/2)) ) {
      return true;
    } else {
      return false;
    }
  },

  /**
   * Returns the x coordinate in the world of the upper-left corner of the
   *   camera
   * @return {Number} x coordinate
   */
  originX: function() {
    return this.x - (this.width/2);
  },

  /**
   * Returns the y coordinate in the world of the upper-left corner of the
   *   camera
   * @return {Number} y coordinate
   */
  originY: function() {
    return this.y - (this.height/2);
  },

  /**
   * Gets the pixel position on the screen for a given x coordinate in the world
   * Returns undefined in the point is not onscreen
   * @param  {Number} pointX X coordinate to get
   * @return {Number}        The X coordinate of the pixel position on screen
   */
  getOnscreenX: function(pointX) {
    // use this.y as a point that is for-sure on screen
    if (this.onScreen(pointX, this.y)) {
      return (pointX - this.originX()) * width / cam.width;
    } else { // if the point is not onscreen
      return undefined;
    }
  },

  /**
   * Gets the pixel position on the screen for a given y coordinate in the world
   * Returns undefined in the point is not onscreen
   * @param  {Number} pointY Y coordinate to get
   * @return {Number}        The Y coordinate of the pixel position on screen
   */
  getOnscreenY: function(pointY) {
    // use this.x as a point that is for-sure on screen
    if (this.onScreen(this.x, pointY)) {
      return (pointY - this.originY()) * height / cam.height;
    } else { // if the point is not onscreen
      return undefined;
    }
  },

  /**
   * Updates the size of the camera to match the size of the window.
   * Aims to keep the screen in a proportion of 1920*1080.
   * Keeps the ratio of the sides square, to prevent dilation in one axis.
   * @return {undefined} No return value
   */
  updateSize: function() {
    if (windowWidth / windowHeight > 1.7) {
      cam.width = CAM_TARGET_WIDTH;
      cam.height = CAM_TARGET_WIDTH * windowHeight / windowWidth;
    } else {
      cam.width = CAM_TARGET_HEIGHT * windowWidth / windowHeight;
      cam.height = CAM_TARGET_HEIGHT;
    }
  },

  /**
   * Draws an item on the screen using the correct scaling and position
   * @param  {Object}     item    item to be drawn
   * @return {undefined}          No return value
   */
  drawItem: function(item) {
    // only draw if the object is on the screen
    if (this.objectOnScreen(item)) {
      const imageWidth = item.width / cam.width * width;
      const imageHeight = item.height / cam.height * height;

      image(item.image,
          ((item.x - cam.originX()) / cam.width * width) - (imageWidth / 2),
          ((item.y - cam.originY()) / cam.height * height) - (imageWidth / 2),
          imageWidth,
          imageHeight);
    }
  },

  /**
   * Draws the the level to the screen
   * @param  {object}    level  the level to be drawn
   * @return {undefined}        no return value
   */
  drawLevel: function(level) {
    // TODO: Finish draw level function
    var arrayLength = level.allItems.length;
    for (var i; i < arrayLength; i++) {
      this.drawItem(level.allItems[i]);
    }

  }


};
