function Computer(x, y, info) {
  this.x = x;
  this.y = y;
  this.width = 100;
  this.height = 100;

  this.color = '#9f9f9f';
  this.active = true;
  this.info = info;

  this.onPlayerActivate = function() {
    game.pause();
    $('.info').show();
  }
}
