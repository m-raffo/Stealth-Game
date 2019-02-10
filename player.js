/**
 * The walking speed of the player
 * The average human walking speed is 1.4 meters/second ~ 0.14 cm/millisecond
 * @constant
 * @type {Number}
 * @default
 */
const MOVE_SPEED_WALK = 0.5;


/**
 * The movement speed of the player when crouched
 * @type {Number}
 * @default
 */
const MOVE_SPEED_CROUCH = 0.25;

/**
 * The movement speed of the player when running
 * @type {Number}
 * @default
 */
const MOVE_SPEED_RUN = 1;

/**
 * Number of milliseconds needed to get to full walking speed
 * @constant
 * @type {Number}
 * @default
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

    controls.logControls();

    // Calculates player's movement based on inputted controls

    // Stores the number of milliseconds since the last frame
    var deltaTime = 1000.0 / frameRate();
    var playerMaxSpeed = 0;

    if (controls.isControlPressed("CROUCH")) {
      playerMaxSpeed = MOVE_SPEED_CROUCH;
    } else if (controls.isControlPressed("SPRINT")) {
      playerMaxSpeed = MOVE_SPEED_RUN;
    } else {
      playerMaxSpeed = MOVE_SPEED_WALK;
    }

    if (deltaTime === Infinity)
      return


    // TODO: Improve readability of this section/add comments (if you want to)

    // Right/left movement

    // If neither control is pressed, or both controls are pressed, slow down
    if ((!controls.isControlPressed("MOVE_RIGHT") && !controls.isControlPressed("MOVE_LEFT")) || ((controls.isControlPressed("MOVE_RIGHT") && controls.isControlPressed("MOVE_LEFT")))) {
      // TODO: Replace 80% with math that reflects the ACCEL_SPEED_WALK value
      this.speedX *= 0.8;

      // If speed is almost zero, just stop
      if (Math.abs(this.speedX) < 0.2){
        this.speedX = 0;
      }
    } else {
      // If pressing only left key and not going too fast
      if (controls.isControlPressed("MOVE_LEFT") && this.speedX > playerMaxSpeed * -1) {
        this.speedX -= playerMaxSpeed / ACCEL_SPEED_WALK * deltaTime;
      }

      // If pressing only right key and not going too fast
      else if (controls.isControlPressed("MOVE_RIGHT") &&  this.speedX < playerMaxSpeed) {
        this.speedX += playerMaxSpeed / ACCEL_SPEED_WALK * deltaTime;
      }
    }

    // Check if above the maximum speed
    if (Math.abs(this.speedX) > playerMaxSpeed) {
      this.speedX *= 0.8;

      // If the reduction in speed has brought the player to below the max speed
      // raise them back up to it
      if (this.speedX > playerMaxSpeed) {
        this.speedX = playerMaxSpeed;
      } else if (this.speedX < playerMaxSpeed * -1) {
        this.speedX = playerMaxSpeed * -1;
      }
    }


    // If neither control is pressed, or both controls are pressed, slow down
    if ((!controls.isControlPressed("MOVE_DOWN") && !controls.isControlPressed("MOVE_UP")) || ((controls.isControlPressed("MOVE_DOWN") && controls.isControlPressed("MOVE_UP")))) {
      // TODO: Replace 80% with math that reflects the ACCEL_SPEED_WALK value
      this.speedY *= 0.8;

      // If speed is almost zero, just stop
      if (Math.abs(this.speedY) < 0.2){
        this.speedY = 0;
      }
    } else {
      // If pressing only left key and not going too fast
      if (controls.isControlPressed("MOVE_UP") && this.speedY > playerMaxSpeed * -1) {
        this.speedY -= playerMaxSpeed / ACCEL_SPEED_WALK * deltaTime;
      }

      // If pressing only right key and not going too fast
      else if (controls.isControlPressed("MOVE_DOWN") &&  this.speedY < playerMaxSpeed) {
        this.speedY += playerMaxSpeed / ACCEL_SPEED_WALK * deltaTime;
      }
    }



    // Check if above the maximum speed for x axis
    if (Math.abs(this.speedX) > playerMaxSpeed) {
      this.speedX *= 0.8;

      // If the reduction in speed has brought the player to below the max speed
      // raise them back up to it
      if (this.speedX > playerMaxSpeed) {
        this.speedX = playerMaxSpeed;
      } else if (this.speedX < playerMaxSpeed * -1) {
        this.speedX = playerMaxSpeed * -1;
      }
    }

    // Check if above the maximun speed for y axis
    if (Math.abs(this.speedY) > playerMaxSpeed) {
      this.speedY *= 0.8;

      // If the reduction in speed has brought the player to below the max speed
      // raise them back up to it
      if (this.speedY > playerMaxSpeed) {
        this.speedY = playerMaxSpeed;
      } else if (this.speedY < playerMaxSpeed * -1) {
        this.speedY = playerMaxSpeed * -1;
      }
    }



    // Move character given current speeds
    this.x += this.speedX * deltaTime;
    this.y += this.speedY * deltaTime;


  }

}
