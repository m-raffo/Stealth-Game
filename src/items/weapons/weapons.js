var weapons = {};

$.getJSON('/items/weapons/shotgun.json', function(data) {
  weapons.shotgun = data;
});
