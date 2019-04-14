/**
 * An object containing all of the door codes by door name. Used to place
 * the codes in the world for the player to find, as they change every game
 * @type {Object}
 */
let doorCodes = {};

let game = {};

function startGame() {
  defineGame();
  definePlayer();
  defineAstar();
  defineNodes();


  requestAnimationFrame(game.mainLoop);

  /**
   * The canvas element.
   * @type {Object}
   */
  game.canvas = {
      element: document.getElementById("myCanvas")
  }

  game.canvas.ctx = game.canvas.element.getContext("2d");

  game.start();

}

function defineGame() {
  /**
   * Define the namespace for all game operations
   * @namespace
   */
  game = {
    lastFrameTimeMs: 0,
    delta: 0,

    started: false,
    start: function() {
      this.started = true;
    },

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
        // new Computer(200, 200, {
        //   to: "fdavidson@chemlab.com",
        //   from: 'no-reply@chemlab.com',
        //   subject: 'WEEKLY DOOR CODES',
        //   get body() {
        //     return 'Hello Fred, \nThe door code for your office this week is ' + doorCodes['office'] + '. This code will take effect on 9am at the start of this week. \n  \n For security reasons, DELETE THIS MESSAGE AFTER READING!'
        //   }
        // }),

      ],

      crates: [
      ],

      /**
       * A list of room objects that contains all of the rooms in the level.
       * @type {Array}
       */
      rooms:[
        new Room(0, 0, 1500, 1000, [ // room 0
          new Wall(-25, -25, 825.0, 50),
		new Wall(1200.0, -25, 325.0, 50),

          new Wall(-25.0, 975.0, 1550, 50),
          new Wall(-25.0, -25.0, 50, 1050),
          new Wall(1475.0, -25.0, 50, 1050),

        	],

          [
            new Door(790.0, -37, 390.0, -37, 420, 75)
          ]
        ),
        new Room(0, -1500, 1500, 1500, [ // room 1
          new Wall(-25, -1525, 200.0, 50),
		new Wall(575.0, -1525, 425.0, 50),
		new Wall(1400.0, -1525, 125.0, 50),




          new Wall(-25, -25, 825.0, 50),
		new Wall(1200.0, -25, 325.0, 50),


    new Wall(-25, -1525, 50, 75.0),


		new Wall(-25, -1050.0, 50, 1075.0),


          new Wall(1475.0, -1525.0, 50, 1550),

        	],

          [
            new Door(-37, -1460.0, -37, -1060.0, 75, 420),
            new Door(990.0, -1537, 1390.0, -1537, 420, 75, true),
            new Door(165.0, -1537, 565.0, -1537, 420, 75, true)



          ]
        ),

      ],

      /**
       * An array containing all of the guards
       * @type {Array.Guard}
       */
      guards: [
        // new Guard(1500, 500, -90),
        // new Guard(-500, 500, 10),
      ],
    },

    /**
     * Has the pause key been released since being pressed?
     * Prevents very fast switching between paused and unpaused
     * @type {Boolean}
     */
    pauseKeyReleased: true,

    update: function(delta) {
      if(!this.started) {
        return;
      }
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

  game.world.nodes = [];
}




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
