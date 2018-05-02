/* 
 *  STC 209 Final Project
 *  Annie Chen, Evan Wood, Theodor Marcu
 *  All rights reserved.
 *  Program that sweeps a continous servo back and forth
*/

#include <Servo.h>

Servo myservo;  // create servo object to control a servo
// twelve servo objects can be created on most boards

int pos = 0;    // variable to store the servo position

void setup() {
  myservo.attach(9);  // attaches the servo on pin 9 to the servo object
}

void loop() {
  myservo.write(75);
  delay(3900);
  myservo.write(100);
  delay(4000);
//  for (pos = 45; pos <= 135; pos += 1) { // goes from 0 degrees to 180 degrees
//    // in steps of 1 degree
//    myservo.write(80);              // tell servo to go to position in variable 'pos'
//    delay(60);                       // waits 15ms for the servo to reach the position
//  }
//  for (pos = 90; pos >= 0; pos -= 1) { // goes from 180 degrees to 0 degrees
//    myservo.write(pos);              // tell servo to go to position in variable 'pos'
//    delay(15);                       // waits 15ms for the servo to reach the position
//  }
}
