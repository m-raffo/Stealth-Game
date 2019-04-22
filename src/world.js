/**
* An object containing all of the door codes by door name. Used to place
* the codes in the world for the player to find, as they change every game
* @type {Object}
*/
let doorCodes = {};

let game = {};

function startGame() {
  defineGame();
  definePlayer();
  defineAstar();
  defineNodes();


  requestAnimationFrame(game.mainLoop);

  /**
  * The canvas element.
  * @type {Object}
  */
  game.canvas = {
    element: document.getElementById("myCanvas")
  }

  game.canvas.ctx = game.canvas.element.getContext("2d");

  game.start();

}

function defineGame() {
  /**
  * Define the namespace for all game operations
  * @namespace
  */
  game = {
    lastFrameTimeMs: 0,
    delta: 0,

    started: false,
    start: function() {
      this.started = true;
    },

    /**
    * True if the game is running. False if not (ie paused)
    * @type {Boolean}
    */
    running: true,

    hideInfo: function() {
      this.play();
      $('.info').hide();
    },

    pause: function() {
      // BUG: Will delayed function calls mess up the pause? Yes. Better question, are there any important delayed function calls. I forget what they are called
      if(this.running) {
        this.running = false;
        clock.pause();
      }
    },

    play: function() {
      if(!this.running) {
        this.running = true;
        clock.play();
      }
    },

    togglePlayPause: function() {
      if(this.running) {
        this.pause();
      } else {
        this.play();
      }
    },


    /**
    * The object that contains all of the data about the current level.
    * @type {Object}
    */
    world: {

      /**
      * An array of all the noise in the world
      * @type {Array}
      */
      noise: [],



      /**
      * An array of all the items in the world
      * @type {Array}
      */
      items: [
        // new Computer(200, 200, {
        //   to: "fdavidson@chemlab.com",
        //   from: 'no-reply@chemlab.com',
        //   subject: 'WEEKLY DOOR CODES',
        //   get body() {
        //     return 'Hello Fred, \nThe door code for your office this week is ' + doorCodes['office'] + '. This code will take effect on 9am at the start of this week. \n  \n For security reasons, DELETE THIS MESSAGE AFTER READING!'
        //   }
        // }),
        //
        new Computer(2030, -1700, { // MAIN ENTRY COMPUTER
          to: "fdavidson@chemtec.com",
          from: "manager@chemtec.com",
          subject: "New assignment",
          get body() {
            return "Fred,\nI know that you have been recently bored with your normal patrol, and as Mr. Weston will be out this week, I'm giving you his position as the entry guard.\nYou are responsible for only allowing those with the proper clearance into the building. The door code for the main entry is: " + doorCodes['mainentry'] +"\nI expect no unauthorized visitors.\n\nSincerely,\nMr. Manager";
          }
        }),

        // ROOM 6 Medpack
        new Medpack(2125, -4338, 30),

        // ROOM 7 Medpack
        new Medpack(-1318, -3284, 30),
        new Medpack(-1168, -3284, 30),

        // ROOM 8 Computer (Code for room 10)
        new Computer(-2132, -3263, {
          to: "learling@chemtec.com",
          from: "qhildebrand@chemtec.com",
          subject: "Protect your lunch!",
          get body() {
            return "Mr. Earling,\n\nI understand your complaints regarding the mysterious disapperance of your lunch, however there is nothing that we are able to do about it at this time. If the problem continues, feel free to store your lunch somewhere else, I don't care where.\n\n-Mr.Hildebrand\n\nPS-I've heard enough of your complaints! If you want to complain, complain to someone else.\nPPS-If you office has no lock, you can store you lunch in Rossum's office, right next to yours. The code is: " + doorCodes['ten'];
          }
        }),

        // ROOM 10 Medpack
        new Medpack(-673, -2745, 30),

        // ROOM 10 Computer
        new Computer(-796, -1768, {
          to: "hrossum@chemtec.com",
          from: "manager@chemtec.com",
          subject: "Team building",
          get body() {
            return "Hello H. Rossum!\n\nIt has come to my attention that your team has been having problems collaborating and working together well. These issues have recently progressed to the level that they are diminishing overall company productivity and profits.\nI recommend that you have your team complete 'team-building exercises in the conference room ever day before work. The room is on the East side of this section, right before the secure door to the next sector. The code for the conference room door is " + doorCodes['room12'] + ".\nI hope you are able to resolve this shortly.\n\nSincerely,\nMr. Manager";
          }
        })





      ],

      crates: [
        new WeaponCrate(200, -500, 300, 300, weapons.silentpistol), // room 1
        new WeaponCrate(-400, -3650, 300, 300, weapons.shotgun), // room 7
        new WeaponCrate(-1954, -1991, 300, 300, weapons.uzi), // room 10

      ],

      /**
      * A list of room objects that contains all of the rooms in the level.
      * @type {Array}
      */
      rooms:[
        new Room(0, 0, 1500, 1000, [ // room 0
          new Wall(-25, -25, 825.0, 50),
          new Wall(1200.0, -25, 325.0, 50),

          new Wall(-25.0, 975.0, 1550, 50),
          new Wall(-25.0, -25.0, 50, 1050),
          new Wall(1475.0, -25.0, 50, 1050),

        ],

        [
          new Door(790.0, -37, 390.0, -37, 420, 75)
        ]
      ),
      new Room(0, -1500, 1500, 1500, [ // room 1
        new Wall(-25, -1525, 200.0, 50),
        new Wall(575.0, -1525, 425.0, 50),
        new Wall(1400.0, -1525, 125.0, 50),
        new Wall(-25, -25, 825.0, 50),
        new Wall(1200.0, -25, 325.0, 50),
        new Wall(-25, -1525, 50, 75.0),
        new Wall(-25, -1050.0, 50, 1075.0),
        new Wall(1475.0, -1525.0, 50, 1550),

      ],

      [
        new Door(-37, -1460.0, -37, -1060.0, 75, 420),
        new Door(990.0, -1537, 1390.0, -1537, 420, 75, true),
        new Door(165.0, -1537, 565.0, -1537, 420, 75, true)
      ]
    ),

    new Room(-375, -2250, 375, 1250, [  // room 2
      new Wall(-400.0, -2275.0, 425, 50),
      new Wall(-400.0, -1025.0, 425, 50),
      new Wall(-400.0, -2275.0, 50, 1300),
      new Wall(-25, -2275, 50, 150.0),
      new Wall(-25, -1725.0, 50, 275.0),
      new Wall(-25, -1050.0, 50, 75.0),
    ],

    [
      new Door(-37, -2135.0, -37, -2535.0, 75, 420)
    ]
  ),

  new Room(0, -3000, 1500, 1500, [ // Room 3
    // new Wall(-25.0, -3025.0, 1550, 50),
    new Wall(-25, -3025, 551.0, 50),
    new Wall(926.0, -3025, 599.0, 50),


    new Wall(-25.0, -3025.0, 50, 900),
    // new Wall(1475.0, -3025.0, 50, 1550),
    new Wall(1475, -3025, 50, 325.0),
    new Wall(1475, -2300.0, 50, 825.0),

  ],

  [
    new Door(516.0, -3037, 916.0, -3037, 420, 75, true, 'mainentry')
  ]
),

new Room(1500, -3000, 750, 1500, [ // room 4
  new Wall(1475.0, -3025.0, 800, 50),
  new Wall(1475.0, -1525.0, 800, 50),
  // new Wall(1475.0, -3025.0, 50, 1550),
  new Wall(2225.0, -3025.0, 50, 1550),

],

[
  new Door(1463, -2710.0, 1463, -2310.0, 75, 420)
]
),

new Room(0, -4500, 1500, 1500, [ // room 5
  // new Wall(-25.0, -4525.0, 1550, 50),
  // new Wall(-25.0, -4525.0, 50, 1550),


  new Wall(-25, -4525, 50, 325.0),
  		new Wall(-25, -3800.0, 50, 825.0),


  new Wall(1475, -4525, 50, 825.0),
  new Wall(1475, -3300.0, 50, 325.0),

],

[
  new Door(1463, -3710.0, 1463, -3310.0, 75, 420)
]
),

new Room(1500, -4500, 750, 1500, [ // room 6
  new Wall(1475.0, -4525.0, 800, 50),
  new Wall(1475.0, -3025.0, 800, 50),
  new Wall(2225.0, -4525.0, 50, 1550),

],

[
  // doors
]
),

new Room(-1500, -4500, 1500, 1500, [  // room 7
          new Wall(-1525.0, -4525.0, 1550, 50),
          new Wall(-1525.0, -3025.0, 1550, 50),
          new Wall(-1525.0, -4525.0, 50, 1550),

        	],

          [
            new Door(-37, -4210.0, -37, -4610.0, 75, 420)
          ]
        ),


        new Room(-2250, -4500, 750, 1500, [ // room 8
          new Wall(-2275.0, -4525.0, 800, 50),
          new Wall(-2275.0, -3025.0, 800, 50),
          // new Wall(-2275.0, -4525.0, 50, 1550),
          new Wall(-2275, -4525, 50, 325.0),
              new Wall(-2275, -3800.0, 50, 825.0),


          new Wall(-1525.0, -4525.0, 50, 1550),

                ],

          [
          new Door(-2287, -4210.0, -2287, -3810.0, 75, 420)
          ]
        ),


        new Room(-3000, -4500, 750, 3000, [ // room 9
            // new Wall(-3025.0, -4525.0, 800, 50),

            new Wall(-3025, -4525, 200.0, 50),
                           new Wall(-2425.0, -4525, 200.0, 50),

            new Wall(-3025.0, -1525.0, 800, 50),
            new Wall(-3025.0, -4525.0, 50, 3050),
            // new Wall(-2275.0, -3394.0, 50, 1919),

                  ],

            [
            new Door(-2835.0, -4537, -2435.0, -4537, 420, 75)
            ]
          ),



          new Room(-2250, -3000, 1875, 1500, [  // room 10
                    new Wall(-2275.0, -3025.0, 1925, 50),
                    new Wall(-2275.0, -1525.0, 1925, 50),
                    // new Wall(-2275.0, -3025.0, 50, 1550),

                    new Wall(-2275, -3025, 50, 573.0),
                                   new Wall(-2275, -2052.0, 50, 577.0),

                    new Wall(-400.0, -3025.0, 50, 1550),

                          ],

                    [
                      new Door(-2287, -2462.0, -2287, -2062.0, 75, 420, true, 'ten')
                    ]
                  ),


                  new Room(2250, -4500, 1500, 1500, [ // room 12
                            // new Wall(2225.0, -4525.0, 1550, 50),
                            new Wall(2225, -4525, 1004.0, 50),
               new Wall(3629.0, -4525, 146.0, 50),

                            new Wall(2225.0, -3025.0, 1550, 50),
                            new Wall(2225.0, -4525.0, 50, 1550),
                            new Wall(3725.0, -4525.0, 50, 1550),

                                  ],

                            [
                              new Door(3219.0, -4537, 2819.0, -4537, 420, 75, true, "room12")
                            ]
                          ),






],

/**
* An array containing all of the guards
* @type {Array.Guard}
*/
guards: [
  // new Guard(1500, 500, -90),
  // new Guard(-500, 500, 10),
  new Guard(1000, -1100, 130),
  new Guard(1900, -1700, 180),  // room 4
  new Guard(1800, -4100, 180),  // room 6

  new Guard(-1235, -4200, 0),  // room 7
  new Guard(-1235, -3800, 45),  // room 7
  new Guard(-1035, -4000, 20),  // room 7

  new Guard(-2654, -3998, 180), // ROOM 9
  new Guard(-2654, -2458, 180), // ROOM 9

  new Guard(-1706, -2608, 180), // ROOM 10
  new Guard(-1137, -2683, 35), // ROOM 10

],
},

/**
* Has the pause key been released since being pressed?
* Prevents very fast switching between paused and unpaused
* @type {Boolean}
*/
pauseKeyReleased: true,

update: function(delta) {
  if(!this.started) {
    return;
  }
  camera.updateSize();
  camera.updatePosition();

  if(controls.isControlPressed('PAUSE')) {
    if(this.pauseKeyReleased) {
      this.pauseKeyReleased = false;
      this.togglePlayPause();
    }
  } else {
    this.pauseKeyReleased = true;
  }

  if(this.running) {
    player.move();

    for (var i = 0; i < game.world.guards.length; i++) {
      game.world.guards[i].update();

    }

    // Loop backwards to not mess up i if a bullet is removed
    for (var i = game.bullets.length -1; i >= 0; i--) {
      game.bullets[i].move();

      if (!game.bullets[i].active) {
        game.bullets.splice(i, 1);
      }
    }

    // Remove expired noises
    for (var i = game.world.noise.length -1; i >= 0; i--) {
      if(game.world.noise[i].timeEnd > clock.now()) {
        game.world.noise.splice(i, 1);
      }
    }


    // Check if player has activated an object
    for (var i = 0; i < game.world.items.length; i++) {
      var currentItem = game.world.items[i];
      if(controls.isControlPressed('ACTIVATE') &&  camera.distance(player.x, player.y, currentItem.x + (currentItem.width / 2), currentItem.y + (currentItem.height / 2)) <= currentItem.width + player.width) {
        currentItem.onPlayerActivate();
      }
    }


    // Update crates
    for (var i = 0; i < game.world.crates.length; i++) {
      var currentCrate = game.world.crates[i];
      if(controls.isControlPressed('ACTIVATE') &&  camera.distance(player.x, player.y, currentCrate.x + (currentCrate.width / 2), currentCrate.y + (currentCrate.height / 2)) <= currentCrate.width + player.width) {
        currentCrate.open();
      } else {
        currentCrate.close();
      }
    }

    for (var i = 0; i < game.world.rooms.length; i++) {
      var room = game.world.rooms[i];
      // Update Doors
      for (var j = 0; j < room.doors.length; j++) {
        var door = room.doors[j];
        door.update();

      }
    }
  }

},

mainLoop: function(timestamp) {
  // Throttle the frame rate.
  if (timestamp < game.lastFrameTimeMs + (1000 / MAX_FPS)) {
    requestAnimationFrame(game.mainLoop);
    return;
  }
  game.delta += timestamp - game.lastFrameTimeMs;
  game.lastFrameTimeMs = timestamp;

  while (game.delta >= TIMESTEP) {
    game.update(TIMESTEP);
    game.delta -= TIMESTEP;
  }
  camera.draw();
  requestAnimationFrame(game.mainLoop);
},

/**
* Holds all of the bullet objects in the world
* @type {Array}
*/
bullets: [],
};

game.world.nodes = [];
}




/**
* Stores the maximum number of frames to render per second.
* @type {Number}
* @default
* @constant
*/
const MAX_FPS = 60;

/**
* The time constant for each render step of the world
* @type {Number}
* @constant
* @default
*/
const TIMESTEP = 1000 / 60;
