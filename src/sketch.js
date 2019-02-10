var crate;

// 1 PIXEL/WORLD UNIT = 1 CM

/**
 * The setup function. Does initial setup for the program. Called once by p5.js
 *   on the program start
 * @return {undefined} No return value
 */
function setup() {
  createCanvas(windowWidth,windowHeight);
  cam.updateSize();

  // hide scroll bars
  document.documentElement.style.overflow = 'hidden';  // firefox, chrome
  document.body.scroll = "no"; // ie only

  player.image = loadImage("guy.png");
  crate = new Item("crate", 0, 0, "/assets/items/crate.png", player.width, player.height);

}


/**
 * The main loop of the game. This function is called continually by the p5.js library.
 * @return {undefined} No return value
 */
function draw() {
  background("#363636");

  // TODO: update the width and height of the camera based on screen size


  // Get player movements
  player.move();


  cam.drawItem(player);
  cam.drawItem(crate);
}


window.onresize = function() {
  resizeCanvas(windowWidth, windowHeight);
  cam.updateSize();
};
