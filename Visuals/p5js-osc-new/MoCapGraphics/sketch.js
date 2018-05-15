/*

This sketch receives coordinates of objects over OSC
and displays a circle on screen controlled by the mocap object
This is meant to be a template that you can modify for your own purposes

It expects to receive inputs from the StreamViconObjects.m MATLAB program

For this to work correctly, you need to be on the same wi-fi network
(STUDIOLAB-5G) that the MATLAB machine is broadcasting on

The sketch needs 'osc.js' in the same folder and also included in index.html

Before running, you need to start node server by executing
node bridge.js
in the folder where 'bridge.js' is (should be one folder up)

If you get the error 'Uncaught ReferenceError: io is not defined' on running
this sketch, it means the node server isn't running or may have crashed.
*/

var incomingPort = 3333; // listening for OSC messages on this port

var connect_to_this_ip = '127.0.0.1'; // sending OSC messages to this IP address
var outgoingPort = 3334;              // sending OSC messages on this port

// ranges for the x, y and z coordinates in the mocap space
// find these out by moving the wand around
var x_Low = -5000;
var x_High = 5000;
var y_Low = -3000;
var y_High = 3000;
var z_Low = 0;
var z_High = 3000;

var points = [];
var thisPoint;
var x = 250, y = 250; // variables to store cursor position

// Code for Graphics

var inc = 0.05;
var scl = 40;
var cols, rows;
var fr;
var xoff, yoff, zoff = 0;
var cScl = 1;

var fColor;

// Averages
var rChange = 0;
var gChange = 0;
var nChange = 0;
// Flag
var inSync = false;
var sumX = 0;
var sumY = 0;
var sumZ = 0;
var countMarkers = 0;


function setup() {
  setupOsc(incomingPort, outgoingPort, connect_to_this_ip); // sets up OSC by opening a connection to node

  // Code for Graphics
  createCanvas(2000, 1010);
  background(random(25), random(5), random(25));
  cols = floor(width / scl);
  rows = floor(height / scl);
  
  // rSlider = createSlider(0, 255, 250);
  // rSlider.position(20, 20);
  // gSlider = createSlider(0, 255, 180);
  // gSlider.position(20, 50);
  // cSlider = createSlider(0, 255, 20);
  // cSlider.position(20, 80);

}

function draw() {
  background(random(25), random(15), random(25), 10);
  randomSeed(10);
  
  // rChange = rSlider.value();
  // gChange = gSlider.value();
  // cScl = cSlider.value();

  yoff = 0;
  
  for (var y = 0; y < rows; y++) {
    xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = (x + y * width) * 4;
      var angle = noise(xoff, yoff, zoff) * TWO_PI;
          // var v = p5.Vector.fromAngle(angle*angle);
          var v = p5.Vector.fromAngle(angle*cScl/5);
          xoff += inc;
          fColor = color(rChange*random(cScl), gChange, random(10, x*y), 5+angle);
          fill(fColor);
          stroke(fColor, 40);
          // noStroke();
          push();
          translate(x * scl, y * scl);
          rotate(v.heading());
          ellipse(0, angle, random(0, noise(x*y)*angle*scl/2), angle*scl);
          noFill();
          pop();
        }
        yoff += inc;
        zoff += 0.0005;
      }
    }

// This is run every time an OSC message is received
function receiveOsc(address, value) {
  // this console log statement is only for debugging purposes
  // comment it for smoother operation
  console.log("received OSC: " + address + ", " + value);

  // Change the code below depending on the form of the incoming OSC message
  if (address == '/ViConData')
  {

    if(value[0] == 'object')
    {
      // obj = value[1]; // object name
      // x = value[2];   // x coordinate
      // y = value[3];   // y coordinate
      // z = value[4];   // z coordinate

      // rChange = map(x,x_Low,x_High,0,width);
      // gChange = map(y,y_Low,y_High,0,height);
      // cScl = map(z,z_Low,z_High,0,100);

      // fill(myHue,100,100);
      // ellipse(pos_x,pos_y,15,15);
    }

    else if(value[0] == 'marker' && inSync == true){
      x = value[1];   // x coordinate
      y = value[2];   // y coordinate
      z = value[3];   // z coordinate
      sumX = sumX + x;
      sumY = sumY + y;
      sumZ = sumZ + z;
      countMarkers = countMarkers + 1;
      // //background(0);
      // fill(myHue,100,100);
      // ellipse(pos_x,pos_y,5,5);
    }
    else if(value[0] == 'frame'){
      // can refresh the screen or do other operations at the start of each frame
      //background(0);
      if (inSync == false) {
        inSync = true;
      }
      rChange = map(sumX / countMarkers, x_Low, x_High, 0, 255);
      gChange = map(sumY / countMarkers,y_Low,y_High,0,255);
      cScl = countMarkers;
      sumX = 0;
      sumY = 0;
      sumZ = 0;
      countMarkers = 0;
    }

  }

}