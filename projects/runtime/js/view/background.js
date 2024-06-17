var background = function(window) {
  'use strict';

  window.opspark = window.opspark || {};
  var draw = window.opspark.draw;
  var createjs = window.createjs;

  /*
   * Create a background view for our game application
   */
  window.opspark.makeBackground = function(app, ground) {
      if (!app) {
          throw new Error("Invaid app argument");
      }
      if (!ground || typeof(ground.y) == 'undefined') {
          throw new Error("Invalid ground argument");
      }

      // container which will be returned
      var background;
      var lamp;
      var buildings = [];
      // Add any variables that will be used by render AND update here:

      // add objects for display inb ackground
      // called at the start of game and whenever the page is resized
      function render() {
          // useful variables
          var canvasWidth = app.canvas.width;
          var canvasHeight = app.canvas.height;
          var groundY = ground.y;

          background.removeAllChildren();

          // this fills the background with a obnoxious yellow
          // you should modify this to suit your game
          // width,      height,       color
          var backgroundFill = draw.rect(canvasWidth, groundY, 'black');
          backgroundFill.x = 0;
          backgroundFill.y = 0;
          background.addChild(backgroundFill);

          // TODO: 3 - Add a moon and starfield
          var circle;
          for (var i = 0; i < 100; i++) {
              circle = draw.circle(5, 'white', 'LightGray', 2);
              circle.x = canvasWidth * Math.random();
              circle.y = groundY * Math.random();
              background.addChild(circle);
          }
          
          var moon = draw.bitmap('img/moon.png');
          background.addChild(moon);
          moon.x = 300;
          moon.y = 25;
          moon.scaleX = 0.5;
          moon.scaleY = 0.5;

          // TODO: 5 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
          var building, buildingHeight;
          for (var i = 0; i < canvasWidth / 200; ++i) {
              buildingHeight = Math.random() * 50 + 250;
              building = draw.rect(75, buildingHeight, 'LightGray', 'Black', 1);
              building.x = 200 * i;
              building.y = groundY - buildingHeight;
              background.addChild(building);
              buildings.push(building);
          }

          // TODO 4: Part 1 - Add a tree
          lamp = draw.bitmap('img/street-light.png');
          background.addChild(lamp);
          lamp.x = 400;
          lamp.y = groundY - 200;
      }

      // Perform background animation
      // called on each timer "tick" - 60 times per second
      function update() {
          // useful variables
          var canvasWidth = app.canvas.width;
          var canvasHeight = app.canvas.height;
          var groundY = ground.y;

          // TODO 4: Part 2 - Move the tree!
          lamp.x -= 1;
          if (lamp.x < -200) {
              lamp.x = canvasWidth;
          }
          for (var i = 0; i < buildings.length; i++) {
              buildings[i].x -= 0.5;
              if (buildings[i].x < -200) {
                  buildings[i].x = canvasWidth;
              }
          }

          // TODO 5: Part 2 - Parallax


      }

      background = new createjs.Container();
      background.resize = render;
      background.update = update;

      app.addResizeable(background);
      app.addUpdateable(background);

      render();
      return background;
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if ((typeof process !== 'undefined') &&
  (typeof process.versions.node !== 'undefined')) {
  // here, export any references you need for tests //
  module.exports = background;
}