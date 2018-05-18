# An Exploration of Competing Interests
## Sandbox-and-Motion-Capture-Controller &
## Visual Projection Code

#### This is the code for our final STC 209 Project (Princeton). 
##### Annie Chen '18 (anniec@princeton.edu)
##### Theodor Marcu '20 (tmarcu@princeton.edu)
##### Evan Wood '18 (ecwood@princeton.edu)

## Abstract:
For the final project, we had complete freedom to design and implement an art installation. Our art installation studies competing interests by allowing the observers to interact with a gamified environment consisitng of a kinetic sculpture and a visual projection. You can see the demo below:

## Video

[![STC 209 Video](https://imgur.com/ilJjzrG)](https://youtu.be/xtZd833lFZw)

[Link to Video on Youtube](https://youtu.be/xtZd833lFZw)


## Full Writeup

Our project is focused on transforming and interpreting the movement of individuals who have different objectives into kinetic and visual art. We are really excited and fascinated by this because it involves a social side that is unpredictable yet harmonious, something none of us have had prior experience with. 

The question that is posed by our project is: “How do competing objectives and interests influence people’s reaction to their environment, and can we create meaningful art from the resulting reactions?” Our project draws primarily from the visual and movement modules. More specifically, we were inspired by flocking when brainstorming for this project since we are interested in studying how competing individuals can be transformed into abstract visuals and a dynamic sculpture simultaneously.

The art installation involves tracking the x- and y-positions of 5-10 participants (or more) with the motion tracking cameras in real-time. There are two distinct sets of participants. Both groups have the goal of moving a magnetic ball on a sand board. One group has to keep the ball inside a marked circle, and the second has to wreak havoc in the system and keep the ball out. The movement of the ball is influenced by the positions of all participants (both groups), and the participants will have to figure out how to control it on the spot. The visual part of the project is accomplished by projecting an abstract and nonlinear animated representation of what the participants are doing on the wall behind them.

The main artistic challenge that we were confronted by was translating and transforming our data into a visual interpretation that is not a direct mapping of the positions of the performers, while still being able to communicate a relationship between the data and artistic end result. We overcame this by playing with the way in which the environment responds to the participants. By projecting an abstract and nonlinear animation on a wall that is right next to the participants, we are able to offer them slight cues in relation to their actions. The sandbox is also not a direct mapping of the participants’ positions: instead, the slider moves in accordance to their average distance from the center, while the rotation is not in their control. Last but not least, the objective itself creates a performance, which is a form of dance that does not use music, but objectives as its accompaniment. This allowed us to achieve our two seemingly conflicting goals.

When building our project, we faced multiple engineering challenges. One of them was building the sandbox itself - we had to create a box that would not allow sand to escape, resist the impact of the ball, and look aesthetically pleasing. In addition to that, we had to create a case and support system that would house all the electronics and connectors which move the ball. This was especially difficult, since we had to create a rotating slider that would be able to move the ball almost everywhere on the board. This system is completely custom, and we had to design and implement it ourselves, which meant that we had to learn a lot about non-standard Arduino pieces and how to combine them.

Another challenge was connecting the Motion Capture data coming from the cameras to the Arduino board. We started with a p5.js version, but we quickly realized that Javascript was not powerful enough for our needs. As a result, we switched to two completely new Python libraries that allowed for a smoother communication between MoCap data and the Arduino platform. Writing the code and calibrating it was one of the hardest parts of the project. For the visual part of our project, we ended up using p5.js to connect the MoCap data to the animation.

## Running the code and starting the installation
Note: The code here is for **inspiration purposes**. I highly doubt that you can replicate the setup that we used in the Princeton University CST Lab (it's hacked together across years), so the instructions below are pertinent only to that specific setup. Still, if you need some help doing something similar, I hope this helps!


I. To run the Sandbox Motion Capture Controller:
Dependencies:
1. Liblo
2. Arduino
3. Vicon and Matlab Setup (In StudioLab, Basement of Fine Hall)
4. Serial (To connect python to arduino)


   1. Start Motion Capture Software in the STC 209 Room
      a. Start the VICON Video Capture Cameras and Software. Make sure to be in "Marker Mode" (no objects selected).
      b. Start MATLAB Wifi Broadcast Program. This will broadcast each frame and marker to the StudioLab-5G Wifi Network and allow you to "listen" to the frames and markers.
   2. Start Python Motion Capture Listener (sandboxControl.py)
      The program listens to port 3333 using liblo and reads each frame and marker. It syncs itself with the broadcast by waiting for a frame and then starts averaging all the x and y positions of the markers. The sandbox control program will then send this average to the arduino microcontroller.
      Terminal: $ python sandboxControl.py
   3. Connect Arduino to Computer (Port may differ)
   4. Start Arduino Software and upload "SlidePotMotor.ino"
   5. The installation should be working!


II. To run the Visual Part of the project:
Dependencies: 
1. P5JS
2. Bridge

#### Everything is in the "Visuals" folder.

1. install [Node](nodejs.org)

2. install required node modules

    $ npm install

3. run!

    $ node bridge.js

4. then navigate to the app and open `index.html` in a browser