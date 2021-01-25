import numpy as numpy
import cv2



# Callback Funktion für Slider, sie tut nichts
def do_nothing():
    return



img = cv2.imread("Video_1\openCV\Chrysanthemum.jpg")
cv2.imshow("Original", img)



cv2.namedWindow("Processed Image")
cv2.createTrackbar("Brightness", "Processed Image", 0, 255, do_nothing)


# Processing Loop: fragt alle 30 ms den Sliderwert ab
while True:
    brightness = cv2.getTrackbarPos("Brightness", "Processed Image")
    processedImage = cv2.add(img, (brightness, brightness, brightness, 0))
    cv2.imshow("Processed Image", processedImage)

    # Abbruch bei Tastendruck
    if cv2.waitKey(30) != -1:
        break

cv2.destroyAllWindows()