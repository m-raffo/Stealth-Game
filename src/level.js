/**
 * Contains all of the data about the world and the "stuff" (items, weapons,
 * etc.) contained within it.
 * @param {String} name the name of the level
 * @constructor
 */
function Level(name) {
  /**
   * Name of the level, for identification purposes
   * @type {String}
   */
  this.name = name;

  /**
   * An array containing all of the items in the world
   * @type {Array.<Item>}
   */
  this.allItems = [];

  /**
   * Adds an item to the function
   * @param  {Object}    toAdd  the object to add
   * @return {undefined}        no return value
   */
  this.addItem = function(toAdd) {
    this.allItems.push(toAdd);
  }
}

/**
 * Reference to the current level the player is on
 * @type {Object}
 */
let currentLevel;
