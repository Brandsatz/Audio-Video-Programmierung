import numpy as np
import cv2

	
# mouse callback function
def mouseCallback(event,x,y,flags,param):
	output = img.copy()

	# Variante 1
	output[:10, :10] = img[y,x]


	# Variante 2
	pixel = img[y,x]
	r = int(pixel[2])
	g = int(pixel[1])
	b = int(pixel[0])
	cv2.rectangle(output, (0,0), (10,10), (b,g,r), cv2.FILLED)
	cv2.putText(output, "R: {0} G: {1} B: {2}".format(r, g, b), (x, y), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 1)
	cv2.imshow('image', output)
	

	

img = cv2.imread('roterHandschuh_Screenshot.png',cv2.IMREAD_COLOR )
height, width = img.shape[:2]

cv2.namedWindow('image')
cv2.setMouseCallback('image',mouseCallback)
cv2.imshow('image', img)
cv2.waitKey(0)

cv2.destroyAllWindows()