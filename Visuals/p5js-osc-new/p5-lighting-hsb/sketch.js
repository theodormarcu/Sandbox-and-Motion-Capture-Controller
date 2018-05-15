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

var hSlider, sSlider, bSlider;
var h_prev=0, s_prev=0, b_prev=0;
var power = 100;

var lightsInitialized = false;

function setup() {
	createCanvas(500, 500);
	colorMode(HSB,360,100,00);
  setupOsc(incomingPort, outgoingPort, connect_to_this_ip); // sets up OSC by opening a connection to node

  hSlider = createSlider(0, 360, 100);
  hSlider.position(20, 20);
  sSlider = createSlider(0, 100, 100);
  sSlider.position(20, 50);
  bSlider = createSlider(0, 100, 0);
  bSlider.position(20, 80);

}

function draw() {

  if(isConnected && !lightsInitialized){
    initLights();
    lightsInitialized = true;
  }

  var h = hSlider.value();
  var s = sSlider.value();
  var b = bSlider.value();
  background(h, s, b);
  text("hue", 165, 35);
  text("saturation", 165, 65);
  text("brightness", 165, 95);

  if(h!==h_prev || s!==s_prev || b!=b_prev){
    sendOsc("/eos/newcmd",["Chan 1 Thru 15 Hue %1 Saturation %2 Brightness %3 Enter",h,s,b]);
    h_prev = h;
    s_prev = s;
    b_prev = b;
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
