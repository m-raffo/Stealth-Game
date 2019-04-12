

var images = {
  imagesToLoad: 0,
  loadImage: function (src, name, callback) {
    this.imagesToLoad++;

    var img = new Image();
    img.addEventListener('load', function() {
      images.imagesToLoad--;
      images.checkStart();
       callback(img);
     } , false);
    img.src = src;
    images[name] = img;
  },

  checkStart: function() {
    if (this.imagesToLoad === 0) {
      game.start();
    }
  }

}

images.loadImage('assets/pistol.png', 'pistol', function() {});
// 
// player.weapon.img = images.pistol;
//
// player.weapon.imgString = "pistol";
