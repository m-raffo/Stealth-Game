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
