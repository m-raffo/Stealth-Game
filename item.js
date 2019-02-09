/**
 * The constructor for an item object. Items are things in the world that the
 *   player will interact with, but are smaller than rooms or sections.
 * @param       {String} name      the name of the object
 * @param       {Number} x         x position in the world of the object (center)
 * @param       {Number} y         y position in the world of the object (center)
 * @param       {String} imagePath path to the image of the file
 * @param       {Number} width     width of the object
 * @param       {Number} height    height of the object
 * @constructor
 */
function Item(name, x, y, imagePath, width, height) {
  /**
   * Name of the object, mostly for identification purposes
   * @type {String}
   */
  this.name = name;

  /**
   * x position of the object in the world (based on the center)
   * @type {Number}
   */
  this.x = x;

  /**
   * y position of the object in the world (based on the center)
   * @type {Number}
   */
  this.y = y;

  /**
   * Image for the items
   * @type {Image}
   */
  this.image = loadImage(imagePath);

  /**
   * Width of the item
   * @type {Number}
   */
  this.width = width;

  /**
   * Height of the item
   * @type {Number}
   */
  this.height = height;

  /**
   * Determines if the object collides with the player
   * @type {Boolean}
   */
  this.collisionPlayer = true;

  /**
   * Determines if the item collides with bullets
   * @type {Boolean}
   */
  this.collisionBullet = false;

  /**
   * Determines if the item blocks line-of-sight
   * @type {Boolean}
   */
  this.collisionSight = true;

  /**
   * Determines the shape for the collision detection box.
   * "box" for a box hitbox matching the dimentions of the item
   * "circle" for a circular hitbox with a radius of width / 2
   * @type {String}
   */
  // TODO: Add elliptical collision option
  this.collisionShape = "box";

  this.checkCollision = function(target) {

  }

  /**
   * Determines if the given point is in collision with the item
   * @param  {Number} targetX    x position of the point to check
   * @param  {Number} targetY    y position of the point to check
   * @return {undefined}         no return value
   */
  this.checkCollisionPoint = function(targetX, targetY) {
    if (this.collisionShape === "box") {
      // check if the point is between x and x + width and also between y and y + height
      return (this.x <= targetX && this.x + this.width >= targetX && this.y <= targetY && this.y + this.height >= targetY);
    } else if (this.collisionShape === "circle") {
      return (Math.sqrt( ((this.x - targetX) ** 2) + ((this.y - targetY) ** 2)) <= this.width / 2);
    }
  }
}

if (typeof(modele) !== 'undefined')
module.exports = Item;
