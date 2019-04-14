let assets = {
  images: {},
};

var weapons = {};


// window.onload = function() {
let assetManager = {
  successCount: 0,
  errorCount: 0,
  weaponsLoaded: 0,
  imageSources: {
    'pistol': '/assets/pistol.png',
    'ak47': 'assets/ak47.png',
    'uzi': 'assets/uzi.png',
    'crate': 'assets/crate.png',
    'concrete': 'assets/concrete.png',
    'computer': 'assets/computer.png',
    'revolver': 'assets/revolver.png',
    'pumpshot': 'assets/pumpshot.png',
    'dbshot': 'assets/dbshot.png',
    'minigun': 'assets/minigun.png',
    'sniper': 'assets/sniper.png',
    'dmr': 'assets/dmr.png',
    'ar': 'assets/ar.png',
  },

  weaponSources: {
    'shotgun': '/items/weapons/shotgun.json',
    'pistol': '/items/weapons/pistol.json',
    'revolver': '/items/weapons/revolver.json',
    'uzi': '/items/weapons/uzi.json',
    'ak': '/items/weapons/ak.json',
    'dbshot': '/items/weapons/dbshotgun.json',
    'minigun': '/items/weapons/minigun.json',
    'sniper': '/items/weapons/sniper.json',
    'dmr': '/items/weapons/dmr.json',
    'silentpistol': '/items/weapons/silentpistol.json',
    'ar': '/items/weapons/ar.json',
  },

  isDone: function() {
    return ((Object.keys(this.imageSources).length === this.successCount + this.errorCount) && Object.keys(this.weaponSources).length === this.weaponsLoaded);

  },

  downloadWeapons: function() {
    for (var name in this.weaponSources) {
      console.log("Begin downloading", this.weaponSources[name])
      $.getJSON(this.weaponSources[name], function(data) {
        console.log("Weapon downloaded");
        weapons[data.name] = data;
        assetManager.weaponsLoaded++;
        if(assetManager.isDone()) {
          startGame();
        }
      })
    }
  },

  downloadImages: function() {
    for (var name in this.imageSources) {
      if (this.imageSources.hasOwnProperty(name)) {
          var path = this.imageSources[name];
          var img = new Image();

          img.addEventListener("load", function() {
            assetManager.successCount++;
            if(assetManager.isDone()) {
              startGame();
            }
          }, false);

          img.addEventListener("error", function() {
              assetManager.errorCount++;

              if(assetManager.isDone()) {
                startGame();
              }
          }, false);

          img.src = path;
          assets.images[name] = img;
          console.log("Loading Asset: " + name);

      }
    }
  },


}




// }

// images.queueDownload('assets/pistol.png', 'pistol');
//
// player.weapon.img = images.pistol;
//
// player.weapon.imgString = "pistol";