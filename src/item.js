/**
 * The constructor for an item object. Items are things in the world that the
 *   player will interact with, but are smaller than rooms or sections.
 * @param       {String} name      the name of the object
 * @param       {Number} x         x position in the world (from center)
 * @param       {Number} y         y position in the world (from center)
 * @param       {String} image     the name of the image (to be loaded from allImages)
 * @param       {Number} width     width of the object
 * @param       {Number} height    height of the object
 * @constructor
 */
function Item(name, x, y, image, width, height) {
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
  this.image = image;

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
   * @default
   */
  this.collisionPlayer = true;

  /**
   * Determines if the item collides with bullets
   * @type {Boolean}
   * @default
   */
  this.collisionBullet = false;

  /**
   * Determines if the item blocks line-of-sight
   * @type {Boolean}
   * @default
   */
  this.collisionSight = true;

  /**
   * Determines the shape for the collision detection box.
   * "box" for a box hitbox matching the dimentions of the item
   * "circle" for a circular hitbox with a radius of width / 2
   * @type {String}
   */
  // TODO: Add elliptical collision option
  this.collisionShape = 'box';

  this.checkCollision = function(target) {
    // TODO: Implement this function
    if (this.collisionShape === 'box') {
      if (target.collisionShape === 'box') {
        // If any of the corners of the target collide with this object, it is a
        // collision

        // Formula:
        //    if (RectA.Left < RectB.Right && RectA.Right > RectB.Left &&
        // RectA.Top > RectB.Bottom && RectA.Bottom < RectB.Top )
        return (
          this.x - (this.width / 2) <= target.x + (target.width / 2) &&
          this.x + (this.width / 2) >= target.x - (target.width / 2) &&
          this.y + (this.height / 2) >= target.y - (target.height / 2) &&
          this.y - (this.height / 2) <= target.y + (target.height / 2)
        );
      } else if (target.collisionShape === 'circle') {
        // TODO: Implement box and circle collision
        // https://www.geeksforgeeks.org/check-line-touches-intersects-circle/
      }
    }
  };

  /**
   * Determines if the given point is in collision with the item
   * @param  {Number} targetX    x position of the point to check
   * @param  {Number} targetY    y position of the point to check
   * @return {Boolean}           true if there is a collision, false if not
   */
  this.checkCollisionPoint = function(targetX, targetY) {
    if (this.collisionShape === 'box') {
      // check if the point is between x and x + width and
      // also between y and y + height
      return (this.x - (this.width / 2) <= targetX &&
      this.x + (this.width / 2) >= targetX &&
      this.y - (this.height / 2) <= targetY &&
      this.y + (this.height / 2) >= targetY);
    } else if (this.collisionShape === 'circle') {
      return (Math.sqrt(((this.x - targetX) ** 2) + ((this.y - targetY) ** 2))
      <= this.width / 2);
    }
  };
}

// For using npm testing only. No game functionality
if (typeof(module) !== 'undefined') {
  module.exports = Item;
}
