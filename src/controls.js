/**
 * Provides control functionality
 * Allows for easy customization of the controls, and a centralized control
 *   system
 * @type {Object}
 */
let controls = {
  /**
   * Contains the key bindings for all of the controls of the game
   * @type {Object}
   */
  bindings: {
    'MOVE_UP': [38, 87], // up arrow and 'w' key
    'MOVE_LEFT': [37, 65], // left arrow and 'a' key
    'MOVE_RIGHT': [39, 68], // right arrow and 'd' key
    'MOVE_DOWN': [40, 83], // down arrow and 'd' key
    'CROUCH': [16], // shift
    'SPRINT': [32], // space
  },

  /**
   * Stores the currently pressed and not pressed keys.
   * @type {Object}
   */
  current: {

  },
  /**
   * Checks if the given control is currently pressed.
   * If a nonexistant control is passed, False is returned
   * @param  {String} control  the name of the control (as a string)
   * @return {Boolean}         True if the key is pressed, False if it is not
   */
  isControlPressed: function( control ) {
    if (this.bindings.hasOwnProperty(control)) {
      // List of all the options for keys to press to activate the control
      const options = this.bindings[control];

      for (let i = 0; i < options.length; i++) {
        if (keyIsDown(options[i])) {
          return true;
        }
      }

      // if a matching control has not been found after looping through the
      // entire list, return false
      return false;
    } else { // if the control does not have a binding, return false
      return false;
    }
  },

  /**
   * Logs all of the controls and if they are currently pressed or not
   * (For debugging)
   * @return {undefined} No return value
   */
  logControls: function() {
    console.log('====CURRENT CONTROLS===========================');

    Object.keys(this.bindings).forEach((key) => {
      console.log('    ' + key.toString() + '  ' +
        controls.isControlPressed(key).toString());
    });

    console.log('===============================================');
  },
};


$(document).keypress(function(e){
    var checkWebkitandIE=(e.which==26 ? 1 : 0);
    var checkMoz=(e.which==122 && e.ctrlKey ? 1 : 0);

    if (checkWebkitandIE || checkMoz) $("body").append("<p>ctrl+z detected!</p>");
});
