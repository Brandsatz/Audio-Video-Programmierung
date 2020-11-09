import numpy as numpy
import cv2

img = cv2.imread("Chrysanthemum.jpg")
cv2.imshow("Anzeige", img)

cv2.waitKey(0)
cv2.destroyAllWindows()