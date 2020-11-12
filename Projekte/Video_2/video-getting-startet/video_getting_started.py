import numpy as np
import cv2

# Video aus Datei öffnen
#cap = cv2.VideoCapture('Micro-dance_2_.avi')

# Live Kamera öffnen
cap = cv2.VideoCapture(0)

# Breite eines Videoframes
frameWidth = cap.get(cv2.CAP_PROP_FRAME_WIDTH)

# Höhe eines Videoframes
frameHeight = cap.get(cv2.CAP_PROP_FRAME_HEIGHT)

# Zahl der Bilder pro Sekunde
framesPerSecond = cap.get(cv2.CAP_PROP_FPS)

while cap.isOpened():
    ret, frame = cap.read()

    cv2.imshow('Video', frame)

    if cv2.waitKey(25) != -1:
        break

cap.release()
cv2.destroyAllWindows()