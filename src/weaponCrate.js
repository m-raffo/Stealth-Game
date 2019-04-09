/**
 * Time in milliseconds that it takes to open a crate
 * @type {Number}
 * @constant
 * @default
 */
const CRATE_OPEN_TIME = 750;

/**
 * Creates a crate the holds a weapon
 * @param       {[type]} x      [description]
 * @param       {[type]} y      [description]
 * @param       {[type]} width  [description]
 * @param       {[type]} height [description]
 * @param       {[type]} weapon [description]
 * @constructor
 */

function WeaponCrate (x, y, width, height, weapon) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.weapon = weapon;

  this.color = '#dcf499';

  this.endOpen = undefined;
  this.active = true;

  this.open = function() {
    if(this.endOpen === undefined) {
      this.endOpen = Date.now() + CRATE_OPEN_TIME;
    } else if(this.endOpen < Date.now()) {
      this.active = false;
      game.world.items.push(new Item(this.x, this.y, 100, 100, '#545454', function() {
        player.weapon = this.newWeapon;
        this.active = false;
      }, weapons.shotgun));
    }
  }

  this.close = function() {
    this.endOpen = undefined;
  }


}
