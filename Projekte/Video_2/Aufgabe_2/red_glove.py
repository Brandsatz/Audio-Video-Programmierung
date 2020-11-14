import numpy as np
import cv2

# Callback Funktion für Slider, sie tut nichts
def do_nothing():
    return

# Video aus Datei öffnen
cap = cv2.VideoCapture('Micro-dance_2_.avi')

# drei Slider für Threshold 
cv2.namedWindow("Video")
cv2.createTrackbar("Blau", "Video", 5, 40, do_nothing)
cv2.createTrackbar("Gruen", "Video", 10, 40, do_nothing)
cv2.createTrackbar("Rot", "Video", 10, 40, do_nothing)

# Rot, Grün und Blau Festwerte
blauWert = 18
gruenWert = 34
rotWert = 82


while cap.isOpened():
    ret, frame = cap.read()

    # Video in drei Farbkanäle splitten
    b, g, r = cv2.split(frame)

    # Übergabe der Sliderwerte
    b_Threshold = cv2.getTrackbarPos("Blau", "Video")
    g_Threshold = cv2.getTrackbarPos("Gruen", "Video")
    r_Threshold = cv2.getTrackbarPos("Rot", "Video")

    # Farbmasken berechnen

    b_Mask = cv2.inRange(b, blauWert-b_Threshold, blauWert+b_Threshold)
    g_Mask = cv2.inRange(g, gruenWert-g_Threshold, gruenWert+g_Threshold)
    r_Mask = cv2.inRange(r, rotWert-r_Threshold, rotWert+r_Threshold)


    # Multiplikation der Einzelmasken

    mask = r_Mask * g_Mask * b_Mask


    # Maske darstellen
    cv2.imshow('Video', mask)

    if cv2.waitKey(25) != -1:
        break


cap.release()
cv2.destroyAllWindows()