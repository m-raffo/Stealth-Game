/**
 * Namespace for all assets (images, music, etc.)
 * @tnamespace
 */
game.assets = {};

/**
 * Stores the value that represents whether all of the assets have been loaded.
 * @type {Boolean}
 * @default
 */
game.assets.allLoaded = false;

/**
 * Loads an image from the url to use in the game
 * @param  {string} url the url to load the image from
 * @return {object}     return the image
 */
game.assets.loadImage = function(url) {
  return new Promise(r => { let i = new Image(); i.onload = (() => r(i)); i.src = url; });
}

// TODO: Should the initilization functions be inside the proper namespace?
/**
 * Load all assets for the game
 * @return {undefined} no return value
 * @async
 */
async function assetsInitilization() {
  game.assets.guy = await game.assets.loadImage("assets/items/guy.png");
  game.assets.crate = await game.assets.loadImage("assets/items/crate.png");

  game.assets.allLoaded = true;

}
