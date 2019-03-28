/**
 * Define the namespace for all game operations
 * @namespace
 */
let game = {
  lastFrameTimeMs: 0,
  delta: 0,

  /**
   * The object that contains all of the data about the current level.
   * @type {Object}
   */
  world: {
    /**
     * A list of room objects that contains all of the rooms in the level.
     * @type {Array}
     */
    rooms:[
      new Room(10, 10, 1000, 1000, [new Wall(10, 10, 25, 1000)]),
    ]
  },

  update: function(delta) {
    box.pos += box.velocity * delta;
    // Switch directions if we go too far
    if (box.pos >= box.limit || box.pos <= 0) box.velocity = -box.velocity;

    camera.updateSize();
    camera.updatePosition();

    player.move();

    for (var i = 0; i < game.bullets.length; i++) {
      game.bullets[i].move();
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
  bullets: []
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
