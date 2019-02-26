
// 1 PIXEL/WORLD UNIT = 1 CM

/**
 * The main loop of the game. This function is called continually by the p5.js
 * library.
 * @return {undefined} No return value
 */
function draw() {
  background('#363636');

  // TODO: update the width and height of the camera based on screen size


  // Get player movements
  player.move();

  cam.drawLevel(level1)
  cam.drawItem(player);

  // cam.drawItem(crate);
}




window.onresize = function() {
  window.game.canvas.resizeCanvas(windowWidth, windowHeight);
  cam.updateSize();
};
