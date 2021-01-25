import numpy as np
import cv2

# Callback Funktion für Slider, sie tut nichts
def do_nothing():
    return

# Video aus Datei öffnen
cap = cv2.VideoCapture('Micro-dance_2_.avi')

# drei Slider für Threshold 
cv2.namedWindow("Video")
cv2.createTrackbar("Hue", "Video", 7, 40, do_nothing)
cv2.createTrackbar("Saturation", "Video", 30, 80, do_nothing)


#Hue und Saturation des Handschuhs
hue = 179
satu = 110



while cap.isOpened():
    ret, frame = cap.read()

    # Farbkonvertierung
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)

    # Video in drei Farbkanäle splitten
    h, s, v= cv2.split(hsv)

    # Übergabe der Sliderwerte
    h_Threshold = cv2.getTrackbarPos("Hue", "Video")
    s_Threshold = cv2.getTrackbarPos("Saturation", "Video")

    # masken berechnen

    h_Mask = cv2.inRange(h, hue-h_Threshold, hue+h_Threshold)
    s_Mask = cv2.inRange(s, satu-s_Threshold, satu+s_Threshold)


    # Multiplikation der Einzelmasken

    maske = s * h_Mask 


    # Maske darstellen
    cv2.imshow("Hue", h_Mask)
    cv2.imshow("Satu", s_Mask)
    cv2.imshow("Video", maske)

    if cv2.waitKey(25) != -1:
        break


cap.release()
cv2.destroyAllWindows()