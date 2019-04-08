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
 * The default bullet speed
 * @type {Number}
 * @constant
 * @default
 */
const BULLET_SPEED = 80;

/**
 * The object for the main player of the game.
 *
 * @type {Object}
 */
let player = {
  // TODO: Make this function calculate movement based on one "chunk of time"
  /*
  each chunk of time will be the same amount of in-game time, and the function
  will be called as many times as necessary by the main game loop
  First step: remove deltaTime from this function
   */
  // Basic values
  x: 200,
  y: 200,
  width: 100,
  height: 100,
  speedX: 0,
  speedY: 0,
  health: 100,

  /**
   * Stores all of the information about the player's current weapon
   * @type {Object}
   */
  weapon: {
    /**
     * The time in milliseconds that the player's weapon will be ready to fire again.
     * @type {Number}
     */
    resetTimestamp: Date.now(),

    /**
     * True if the mouse has been released since the last shot, false if not
     * @type {Boolean}
     */
    mouseRelease: true,

    /**
     * True if the weapon requires the mosue to be released in between shoots
     * @type {Boolean}
     */
    requireMouseRelease: true,

    /**
     * The time in milliseconds that the weapon needs until it is ready to be fired
     * @type {Number}
     */
    timeToReset: 100,

    /**
     * The number of bullets in the current clip of the weapon
     * @type {Number}
     */
    ammo: 10,

    /**
     * The number of bullets that are fired per shot.
     * Mostly used for shotguns
     * @type {Number}
     */
    bulletsPerShot: 1,

    /**
     * The accuracty of each bullet leaving the gun.
     * Higher numbers means a less accurate weapon
     * @type {Number}
     */
    accuracy: 3,

    /**
     * The number of bullets in a full clip of the weapon
     * @type {Number}
     */
    ammoPerClip: 10,

    /**
     * The number of remaining bullets (total).
     * @type {Number}
     */
    ammoTotal: 25,

    /**
     * The time in milliseconds to reload the weapon with another clip
     * @type {Number}
     */
    timeToReload: 1000,

    /**
     * The amount of noise produced by the weapon when fired.
     * @type {Number}
     */
    noise: 1500,

    damage: 25,

    /**
     * Updates the on-screen display to reflect the current ammo state
     * @return {undefined} no return value
     */
    updateAmmoDisplay: function() {
      $('#ammoDisplay').text(this.ammo + ' / ' + (this.ammoTotal - this.ammo));
    }
  },



  /**
   * Calculates the player's movement based on the currently pressed controls
   * Also calculates other actions about the player (ie shooting)
   * @return {undefined} No return value
   */
  move: function() {
    // controls.logControls();
    if(this.health <= 0) {
      console.log("YOU DEAD!!!");
      alert("YOU DEAD!!!");

    }

    // Calculates player's movement based on inputted controls

    // Stores the number of milliseconds since the last frame
    // TODO: This is a constant value as a temp fix to keep the movement speed constant when this function is called.
    const deltaTime = 1000.0 / 60;
    let playerMaxSpeed = 0;

    if (controls.isControlPressed('CROUCH')) {
      playerMaxSpeed = MOVE_SPEED_CROUCH;
    } else if (controls.isControlPressed('SPRINT')) {
      playerMaxSpeed = MOVE_SPEED_RUN;
    } else {
      playerMaxSpeed = MOVE_SPEED_WALK;
    }

    if (deltaTime === Infinity) {
      return;
    }


    // TODO: Improve readability of this section/add comments (if you want to)

    // Right/left movement

    // If neither control is pressed, or both controls are pressed, slow down
    if ((!controls.isControlPressed('MOVE_RIGHT') &&
    !controls.isControlPressed('MOVE_LEFT')) ||
    ((controls.isControlPressed('MOVE_RIGHT') &&
    controls.isControlPressed('MOVE_LEFT')))) {
      // TODO: Replace 80% with math that reflects the ACCEL_SPEED_WALK value
      this.speedX *= 0.8;

      // If speed is almost zero, just stop
      if (Math.abs(this.speedX) < 0.2) {
        this.speedX = 0;
      }
    } else {
      // If pressing only left key and not going too fast
      if (controls.isControlPressed('MOVE_LEFT') &&
      this.speedX > playerMaxSpeed * -1) {
        this.speedX -= playerMaxSpeed / ACCEL_SPEED_WALK * deltaTime;
      } else if (controls.isControlPressed('MOVE_RIGHT')
      && this.speedX < playerMaxSpeed) {
        // If pressing only right key and not going too fast
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
    if ((!controls.isControlPressed('MOVE_DOWN') &&
    !controls.isControlPressed('MOVE_UP')) ||
    ((controls.isControlPressed('MOVE_DOWN') &&
    controls.isControlPressed('MOVE_UP')))) {
      // TODO: Replace 80% with math that reflects the ACCEL_SPEED_WALK value
      this.speedY *= 0.8;

      // If speed is almost zero, just stop
      if (Math.abs(this.speedY) < 0.2) {
        this.speedY = 0;
      }
    } else {
      // If pressing only left key and not going too fast
      if (controls.isControlPressed('MOVE_UP') &&
      this.speedY > playerMaxSpeed * -1) {
        this.speedY -= playerMaxSpeed / ACCEL_SPEED_WALK * deltaTime;
      } else if (controls.isControlPressed('MOVE_DOWN') &&
      this.speedY < playerMaxSpeed) {
      // If pressing only right key and not going too fast
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

    // Move back if causing collision
    if (this.checkAllCollisions()) {
      this.x -= this.speedX * deltaTime;
    }

    this.y += this.speedY * deltaTime;
    if (this.checkAllCollisions()) {
      this.y -= this.speedY * deltaTime;
    }

    // If the player is in collision with any walls, move them back


    // Shooting

    // BUG: Can't shoot on first mouse click (inital value of mouse click release variablce)

    /*
    This statement checks that:
    1. The left mouse is down
    2. The the mouse has been released since the last shot OR that it is not required to have been released
    3. Enough time has passed to allow for another shot
     */
    if (controls.leftMouseDown && (this.weapon.mouseRelease || !this.weapon.requireMouseRelease) && Date.now() > this.weapon.resetTimestamp) {
      console.log("Starting shoot");
      if (this.weapon.ammo > 0) {
        // Set wait until the weapon can be fired again and remove one bullet
        this.weapon.resetTimestamp = Date.now() + this.weapon.timeToReset;
        this.weapon.ammo -= 1;
        this.weapon.ammoTotal -= 1;

        // need to wait again until the mouse is released
        this.weapon.mouseRelease = false;

        // Calculate bullet path toward mouse

        // Better see: https://math.stackexchange.com/questions/656500/given-a-point-slope-and-a-distance-along-that-slope-easily-find-a-second-p

        // TODO: Add recoil

        var worldMouseX = camera.screenToWorldPoint(controls.mouseX, controls.mouseY);

        var worldMouseY = worldMouseX[1];
        worldMouseX = worldMouseX[0];


        for(var i = 0; i < this.weapon.bulletsPerShot; i++) {
          // slope from player to mouse
          var m = (this.y - worldMouseY) / (this.x - worldMouseX);
          var angle = camera.slopeToAngle(m);

          angle += camera.map(Math.random(), 0, 1, this.weapon.accuracy * -1, this.weapon.accuracy);

          m = camera.angleToSlope(angle);


          // distance for the bullet to move
          var d = BULLET_SPEED;

          // something
          var r = Math.sqrt(1 + (m * m));

          var speedX = 0 + (d / r);
          var speedY = 0 + (d * m / r);

          if (worldMouseX < player.x) {
            speedX *= -1;
            speedY *= -1;
          }

          game.bullets.push(new Bullet(player.x, player.y, speedX, speedY, this, this.weapon.damage));
        }

        game.world.noise.push(new Noise(player.x, player.y, this.weapon.noise));
      } else {
        // TODO: Replace this with a click sound effect
        console.log("CLICK"); // The gun is empty
      }

    }



    // Reloading
    if (controls.isControlPressed('RELOAD') && this.weapon.ammo < this.weapon.ammoPerClip && this.weapon.ammo < this.weapon.ammoTotal) {
      // TODO: Replace this with a reloading sound effect
      // TODO: Add a progress bar for reloading
      console.log("RELOADING...");
      this.weapon.resetTimestamp = Date.now() + this.weapon.timeToReload;

      if (this.weapon.ammoTotal < this.weapon.ammoPerClip) {
        this.weapon.ammo = this.weapon.ammoTotal;
      } else {
        this.weapon.ammo = this.weapon.ammoPerClip;
      }


    }

    this.weapon.updateAmmoDisplay();


    // Take damage from bullets
    for (var i = 0; i < game.bullets.length; i++) {
      if(game.bullets[i].shooter !== this &&  camera.distance(game.bullets[i].x, game.bullets[i].y, this.x, this.y) <= this.width) {
        this.health -= game.bullets[i].damage;
        game.bullets[i].active = false;
      }
    }


  },

  /**
   * Checks all collisions to determine if the player is touching anything
   * @return {Boolean} true if in collision, false if not
   */
  checkAllCollisions: function() {
    // Check all rooms
    for (var i = 0; i < game.world.rooms.length; i++) {
      // Loop through all walls in the room
      for (var j = 0; j < game.world.rooms[i].walls.length; j++) {
        if (this.checkCollision(game.world.rooms[i].walls[j])) {
          return true;
        }
      }

      // BUG: If a player opens a door and it touches them, they and the door will become stuck

      // Loop through all doors in the room
      for (var j = 0; j < game.world.rooms[i].doors.length; j++) {
        if (this.checkCollision(game.world.rooms[i].doors[j])) {
          return true;
        }
      }
    }


    return false;
  },

  /**
   * Determines if the player is in collision with the given wall
   * @param  {Object.Wall} wall  the wall to check for collision with
   * @return {Boolean} true if colliding, false if not
   */
  checkCollision: function(wall) {

    /*
    If in collision, one of these must be true:
    1. Player's center is inside the rectangle
    2. One rectangle edge is on the circle
     */

    // TODO: Allow the player to "roll" off hard edges (easier to move around)

    // Case 1:
    if (camera.pointInRect(this.x, this.y, wall.x, wall.y, wall.width, wall.height)) {
      return true;
    }

    // TODO: Finish the checkCollision function
    // Case 2:
    // See: https://www.geeksforgeeks.org/check-line-touches-intersects-circle/
    // Find perpendiclar from player center and each rectangle side. Then get distance. If the distance is <= circle radius, they are in collision

    // NOTE: assumes that the player is perfectly round, and uses the width value

    // Top edge
    if (camera.circleLineCollision(player.x, player.y, player.width, wall.x, wall.y, wall.x + wall.width, wall.y)) {
      return true;
    }

    // Left edge
    if (camera.circleLineCollision(player.x, player.y, player.width, wall.x, wall.y, wall.x, wall.y + wall.height)) {
      return true;
    }


    // Right edge
    if (camera.circleLineCollision(player.x, player.y, player.width, wall.x + wall.width, wall.y, wall.x + wall.width, wall.y + wall.height)) {
      return true;
    }



    // Bottom edge
    if (camera.circleLineCollision(player.x, player.y, player.width, wall.x, wall.y + wall.height, wall.x + wall.width, wall.y + wall.height)) {
      return true;
    }


    return false;
  }

};
