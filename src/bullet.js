/**
 * Creates a bullet object
 * @param       {Number} x    the x position to start the bullet
 * @param       {Number} y    the y position to start the bullets
 * @param       {Number} dirX the amount (in wu) to move the bullet in one game step in the x direction
 * @param       {Number} dirY the amount (in wu) to move the bullet in one game step in the y direction
 * @constructor
 */
function Bullet(x, y, dirX, dirY) {
  this.x = x;
  this.y = y;
  this.dirX = dirX;
  this.dirY = dirY;
}
