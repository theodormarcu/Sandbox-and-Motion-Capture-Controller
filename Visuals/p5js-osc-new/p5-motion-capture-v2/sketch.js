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

function setup() {
  createCanvas(1200,700);
  background('black');
  colorMode(HSB,100);
  setupOsc(incomingPort, outgoingPort, connect_to_this_ip); // sets up OSC by opening a connection to node
  noStroke();

}

function draw() {
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
      obj = value[1]; // object name
      x = value[2];   // x coordinate
      y = value[3];   // y coordinate
      z = value[4];   // z coordinate

      var pos_x = map(x,x_Low,x_High,0,width);
      var pos_y = map(y,y_Low,y_High,0,height);
      var myHue = map(z,z_Low,z_High,0,100);

      fill(myHue,100,100);
      ellipse(pos_x,pos_y,15,15);
    }

    else if(value[0] == 'marker'){
      x = value[1];   // x coordinate
      y = value[2];   // y coordinate
      z = value[3];   // z coordinate

      var pos_x = map(x,x_Low,x_High,0,width);
      var pos_y = map(y,y_Low,y_High,0,height);
      var myHue = map(value[4],0,20,0,100);

      //background(0);
      fill(myHue,100,100);
      ellipse(pos_x,pos_y,5,5);
    }

    else if(value[0] == 'frame'){
      // can refresh the screen or do other operations at the start of each frame
      //background(0);
    }

  }

}