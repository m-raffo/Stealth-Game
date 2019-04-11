/**
 * An object containing all of the door codes by door name. Used to place
 * the codes in the world for the player to find, as they change every game
 * @type {Object}
 */
let doorCodes = {};


/**
 * Define the namespace for all game operations
 * @namespace
 */
let game = {
  lastFrameTimeMs: 0,
  delta: 0,

  /**
   * True if the game is running. False if not (ie paused)
   * @type {Boolean}
   */
  running: true,

  hideInfo: function() {
    this.play();
    $('.info').hide();
  },

  pause: function() {
    // BUG: Will delayed function calls mess up the pause? Yes. Better question, are there any important delayed function calls. I forget what they are called
    if(this.running) {
      this.running = false;
      clock.pause();
    }
  },

  play: function() {
    if(!this.running) {
      this.running = true;
      clock.play();
    }
  },

  togglePlayPause: function() {
    if(this.running) {
      this.pause();
    } else {
      this.play();
    }
  },


  /**
   * The object that contains all of the data about the current level.
   * @type {Object}
   */
  world: {

    /**
     * An array of all the noise in the world
     * @type {Array}
     */
    noise: [],



    /**
     * An array of all the items in the world
     * @type {Array}
     */
    items: [
      new WeaponItem(500, 100, 100, 100,'#000', weapons.shotgun),
      new Medpack(1500, 300, 50),
      new Computer(200, 200, {
        to: "fdavidson@chemlab.com",
        from: 'no-reply@chemlab.com',
        subject: 'WEEKLY DOOR CODES',
        get body() {
          return 'Hello Fred, \nThe door code for your office this week is ' + doorCodes['office'] + '. This code will take effect on 9am at the start of this week. \n  \n For security reasons, DELETE THIS MESSAGE AFTER READING!'
        }
      }),

    ],

    crates: [
      new WeaponCrate(450, 450, 200, 200, 'uzi'),
    ],

    /**
     * A list of room objects that contains all of the rooms in the level.
     * @type {Array}
     */
    rooms:[
      new Room(10, 10, 1000, 1000, [
        new Wall(10, 10, 25, 1000),
        new Wall(10, 10, 1000, 25),
        new Wall(1010, 10, 25, 1000),
        new Wall(10, 1010, 100, 25),
        new Wall(510, 1010, 525, 25),
      ],

      [
        new Door(110, 990, 510, 990, 400, 50),
      ]
    ),

      new Room(1010, 10, 1000, 1000, [
        new Wall(1010, 10, 25, 1000),
        new Wall(1010, 10, 1000, 25),
        new Wall(2010, 10, 25, 5000),
        new Wall(1010, 1010, 100, 25),
        new Wall(1510, 1010, 525, 25),
      ],

      [
        new Door(1110, 990, 1510, 990, 400, 50, true, 'office'),
      ]),

      new Room(-990, 10, 1000, 1000, [
        new Wall(-990, 10, 25, 5000),
        new Wall(-990, 10, 1000, 25),
        new Wall(10, 10, 25, 1000),
        new Wall(-990, 1010, 100, 25),
        new Wall(-490, 1010, 525, 25),
      ],

      [
        new Door(-890, 990, -490, 990, 400, 50),
      ]),


      new Room(10, 2035, 1000, 1000, [
        new Wall(10, 2010, 25, 1000),
        new Wall(10, 3010, 1000, 25),
        new Wall(1010, 2010, 25, 1000),
        new Wall(10, 2010, 100, 25),
        new Wall(510, 2010, 525, 25),
      ],

      [
        new Door(110, 1990, 510, 1990, 400, 50)
      ]
    ),

      new Room(1010, 2035, 1000, 1000, [
        new Wall(1010, 2010, 25, 1000),
        new Wall(1010, 3010, 1000, 25),
        new Wall(2010, 2010, 25, 1025),
        new Wall(1010, 2010, 100, 25),
        new Wall(1510, 2010, 525, 25),
      ],

      [
        new Door(1110, 1990, 1510, 1990, 400, 50)
      ]),

      new Room(-990, 2035, 1000, 1000, [
        new Wall(-990, 2010, 25, 1000),
        new Wall(-990, 3010, 1000, 25),
        new Wall(10, 2010, 25, 1000),
        new Wall(-990, 2010, 100, 25),
        new Wall(-490, 2010, 525, 25),
      ],

      [
        new Door(-890, 1990, -490, 1990, 400, 50)
      ]),
    ],

    /**
     * An array containing all of the guards
     * @type {Array.Guard}
     */
    guards: [
      new Guard(1500, 500, -90),
      new Guard(-500, 500, 10),
    ],
  },

  /**
   * Has the pause key been released since being pressed?
   * Prevents very fast switching between paused and unpaused
   * @type {Boolean}
   */
  pauseKeyReleased: true,

  update: function(delta) {
    camera.updateSize();
    camera.updatePosition();

    if(controls.isControlPressed('PAUSE')) {
      if(this.pauseKeyReleased) {
        this.pauseKeyReleased = false;
        this.togglePlayPause();
      }
    } else {
      this.pauseKeyReleased = true;
    }

    if(this.running) {
      player.move();

      for (var i = 0; i < game.world.guards.length; i++) {
        game.world.guards[i].update();

      }

      // Loop backwards to not mess up i if a bullet is removed
      for (var i = game.bullets.length -1; i >= 0; i--) {
        game.bullets[i].move();

        if (!game.bullets[i].active) {
          game.bullets.splice(i, 1);
        }
      }

      // Remove expired noises
      for (var i = game.world.noise.length -1; i >= 0; i--) {
        if(game.world.noise[i].timeEnd > clock.now()) {
          game.world.noise.splice(i, 1);
        }
      }


      // Check if player has activated an object
      for (var i = 0; i < game.world.items.length; i++) {
        var currentItem = game.world.items[i];
        if(controls.isControlPressed('ACTIVATE') &&  camera.distance(player.x, player.y, currentItem.x + (currentItem.width / 2), currentItem.y + (currentItem.height / 2)) <= currentItem.width + player.width) {
          currentItem.onPlayerActivate();
        }
      }


      // Update crates
      for (var i = 0; i < game.world.crates.length; i++) {
        var currentCrate = game.world.crates[i];
        if(controls.isControlPressed('ACTIVATE') &&  camera.distance(player.x, player.y, currentCrate.x + (currentCrate.width / 2), currentCrate.y + (currentCrate.height / 2)) <= currentCrate.width + player.width) {
          currentCrate.open();
        } else {
          currentCrate.close();
        }
      }

      for (var i = 0; i < game.world.rooms.length; i++) {
        var room = game.world.rooms[i];
          // Update Doors
          for (var j = 0; j < room.doors.length; j++) {
            var door = room.doors[j];
            door.update();

          }
      }
    }

  },

  mainLoop: function(timestamp) {
    // Throttle the frame rate.
    if (timestamp < game.lastFrameTimeMs + (1000 / MAX_FPS)) {
        requestAnimationFrame(game.mainLoop);
        return;
    }
    game.delta += timestamp - game.lastFrameTimeMs;
    game.lastFrameTimeMs = timestamp;

    while (game.delta >= TIMESTEP) {
        game.update(TIMESTEP);
        game.delta -= TIMESTEP;
    }
    camera.draw();
    requestAnimationFrame(game.mainLoop);
  },

  /**
   * Holds all of the bullet objects in the world
   * @type {Array}
   */
  bullets: [],
};

/**
 * Stores the maximum number of frames to render per second.
 * @type {Number}
 * @default
 * @constant
 */
const MAX_FPS = 60;

/**
 * The time constant for each render step of the world
 * @type {Number}
 * @constant
 * @default
 */
const TIMESTEP = 1000 / 60;
