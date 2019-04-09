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
function Door(x, y, openX, openY, width, height, beginLocked=false, name=undefined) {
    this.closeX = x;
    this.closeY = y;

    this.name = name;

    this.x = x;
    this.y = y;

    this.openX = openX;
    this.openY = openY;

    /**
     * The passcode to unlock the door.
     * A random number between 1000 and 9999
     * (A 4 digit passcode)
     * @type {Number}
     */
    this.passcode = Math.floor(Math.random() * 9999);
    this.passcode = this.passcode.toString().padStart(4, '0');
    console.log(this.passcode)
    if(this.name) {
      game.world.doorCodes[this.name] = passcode;
    }

    this.targetX = this.x;
    this.targetY = this.y;

    this.color = '#c9851e';

    this.width = width;
    this.height = height;

    this.unlockKeyReleased = true;
    this.resetTime = clock.now();

    this.state = 'CLOSED';
    this.locked = beginLocked;

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

      if(camera.distance(this.x + (this.width / 2), this.y + (this.height / 2), player.x, player.y) < 350) {
        if (controls.isControlPressed('DOOR_ACTION')) {
          this.open();
        } else if (controls.isControlPressed('ACTIVATE')) {
          if(this.unlockKeyReleased && this.locked) {
            this.unlock();
          }

          this.unlockKeyReleased = false;
        } else {
          this.unlockKeyReleased = true;
        }
      }

      if (this.state === 'OPEN' && this.resetTime < clock.now()) {
        this.close();
      }
    }

    /**
     * Sets the door to "open" position
     * @return {undefined} no return value
     */
    this.open = function() {
      if(this.state === 'OPEN') {
        return; // if already open, just return
      }
      if(this.locked) {
        var coords = camera.lerp(this.x, this.y, this.openX, this.openY, 0.07)
        this.targetX = coords[0];
        this.targetY = coords[1];
        this.resetTime = clock.now() ;
        this.state = 'OPEN';
      } else {
        this.targetX = this.openX;
        this.targetY = this.openY;
        this.resetTime = clock.now() + DOOR_OPEN_TIME;
        this.state = 'OPEN';
      }

    }

    /**
     * Opens the door, even if it's locked.
     * @return {undefined} no return value
     */
    this.guardOpen = function() {
      this.targetX = this.openX;
      this.targetY = this.openY;
      this.resetTime = clock.now() + DOOR_OPEN_TIME;
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

    this.unlock = function() {
      var attempt = prompt('Enter the passcode:', '****');
      if (attempt === this.passcode) {
        this.locked = false;
      }
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
