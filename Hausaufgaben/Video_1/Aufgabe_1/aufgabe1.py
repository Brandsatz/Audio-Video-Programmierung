import numpy as np
import cv2


def mouseCallback(event, x, y, flags, param):
    output = img.copy()
    pixel = img[y,x]

    blau = int(pixel[0])
    gruen = int(pixel[1])
    rot = int(pixel[2])

    cv2.rectangle(output, (0,0), (10,10), (blau, gruen, rot), cv2.FILLED)
    cv2.imshow("Lupe", output)


img = cv2.imread("Lighthouse.jpg")

cv2.namedWindow("Lupe")
cv2.setMouseCallback("Lupe", mouseCallback)
cv2.imshow("Lupe", img)

cv2.waitKey(0)
cv2.destroyAllWindows()

