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
    box.element.style.left = box.pos + 'px';

    controls.logControls();
  }
 };
