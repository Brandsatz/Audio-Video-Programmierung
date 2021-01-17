import rtmidi
import mido
import cv2
import numpy as np
import time



name = mido.get_input_names()
print(name)
inport = mido.open_input('IAC-Treiber Bus 1')
msg = inport.receive()

if(msg):
    cap = cv2.VideoCapture(0)
    while cap.isOpened():
        ret, frame = cap.read()
        cv2.imshow("Origi", frame)
        #time.sleep(0.5)

        if cv2.waitKey(25) != -1:
            break

    print("Message recieved")
    print(msg)
cap.release()
cv2.destroyAllWindows()
