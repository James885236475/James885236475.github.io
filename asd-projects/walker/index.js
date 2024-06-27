/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEY = {
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    LEFT: 37
  }
  // Game Item Objects
  var walker = {
    x: 0,
    y: 0,
    speedX: 0,
    speedY: 0
  };

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);                               // handle keyup events

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem()
    wallCollision()
    redrawGameItem()
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.LEFT){
      walker.speedX = -5
      console.log("Left pressed");
    }; 
    if (event.which === KEY.UP){
      walker.speedY = -5
      console.log("Up pressed");
    }
    else if (event.which === KEY.RIGHT){
      walker.speedX = 5
      console.log("Right pressed");
    }
    else if (event.which === KEY.DOWN){
      walker.speedY = 5
      console.log("Down pressed");
    }
  }
  function handleKeyUp(event){
    if (event.which === KEY.LEFT){
      walker.speedX = walker.speedX - walker.speedX;
      console.log("Left unpressed ");
    }; 
    if (event.which === KEY.UP){
      walker.speedY = walker.speedY - walker.speedY;
      console.log("Up unpressed" );
    }
    else if (event.which === KEY.RIGHT){
      walker.speedX = walker.speedX - walker.speedX;
      console.log("Right unpressed ");
    }
    else if (event.which === KEY.DOWN){
      walker.speedY = walker.speedY - walker.speedY;
      console.log("Down unpressed");
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function repositionGameItem() {
    walker.x += walker.speedX;
    walker.y += walker.speedY;
  }
 
  var walls = {}
  walls.id = '#board'
  walls.x = $("#board").width();
 walls.y = $("#board").height();
  function wallCollision(){
  
   if (walker.x >= walls.y){  
      walker.x -= walker.speedX;
    }else if(walker.y >= walls.x){
      walker.y -= walker.speedY;
    }else if(walker.x <= 0){
      walker.x -= walker.speedX;
    }else if(walker.y <= 0){
      walker.y -= walker.speedY;
    }
  
  }
  function redrawGameItem() {
    $('#walker').css('left', walker.x);
    $('#walker').css('top', walker.y);
  }
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
