import numpy as np
import cv2

# Callback Funktion für Slider, sie tut nichts
def do_nothing():
    return

# Video aus Datei öffnen
cap = cv2.VideoCapture(0)

# zwei Slider für Threshold 
cv2.namedWindow("Video")
cv2.createTrackbar("Hue", "Video", 9, 40, do_nothing)
cv2.createTrackbar("Saturation", "Video", 80, 80, do_nothing)


#Hue und Saturation des Handschuhs
hue = 180
satu = 178



while cap.isOpened():
    ret, frame = cap.read()

    # Farbkonvertierung
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)

    # Video in drei Farbkanäle splitten
    h, s, v= cv2.split(hsv)

    # # Übergabe der Sliderwerte
    h_Threshold = cv2.getTrackbarPos("Hue", "Video")
    s_Threshold = cv2.getTrackbarPos("Saturation", "Video")

    # masken berechnen

    h_mask = cv2.inRange(h, hue-h_Threshold, hue+h_Threshold)
    s_mask = cv2.inRange(s, satu-s_Threshold, satu+s_Threshold)


    # Multiplikation der Einzelmasken

    mask = cv2.multiply(h_mask, s_mask)
    #mask = h_mask*s_mask 

    # Maske filtern

    #kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3,3))
    #opening = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)

    kernel = np.ones((3,3),np.uint8)
    dilation = cv2.dilate(mask, kernel, iterations=1)

    #output = cv2.multiply(mask, frame)


    # Maske darstellen
    cv2.imshow("Video", mask)
    cv2.imshow("Filter", dilation)
    cv2.imshow("Origi", frame)

    if cv2.waitKey(25) != -1:
        break


cap.release()
cv2.destroyAllWindows()