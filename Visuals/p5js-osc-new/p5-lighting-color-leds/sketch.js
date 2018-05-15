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

var connect_to_this_ip = '169.254.187.95'
var incomingPort = 8000;
var outgoingPort = 8001;

var colors = ['Red','Red_Orange','Amber','Green','Cyan','Blue','Indigo'];
var led = [];
var prev_led = [];
var ledslider = [];
var power, prev_power;
var lightsInitialized = false;

var redled, redoranled, amberled, greenled, cyanled, indigoled;
var prev_redled, prev_redoranled, prev_amberled, prev_greenled, prev_cyanled, prev_indigoled;


function setup() {
	createCanvas(500, 500);
  setupOsc(incomingPort, outgoingPort, connect_to_this_ip); // sets up OSC by opening a connection to node

  for(var i = 0; i < colors.length; i++){
    prev_led[i] = 0;
    ledslider[i] = createSlider(0,100,prev_led[i]);
    ledslider[i].position(20,20+30*i);
  }

  prev_power = 0;
  powerslider = createSlider(0,100,100);
  powerslider.position(20,20+30*colors.length);

  fill(255);
  noStroke();
}

function draw() {

  background(40);

  if(isConnected && !lightsInitialized){
    initLights();
    lightsInitialized = true;
  }

  for(var i = 0; i < colors.length; i++){
    led[i] = ledslider[i].value();
    text(colors[i],165,35+30*i)
  }

  power = powerslider.value();
  text("power",165,35+30*colors.length);

  if(power !== prev_power){
    prev_power = power;
    console.log('Sending OSC: '+'/eos/newcmd/Chan/1/Thru/15/At/'+str(power)+'/Enter');
    sendOsc('/eos/newcmd/Chan/1/Thru/15/At/'+str(power)+'/Enter');
  }


  for(var i = 0; i < colors.length; i++){
    if(led[i] !== prev_led[i]){
      prev_led[i] = led[i];
      console.log('Sending OSC: '+'/eos/newcmd/Chan/1/Thru/15/At/'+colors[i]+'/'+str(led[i])+'/Enter');
      sendOsc('/eos/newcmd/Chan/1/Thru/15/At/'+colors[i]+'/'+str(led[i])+'/Enter');
    }
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
