var cam = {
  x : 0,
  y : 0,
  width : 2000,
  height : 2000,

  // determines if the given point is on screen
  onScreen : function(pointX, pointY) {
    if (pointX < this.originX() || pointY < this.originY() || pointX > this.originX() + this.width || pointY > this.originY() + this.height){
      return false;
    } else {
      return true;
    }
  },

  // determines if the object is on the screen
  objectOnScreen : function(item) {

    if (this.onScreen(item.x - (item.width/2), item.y - (item.height/2)) ||
        this.onScreen(item.x + (item.width/2), item.y - (item.height/2)) ||
        this.onScreen(item.x - (item.width/2), item.y + (item.height/2)) ||
        this.onScreen(item.x + (item.width/2), item.y + (item.height/2)) ) {
          return true;
        } else {
          return false;
        }
  },

  // returns the x coord of the upper left point of the camera
  originX : function() {
    return this.x - (this.width/2);
  },
  originY : function() {
    return this.y - (this.height/2);
  }


}
