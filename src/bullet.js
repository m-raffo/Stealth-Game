/**
 * The number of steps to take when calculating the bullets movement to avoid skipping over a wall
 * @type {Number}
 * @constant
 * @default
 */
const BULLET_MOVE_STEPS = 10;

/**
 * Creates a bullet object
 * @param       {Number} x    the x position to start the bullet
 * @param       {Number} y    the y position to start the bullets
 * @param       {Number} dirX the amount (in wu) to move the bullet in one game step in the x direction
 * @param       {Number} dirY the amount (in wu) to move the bullet in one game step in the y direction
 * @constructor
 */
function Bullet(x, y, dirX, dirY) {
  this.x = x;
  this.y = y;
  this.dirX = dirX;
  this.dirY = dirY;
  this.active = true;

  // TODO: make bullet movement seem "smoother"
  this.move = function() {
    for (var i = 0; i < BULLET_MOVE_STEPS; i++) {
      this.x += this.dirX / BULLET_MOVE_STEPS;
      this.y += this.dirY / BULLET_MOVE_STEPS;

      if(this.checkAllCollisions()) {
        this.active = false;
      }
    }


  }

  this.checkAllCollisions = function() {
    // Check all rooms
    for (var i = 0; i < game.world.rooms.length; i++) {
      // Loop through all walls in the room
      for (var j = 0; j < game.world.rooms[i].walls.length; j++) {
        var wall = game.world.rooms[i].walls[j];
        if (camera.pointInRect(this.x, this.y, wall.x, wall.y, wall.width, wall.height)) {
          return true;
        }
      }
    }

    return false;
  }
}
