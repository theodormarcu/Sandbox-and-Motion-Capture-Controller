// STC 209 Final Project
// Annie Chen, Evan Wood, Theodor Marcu
// All rights reserved.

int pwm_a = 3; //PWM control for motor outputs 1 and 2 is on digital pin 3
int dir_a = 12; //dir control for motor outputs 1 and 2 is on digital pin 12
int diff = 0;
int currV = 0;
int nextV = 0;
int speedScaling = 4;
const int sP1 = A0;
int RawVal1 = 0, onDelay = 500;
int vVal1= 0;
int res1 = 0;
int loopCount;
 int threshold = 10;
int motorPin = 3;
int power;
int speed = 0;

void setup() {

  Serial.begin(9600);

  
  pinMode(pwm_a, OUTPUT); //Set control pins to be outputs
  pinMode(dir_a, OUTPUT);

//  pinMode(sP1, INPUT);
//
  Serial.println("Testing");
  Serial.println("14CORE | Sliding Potentiometer Test Code");
  Serial.println("========================================");
//
//  pinMode(motorPin, OUTPUT);
////  Serial.begin(9600);
//  while (! Serial);
//  Serial.println("Speed 0 to 255");

}
 
void loop() {

  if (Serial.available()) {
    nextV = Serial.parseInt();
  }
  RawVal1 = analogRead(sP1);
  vVal1 = RawVal1;
  currV = vVal1;
  
  diff = nextV - currV;
  
  if (abs(diff) > threshold)
  {
    if (diff > 0) {
      digitalWrite(dir_a, HIGH); //Set motor direction // outward direction
    } else {
       digitalWrite(dir_a, LOW); //Reverse motor direction // inward direction
    }
  
    power = abs(diff)/speedScaling;
    
    //set both motors to run at (100/255 = 39)% duty cycle (slow)
    analogWrite(pwm_a, 255); 
  }
  
  else
  {
    analogWrite(pwm_a, 0); 
  }

  



  if (loopCount%3000 == 0) {
    Serial.print("NextV ");
    Serial.println(nextV);
    Serial.println("ENTERED LOOP");
    Serial.print("power = ");
    Serial.println(power);
    Serial.print("\t XXVoltage 1 = ");
    Serial.println(vVal1);
  }
    loopCount++;



  
//  if (vVal1 < 1.0) {
//    speed = 255;
//  }
//  else {
//    Serial.println("speed 0");
//    speed = 0;
//  }
//  analogWrite(motorPin, speed);
}
