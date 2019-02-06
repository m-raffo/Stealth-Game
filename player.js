/**
 * The walking speed of the player
 * The average human walking speed is 1.4 meters/second ~ 0.14 cm/millisecond
 * @constant
 * @type {Number}
 */
const MOVE_SPEED_WALK = 0.14;
/**
 * Numer of milliseconds needed to get to full walking speed
 * @constant
 * @type {Number}
 */
const ACCEL_SPEED_WALK = 100;

/**
 * The object for the main player of the game.
 *
 * @type {Object}
 */
var player = {
  // Basic values
  x : 0,
  y : 0,
  width: 450,
  height : 450,
  speedX : 0,
  speedY : 0,

  /**
   * Calculates the player's movement based on the currently pressed controls
   * @return {undefined} No return value
   */
  move : function() {
    // Calculates player's movement based on inputted controls

    // Stores the number of milliseconds since the last frame
    var deltaTime = 1000.0 / frameRate();

    if (deltaTime === Infinity)
    return

    // Adjust speeds based on arrows pressed
    if (keyIsDown(RIGHT_ARROW) && Math.abs(this.speedX) < MOVE_SPEED_WALK) {
      this.speedX -= MOVE_SPEED_WALK / ACCEL_SPEED_WALK * deltaTime;
    }

    // Move character given current speeds
    this.x += this.speedX * deltaTime;
    this.y += this.speedY * deltaTime;


  }

}
