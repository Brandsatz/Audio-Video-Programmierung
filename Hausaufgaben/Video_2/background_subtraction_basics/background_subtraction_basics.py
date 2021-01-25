import numpy as np
import cv2

# Video aus Datei öffnen
cap = cv2.VideoCapture('Micro-dance_2_.avi')

frameCount = 0
threshold = 10

while cap.isOpened():
    ret, frame = cap.read()


    #Videoframe in Graustufen wandeln
    mask = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)


    if frameCount == 0:
        # Wichtig Aufruf copy(): firstFrame = mask würde keine Pixel kopieren
        firstFrame = mask.copy()
        cv2.imshow("Background Model", firstFrame)
        frameCount += 1


    # aktuelles Frame vom Hintergrund subtrahieren
    cv2.absdiff(mask, firstFrame, mask)

    # Schwellwertbildung
    ret, mask = cv2.threshold(mask, threshold, 255, cv2.THRESH_BINARY)

    # Maske darstellen
    cv2.imshow('Video', mask)

    if cv2.waitKey(25) != -1:
        break


cap.release()
cv2.destroyAllWindows()