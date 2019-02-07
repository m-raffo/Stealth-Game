var cam = {
  x : 0,
  y : 0,
  width : 2000,
  height : 2000,

  /**
   * Determines if a point is on screen
   * @param  {Number} pointX x coordinate of the point
   * @param  {Number} pointY y coordinate of the point
   * @return {Boolean}        True if on the screen, False if not
   */
  onScreen : function(pointX, pointY) {
    if (pointX < this.originX() || pointY < this.originY() || pointX > this.originX() + this.width || pointY > this.originY() + this.height){
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
  objectOnScreen : function(item) {

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
  originX : function() {
    return this.x - (this.width/2);
  },

  /**
   * Returns the y coordinate in the world of the upper-left corner of the
   *   camera
   * @return {Number} y coordinate
   */
  originY : function() {
    return this.y - (this.height/2);
  },

  /**
   * Gets the pixel position on the screen for a given x coordinate in the world
   * Returns undefined in the point is not onscreen
   * @param  {Number} pointX X coordinate to get
   * @return {Number}        The X coordinate of the pixel position on screen
   */
  getOnscreenX : function(pointX) {
    if (this.onScreen(pointX, this.y)) {  // use this.y as a point that is for-sure on screen
      return (pointX - this.originX()) * width / cam.width;
    }
    else { // if the point is not onscreen
      return undefined;
    }
  },

  /**
   * Gets the pixel position on the screen for a given y coordinate in the world
   * Returns undefined in the point is not onscreen
   * @param  {Number} pointY Y coordinate to get
   * @return {Number}        The Y coordinate of the pixel position on screen
   */
  getOnscreenY : function(pointY) {
    if (this.onScreen(this.x, pointY)) {  // use this.y as a point that is for-sure on screen
      return (pointY - this.originY()) * height / cam.height;
    }
    else { // if the point is not onscreen
      return undefined;
    }
  },


}
