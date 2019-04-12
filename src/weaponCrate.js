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
      this.endOpen = clock.now() + CRATE_OPEN_TIME;
    } else if(this.active && this.endOpen < clock.now()) {
      this.active = false;
      game.world.items.push(new WeaponItem(this.x, this.y, this.weapon.width, this.weapon.height, "#000", this.weapon, this.weapon.imgString));
    }
  }

  this.close = function() {
    this.endOpen = undefined;
  }


}
