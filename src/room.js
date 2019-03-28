/**
 * Create a room object
 * @param       {Number} x      x coordinate of the upper left corner of the room (in wu)
 * @param       {Number} y      y coordinate of the upper left corner of the room (in wu)
 * @param       {Number} width  width of the room in wu
 * @param       {Number} height height of the room in wu
 * @constructor
 */
function Room(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;

  /**
   * The amount that the room is visible.
   * 0 - totally visible
   * 1 - totally hidden
   * @type {Number}
   */
  this.visibility = 0;
}
