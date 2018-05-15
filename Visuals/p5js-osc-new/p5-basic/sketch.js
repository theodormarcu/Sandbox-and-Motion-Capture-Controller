/*
This sketch receives mouse positions (i.e. [x,y] coordinates) 
over OSC and displays it to the screen
It also sends out the current mouse position over OSC

e.g. This can be used along with Processing sketch 'ProcessingOSC'
or you can use it between P5 sketches on different computers
to test OSC send and receive capabilities

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

var x = 250, y = 250; // variables to store cursor position

function setup() {
	createCanvas(500, 500);
	setupOsc(incomingPort, outgoingPort, connect_to_this_ip); // sets up OSC by opening a connection to node
}

function draw() {
	background(0);
	fill(255);
	ellipse(x, y, 100, 100);
	fill(0);
	text("I'm p5.js", x-25, y);
	
	// Send mouse position over OSC
	sendOsc('/mousePos',[mouseX,mouseY]);
}

// This is run every time an OSC message is received
function receiveOsc(address, value) {
	console.log("received OSC: " + address + ", " + value);
	
  // Change the code below depending on the form of the incoming OSC message	
	if (address == '/test') {
		x = value[0];
		y = value[1];
	}
  
}
