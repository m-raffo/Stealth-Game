/**
 * The ideal height for the camera, it is adjusted to meet the player's screen
 *   dimentions
 * @type {Number}
 * @constant
 * @default
 */
const CAM_TARGET_HEIGHT = 3500;
/**
 * The ideal width for the camera, it is adjusted to meet the player's screen
 *   dimentions
 * @type {Number}
 * @constant
 * @default
 */
const CAM_TARGET_WIDTH = 6200;

/**
 * The speed at which the camera tracks the player's movements
 * @type {Number}
 * @constant
 * @default
 */
const CAM_TRACK_SPEED = 0.125;

/**
 * The speed for a room to become dark/light after you enter/ leave
 * @type {Number}
 * @constant
 * @default
 */
const ROOM_HIDE_SPEED = 0.1;

/**
 * Define the camera namespace for rendering the world
 * @namespace
 */
let camera = {

  /**
   * The x coordinate of the camera in the world FROM THE TOP LEFT!!!
   * @type {Number}
   */
  x: 10,

  /**
   * The y coordinate of the camera in the world FROM THE TOP LEFT!!!
   * @type {Number}
   */
  y: -10,

  /**
   * Sets the camera x position so that the given coordinate is in the center
   * @param  {Number} x x coordinate to set
   * @return {undefined}   no return value
   */
  setCenterX: function(x) {
    this.x = x - (this.width / 2);
  },

  /**
   * Sets the camera y position so that the given coordinate is in the center
   * @param  {Number} y y coordinate to set
   * @return {undefined}   no return value
   */
  setCenterY: function(y) {
    this.y = y - (this.height / 2);
  },

  /**
   * Sets the camera position to center around the given coordinates
   * @param  {Number} x x coordinate
   * @param  {Number} y y coordinate
   * @return {undefined}   no return value
   */
  setCenter: function(x, y) {
    this.setCenterX(x);
    this.setCenterY(y);
  },

  /**
   * The width of the camera (in world units)
   * @type {Number}
   */
  width: 100,

  /**
   * The height of the camera (in world units)
   * @type {Number}
   */
  height: 100,

  /**
   * Draws the current world state to the screen
   * @return {undefined} no return value
   */
  draw: function() {
    if(controls.isControlPressed("ACTIVATE")) {
      console.log(this.screenToWorldPoint(controls.mouseX, controls.mouseY))

    }
    if(!game.started) {
      return;
    }
    // Clear canvas
    camera.clear();
    this.setFill('#666');
    this.drawBox(0, 0, game.canvas.element.width, game.canvas.element.height);

    // TODO: Draw the dark boxes covering hidden rooms last (to cover anything visible: bullets, guards, etc.)

    var healthWidth = camera.map(player.health, 0, 100, 0, 40);
    $('.healthDisplayRemaining').width(healthWidth + "%");



    // Draw all rooms
    for (var i = 0; i < game.world.rooms.length; i++) {
      var currentRoom = game.world.rooms[i];
      this.renderRoomFloor(currentRoom);

      // TODO: This code should not be in the draw function: move to update function
      // If inside room, make brighter
      if (this.pointInRect(player.x, player.y, currentRoom.x, currentRoom.y, currentRoom.width, currentRoom.height)) {
        currentRoom.visibility -= ROOM_HIDE_SPEED;
      } else {
        currentRoom.visibility += ROOM_HIDE_SPEED;
      }

      if (currentRoom.visibility < 0) {
        currentRoom.visibility = 0;
      } else if (currentRoom.visibility > 1) {
        currentRoom.visibility = 1;
      }

    }

    // Draw items
    for (var i = 0; i < game.world.items.length; i++) {
      if(game.world.items[i].active) {
        this.renderItem(game.world.items[i]);

      }
    }

    // Draw crates
    for (var i = 0; i < game.world.crates.length; i++) {
      if(game.world.crates[i].active) {
        this.renderItem(game.world.crates[i])
      }
    }


    // Draw the guards
    for (var i = 0; i < game.world.guards.length; i++) {
      var guard = game.world.guards[i];
      this.renderGuard(guard);
    }

    this.setFill('#202020');
    // Draw all bullets
    for (var i = 0; i < game.bullets.length; i++) {
      // TODO: Bullets should not be visible in hidden rooms
      var bullet = game.bullets[i];
      camera.renderEllipse(bullet.x, bullet.y, 10, 10);
    }


    // render room coverings
    for (var i = 0; i < game.world.rooms.length; i++) {
      var currentRoom = game.world.rooms[i];
      this.renderRoomCovering(currentRoom);
    }

    // render room walls
    for (var i = 0; i < game.world.rooms.length; i++) {
      var currentRoom = game.world.rooms[i];
      this.renderRoomWall(currentRoom);
    }

    // render room doors
    for (var i = 0; i < game.world.rooms.length; i++) {
      var currentRoom = game.world.rooms[i];
      this.renderRoomDoor(currentRoom);
    }

    // Draw guard marks
    for (var i = 0; i < game.world.guards.length; i++) {
      camera.renderGuardMarks(game.world.guards[i]);
    }


    // TODO: Draw the player sprite (instead of box)

    // Draw the player (rendering properly)
    camera.setFill('#2eaff4');
    // camera.renderRect(player.x, player.y, 100, 100);
    camera.renderEllipse(player.x, player.y, 100, 100);

    this.setStroke('#e408fb');

    // draw the navigation nodes
    // TEMP: remove this, it's for testing only
    this.setFill('#9430e3');
    if (0) {
      for (var i = 0; i < game.world.nodes.length; i++) {
        for (var j = 0; j < game.world.nodes[i].length; j++) {

          var node = game.world.nodes[i][j];
          if(node) {

            var worldMouseX = camera.screenToWorldPoint(controls.mouseX, controls.mouseY);

            var worldMouseY = worldMouseX[1];
            worldMouseX = worldMouseX[0];

            if (this.distance(node.x, node.y, worldMouseX, worldMouseY) <= node.radius) {
              console.log([node.gridX, node.gridY]);
            }

            this.renderEllipse(game.world.nodes[i][j].x, game.world.nodes[i][j].y, game.world.nodes[i][j].radius, game.world.nodes[i][j].radius);

            for (var k = 0; k < game.world.nodes[i][j].adjacent.length; k++) {
              if(node.adjacent[k]) {
                this.renderLine(node.x, node.y, node.adjacent[k].x, node.adjacent[k].y);

              }
            }
          }

        }

      }
    }

    // TEMP: Only for testing guard.canSee();
    // Creates a grid of which points you can see
    if (true) {
      for(var x = 0; x < 3000; x += 25) {
        for (var y = 1250; y < 10000; y+= 25) {
          if(game.world.guards[0].canSee(x, y)) {
            this.setFill('#009521');
            this.renderRect(x, y, 10, 10);


          } else {
            // this.setFill('#7d1313');
            // this.renderRect(x, y, 10, 10);

          }
        }
      }
    }

    if(controls.isControlPressed('VIEW_NOISE')) {
      // TEMP: Draw a circle showing the player's  noise radius
      this.setFill('rgba(100, 100, 0, .12)');
      this.renderEllipse(player.x, player.y, player.weapon.noise, player.weapon.noise);

      this.setFill('rgba(21,14,237,.22)');
      this.renderEllipse(player.x, player.y, player.noiseLevel, player.noiseLevel);
    }


    // If the game is paused, draw a 'misty' effect over the screen
    // TODO: Paused world be ligher or darker?
    if(!game.running) {
      this.setFill('rgba(255, 255, 255, .5)');
      this.drawBox(0, 0, game.canvas.element.width, game.canvas.element.height);

    }



  },

  /**
   * Draws a rectangle to the screen of the current fill color.
   * @param  {Number} x      x of the upper left corner of the rectanlge
   * @param  {Number} y      y of the upper left corner of the rectangle
   * @param  {Number} width  width of the rectangle
   * @param  {Number} height height of the rectangle
   * @return {undefined}     no return value
   */
  drawBox: function(x, y, width, height) {
    game.canvas.ctx.beginPath();
    game.canvas.ctx.rect(x, y, width, height);
    game.canvas.ctx.fill();
    game.canvas.ctx.closePath();
  },

  /**
   * Draws a rectangle with rounded edges to the screen
   * @param  {Number} x coordinates of the upper left corner
   * @param  {Number} y coordinates of the upper left corner
   * @param  {Number} w width
   * @param  {Number} h height
   * @param  {Number} r radius of the corners
   * @return {undefined}   no return value
   */
  drawRectangleRound: function(x, y, w, h, r){
    game.canvas.ctx.beginPath();
    game.canvas.ctx.moveTo(x+r, y);
    game.canvas.ctx.lineTo(x+w-r, y);
    game.canvas.ctx.quadraticCurveTo(x+w, y, x+w, y+r);
    game.canvas.ctx.lineTo(x+w, y+h-r);
    game.canvas.ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
    game.canvas.ctx.lineTo(x+r, y+h);
    game.canvas.ctx.quadraticCurveTo(x, y+h, x, y+h-r);
    game.canvas.ctx.lineTo(x, y+r);
    game.canvas.ctx.quadraticCurveTo(x, y, x+r, y);
    game.canvas.ctx.fill();
    game.canvas.ctx.closePath();
  },

  /**
   * Draws a triangle to the screen using the current fill color
   * @param  {Number} x1 the coordinates of one of the points of the triangle
   * @param  {Number} y1 the coordinates of one of the points of the triangle
   * @param  {Number} x2 the coordinates of one of the points of the triangle
   * @param  {Number} y2 the coordinates of one of the points of the triangle
   * @param  {Number} x3 the coordinates of one of the points of the triangle
   * @param  {Number} y3 the coordinates of one of the points of the triangle
   * @return {undefined}    no return value
   */
  drawTriangle: function(x1, y1, x2, y2, x3, y3) {
    game.canvas.ctx.beginPath();
    game.canvas.ctx.moveTo(x1, y1);
    game.canvas.ctx.lineTo(x2, y2);
    game.canvas.ctx.lineTo(x3, y3);
    game.canvas.ctx.fill();
    game.canvas.ctx.closePath();
  },

  /**
   * Render a triangle to the screen using the current fill color
   * @param  {Number} x1 the coordinates of one of the points of the triangle (in world units)
   * @param  {Number} y1 the coordinates of one of the points of the triangle (in world units)
   * @param  {Number} x2 the coordinates of one of the points of the triangle (in world units)
   * @param  {Number} y2 the coordinates of one of the points of the triangle (in world units)
   * @param  {Number} x3 the coordinates of one of the points of the triangle (in world units)
   * @param  {Number} y3 the coordinates of one of the points of the triangle (in world units)
   * @return {undefined}    no return value
   */
  renderTriangle: function(x1, y1, x2, y2, x3, y3) {

    // see renderRect() function for math
    var pixelX1 = ((x1 - camera.x) * game.canvas.element.width) / camera.width;
    var pixelY1 = ((y1 - camera.y) * game.canvas.element.height) / camera.height;

    var pixelX2 = ((x2 - camera.x) * game.canvas.element.width) / camera.width;
    var pixelY2 = ((y2 - camera.y) * game.canvas.element.height) / camera.height;

    var pixelX3 = ((x3 - camera.x) * game.canvas.element.width) / camera.width;
    var pixelY3 = ((y3 - camera.y) * game.canvas.element.height) / camera.height;

    this.drawTriangle(pixelX1, pixelY1, pixelX2, pixelY2, pixelX3, pixelY3);
  },

  /**
   * Draws an ellipse to the screen
   * @param  {Number} x       x position of the center of the ellipse
   * @param  {number} y       y position of the center of the ellipse
   * @param  {Number} radiusX x radius of the ellipse
   * @param  {Number} radiusY y radius of the ellipse
   * @return {undefined}         no return value
   */
  drawEllipse: function(x, y, radiusX, radiusY) {
    game.canvas.ctx.beginPath();
    game.canvas.ctx.ellipse(x, y, radiusX, radiusY, 0, 0, 2 * Math.PI);
    game.canvas.ctx.fill();
    game.canvas.ctx.closePath();
  },

  /**
   * Draws a line to the screen (in pixels)
   * @param  {Number} x1 one of the points to draw the line to
   * @param  {Number} y1 one of the points to draw the line to
   * @param  {Number} x2 one of the points to draw the line to
   * @param  {Number} y2 one of the points to draw the line to
   * @return {undefined}    no return value
   */
  drawLine: function(x1, y1, x2, y2) {
    game.canvas.ctx.beginPath();
    game.canvas.ctx.moveTo(x1, y1);
    game.canvas.ctx.lineTo(x2, y2);
    game.canvas.ctx.stroke();
    game.canvas.ctx.closePath();
  },

  drawImage: function(img, x, y, width, height) {
    game.canvas.ctx.imageSmoothingEnabled = false;
    game.canvas.ctx.drawImage(img, x, y, width, height);
  },

  /**
   * Sets the fill color to the given color
   * @param  {color} color the color to fill
   * @return {undefined}       no return value
   */
  setFill: function(color) {
    game.canvas.ctx.fillStyle = color;
  },

  /**
   * Sets the font for drawing text on screen
   * @param  {String} font the font. ex: "30px Arial"
   * @return {undefined}      no return value
   */
  setFont: function(font) {
    game.canvas.ctx.font = font;
  },

  /**
   * Sets the align for drawing text on screen
   * @param  {String} font the align ex: "center"
   * @return {undefined}      no return value
   */
  setFontAlign: function(align) {
    game.canvas.ctx.textAlign = align;
  },

  /**
   * Sets the stroke color for drawings
   * @param  {String} color The color to change to
   * @return {undefined}       no return value
   */
  setStroke: function(color) {
    game.canvas.ctx.strokeStyle = color;
  },

  /**
   * Clears the canvas of all drawings
   * @return {undefined} no return value
   */
  clear: function() {
    game.canvas.ctx.clearRect(0, 0, game.canvas.element.width, game.canvas.element.height);
  },

  /**
   * Draws a rectangle to the screen taking input in world units
   * @param  {Number} x      x coordinate (in world units) of the top left corner
   * @param  {Number} y      y coordinate (in world units) of the top left corner
   * @param  {Number} width  width in world units
   * @param  {Number} height height in world units
   * @return {undefined}        no return value
   */
  renderRect: function(x, y, width, height) {
    /**
     * (wu = world units)
     * number of wu on screen = x - camera.x
     * number of wu on screen / camera.width = ?(num pixels on screen) / camera.pixelWidths
     *
     *
     * (number of wu on screen * camera.pixelWidth) / camera.width = num pixel on screen
     * ((x - camera.x) * camera.pixelWidth) / camera.width = num pixel on screen
     */
    // see math above for explanation
    var pixelX = ((x - camera.x) * game.canvas.element.width) / camera.width;
    var pixelY = ((y - camera.y) * game.canvas.element.height) / camera.height;

    /*
    width / camera.width = ?(pixelWidth) / canvas.width
    (width / camera.width) * canvas.width = ?(pixelWidth)
     */
    var pixelWidth = (width / camera.width) * game.canvas.element.width;
    var pixelHeight = (height / camera.height) * game.canvas.element.height;


    camera.drawBox(pixelX, pixelY, pixelWidth, pixelHeight);
  },

  renderImage: function(img, x, y, width, height) {
    var pixelX = ((x - camera.x) * game.canvas.element.width) / camera.width;
    var pixelY = ((y - camera.y) * game.canvas.element.height) / camera.height;

    /*
    width / camera.width = ?(pixelWidth) / canvas.width
    (width / camera.width) * canvas.width = ?(pixelWidth)
     */
    var pixelWidth = (width / camera.width) * game.canvas.element.width;
    var pixelHeight = (height / camera.height) * game.canvas.element.height;

    this.drawImage(img, pixelX, pixelY, pixelWidth, pixelHeight);
  },

  /**
   * Draws a rectangle to the screen taking input in world units
   * @param  {Number} x      x coordinate (in world units) of the top left corner
   * @param  {Number} y      y coordinate (in world units) of the top left corner
   * @param  {Number} width  width in world units
   * @param  {Number} height height in world units
   * @param  {Number} radius radius of the corner
   * @return {undefined}        no return value
   */
  renderRectRadius: function(x, y, width, height, radius) {
    var pixelX = ((x - camera.x) * game.canvas.element.width) / camera.width;
    var pixelY = ((y - camera.y) * game.canvas.element.height) / camera.height;

    /*
    width / camera.width = ?(pixelWidth) / canvas.width
    (width / camera.width) * canvas.width = ?(pixelWidth)
     */
    var pixelWidth = (width / camera.width) * game.canvas.element.width;
    var pixelHeight = (height / camera.height) * game.canvas.element.height;
    this.drawRectangleRound(pixelX, pixelY, pixelWidth, pixelHeight, radius);
  },

  /**
   * Same as renderRect(), but for ellipse instead
   * @param  {Number} x       x position (in wu)
   * @param  {Number} y       y position (in wu)
   * @param  {Number} radiusX x radius (in wu)
   * @param  {Number} radiusY y radius (in wu)
   * @return {undefined}         no return value
   */
  renderEllipse: function(x, y, radiusX, radiusY) {
    // See renderRect() for math

    var pixelX = ((x - camera.x) * game.canvas.element.width) / camera.width;
    var pixelY = ((y - camera.y) * game.canvas.element.height) / camera.height;

    var pixelWidth = (radiusX / camera.width) * game.canvas.element.width;
    var pixelHeight = (radiusY / camera.height) * game.canvas.element.height;


    camera.drawEllipse(pixelX, pixelY, pixelWidth, pixelHeight);
  },

  /**
   * Renders a line onscreen from the points given in world units
   * @param  {Number} x1 coordinate of the points
   * @param  {Number} y1 coordinate of the points
   * @param  {Number} x2 coordinate of the points
   * @param  {Number} y2 coordinate of the points
   * @return {undefined}    no return value
   */
  renderLine: function(x1, y1, x2, y2) {
    var pixelX1 = ((x1 - camera.x) * game.canvas.element.width) / camera.width;
    var pixelY1 = ((y1 - camera.y) * game.canvas.element.height) / camera.height;

    var pixelX2 = ((x2 - camera.x) * game.canvas.element.width) / camera.width;
    var pixelY2 = ((y2 - camera.y) * game.canvas.element.height) / camera.height;

    this.drawLine(pixelX1, pixelY1, pixelX2, pixelY2);
  },

  /**
   * Renders the given text to the screen
   * @param  {Number} x    the coordinate of the upper left corner of the text
   * @param  {Number} y    the coordinate of the upper left corner of the text
   * @param  {String} text the text to draw
   * @return {undefined}      no return value
   */
  renderTextCenter: function(x, y, text) {
    var pixelX = ((x - camera.x) * game.canvas.element.width) / camera.width;
    var pixelY = ((y - camera.y) * game.canvas.element.height) / camera.height;

    this.drawTextCenter(pixelX, pixelY, text);
  },

  /**
   * Draws the given text to the given pixel coordinates
   * @param  {Number} x    the coordinate of the upper left corner of the text
   * @param  {Number} y    the coordinate of the upper left corner of the text
   * @param  {String} text the text to draw
   * @return {undefined}      no return value
   */
  drawTextCenter: function(x, y, text) {
    this.setFontAlign('center');
    game.canvas.ctx.fillText(text, x, y);
  },

  /**
   * Renders the inputted room to the screen (except for the covering)
   * @param  {Object.Room} room The room to be drawn
   * @return {undefined}      no return value
   */
  renderRoomFloor: function(room) {
    // Draw floor
    this.setFill(room.floorColor);
    this.renderRect(room.x, room.y, room.width, room.height);

    this.renderTiledFloor(assets.images.concrete, room.x, room.y, room.width, room.height);

    // Draw items
    for (var i = 0; i < room.items.length; i++) {
      this.setFill(room.items[i].color);
      this.renderRect(room.items[i].x, room.items[i].y, room.items[i].width, room.items[i].height);
    }

  },

  renderTiledFloor: function(img, startx, starty, width, height) {
    for(var x = startx; x < startx + width; x += img.width) {
      for(var y = starty; y < starty + height; y += img.height) {
        if(x + img.width > startx + width || y + img.height > starty + height) {


          var pixelX = ((x - camera.x) * game.canvas.element.width) / camera.width;
          var pixelY = ((y - camera.y) * game.canvas.element.height) / camera.height;

          var pixelWidth = ((startx + width - x) / camera.width) * game.canvas.element.width;
          var pixelHeight = ((starty + height - y) / camera.height) * game.canvas.element.height;


          game.canvas.ctx.drawImage(img, 0, 0, startx + width - x, starty + height - y, pixelX, pixelY, pixelWidth, pixelHeight);
        } else {
          this.renderImage(img, x, y, img.width, img.height);

        }
      }
    }
  },

  renderRoomWall: function(room) {
    this.setFill('#358c67');
    // Draw walls
    for (var i = 0; i < room.walls.length; i++) {
      var wall = room.walls[i];

      this.renderRect(wall.x, wall.y, wall.width, wall.height);
    }


  },

  renderRoomDoor: function(room) {
    // Draw doors
    for (var i = 0; i < room.doors.length; i++) {
      var door = room.doors[i];
      this.setFill(door.color);
      this.renderRect(door.x, door.y, door.width, door.height);
    }
  },

  /**
   * Renders the inputted room's covering to the screen
   * @param  {Object.Room} room The room to be drawn
   * @return {undefined}      no return value
   */
  renderRoomCovering: function(room) {
    if (room.visibility > 0) {
      // Draw covering
      // TEMP: divided by two to allow me to see what's going on. This must be changed for the final build
      this.setFill('rgba(0, 0, 0, ' + room.visibility / 1+ ')');
      this.renderRect(room.x, room.y, room.width, room.height);
    }


  },

  /**
   * Renders the given to the guard to the screen
   * @param  {Object.Guard} guard the guard to be drawn
   * @return {undefined}        no return value
   */
  renderGuard: function(guard) {

    if(!guard.alive) {
      return undefined;
      // TODO: Render guard body?
    }
    this.setFill(guard.color);

    this.renderEllipse(guard.x, guard.y, guard.width, guard.height);

    var r = 75;
    var x = r * Math.cos(this.degToRad(guard.direction + 180));
    var y = r * Math.sin(this.degToRad(guard.direction + 180));

    this.setFill("#000000");
    this.renderRect(guard.x + x, guard.y + y, 25, 25);

    this.setFill('#fe0a0a');
    this.renderRectRadius(guard.x - (guard.width * 1.25), guard.y + guard.height + 25, guard.width * 2 * 1.25, 40, 3);

    var healthBarWidth = this.map(guard.health, 0, 75, 0, guard.width * 2 * 1.25)

    this.setFill('#0e8113');
    this.renderRectRadius(guard.x - (guard.width * 1.25), guard.y + guard.height + 25, healthBarWidth, 40, 3);




  },

  /**
   * Renders the '?' and '!' to the screen
   * @param  {Object.Guard} guard the guard to be drawn
   * @return {undefined}        no return value
   */
  renderGuardMarks: function(guard) {
    if(!guard.alive) {
      return;
    }
    var time = clock.now() - guard.exclaimStart;
    if (time > 0 && time < ANIM_MARK_STAY_TIME + ANIM_MARK_APPEAR_TIME + ANIM_MARK_APPEAR_TIME) {
      if(time < ANIM_MARK_APPEAR_TIME) {
        this.setFont("bold "  + camera.map(time, 0, ANIM_MARK_APPEAR_TIME, 0, 30) + "px arial");
      } else if (time < ANIM_MARK_APPEAR_TIME + ANIM_MARK_STAY_TIME) {
        this.setFont("bold 30px arial");
      } else {
        this.setFont("bold "  + camera.map(time, 500 + ANIM_MARK_APPEAR_TIME, ANIM_MARK_STAY_TIME + ANIM_MARK_APPEAR_TIME + ANIM_MARK_APPEAR_TIME, 0, 30) + "px arial");
      }

      // TODO: Make this animation smoother

      this.setFontAlign("center");
      this.setFill("#ff0505");

      this.renderTextCenter(guard.x, guard.y - 125, '!');
    } else {
      time = clock.now() - guard.questionStart;
      if (time > 0 && time < ANIM_MARK_STAY_TIME + ANIM_MARK_APPEAR_TIME + ANIM_MARK_APPEAR_TIME) {
        if(time < ANIM_MARK_APPEAR_TIME) {
          this.setFont("bold "  + camera.map(time, 0, ANIM_MARK_APPEAR_TIME, 0, 30) + "px arial");
        } else if (time < ANIM_MARK_APPEAR_TIME + ANIM_MARK_STAY_TIME) {
          this.setFont("bold 30px arial");
        } else {
          this.setFont("bold "  + camera.map(time, 500 + ANIM_MARK_APPEAR_TIME, ANIM_MARK_STAY_TIME + ANIM_MARK_APPEAR_TIME + ANIM_MARK_APPEAR_TIME, 0, 30) + "px arial");
        }

        // TODO: Make this animation smoother

        this.setFontAlign("center");
        this.setFill("#d96918");

        this.renderTextCenter(guard.x, guard.y - 125, '?');
      }
    }




  },

  /**
   * Renders an item to the screen (weapon, health pack, etc.)
   * @param  {Object.Item} item the item to draw (draw using attributes)
   * @return {undefined}      no return value
   */
  renderItem: function(item) {
    // TODO: Implement drawing images / using a render function specific to the object
    if(!item.img) {
      this.setFill(item.color);
      this.renderRect(item.x, item.y, item.width, item.height);
    } else {
      var extra;
      if(item.bounceHeight) {
        extra = item.bounceHeight * (Math.sin(clock.now() / 250));
      } else {
        extra = 0;
      }

      if(item.haveShadow) {
        this.setFill('rgba(60,60,60,.83)');
        this.renderEllipse(item.x + item.width / 2, item.y + 100, 75, 38);

      }

      this.renderImage(assets.images[item.img], item.x, item.y + extra, item.width, item.height);
    }

  },

  /**
   * Determines if the given point is on the screen
   * @param  {Number} x the x coordinate
   * @param  {Number} y y coordinate
   * @return {Boolean}  true if onscreen, false if not
   */
  isOnScreen: function(x, y) {
    // NOTE: The function could be condensed, it is written this way to improve readability
    if (x >= this.x && x < this.x + this.width) {
      if (y >= this.y && y < this.y + this.height) {
        return true;
      }

    }
    return false;
  },

  /**
   * Updates the size of the camera to match the size of the window.
   * Aims to keep the screen in a proportion of 1920*1080.
   * Keeps the ratio of the sides square, to prevent dilation in one axis.
   * @return {undefined} No return value
   */

  updateSize: function() {

    game.canvas.element.width = window.innerWidth;
    game.canvas.element.height = window.innerHeight;

    var windowWidth = game.canvas.element.width;
    var windowHeight = game.canvas.element.height;

    if (windowWidth / windowHeight > 1.7) {
      this.width = CAM_TARGET_WIDTH;
      this.height = CAM_TARGET_WIDTH * windowHeight / windowWidth;
    } else {
      this.width = CAM_TARGET_HEIGHT * windowWidth / windowHeight;
      this.height = CAM_TARGET_HEIGHT;
    }
  },

  /**
   * Converts a point on the screen to a position in the world.
   * @return {Array.Number} A two number list of the coordinates (x,y)
   */
  screenToWorldPoint: function(x, y) {
    var x1 = this.map(x, 0, game.canvas.element.width, this.x, this.x + this.width);
    var y1 = this.map(y, 0, game.canvas.element.height, this.y, this.y + this.height);

    return [x1, y1];
  },

  /**
   * Calculates the linear interlopation between the two given points and the percentage given
   * @param  {Number} x1         x coordinate of point 1
   * @param  {numebr} y1         y coordinate of point 1
   * @param  {Number} x2         x coordinate of point 2
   * @param  {Number} y2         y coordinate of point 2
   * @param  {Number} percentage percent (range from 0 - 1)
   * @return {Array.Number}      A two element array of the result. [x, y]
   */
  lerp: function(x1, y1, x2, y2, percentage) {
    var x = x1 + ((x2 - x1) * percentage);
    var y = y1 + ((y2 - y1) * percentage);

    return [x, y];
  },

  /**
   * Calculate a movement from x1, y1 to x2, y2. Moves in EACH AXIS by the amount given
   * @param  {Number} x1     one of the coordinates
   * @param  {Number} y1     one of the coordinates
   * @param  {Number} x2     one of the coordinates
   * @param  {Number} y2     one of the coordinates
   * @param  {Number} amount the amount to move
   * @return {Array.Number}        coordinates of the result [x, y]
   */
  moveToward: function(x1, y1, x2, y2, amount) {
    var finalX, finalY;
    if (Math.abs(x1 - x2) <= amount) {
      finalX = x2;
    } else if (x1 < x2) {
      finalX = x1 + amount;
    } else if (x1 > x2) {
      finalX = x1 - amount;
    } else {
      finalX = x1;
    }

    if (Math.abs(y1 - y2) <= amount) {
      finalY = y2;
    } else if (y1 < y2) {
      finalY = y1 + amount;
    } else if (y1 > y2) {
      finalY = y1 - amount;
    } else {
      finalY = y1;
    }

    return [finalX, finalY];
  },

  /**
   * Determines if the world is inside
   * @param  {Number} x1     the x position of the point
   * @param  {Number} y1     the y position of the point
   * @param  {Number} x      the x of the upper left of the rectangle
   * @param  {Number} y      the y of the upper left of the rectangle
   * @param  {Number} width  width of rectagle
   * @param  {Number} height height of rectangle
   * @return {Boolean}        True if inside, false if outside
   */
  pointInRect: function(x1, y1, x, y, width, height) {
    if (x1 >= x && x1 <= x + width) {
      if (y1 >= y && y1 <= y + height) {
        return true;
      }
    }

    return false;
  },

  /**
   * Finds the distance between 2 given points
   * @param  {Number} x1 x coordinate of one of the points
   * @param  {Number} y1 y coordinate of one of the points
   * @param  {Number} x2 x coordinate of one of the points
   * @param  {Number} y2 y coordinate of one of the points
   * @return {Number}    the distance between the points
   */
  distance: function(x1, y1, x2, y2) {
    // TODO: Test this function
    return Math.hypot(y2 - y1, x2 - x1);
  },

  // TODO: Move some math functions to their own file?


  /**
   * Checks if the given line passes through the circle
   * @param  {Number} x  x coordinate of the center of the circle
   * @param  {Number} y  y coordinate of the center of the circle
   * @param  {Number} r  radius of the circle
   * @param  {Number} x1 one point of the line coordinate
   * @param  {Number} y1 one point of the line coordinate
   * @param  {Number} x2 one point of the line coordinate
   * @param  {Number} y2 one point of the line coordinate
   * @return {Boolean}    true if passes through, false if not.
   */
  circleLineCollision: function(x, y, r, x1, y1, x2, y2) {

    // TODO: test this function
    var distance = this.distancePointToLine(x, y, x1, y1, x2, y2);

    var intersection = this.findIntersectionBetweenPointAndLine(x, y, x1, y1, x2, y2);

    if (distance <= r) {

      // Check that the intersection is between the x values of the two corners of the rectanlge
      if ((x1 <= intersection[0] && intersection[0] <= x2) || (x1 >= intersection[0] && intersection[0] >= x2)) {
        // Also check the y values
        if ((y1 <= intersection[1] && intersection[1] <= y2) || (y1 >= intersection[1] && intersection[1] >= y2)) {
          return true;
        }
      }
    }

    // if any of the edges are inside the circle, return true
    if (this.distance(x, y, x1, y1) <= r || this.distance(x, y, x2, y2) <= r) {
      return true;
    }




    return false;
  },

  /**
   * Calculates the distance from the given point to a line defined by two points
   * @param  {Number} x  x coordinate of the point
   * @param  {Number} y  y coordinate of the point
   * @param  {Number} x1 x coordinate of the first point of the line
   * @param  {Number} y1 y coordinate of the first point of the line
   * @param  {Number} x2 x coordinate of the second point of the line
   * @param  {Number} y2 y coordinate of the second point of the line
   * @return {Number}    the result
   */
  distancePointToLine: function(x0, y0, x1, y1, x2, y2) {
    // See: https://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line

    // BUG: This won't work for vertical or horizontal lines (maybe)
    // TODO: Further testing of this function

    var a = Math.abs( ((y2 - y1)*x0) - ((x2 - x1) * y0) + (x2 * y1) - (y2 * x1) );

    var b = Math.sqrt(  ((y2 - y1) * (y2 - y1)) + ((x2 - x1) * (x2 - x1) )    );

    return a / b;
  },

  /**
   * Finds the intersection point between:
   * 1. Line through (x1, y1) and (x2, y2)
   * 2. Line thorugh (x3, y3) and (x4, y4)
   * @param  {Number} x1 one of the points of the lines
   * @param  {Number} y1 one of the points of the lines
   * @param  {Number} x2 one of the points of the lines
   * @param  {Number} y2 one of the points of the lines
   * @param  {Number} x3 one of the points of the lines
   * @param  {Number} y3 one of the points of the lines
   * @param  {Number} x4 one of the points of the lines
   * @param  {Number} y4 one of the points of the lines
   * @return {Array.Number}  Coordinates of the intersection
   */
  findIntersection: function(x1, y1, x2, y2, x3, y3, x4, y4) {
    var m1 = (y2 - y1) / (x2 - x1);  // slope for line 1
    var m2 = (y4 - y3) / (x4 - x3);  // slope for line 2

    // This means that line 1 is vertical and m1 = Infinity
    if(x1 === x2) {
      // Just use x1 and solve for the y of the second line
      var x = x1;
      var y = m2 * (x - x3) + y3;
      return [x, y];
    }

    // Same as above for line 2
    if(x3 === x4) {
      // Just use x1 and solve for the y of the second line
      var x = x3;
      var y = m1 * (x - x1) + y1;
      return [x, y];
    }


    // this means that line 1 is horizontal
    if(y1 === y2) {
      /*
      Math:
      y = m2(x - x3) + y3
      y - y3 = m2(x - x3)
      (y - y3) / m2 = (x - x3)
      ((y - y3) / m2) + x3 = x
       */
      var y = y1;
      var x = ((y - y3) / m2) + x3;
      return [x, y];
    }

    // this means that line 1 is horizontal
    if(y3 === y4) {
      var y = y3
      var x = ((y - y1) / m1) + x1;
      return [x, y];

    }


    // TODO: What to do if both lines are horizontal/vertical?
    // TODO: Test this function further

    // Found by solving two linear equations in point-slope form
    // var x = (x2 + (m * y2) + (m * m *x1) - (m * x1)) / (m * m + 1);
    // var x = ((m2 * m1 * x1) + (m2 * y2) - (m2*y1) + x2) / (m1 * m2 + 1);
    var x = ((-1 * x3 * m2) + (m1 * x1) + y3 - y1) / ((-1 * m2) + m1);

    // find the y coordinate by soling a linear equation with the value for x
    var y = m1 * (x - x1) + y1;

    return [x, y];
  },

  /**
   * Checks if line segments defined by 2 points intersect
   * @param  {Number} x1 one of the points of the first line segment
   * @param  {Number} y1 one of the points of the first line segment
   * @param  {Number} x2 one of the points of the first line segment
   * @param  {Number} y2 one of the points of the first line segment
   * @param  {Number} x3 one of the points of the second line segment
   * @param  {Number} y3 one of the points of the second line segment
   * @param  {Number} x4 one of the points of the second line segment
   * @param  {Number} y4 one of the points of the second line segment
   * @return {Boolean}    true if they touch, false if not
   */
  checkSegmentIntersection: function(x1, y1, x2, y2, x3, y3, x4, y4) {
    var intersection = this.findIntersection(x1, y1, x2, y2, x3, y3, x4, y4);
    var intersectX = intersection[0];
    var intersectY = intersection[1];

    // check the point is inside line segment 1
    if(((intersectX >= x1 && intersectX <= x2) || (intersectX <= x1 && intersectX >= x2)) &&

    ((intersectY >= y1 && intersectY <= y2) || (intersectY <= y1 && intersectY >= y2))) {

      // check the point is inside line segment 2
      if(((intersectX >= x3 && intersectX <= x4) || (intersectX <= x3 && intersectX >= x4)) &&

    ((intersectY >= y3 && intersectY <= y4) || (intersectY <= y3 && intersectY >= y4))) {
        return true;
      }
    }

    return false;
  },

  /**
   * Checks if a line segment defined by two points intersects a rectangle defined by the top left edge and a width/height/
   * @param  {Number} x1     The coordinates of the line segment
   * @param  {Number} y1     The coordinates of the line segment
   * @param  {Number} x2     The coordinates of the line segment
   * @param  {Number} y2     The coordinates of the line segment
   * @param  {Number} x      The coordinates of the top left corner of the rect.
   * @param  {Number} y      The coordinates of the top left corner of the rect.
   * @param  {Number} width  Width of the rectangle
   * @param  {Number} height Height of the rectangle
   * @return {Boolean}       true if they collide, false if not
   */
  checkSegmentRectangleIntersection: function(x1, y1, x2, y2, x, y, width, height) {
    // Must check each edge of the rectangle

    // Top edge
    if (this.checkSegmentIntersection(x1, y1, x2, y2, x, y, x + width, y)) {
      return true;
    }

    // Left edge
    if (this.checkSegmentIntersection(x1, y1, x2, y2, x, y, x, y + height)) {
      return true;
    }

    // Right edge
    if (this.checkSegmentIntersection(x1, y1, x2, y2, x + width, y, x + width, y + height)) {
      return true;
    }

    // Bottom edge
    if (this.checkSegmentIntersection(x1, y1, x2, y2, x, y + height, x + width, y + height)) {
      return true;
    }

    // If either point is inside the rectangle
    if(this.pointInRect(x1, y1, x, y, width, height) || this.pointInRect(x2, y2, x, y, width, height)) {
      return true;
    }

    // if none of the above are true, return false
    return false;
  },

  /**
   * Finds the node closest to the point given
   * @param  {Number} x coordinate to search for node near
   * @param  {Number} y coordinate to search for node near
   * @return {Object.Node}   the node closest to the point
   */
  findNodeAtPoint: function(x, y) {
    var nodes = game.world.nodes;
    var best = {
      node: undefined,
      distance: 1000000000000
    };

    for (var i = 0; i < nodes.length; i++) {
      for (var j = 0; j < nodes[i].length; j++) {
        var node = nodes[i][j];
        if(node === undefined) {
          continue;  // only look at not undefined nodes
        }
        if (camera.distance(x, y, node.x, node.y) <= best.distance) {
          best.node = node;
          best.distance = camera.distance(x, y, node.x, node.y);
        }
      }
    }

    return best.node;
  },

  /**
   * Finds the point of intersection between a line and a perpendiclar lines thourgh a point
   * @param  {Number} x1 coordinate of the point
   * @param  {Number} y1 coordinate of the point
   * @param  {Number} x2 coordinate of one point on the line
   * @param  {Number} y2 coordinate of one point on the line
   * @param  {Number} x3 coordinate of one point on the line
   * @param  {Number} y3 coordinate of one point on the line
   * @return {Array.number}    the point of intersection (x, y)
   */
  findIntersectionBetweenPointAndLine: function(x1, y1, x2, y2, x3, y3) {

    // if the line is horizontal
    if (x2 == x3) {
      // the intersection is the x of the line and the y value of the given point
      return [x2, y1];
    } else if (y2 == y3) { // just the opposite if the line is vertical
      return [x1, y2];
    }

    var m1 = (y3 - y2) / (x3 - x2);
    var m2 = -1 / m1;

    // TODO: Test this function more

    // Find another point on the perpendiclar line
    var x4 = x1 + 1;
    var y4 = y1 * m2;

    return this.findIntersection(x1, y1, x4, y4, x2, y2, x3, y3);
  },

  updatePosition: function() {
    var position = this.lerp(this.x + (this.width / 2), this.y + (this.height / 2), player.x, player.y, CAM_TRACK_SPEED);
    this.setCenter(position[0], position[1]);
  },

  /**
   * Maps the input in the range to the output
   * @param  {Number} x       the inputted value
   * @param  {Number} in_min  the minimun possible for the inputted value
   * @param  {Number} in_max  the maximun possible for the inputted value
   * @param  {Number} out_min the minimun output value
   * @param  {Number} out_max the maximum output value
   * @return {Number}         The outputed value
   */
  map: function(x, in_min, in_max, out_min, out_max) {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  },


  slopeToAngle: function(slope) {
    return this.radToDeg(Math.atan(slope));
  },

  angleToSlope: function(angle) {
    return Math.tan(this.degToRad(angle));
  },

  degToRad: function (degree) {
    return degree * (Math.PI/180);
  },

  radToDeg: function (angle) {
  return angle * (180 / Math.PI);
  },

  /**
   * Determines the difference from angle1 to angle2
   * Works even if the angles cross the 360 degree mark
   * @param  {Number} angle1 One of the angles
   * @param  {Number} angle2 One of the angles
   * @return {Number}        The difference
   */
  angleDistance: function(angle1, angle2) {
    return (angle1 - angle2 + 180 + 360) % 360 - 180;

  },

  /**
   * Finds an array of nodes that are a given distance from the given point
   * @param  {Number} x        Coordinates of the point
   * @param  {Number} y        Coordinates of the point
   * @param  {Number} distance This distance to find nodes at
   * @param  {Number} range    The range of distances to accept
   * @return {Array.Object.Node}          An array of nodes
   */
  findNodeDistance: function(x, y, distance, range) {
    var final = [];
    for (var i = 0; i < game.world.nodes.length; i++) {
      for (var j = 0; j < game.world.nodes[i].length; j++) {


        var node = game.world.nodes[i][j];
        if(!node) {
          continue;
        }
        var dist = camera.distance(x, y, node.x, node.y);

        if(dist < distance + range && dist > distance - range) {
          final.push(node);
        }
      }
    }

    return final;
  },



 };
