import numpy as np
import cv2

img = np.zeros(shape=(240,360, 3), dtype=np.uint8)
cv2.rectangle(img, (10,20), (110,220), (0,0,255), cv2.FILLED)
cv2.circle(img, (300,100), 50, (255,0,0), 5)

cv2.imshow("Hello World", img)
cv2.waitKey(0)
cv2.destroyAllWindows()