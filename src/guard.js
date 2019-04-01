function Guard(startX, startY, direction){
  this.x = startX;
  this.y = startY;

  this.width = 100;
  this.height = 100;

  /**
   * Color for the guard (if no texture)
   * @type {String}
   * @default
   */
  this.color = '#c31515';

  this.station = {
    x: startX,
    y: startY,
    direction: direction
  };


}
