/*
The sketch needs 'osc.js' in the same folder and also included in index.html

Before running, you need to start node server by executing
node bridge.js
in the folder where 'bridge.js' is (should be one folder up)

If you get the error 'Uncaught ReferenceError: io is not defined' on running
this sketch, it means the node server isn't running or may have crashed.
*/

var connect_to_this_ip = '169.254.187.95'
var incomingPort = 8000;
var outgoingPort = 8001;

var h, s;
var h_prev=0, s_prev=0;
var power = 100;

var lightsInitialized = false;

function setup() {
	createCanvas(500, 500);
	colorMode(HSB,360,100,100);
	noStroke();
  setupOsc(incomingPort, outgoingPort, connect_to_this_ip); // sets up OSC by opening a connection to node

  for(var x = 0; x<width; x++){
    for(var y = 0; y<height; y++){
      h = map(x,0,width,0,360);
      s = map(y,height,0,0,100);
      stroke(h,s,100);
      point(x,y);
    }
  }

}

function draw() {

  if(isConnected && !lightsInitialized){
    initLights();
    lightsInitialized = true;
  }


  if(mouseIsPressed){
      h = map(mouseX,0,width,0,360);
      s = map(mouseY,height,0,0,100);
  }

  if(h!==h_prev || s!==s_prev){
    sendOsc("/eos/newcmd",["Chan 1 Thru 15 Hue %1 Saturation %2 Brightness %3 Enter",h,s,100]);
    h_prev = h;
    s_prev = s;
  }
}

// This is run every time an OSC message is received
function receiveOsc(address, value) {
	//console.log("received OSC: " + address + ", " + value);
}


function initLights(){

  sendOsc('/eos/newcmd/Chan/1/Thru/15/At/100/Enter');
  sendOsc('/eos/newcmd/Chan/1/Thru/15/At/Red/0/Enter');
  sendOsc('/eos/newcmd/Chan/1/Thru/15/At/Red_Orange/0/Enter');
  sendOsc('/eos/newcmd/Chan/1/Thru/15/At/Amber/0/Enter');
  sendOsc('/eos/newcmd/Chan/1/Thru/15/At/Green/0/Enter');
  sendOsc('/eos/newcmd/Chan/1/Thru/15/At/Cyan/0/Enter');
  sendOsc('/eos/newcmd/Chan/1/Thru/15/At/Blue/0/Enter');
  sendOsc('/eos/newcmd/Chan/1/Thru/15/At/Indigo/0/Enter');

}

