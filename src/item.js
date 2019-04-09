function Item(x, y, width, height, color, onPlayerActivate, newWeapon = undefined) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = color;
  this.active = true;

  this.newWeapon = newWeapon;

  /**
   * A function that will be called when the player activates the object
   * @type {function}
   */
  this.onPlayerActivate = onPlayerActivate;
}
