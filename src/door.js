/**
 * The speed at which the door moves when opening or closing
 * @type {Number}
 * @constant
 * @default
 */
const DOOR_MOVING_SPEED = 0.15;

/**
 * Time (in milliseconds) that a door is open for.
 * @type {Number}
 * @constant
 * @default
 */
const DOOR_OPEN_TIME = 3000;

/**
 * Connstructor function for a door object. Doors open and close to let the player through.
 * Duh.
 * @param       {Number} x     x position of the door (when closed)
 * @param       {Number} y     y position of the door (when closed)
 * @param       {Number} openX x position of the door (when open)
 * @param       {Number} openY y position of the door (when open)
 * @param       {Number} width give the dimensions of the door
 * @param       {Number} height give the dimensions of the door
 *
 * @constructor
 */
function Door(x, y, openX, openY, width, height) {
    this.closeX = x;
    this.closeY = y;

    this.x = x;
    this.y = y;

    this.openX = openX;
    this.openY = openY;

    this.targetX = this.x;
    this.targetY = this.y;

    this.color = '#c9851e';

    this.width = width;
    this.height = height;

    this.resetTime = Date.now();

    this.state = 'CLOSED';

    this.update = function() {
      if (Math.abs(this.targetX - this.x) < 1) {
        this.x = this.targetX;
      }

      if (Math.abs(this.targetY - this.y) < 1) {
        this.y = this.targetY;
      }

      if (this.targetX !== this.x || this.targetY !== this.y) {
        var coordinates = camera.lerp(this.x, this.y, this.targetX, this.targetY, DOOR_MOVING_SPEED);

        var oldX = this.x;
        var oldY = this.y;


        this.x = coordinates[0];
        this.y = coordinates[1];

        // If colliding with the player, reopen the door
        if (this.checkCollisionPlayer()) {
          this.open();
        }
      }

      if(camera.distance(this.x + (this.width / 2), this.y + (this.height / 2), player.x, player.y) < 350 && controls.isControlPressed('ACTION')) {
        this.open();
      }

      if (this.state === 'OPEN' && this.resetTime < Date.now()) {
        this.close();
      }
    }

    /**
     * Sets the door to "open" position
     * @return {undefined} no return value
     */
    this.open = function() {
      this.targetX = this.openX;
      this.targetY = this.openY;
      this.resetTime = Date.now() + DOOR_OPEN_TIME;
      this.state = 'OPEN';
    }

    /**
     * Sets the door to "closed" position
     * @return {undefined} no return value
     */
    this.close = function() {
      this.targetX = this.closeX;
      this.targetY = this.closeY;
      this.state = 'CLOSED';
    }

    /**
     * Checks if the door is in collision with the player
     * @return {Boolean} true if yes, false if no
     */
    this.checkCollisionPlayer = function() {
      // TODO: Also check for collision with guards
      return camera.circleLineCollision(player.x, player.y, player.width, this.x, this.y, this.x + this.width, this.y + this.height);
    }
}
