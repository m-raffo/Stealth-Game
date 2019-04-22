/*
Guard behaviour modes:
1. STATION
  Guard remains around the same location. Some looking around, mostly same place

  Deault

2. PATROL
  Guard walks around a set path, looking where he is going

  Default

3. INVESTIGATE
  Guard is walking toward a point to investigate

  After the guard arrives at the point, if they find no player, they will look around, then return to staion/patrol

  Triggered by hearing a noise, maybe seeing the player from a distance

4. FIGHT
  Guard is aware of the player, and fighting against them.

  Triggered only by seeing the player

  If the guard loses sight of the player, activate alarm -or- try to find them


 */

/**
 * The speed the guard changes angles
 * @type {Number}
 * @constant
 * @default
 */
const GUARD_PIVOT_SPEED = 5;

/**
 * The entire field of view of the guard (in degrees)
 * @type {Number}
 * @constant
 * @default
 */
const GUARD_FOV = 50;

/**
 * The minimun distance between the guard and the player in fight mode
 * @type {Number}
 * @constant
 * @default
 */
const GUARD_FIGHT_MIN_DISTANCE = 400;

/**
 * The minimun distance between the guard and the player in fight mode
 * @type {Number}
 * @constant
 * @default
 */
const GUARD_FIGHT_MAX_DISTANCE = 700;

/**
 * An additional delay for the guard between shots.
 * @type {Number}
 * @constant
 * @default
 */
const GUARD_SHOOT_DELAY = 200;

/**
 * The number of degrees that the guard's shots can be off of perfect target.
 * @type {Number}
 * @constant
 * @default
 */
const GUARD_ACCURACY = 5;

/**
 * The speed of the guard when walking
 * @type {Number}
 * @constant
 * @default
 */
const GUARD_WALK_SPEED = 5;

/**
 * The speed of the guard when running
 * @type {Number}
 * @constant
 * @default
 */
const GUARD_RUN_SPEED = 8;

/**
 * Damage modifier applied when the guard is unaware of the player
 * @type {Number}
 * @constant
 * @default
 */
const GUARD_SNEAK_MODIFIER = 1.5;

/**
 * The delay (in milliseconds) between the guard switching modes. (Allows for sneak attack in investigate mode.)
 * @type {Number}
 * @constant
 * @default
 */
const GUARD_REACTION_TIME = 100;

const ANIM_MARK_APPEAR_TIME = 80;
const ANIM_MARK_STAY_TIME = 1000;

function Guard(startX, startY, direction){
  this.x = startX;
  this.y = startY;
  this.direction = direction;

  this.width = 100;
  this.height = 100;

  this.mode = 'STATION';

  this.path = [];

  this.alive = true;
  this.health = 75;

  this.startQuestion = function() {
    if (this.questionStart + ANIM_MARK_APPEAR_TIME + ANIM_MARK_APPEAR_TIME +  ANIM_MARK_STAY_TIME < clock.now()) {
      this.questionStart = clock.now();
    }
  }
  this.questionStart = -10000;

  this.startExclaim = function() {
    if (this.exclaimStart + ANIM_MARK_APPEAR_TIME + ANIM_MARK_APPEAR_TIME +  ANIM_MARK_STAY_TIME < clock.now()) {
      this.exclaimStart = clock.now();
    }
  }
  this.exclaimStart = -10000;

  this.modeSwitchTimestamp = clock.now();

  // TODO: Make the guard's movement seem more natural by adding a speedX and speedY, and changing them similar to the way the player does

  /**
   * Color for the guard (if no texture)
   * @type {String}
   * @default
   */
  this.color = '#c31515';

  this.currentSpeed = GUARD_WALK_SPEED;

  this.station = {
    x: startX,
    y: startY,
    direction: direction
  };

  this.target = {
    x: startX,
    y: startY,
    direction: direction,
    investigate_done: undefined,
  };

  this.weapon = {
    /**
     * The time in milliseconds that the player's weapon will be ready to fire again.
     * @type {Number}
     */
    resetTimestamp: clock.now(),

    /**
     * True if the mouse has been released since the last shot, false if not
     * @type {Boolean}
     */
    mouseReleased: true,

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
    accuracy: 8,

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


    damage: 7,

  };

  /**
   * Shoots the guards weapon at the player. Performs necessary checks and noise additions, etc.
   * @return {undefined} no return value
   */
  this.shoot = function() {
    if(this.weapon.resetTimestamp < clock.now()) {
      if(this.weapon.ammo > 0) {
        this.weapon.resetTimestamp = clock.now() + this.weapon.timeToReset + GUARD_SHOOT_DELAY;
        this.weapon.ammo -= 1;
        this.weapon.ammoTotal -= 1;

        // Slope from guard to player
        var m = (this.y - player.y) / (this.x - player.x);
        var angle = camera.slopeToAngle(m);

        // BUG: If this causes the bullet to pass the 360 degree mark, it will cause the guard to shoot backwards
        angle += camera.map(Math.random(), 0, 1, GUARD_ACCURACY * -1, GUARD_ACCURACY);
        m = camera.angleToSlope(angle);
        var d = BULLET_SPEED;

        var r = Math.sqrt(1 + (m * m));

        var speedX = 0 + (d / r);
        var speedY = 0 + (d * m / r);

        if(player.x < this.x) {
          speedX *= -1;
          speedY *= -1;

        }





        game.bullets.push(new Bullet(this.x, this.y, speedX, speedY, this, this.weapon.damage));
        game.world.noise.push(new Noise(this.x, this.y, this.weapon.noise));
      } else {
        // Reload
        // Don't bother to get the ammoTotal, because guards have infinite ammo
        this.weapon.ammo = this.weapon.ammoPerClip;
        console.log("Guard reloading");
        this.weapon.resetTimestamp = clock.now() + this.weapon.timeToReload;
      }

    }
  }


  this.update = function() {

    if(!this.alive) {
      return undefined;
    }

    // Check for damage by bullets
    // TODO: Damage modifier if the guard is unaware?
    for (var i = 0; i < game.bullets.length; i++) {
      if(game.bullets[i].shooter !== this &&  camera.distance(game.bullets[i].x, game.bullets[i].y, this.x, this.y) <= this.width) {
        if(this.mode === 'FIGHT' || (this.mode === 'INVESTIGATE' && clock.now() > this.modeSwitchTimestamp)) {
          // TODO: Should the sneak damage modifier be applied when the guard is investigating? Maybe a lesser modifier?
          this.health -= game.bullets[i].damage;
          console.log("sneak modifier not used");
        } else {
          this.health -= game.bullets[i].damage * GUARD_SNEAK_MODIFIER;
          console.log("sneak modifier used");
        }

        game.bullets[i].active = false;
      }
    }

    if(this.health <= 0) {
      this.alive = false;
    }


    if (this.mode === 'STATION') {
      this.currentSpeed = GUARD_WALK_SPEED;
      if (this.target.x !== this.station.x || this.target.y !== this.station.y) {
        this.target.x = this.station.x;
        this.target.y = this.station.y;
        this.setPath(this.target.x, this.target.y);
      }

      // Check for can see player
      if(this.canSeePlayer()) {
        this.mode = 'FIGHT';
        this.startExclaim();
        this.modeSwitchTimestamp = clock.now() + GUARD_REACTION_TIME;
      }

      // Check for noise
      for (var i = 0; i < game.world.noise.length; i++) {
        if(camera.distance(game.world.noise[i].x, game.world.noise[i].y, this.x, this.y) <= game.world.noise[i].amount) {
          console.log("I can hear you!");

          // Begin an investigation
          this.mode = 'INVESTIGATE';
          this.startQuestion();
          this.modeSwitchTimestamp = clock.now() + GUARD_REACTION_TIME;
          this.target.x = game.world.noise[i].x;
          this.target.y = game.world.noise[i].y;
          this.setPath(this.target.x, this.target.y);
        }
      }

    } else if (this.mode === 'INVESTIGATE') {
      this.currentSpeed = GUARD_WALK_SPEED;
      if(clock.now() >= this.target.investigate_done) {
        this.target.x = this.station.x;
        this.target.y = this.station.y;
        this.setPath(this.target.x, this.target.y);
        this.mode = 'STATION';
        this.target.investigate_done = undefined;
      }

      // Check for can see player
      if(this.canSeePlayer()) {
        this.mode = 'FIGHT';
        this.startExclaim();
        this.modeSwitchTimestamp = clock.now() + GUARD_REACTION_TIME;
      }

      // TODO: Should the guard continually check for noise while investigating?
      // Check for noise
      for (var i = 0; i < game.world.noise.length; i++) {
        if(camera.distance(game.world.noise[i].x, game.world.noise[i].y, this.x, this.y) <= game.world.noise[i].amount) {
          console.log("I can hear you!");

          // Begin an investigation
          this.mode = 'INVESTIGATE';
          this.startQuestion();
          this.modeSwitchTimestamp = clock.now() + GUARD_REACTION_TIME;
          this.target.x = game.world.noise[i].x;
          this.target.y = game.world.noise[i].y;
          this.setPath(this.target.x, this.target.y);
        }
      }

      // if investigating, continue to check for noises
      // Check for noise
      for (var i = 0; i < game.world.noise.length; i++) {
        if(camera.distance(game.world.noise[i].x, game.world.noise[i].y, this.x, this.y) <= game.world.noise[i].amount) {
          console.log("I can hear you!");

          // Begin an investigation
          this.mode = 'INVESTIGATE';
          this.startQuestion();
          this.modeSwitchTimestamp = clock.now() + GUARD_REACTION_TIME;
          this.target.x = game.world.noise[i].x;
          this.target.y = game.world.noise[i].y;
          this.setPath(this.target.x, this.target.y);
        }
      }


    } else if (this.mode === 'FIGHT') {
      // TODO: Don't allow a door to be in the way.
      this.currentSpeed = GUARD_RUN_SPEED;

      // If not in the correct range of the player, move to the correct distance
      var dist = camera.distance(this.x, this.y, player.x, player.y);
      var target_dist = camera.distance(this.target.x, this.target.y, player.x, player.y);
      if (((dist < GUARD_FIGHT_MIN_DISTANCE || dist > GUARD_FIGHT_MAX_DISTANCE) && this.path.length === 0) || target_dist < GUARD_FIGHT_MIN_DISTANCE || target_dist > GUARD_FIGHT_MAX_DISTANCE) {
        // Find a new node in the correct range

        var newTargets = camera.findNodeDistance(player.x, player.y, (GUARD_FIGHT_MIN_DISTANCE + GUARD_FIGHT_MAX_DISTANCE) / 2, Math.abs(GUARD_FIGHT_MIN_DISTANCE - GUARD_FIGHT_MAX_DISTANCE) / 2);

        var randomNode = newTargets[Math.floor(Math.random()*newTargets.length)];
        this.target.x = randomNode.x;
        this.target.y = randomNode.y;
        this.setPath(this.target.x, this.target.y);
      }

      this.shoot();
      var m = (this.y - player.y) / (this.x - player.x);
      this.target.direction = camera.slopeToAngle(m);
      if(this.x < player.x) {
        this.target.direction += 180;
      }

      // Point toward player
      if (this.direction !== this.target.direction) {
        // only use the x value of this function
        this.direction = camera.moveToward(this.direction, 0, this.target.direction, 0, GUARD_PIVOT_SPEED)[0];
      }

    }

    // Move toward target defined by this.target.x and this.target.y

    if (this.path.length > 0) {
      var newCoords = camera.moveToward(this.x, this.y, this.path[this.path.length - 1].x, this.path[this.path.length - 1].y, this.currentSpeed);

      var changeX = this.x - newCoords[0];
      var changeY = this.y - newCoords[1];
      var m = changeY / changeX;

      if(changeX >= 0) {
        this.target.direction = camera.slopeToAngle(m);
      } else {
        this.target.direction = camera.slopeToAngle(m) + 180;
      }

      this.x = newCoords[0];
      this.y = newCoords[1];

    } else if(this.x !== this.target.x || this.y !== this.target.y) {
      var newCoords = camera.moveToward(this.x, this.y, this.target.x, this.target.y, this.currentSpeed);

      this.x = newCoords[0];
      this.y = newCoords[1];
    }

    // Change direction
    if (this.direction !== this.target.direction) {
      // only use the x value of this function
      this.direction = camera.moveToward(this.direction, 0, this.target.direction, 0, GUARD_PIVOT_SPEED)[0];
    }

    if(this.path.length > 0 && camera.distance(this.x, this.y, this.path[this.path.length - 1].x, this.path[this.path.length - 1].y) < 100) {
      this.path.pop();
      if(this.path.length <= 0 && this.mode === 'INVESTIGATE') {
        this.target.investigate_done = clock.now() + 3000;
      }
    }

    // If touching a door, open it.
    for (var i = 0; i < game.world.rooms.length; i++) {
      for (var j = 0; j < game.world.rooms[i].doors.length; j++) {
        var door = game.world.rooms[i].doors[j];
        if (camera.distance(this.x, this.y, door.x + (door.width / 2), door.y + (door.height / 2)) < 200) {
          door.guardOpen();
        }
      }
    }




  };

  this.findClosestNode = function() {
    var nodes = game.world.nodes;
    var best = {
      node: undefined,
      distance: 1000000000000
    };

    for (var i = 0; i < nodes.length; i++) {
      for (var j = 0; j < nodes[i].length; j++) {
        var node = nodes[i][j];
        if(!node) {
          continue;
        }
        if (camera.distance(this.x, this.y, node.x, node.y) <= best.distance) {
          best.node = node;
          best.distance = camera.distance(this.x, this.y, node.x, node.y);
        }
      }
    }

    return best.node;
  };

  /**
   * Sets the guards path to the node closest to the given point
   * @param  {Number} x The coordinate to go to (in world units)
   * @param  {Number} y The coordinate to go to (in world units)
   * @return {undefined}   no return value
   */
  this.setPath = function(x, y) {
    // TODO: Path finding is causing delays in rendering, move pathfinding to another thread and continue rendering frames in the meantime
    var currentNode = this.findClosestNode();
    var targetNode = camera.findNodeAtPoint(x, y);
    this.path = game.world.astar.findPath(currentNode.gridX, currentNode.gridY, targetNode.gridX, targetNode.gridY);
  };

  this.canSeePlayer = function() {

    for (var i = 0; i < game.world.rooms.length; i++) {

      // Check all walls
      for (var j = 0; j < game.world.rooms[i].walls.length; j++) {
        var wall = game.world.rooms[i].walls[j];

        if(camera.checkSegmentRectangleIntersection(this.x, this.y, player.x, player.y, wall.x, wall.y, wall.width, wall.height)) {

          return false;
        }
      }

      // Also check doors
      for(var j = 0; j < game.world.rooms[i].doors.length; j++) {
        var door = game.world.rooms[i].doors[j];

        if(camera.checkSegmentRectangleIntersection(this.x, this.y, player.x, player.y, door.x, door.y, door.width, door.height)) {
          return false;
        }
      }
    }


    // TODO: Reverse the order of these checks to improve performance
    // Has straight line of sight to player, check if angles are correct
    var m = (this.y - player.y) / (this.x - player.x);
    var angle = camera.slopeToAngle(m);

    // If the player is behind the guard, reverse the angle
    if(this.x < player.x) {
      angle += 180;
    }
    if(Math.abs(camera.angleDistance(angle, this.direction)) < GUARD_FOV / 2) {
      return true;
    }

    return false;


  };

  this.canSee = function(x, y) {
    for (var i = 0; i < game.world.rooms.length; i++) {

      // Check all walls
      for (var j = 0; j < game.world.rooms[i].walls.length; j++) {
        var wall = game.world.rooms[i].walls[j];

        if(camera.checkSegmentRectangleIntersection(this.x, this.y, x, y, wall.x, wall.y, wall.width, wall.height)) {

          return false;
        }
      }

      // Also check doors
      for(var j = 0; j < game.world.rooms[i].doors.length; j++) {
        var door = game.world.rooms[i].doors[j];

        if(camera.checkSegmentRectangleIntersection(this.x, this.y, x, y, door.x, door.y, door.width, door.height)) {
          return false;
        }
      }
    }

    // TODO: Reverse the order of these checks to improve performance
    // Has straight line of sight to player, check if angles are correct
    var m = (this.y - y) / (this.x - x);
    var angle = camera.slopeToAngle(m);

    // If the player is behind the guard, reverse the angle
    if(this.x < x) {
      angle += 180;
    }
    if(Math.abs(camera.angleDistance(angle, this.direction)) < GUARD_FOV / 2) {
      return true;
    }

    return false;
  }

}
