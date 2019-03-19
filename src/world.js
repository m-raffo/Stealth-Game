/**
 * Define the namespace for all game operations
 * @namespace
 */
let game = {
  lastFrameTimeMs: 0,
  delta: 0,

  update: function(delta) {
    box.pos += box.velocity * delta;
    // Switch directions if we go too far
    if (box.pos >= box.limit || box.pos <= 0) box.velocity = -box.velocity;
  },

  mainLoop: function(timestamp) {
    // Throttle the frame rate.
    if (timestamp < this.lastFrameTimeMs + (1000 / MAX_FPS)) {
        requestAnimationFrame(game.mainLoop);
        return;
    }
    this.delta += timestamp - this.lastFrameTimeMs;
    this.lastFrameTimeMs = timestamp;

    while (this.delta >= TIMESTEP) {
        update(TIMESTEP);
        this.delta -= TIMESTEP;
    }
    camera.draw();
    requestAnimationFrame(game.mainLoop);
  }
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
