/**
 * A list of all loaded images
 * @type {Object}
 */
let allImages = {};

/**
 * The setup function. Does initial setup for the program. Called once by p5.js
 *   on the program start
 * @return {undefined} No return value
 */
function setup() {
  createCanvas(windowWidth, windowHeight);
  cam.updateSize();

  // hide scroll bars
  document.documentElement.style.overflow = 'hidden'; // firefox, chrome
  document.body.scroll = 'no'; // ie only

  player.image = loadImage('guy.png');
  crate = new Item('crate', 0, 0, loadImage('/assets/items/crate.png'), player.width,
      player.height);


  // Load images
  allImages.crate = loadImage('assets/items/crate.png')

}
