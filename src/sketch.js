
// 1 PIXEL/WORLD UNIT = 1 CM

/**
 * The main loop of the game. This function is called continually by the p5.js
 * library.
 * @return {undefined} No return value
 */
function gameLoop() {
  background('#363636');

  // TODO: update the width and height of the camera based on screen size


  // Get player movements
  player.move();

  cam.drawLevel(level1)
  cam.drawItem(player);

  // cam.drawItem(crate);
}

// PUT ALL INITILIZATION FUNCTIONS HERE
window.onload = function() {

  // hide scroll bars
  document.documentElement.style.overflow = 'hidden'; // firefox, chrome
  document.body.scroll = 'no'; // ie only


  canvasInitilization();

  game.canvas.element.width = window.innerWidth;
  game.canvas.element.height = window.innerHeight;

  game.canvas.fillBackground("#5e01bb");

  assetsInitilization();


}
