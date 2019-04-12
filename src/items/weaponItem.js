function WeaponItem(x, y, width, height, color, newWeapon) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = color;
  this.active = true;

  if(newWeapon.img) {
    this.img = newWeapon.img;
  }

  this.newWeapon = newWeapon;
  this.activeTime = clock.now() + 1000;

  /**
   * A function that will be called when the player activates the object
   * @type {function}
   */
  this.onPlayerActivate = function() {
    if(clock.now() < this.activeTime || !this.active) {
      return;
    } else {
      var oldWeapon = player.weapon;
      player.weapon = this.newWeapon;
      this.active = false;
      game.world.items.push(new WeaponItem(player.x, player.y, oldWeapon.width, oldWeapon.height, oldWeapon.color, oldWeapon));

    }
  }
}
