/**
 * The walking speed of the player
 * The average human walking speed is 1.4 meters/second ~ 0.14 cm/millisecond
 * @constant
 * @type {Number}
 */
const MOVE_SPEED_WALK = 0.5;

/**
 * The movement speed of the player when crouched
 * @type {Number}
 */
const MOVE_SPEED_CROUCH = 0.3;

/**
 * The movement speed of the player when running
 * @type {Number}
 */
const MOVE_SPEED_RUN = 5;

/**
 * Number of milliseconds needed to get to full walking speed
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
    var playerMaxSpeed = 0;

    if (controls.isControlPressed("SPRINT")) {
      playerMaxSpeed = MOVE_SPEED_RUN;
    } else if (controls.isControlPressed("CROUCH")) {
      playerMaxSpeed = MOVE_SPEED_CROUCH;
    } else {
      playerMaxSpeed = MOVE_SPEED_WALK;
    }

    if (deltaTime === Infinity)
      return


    // TODO: Improve readability of this section/add comments (if you want to)

    // Right/left movement
    if (controls.isControlPressed("MOVE_LEFT") && Math.abs(this.speedX) < playerMaxSpeed) {
      this.speedX -= playerMaxSpeed / ACCEL_SPEED_WALK * deltaTime;
    }

    else if (controls.isControlPressed("MOVE_RIGHT") &&  Math.abs(this.speedX) < playerMaxSpeed) {
      this.speedX += playerMaxSpeed / ACCEL_SPEED_WALK * deltaTime;
    }

    else if (((!controls.isControlPressed("MOVE_RIGHT") && !controls.isControlPressed("MOVE_LEFT")) ||
      (controls.isControlPressed("MOVE_RIGHT") && controls.isControlPressed("MOVE_LEFT"))) && this.speedX != 0) {

        if (this.speedX < 0) {
          this.speedX += playerMaxSpeed / ACCEL_SPEED_WALK * deltaTime;
        } else {
          this.speedX -= playerMaxSpeed / ACCEL_SPEED_WALK * deltaTime;
        }

        // If speed is close enough to zero, just stop
        if (Math.abs(this.speedX) < 0.02)
          this.speedX = 0;
    }


    // Up/down movement
    if (controls.isControlPressed("MOVE_UP") && Math.abs(this.speedY) < playerMaxSpeed) {
      this.speedY -= playerMaxSpeed / ACCEL_SPEED_WALK * deltaTime;
    }

    else if (controls.isControlPressed("MOVE_DOWN") &&  Math.abs(this.speedY) < playerMaxSpeed) {
      this.speedY += playerMaxSpeed / ACCEL_SPEED_WALK * deltaTime;
    }

    else if (((!controls.isControlPressed("MOVE_DOWN") && !controls.isControlPressed("MOVE_UP")) ||
      (controls.isControlPressed("MOVE_DOWN") && controls.isControlPressed("MOVE_UP"))) && this.speedY != 0) {

        if (this.speedY < 0) {
          this.speedY += playerMaxSpeed / ACCEL_SPEED_WALK * deltaTime;
        } else {
          this.speedY -= playerMaxSpeed / ACCEL_SPEED_WALK * deltaTime;
        }

        // If speed is close enough to zero, just stop
        if (Math.abs(this.speedY) < 0.02)
          this.speedY = 0;
    }



    // Move character given current speeds
    this.x += this.speedX * deltaTime;
    this.y += this.speedY * deltaTime;


  }

}
