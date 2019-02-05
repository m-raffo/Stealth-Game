var canvas;
var guy = {
  // image : loadImage("guy.png"),
  x : 0,
  y : 0,
  width: 100,
  height : 100
}

var cam = {
  x : 0,
  y : 0,
  width : 500,
  height : 500,

  onScreen : function(pointX, pointY) {
    if (pointX < this.x || pointY < this.y || pointX > this.x + width || pointY > this.y + height){
      return false;
    } else {
      return true;
    }
  },

  // returns the x coord of the upper left point of the camera
  originX : function() {
    return this.x - (width/2);
  },
  originY : function() {
    return this.y - (height/2);
  }


}

function setup() {
  canvas = createCanvas(windowWidth,windowHeight);

  // hide scroll bars
  document.documentElement.style.overflow = 'hidden';  // firefox, chrome
  document.body.scroll = "no"; // ie only

  guy.image = loadImage("guy.png");

}



function draw() {
  background("#363636");

  drawItem(guy);



}



// Takes in an item with x and y variables, uses cam variable
// display it in the correct location onscreen
function drawItem(item) {

  // if offscreen, return null
  if (cam.onScreen(item.x - (item.width/2), item.y - (item.height/2)) ||
      cam.onScreen(item.x + (item.width/2), item.y - (item.height/2)) ||
      cam.onScreen(item.x - (item.width/2), item.y + (item.height/2)) ||
      cam.onScreen(item.x + (item.width/2), item.y + (item.height/2)) ) {


      // these variables are not totally necessay, created to improve readability
      var imageWidth = item.width;
      var imageHeight = item.height;


      console.log("Drawing image!!!");
      console.log(item.x - cam.originX());
      console.log();


      image(item.image, (item.x - cam.originX()) - (imageWidth / 2), (item.y - cam.originY()) - (imageWidth / 2), imageWidth, imageHeight);

  } else {
    console.log("Offscreen");
    return null;
  }

}

window.onresize = function() {
  resizeCanvas(windowWidth, windowHeight)
};
