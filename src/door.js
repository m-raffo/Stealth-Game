/**
 * The speed at which the door moves when opening or closing
 * @type {Number}
 * @constant
 * @default
 */
const DOOR_MOVING_SPEED = 0.1;

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

    this.currentX = x;
    this.currentY = y;

    this.openX = openX;
    this.openY = openY;

    this.targetX = this.currentX;
    this.targetY = this.currentY;

    this.color = '#c9851e';

    this.width = width;
    this.height = height;

    this.update = function() {
      if (Math.abs(this.targetX - this.currentX) < 1) {
        this.currentX = this.targetX;
      }

      if (Math.abs(this.targetY - this.currentY) < 1) {
        this.currentY = this.targetY;
      }

      if (this.targetX !== this.currentX || this.targetY !== this.currentY) {
        var coordinates = camera.lerp(this.currentX, this.currentY, this.targetX, this.targetY, DOOR_MOVING_SPEED);

        this.currentX = coordinates[0];
        this.currentY = coordinates[1];
      }

      if(camera.distance(this.currentX, this.currentY, player.x, player.y) < 250 && controls.isControlPressed('ACTION')) {
        this.open();
      }
    }

    /**
     * Sets the door to "open" position
     * @return {undefined} no return value
     */
    this.open = function() {
      this.targetX = this.openX;
      this.targetY = this.openY;
    }

    /**
     * Sets the door to "closed" position
     * @return {undefined} no return value
     */
    this.close = function() {
      this.targetX = this.closeX;
      this.targetY = this.closeY;
    }
}
