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

function WeaponCrate (x, y, width, height, weapon, triggerEnd = false) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.weapon = weapon;

  this.color = '#dcf499';

  this.endOpen = undefined;
  this.active = true;
  this.triggerEnd = triggerEnd;

  this.img = 'crate';

  this.open = function() {
    if(this.endOpen === undefined) {
      this.endOpen = clock.now() + CRATE_OPEN_TIME;
    } else if(this.active && this.endOpen < clock.now()) {
      this.active = false;
      game.world.items.push(new WeaponItem(this.x, this.y, this.weapon.width, this.weapon.height, "#000", this.weapon));
      if(this.triggerEnd) {
        setTimeout(function() {
          // Set off the alarm
          camera.alarmSounding = true;
          setTimeout( function() {
            // Force open the final door(s)
            for (var i = 0; i < game.world.rooms.length; i++) {
              var room = game.world.rooms[i];
              for (var j = 0; j < room.doors.length; j++) {
                var door = room.doors[j];
                if (door.openOnEnd) {
                  door.forceOpen();
                }
              }

            }


            // Spawn many guards
            for (var i = 0; i < 6; i++) {
              setTimeout(function() {
                var guard = new Guard(-2559, -6158, 90);
                guard.mode = 'FIGHT'
                guard.startExclaim();
                game.world.guards.push(guard);
              }, 500 * i)

            }


          }, 250);


        }, 750);
      }
    }
  }

  this.close = function() {
    this.endOpen = undefined;
  }


}
