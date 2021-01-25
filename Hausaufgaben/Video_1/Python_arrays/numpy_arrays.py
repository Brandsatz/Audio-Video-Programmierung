import numpy as np

# 2-dimensionales Array
a = np.array([[1, 2, 3], [4, 5, 6]])
print(a)

# Zugriff über Indexliste
print(a[1,2])
print(a[-1,-1])
print(a[0,0])
a[0,2] = 7
print(a)

#Abfrage von Höhe und Breite mit shape
print(a.shape)
(height, width) = a.shape
print(width)

# Dimension
print(a.ndim)

# Größe (Bytes) der Elemente -> itemsize
print(a.itemsize)

# Datentyp der Elemente -> dtype
print(a.dtype)

# Initialisierung eines z.B. Graustufenbildes
img = np.zeros(shape=(20,30), dtype=np.uint8)
print(img)
print(img.ndim, img.shape)

# Initialisierung eines z.B. Farbbildes
img = np.full(shape=(20,30,3), fill_value=(128,128,128), dtype=np.uint8)
print(img)
print(img.ndim)
print(img.shape)

# Slicing
img[:] = [0, 0, 255] # färbt Bild rot ein
print(img)

#Teilrechteck blau einfärben
x = 7
y = 5
w = 3
h = 4
img[y:y+h, x:x+w] = [255, 0, 0]
print(img)
print(img[5, 7])