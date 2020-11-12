import numpy as np
import cv2

# Video aus Datei öffnen
cap = cv2.VideoCapture('Micro-dance_2_.avi')

# Rot, Grün und Blau Festwerte

r = 82
g = 34
b = 7

while cap.isOpened():
    ret, frame = cap.read()



    # Maske darstellen
    cv2.imshow('Video', mask)

    if cv2.waitKey(25) != -1:
        break


cap.release()
cv2.destroyAllWindows()