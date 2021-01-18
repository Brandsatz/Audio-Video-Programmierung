import rtmidi
import mido
import cv2
import numpy as np
import time


midiOutput = mido.open_output("IAC-Treiber Bus 1")
#midiOutput = mido.open_output("LoopBe Internal MIDI 1")

name = mido.get_input_names()
print(name)

# inport = mido.open_input('IAC-Treiber Bus 1')
inport = mido.open_input('LoopBe Internal MIDI 0')

msg = inport.receive()


def sendNoteOn(farbe, position):
    message = mido.Message('note_on', note = farbe, velocity = position)
    midiOutput.send(message)
    print(message)

if(msg):
    sendNoteOn(5,1)
    sendNoteOn(1,2)
    sendNoteOn(2,3)
    sendNoteOn(3,4)
    sendNoteOn(4,5)
    sendNoteOn(4,6)
    sendNoteOn(3,7)
    sendNoteOn(2,8)
    
def do_nothing():
    return

'''
cap = cv2.VideoCapture(0)
cv2.namedWindow("Video")
cv2.createTrackbar("Blau", "Video", 30, 55, do_nothing)
cv2.createTrackbar("Gruen", "Video", 30, 55, do_nothing)
cv2.createTrackbar("Rot", "Video", 30, 55, do_nothing)


blauWert = 0
gruenWert = 0
rotWert = 0
while cap.isOpened():
    ret, frame = cap.read()
    b, g, r = cv2.split(frame)

    b_Threshold = cv2.getTrackbarPos("Blau", "Video")
    g_Threshold = cv2.getTrackbarPos("Gruen", "Video")
    r_Threshold = cv2.getTrackbarPos("Rot", "Video")

    b_Mask = cv2.inRange(b, blauWert-b_Threshold), blauWert+b_Threshold)
    g_Mask = cv2.inRange(g, gruenWert-g_Threshold0, gruenWert+g_Threshold)
    r_Mask = cv2.inRange(r, rotWert-r_Threshold, rotWert+r_Threshold)

    mask = r_Mask * g_Mask * b_Mask

    contours, hierarchy = cv2.findContours(mask, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

    maxArea = 0
    
    #groesste schwarze Flaeche
    
    for index in range(len(contours)):
        area = cv2.contourArea(contours[index])
        if area > maxArea:
            maxArea = area
            i = index


       
    M = cv2.moments(contours[i])
    cx = int(M['m10']/M['m00'])
    cy = int(M['m01']/M['m00'])


    x,y,w,h = cv2.boundingRect(contours[i])
    cv2.rectangle(frame,(x,y),(x+w,y+h),(10,10,10),2)
    cv2.putText(frame, "X: {0} Y: {1} ".format(cx,cy), (cx, cy), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 200, 0), 1)
    

    cv2.imshow('Video', mask)

    if cv2.waitKey(25) != -1:
        break
'''
print("Message recieved")
print(msg)
cap.release()
cv2.destroyAllWindows()
