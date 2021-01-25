import numpy as np
import cv2

img = np.zeros(shape=(180,240,3), dtype=np.uint8)

def mouseCallback(event, x, y, flags, param):
    cv2.circle(img, (x,y), 2, [0,0,255], cv2.FILLED)
    cv2.imshow("Paint", img)

cv2.namedWindow("Paint")
cv2.setMouseCallback("Paint", mouseCallback)

cv2.waitKey(0)
cv2.destroyAllWindows()