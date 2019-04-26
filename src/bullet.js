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
function Bullet(x, y, dirX, dirY, shooter, damage) {
  this.x = x;
  this.y = y;
  this.dirX = dirX;
  this.dirY = dirY;
  this.active = true;
  this.shooter = shooter;
  this.damage = damage;

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

      // Loop through all doors in the room
      for (var j = 0; j < game.world.rooms[i].doors.length; j++) {
        var door = game.world.rooms[i].doors[j];
        if (camera.pointInRect(this.x, this.y, door.x, door.y, door.width, door.height)) {
          return true;
        }
      }
    }

    // Check all crates
    for (var i = 0; i < game.world.crates.length; i++) {
      var currentCrate = game.world.crates[i];
      if(currentCrate.active && camera.pointInRect(this.x, this.y, currentCrate.x, currentCrate.y, currentCrate.width, currentCrate.height)) {
        return true;
      }
    }

    return false;
  }
}
