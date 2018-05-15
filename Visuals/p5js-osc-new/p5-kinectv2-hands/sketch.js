/*
This sketch displays the joints sent over by Kinect V2
The sketch needs 'osc.js' in the same folder and also included in index.html

Before running, you need to start node server by executing
node bridge.js
in the folder where 'bridge.js' is (should be one folder up)

If you get the error 'Uncaught ReferenceError: io is not defined' on running 
this sketch, it means the node server isn't running or may have crashed.
*/

var incomingPort = 12345; // listening for OSC messages on this port

var connect_to_this_ip = '127.0.0.1'; // sending OSC messages to this IP address
var outgoingPort = 3334;              // sending OSC messages on this port

var lefthandcolor = 0;
var righthandcolor = 0;

function setup() {
	createCanvas(800, 600);
	frameRate(30);
	noStroke();
	background(0);
	setupOsc(incomingPort, outgoingPort, connect_to_this_ip); // sets up OSC by opening a connection to node
}


function draw() {

}

// This is run every time an OSC message is received
function receiveOsc(address, value) {

  //console.log("received OSC: " + address + ", " + value);
  
  // Change the code below depending on the form of the incoming OSC message	

  // set different colors depending on gesture of hands
  if (address.split("/")[3]=="hands" && address.split("/")[4]=="Left" && value[0]=="Open") {
      lefthandcolor = 'green';
  }
  else if (address.split("/")[3]=="hands" && address.split("/")[4]=="Left" && value[0]=="Closed"){
      lefthandcolor = 'red';
  }
  else if (address.split("/")[3]=="hands" && address.split("/")[4]=="Left" && value[0]=="Lasso"){
      lefthandcolor = 'blue';
  }

  // set different colors depending on gesture of hands
  if (address.split("/")[3]=="hands" && address.split("/")[4]=="Right" && value[0]=="Open") {
      righthandcolor = 'green';
  }
  else if (address.split("/")[3]=="hands" && address.split("/")[4]=="Right" && value[0]=="Closed"){
      righthandcolor = 'red';
  }
  else if (address.split("/")[3]=="hands" && address.split("/")[4]=="Right" && value[0]=="Lasso"){
      righthandcolor = 'blue';
  }

  // Draw the joint on screen  
  if (address.split("/")[4]=="HandLeft") {
      fill(lefthandcolor);
      ellipse(map(value[0],-1,1,0,width),map(value[1],-1,1,height,0),40,40);
  }
  else if (address.split("/")[4]=="HandRight") {
      fill(righthandcolor);
      ellipse(map(value[0],-1,1,0,width),map(value[1],-1,1,height,0),40,40);
  }
}
