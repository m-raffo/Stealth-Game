var weapons = {};

$.getJSON('/items/weapons/shotgun.json', function(data) {
  weapons.shotgun = data;
});

$.getJSON('/items/weapons/pistol.json', function(data) {
  weapons.pistol = data;
});

$.getJSON('/items/weapons/revolver.json', function(data) {
  weapons.revolver = data;
});

$.getJSON('/items/weapons/uzi.json', function(data) {
  weapons.uzi = data;
});


player.weapon = JSON.parse(JSON.stringify(weapons.uzi));
