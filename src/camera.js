/**
 * Define the camera namespace for rendering the world
 * @namespace
 */
let camera = {
  /**
   * Draws the current world state to the screen
   * @return {undefined} no return value
   */
  draw: function() {
    // Clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);


    box.element.style.left = box.pos + 'px';


    // draw 2 boxes for testing
    camera.setFill('#cd0477');
    camera.drawBox(10, 10, 100, 100);

    camera.setFill('#1f2a08');
    camera.drawBox(5, 10, 10, 10);

    // Draw the player
    // TODO: Draw the player sprite (instead of box)
    camera.setFill('#b5a60f');
    camera.drawBox(player.x, player.y, 10, 10);


  },

  drawBox: function(x, y, width, height) {
    game.canvas.ctx.beginPath();
    game.canvas.ctx.rect(x, y, width, height);
    game.canvas.ctx.fill();
    game.canvas.ctx.closePath();
  },

  setFill: function(color) {
    game.canvas.ctx.fillStyle = color;
  }
 };
