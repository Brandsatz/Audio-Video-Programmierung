import numpy as np
import cv2


def do_nothing():
    return


cap = cv2.VideoCapture('Micro-dance_2_.avi')


cv2.namedWindow("Video")
cv2.createTrackbar("Blau", "Video", 10, 40, do_nothing)
cv2.createTrackbar("Gruen", "Video", 15, 40, do_nothing)
cv2.createTrackbar("Rot", "Video", 20, 40, do_nothing)


blauWert = 40
gruenWert = 35
rotWert = 105


while cap.isOpened():
    ret, frame = cap.read()

    
    b, g, r = cv2.split(frame)

    
    b_Threshold = cv2.getTrackbarPos("Blau", "Video")
    g_Threshold = cv2.getTrackbarPos("Gruen", "Video")
    r_Threshold = cv2.getTrackbarPos("Rot", "Video")

    

    b_Mask = cv2.inRange(b, blauWert-b_Threshold, blauWert+b_Threshold)
    g_Mask = cv2.inRange(g, gruenWert-g_Threshold, gruenWert+g_Threshold)
    r_Mask = cv2.inRange(r, rotWert-r_Threshold, rotWert+r_Threshold)


    

    mask = r_Mask * g_Mask * b_Mask

    

    
    cv2.imshow('Video', mask)

    if cv2.waitKey(25) != -1:
        break


cap.release()
cv2.destroyAllWindows()