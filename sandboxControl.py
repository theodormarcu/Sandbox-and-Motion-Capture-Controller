# STC 209 MoCap to Arduino
# Theodor Marcu, Annie Chen, and Evan Wood
# tmarcu@princeton.edu

# This program controls our sandbox using motion capture software

#----------------------------------------------------------------------#
# MoCap Code
from __future__ import print_function
import liblo
import sys

# Arduino Code
import serial
import struct

# Math Stuff (For Calculating Polar Coordinates)
import numpy as np

#----------------------------------------------------------------------#

# Sum of X positions per Frame
intSumX = 0
# Sum of Y positions per Frame
intSumY = 0
# Count of trackers
intCount = 0
# String with polar coords
strPolarCoords = b''

# Value to check if our program is in sync with the molcap
inSync = False

# MoCap
# create server, listening on port 3333
try:
    # Port name for Motion Capture
    server = liblo.Server(3333)
except liblo.ServerError as err:
    print(err)
    sys.exit()

# Function To Read from MoCap


def readMoCap(path, args, types, src):
    # If the message is a new frame message:
    # The program is in sync with mocap
    # you can start calculating averages
    global inSync
    if inSync == False and args[0] == "frame":
        print("TEST")
        inSync = True

    if inSync == True:
        if args[0] == "marker":
            # Marker Detected
            # Add to the average
            print("Marker!!!")
            addToAverage(args[1], args[2])
        elif args[0] == "frame":
            # New Frame Detected
            # Reset averages, and print values
            newFrame()


server.add_method(None, None, readMoCap)

# New Frame Function
# Called when a new frame is detected. Calculate
# Average X and Y and then send them to the arduino. 
# If the count of
# trackers is 0, don't call anything.
def newFrame():
    print("New Frame!!!")
    global intSumX
    global intSumY
    global intCount
    global strPolarCoords
    if intCount != 0:
        averageX = intSumX / intCount
        averageY = intSumY / intCount
    # Reset averages
    intSumX = 0
    intSumY = 0
    intCount = 0
    if intCount != 0:
        # Compute Polar Coordinates
        polarCoords = computePolarCoord(averageX, averageY)
        # Send Them To The Arduino
        for i in polarCoords:
            strPolarCoords += struct.pack('>B', i) 
    else:
        print("NOPE")

# Add to averages (X & Y) when marker detected
def addToAverage(intX, intY):  
    global intSumX
    global intSumY
    global intCount
    intCount = intCount + 1
    intSumX = intSumX + intX
    intSumY = intSumY + intY

# Function that calculates Polar Coordinates given x
def computePolarCoord(x, y):
    rho = np.sqrt(x**2 + y**2)
    phi = np.arctan2(y, x)
    return (rho, phi)

#----------------------------------------------------------------------#
# Start Arduino Serial
# The /dev/... path changes depending on the USB port on 
# your computer

ser = serial.Serial('/dev/cu.usbmodem1411', 9600)
#----------------------------------------------------------------------#
# loop and dispatch messages every 100ms
while True:
    server.recv(500)
    ser.write(strPolarCoords)
