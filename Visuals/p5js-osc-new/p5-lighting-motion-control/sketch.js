/*

This program receives a single light index from the mocap system
And switches that light on

The sketch needs 'osc.js' in the same folder and also included in index.html

Before running, you need to start node server by executing
node bridge.js
in the folder where 'bridge.js' is (should be one folder up)

If you get the error 'Uncaught ReferenceError: io is not defined' on running
this sketch, it means the node server isn't running or may have crashed.
*/

var connect_to_this_ip = '169.254.187.95'
var incomingPort = 3333;
var outgoingPort = 8001;

var light = 22;
var light_prev = 22;

function preload(){

}
function setup() {
	createCanvas(500, 500);
  setupOsc(incomingPort, outgoingPort, connect_to_this_ip); // sets up OSC by opening a connection to node
}

function draw() {

  if(light!==light_prev){
    sendOsc("/eos/newcmd",["Chan 1 Thru 21 At 0 Enter",light_prev]);
    sendOsc("/eos/newcmd",["Chan %1 At Full Enter",light]);
    light_prev = light;
  }
}

// var last_update = 0;

// This is run every time an OSC message is received
function receiveOsc(address, value) {
  light = value;
}
