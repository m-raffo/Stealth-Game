/**
 * Keeps track of the passage of time in-game. Pauses the clock during pause, etc.
 * @type {Object}
 */
let clock = {
  startTime: Date.now(),

  /**
   * Used to keep track of time already passed at start time
   * @type {Number}
   */
  amountAtStart: 100,
  /**
   * PLAY if the clock is currently running. PAUSE if not
   * @type {String}
   */
  state: 'PLAY',

  now: function() {
    return Date.now() - this.startTime + this.amountAtStart;
  },

  pause: function() {
    this.amountAtStart = this.now();
    this.state = 'PAUSE';
  },

  play: function() {
    this.startTime = Date.now();
    this.state = 'PLAY';
  }
};
