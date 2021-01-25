import numpy as np
import cv2

# Callback Funktion für Slider, sie tut nichts
def do_nothing():
    return

# Video aus Datei öffnen
cap = cv2.VideoCapture(0)

# zwei Slider für Threshold 
cv2.namedWindow("Video")
cv2.createTrackbar("Hue", "Video", 20, 40, do_nothing)
cv2.createTrackbar("Saturation", "Video", 70, 80, do_nothing)


#Hue und Saturation des Handschuhs
hue = 113
satu = 199



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

    # kernele = np.ones((3,3),np.uint8)
    # erosion = cv2.erode(mask, kernele, iterations=1)

    # kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3,3))
    # opening = cv2.morphologyEx(erosion, cv2.MORPH_OPEN, kernel)

    # kernel2 = kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (8,8))
    # closing = cv2.morphologyEx(opening, cv2.MORPH_CLOSE, kernel2)

    # kernel2 = np.ones((3,3),np.uint8)
    # dilation = cv2.dilate(opening, kernel2, iterations=1)

    #output = cv2.multiply(mask, frame)

    contours, hierarchy = cv2.findContours(mask, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

    for index in range(len(contours)):
        area = cv2.contourArea(contours[index])

        if area <= 1100 :
            cv2.drawContours(mask, contours, index, (0,0,0), cv2.FILLED)
        else:
            M = cv2.moments(contours[index])
            cx = int(M['m10']/M['m00'])
            cy = int(M['m01']/M['m00'])


            x,y,w,h = cv2.boundingRect(contours[index])
            cv2.rectangle(frame,(x,y),(x+w,y+h),(0,255,0),2)
            cv2.putText(frame, "X: {0} Y: {1} ".format(cx,cy), (cx, cy), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 200, 0), 1)



    


    # Maske darstellen
    cv2.imshow("Video", mask)
    cv2.imshow("Origi", frame)

    if cv2.waitKey(25) != -1:
        break


cap.release()
cv2.destroyAllWindows()