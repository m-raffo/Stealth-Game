var crate;

// 1 PIXEL/WORLD UNIT = 1 CM

function setup() {
  createCanvas(windowWidth,windowHeight);
  cam.updateSize();

  // hide scroll bars
  document.documentElement.style.overflow = 'hidden';  // firefox, chrome
  document.body.scroll = "no"; // ie only

  player.image = loadImage("guy.png");
  crate = new Item("crate", 0, 0, "/assets/items/crate.png", player.width, player.height);

}



function draw() {
  background("#363636");

  // TODO: update the width and height of the camera based on screen size


  // Update sizes
  resizeCanvas(windowWidth, windowHeight);
  cam.updateSize();



  // Get player movements
  player.move();



  drawItem(player);
  drawItem(crate);
}



/**
 * Draws an item on the scree
 * @param  {object} item the item to be drawn
 * @return {undefined}      no return value
 */
function drawItem(item) {

  // if offscreen, return null
  if (cam.objectOnScreen(item)) {


      // these variables are not totally necessay, created to improve readability
      var imageWidth = item.width / cam.width * width;
      var imageHeight = item.height / cam.height * height;



      image(item.image, ((item.x - cam.originX()) / cam.width * width) - (imageWidth / 2), ((item.y - cam.originY()) / cam.height * height) - (imageWidth / 2), imageWidth, imageHeight);

  }

}

window.onresize = function() {
  resizeCanvas(windowWidth, windowHeight);
  cam.updateSize();
};
