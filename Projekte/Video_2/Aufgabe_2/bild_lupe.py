import numpy as np
import cv2


def mouseCallback(event, x, y, flags, param):
    output = img.copy()
    pixel = img[x,y]

    blau = int(pixel[0])
    gruen = int(pixel[1])
    rot = int(pixel[2])

    cv2.rectangle(output, (0,0), (10,10), (blau, gruen, rot), cv2.FILLED)
    cv2.putText(output, "R: {0} G: {1} B: {2}".format(r, g, b), (x, y), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 1)
    cv2.imshow("Lupe", output)


img = cv2.imread("roterHandschuh_Screenshot.png")
height, width = img.shape[:2]

cv2.namedWindow("Lupe")
cv2.setMouseCallback("Lupe", mouseCallback)
cv2.imshow("Lupe", img)

cv2.waitKey(0)
cv2.destroyAllWindows()

