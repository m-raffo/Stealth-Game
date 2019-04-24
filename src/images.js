let assets = {
  images: {},
  sounds: {},
};

var weapons = {
};


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
    'silentpistol': 'assets/silentpistol.png',
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

  downloadSounds: function() {
    assets.sounds.pistol = new Howl({
      src: ['/assets/sounds/pistol.wav'],
    });

    assets.sounds.silenced = new Howl({
      src: ['/assets/sounds/silenced.wav'],
    });

    assets.sounds.shotgun = new Howl({
      src: ['/assets/sounds/shotgun.wav'],
    });

    assets.sounds.uzi = new Howl({
      src: ['/assets/sounds/uzi.wav'],
    });

    assets.sounds.ak = new Howl({
      src: ['/assets/sounds/ak.wav'],
    });

    assets.sounds.mini = new Howl({
      src: ['/assets/sounds/minigun.wav'],
    });

    assets.sounds.alarm = new Howl({
      src: ['/assets/sounds/alarm.wav'],
      loop: true
    });

    assets.sounds.whistle = new Howl({
      src: ['/assets/sounds/whistle.wav'],
    });

    assets.sounds.background = new Howl({
      src: ['/assets/sounds/background.wav'],
      loop: true,
      autoplay: true,
    });

    assets.sounds.click = new Howl({
      src: ['/assets/sounds/click.wav'],

    });
  }


}




// }

// images.queueDownload('assets/pistol.png', 'pistol');
//
// player.weapon.img = images.pistol;
//
// player.weapon.imgString = "pistol";
