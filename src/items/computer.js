function Computer(x, y, info) {
  this.x = x;
  this.y = y;
  this.width = 100;
  this.height = 100;

  this.color = '#9f9f9f';
  this.active = true;
  this.info = info;

  this.onPlayerActivate = function() {
    // Pause the game
    game.pause();

    // Update the info in the box
    $('#infoTo').text('TO: ' + this.info.to);
    $('#infoFrom').text('FROM: ' + this.info.from);
    $('#infoSubject').text('SUBJECT: ' + this.info.subject);
    $('#infoBody').text(this.info.body);

    // Show the box
    $('.info').show();
  }
}
