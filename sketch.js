function setup() {
  createCanvas( window.innerWidth , window.innerHeight);


}

var camera = {
  x : 0,
  y : 0,
  width : 500,
  height : 500
}

function draw() {
  background("#363636");
}



// Takes in an object with x and y variables, uses camera variable
// display it in the correct location onscreen
function drawObject(object) {

  // if offscreen
  if (object.x - (object.width / 2) < camera.x - (camera.width / 2) ||
    object.x + (object.width / 2) > camera.x + (camera.width / 2) ||
    object.y - (object.height / 2) < camera.y - (camera.height / 2) ||
    object.y + (object.height / 2) > camera.y + (camera.height / 2)) {
    return null;
  }
}
