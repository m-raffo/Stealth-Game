function Medpack(x, y, healAmount) {
  this.x = x;
  this.y = y;

  this.width = 100;
  this.height = 100;

  this.color = '#fff';
  this.active = true;

  this.healAmount = healAmount;

  this.onPlayerActivate = function() {
    if(!this.active) {
      return;
    }
    player.health += this.healAmount;
    if(player.health > PLAYER_MAX_HEALTH) {
      player.health = PLAYER_MAX_HEALTH;
    }

    this.active = false;
  }
}
