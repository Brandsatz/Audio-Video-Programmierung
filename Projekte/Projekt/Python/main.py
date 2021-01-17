import numpy as np
import cv2
import rtmidi
import mido
import time

hue = 0
satu = 0
vis = 0
start = False
geklappt = False

midiOutput = mido.open_output("IAC-Treiber Bus 1")
#midiOutput = mido.open_output("LoopBe Internal MIDI 1")

inport = mido.open_input('IAC-Treiber Bus 1')
#inport = mido.open_input('LoopBe Internal MIDI 0')


def sendNoteOn(farbe, position):
    message = mido.Message('note_on', note = farbe, velocity = position)
    midiOutput.send(message)
    print(message)

#Foto machen
def fotoMachen():
    cap = cv2.VideoCapture(0)
    time.sleep(0.5)
    ret, img = cap.read()
    cv2.imshow("Foto", img)
    return(img)


#schwarze Begrenzungssteine rausfiltern
def rechteck():

    img = fotoMachen()
    # Farbkonvertierung
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

    # Video in drei Farbkanaele splitten
    h, s, v= cv2.split(hsv)
    #b, g, r=cv2.split(img)

    # masken berechnen
    satu = 30
    vis = 20
    s_mask = cv2.inRange(s, 75, 175)
    v_mask = cv2.inRange(v, 0, 39)
    #b_mask = cv2.inRange(b, 0, 25)
    #g_mask = cv2.inRange(g, 0, 25)
    #r_mask = cv2.inRange(r, 0, 25)

    # Multiplizieren der Einzelmasken
    mask = cv2.multiply(s_mask, v_mask)
    #mask = cv2.multiply(mask, b_mask)

    #Dilation-Maske
    kernel = np.ones((2,2),np.uint8)
    mask = cv2.dilate(mask,kernel,iterations = 2)

    #Areas finden
    contours, hierarchy = cv2.findContours(mask, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

    maxArea = 0
    
    #groesste schwarze Flaeche
    for index in range(len(contours)):
        area = cv2.contourArea(contours[index])
        if area > maxArea:
            maxArea = area
            i = index
            
    #Diese kennzeichnen
    x1,y1,w1,h1 = cv2.boundingRect(contours[i])
    cv2.rectangle(mask, (x1-10,y1-10), (x1+w1,y1+h1), (100,255,100), 3)
    vergleichsH = h1*0.9
    

    #Postition der schwarzen Steine im Array "contours" umranden
    maxArea1= 0
    begrenzung = []
    for index in range(len(contours)):
        area = cv2.contourArea(contours[index])
        x,y,w,h = cv2.boundingRect(contours[index])
        if h > vergleichsH:
            print("Es gibt eine Flaeche, die ins Raster faellt")
            begrenzung.append(index)
            cv2.rectangle(mask, (x1-10,y1-10), (x1+w1,y1+h1), (100,255,100), 3)
            i1 = index
            if h != h1:
                x2 =x
                y2 =y
                w2 =w
                h2 =h
                maxArea1 = area

    gefundeneSteine = len(begrenzung)
    cv2.imshow('schwarze Steine',mask)
    
    #falls keine Hoehe vergleichbar ist, zweit groesste Flaeche suchen
    if gefundeneSteine<2:
        print ("Es gibt nur 1 Flaeche, die ins Raster gefallen ist")
        for index in range(len(contours)):
            area = cv2.contourArea(contours[index])
            x,y,w,h = cv2.boundingRect(contours[index])
            if (area > maxArea1 and area !=maxArea):
                maxArea1 = area
                i1 = index

        x2,y2,w2,h2 = cv2.boundingRect(contours[i1])
        cv2.rectangle(mask, (x2-10,y2-10), (x2+w2,y2+h2), (100,255,100), 3)

        if (y2+h2-100)<(y2+h2)<(y2+h2+100):
            begrenzung.append(i1)

        cv2.imshow('schwarze Steine',mask)
    print(h1, vergleichsH, h2)
    print(begrenzung)
        
    #begrenzung.append(i1)
    #print (maxArea, maxArea1)

    if (len(begrenzung)!= 2):
        print("Etwas ist schief gelaufen")
        cv2.imshow("Schief gelaufen", mask)
        sendNoteOn(6,0)
        return

   
    position = [x1,y1,w1,h1,x2,y2,w2,h2,maxArea1]
    return (position)

#Position der Steine berechnen
def position():

    #Flaeche zwischen den schwarzen Steinen
    if x2>x1:
        flaeche = x2-(x1+w1)
    else:
        flaeche = x1-(x2+w2)

    return (flaeche)

#Bild zuschneiden
def zuschneiden():
    img = fotoMachen()
    if(geklappt):
        if x2>x1:
            crop = img[y1-250:y2+h2+20,x1-10:x2+w2+10]
        else:
            crop = img[y2-250:y1+h1+20,x2-10:x1+w1+10]

        return crop
    else:
        print("Etwas ist schief gelaufen")
        sendNoteOn(6,0)
        return

def farben(hue, satu, vis, farbe, titel):

    img2 = zuschneiden()

    #checken ob Bild richtig zugeschnitten wurde
    if (img2.size < 1):
        print("Etwas ist schief gelaufen")
        #cv2.imshow("Schief gelaufen", mask)
        sendNoteOn(6,0)
        return

    else:
        cv2.imshow("zugescnitten", img2)

    
    # Farbkonvertierung
    hsv = cv2.cvtColor(img2, cv2.COLOR_BGR2HSV)

    # Video in drei Farbkanaele splitten
    h, s, v= cv2.split(hsv)

    # masken berechnen
    h_mask = cv2.inRange(h, hue-25, hue+25)
    s_mask = cv2.inRange(s, satu-25, satu+25)
    v_mask = cv2.inRange(v, vis-25, vis+25)


    # Multiplikation der Einzelmasken
    mask1 = cv2.multiply(v_mask, s_mask)
    mask = cv2.multiply(mask1, h_mask)

    #Steine rausfiltern und Position bestimmen
    contours, hierarchy = cv2.findContours(mask, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

    #Steine in der jeweiligen Farbe finden
    for index in range(len(contours)):
        area = cv2.contourArea(contours[index])
        if area > swSteine:

            x,y,w,h = cv2.boundingRect(contours[index])
            cv2.rectangle(mask,(x,y),(x+w,y+h),(255,255,225), 3)
            if w > (w2*1.3):
                anzahlNebeneinander = w/w2
                print(anzahlNebeneinander)
            x_pos =(x+(w*0.5))-(10+w1)
            position = 0
            if (fl0<x_pos<fl1):
                position = 1
            
            elif (fl1<x_pos<fl2):
                position = 2
            
            elif (fl2<x_pos<fl3):
                position = 3
            
            elif (fl3<x_pos<fl4):
                position = 4
            
            elif (fl4<x_pos<fl5):
                position = 5
            
            elif (fl5<x_pos<fl6):
                position = 6
            
            elif (fl6<x_pos<fl7):
                position = 7
            
            elif (fl7<x_pos<fl8):
                position = 8
            
            #print(position, farbe, x_pos)
            #print(fl1,fl2,fl3,fl4,fl5,fl6,fl7,fl8)
       
            sendNoteOn(farbe, position)
            #print("jetzt wird das Bild erzeugt")
            cv2.imshow(titel, mask)


msg = inport.receive()
if(msg):
    print("Message recieved")
    print(msg)
    positionArray = rechteck()
    if(positionArray!= None):

        geklappt = True
        x1 = positionArray[0]
        y1 = positionArray[1]
        w1 = positionArray[2]
        h1 = positionArray[3]
        x2 = positionArray[4]
        y2 = positionArray[5]
        w2 = positionArray[6]
        h2 = positionArray[7]
        höhe1 = h1*2.5
        höhe2 = h2*2.5
        #print(höhe1, höhe2)
        swSteine = positionArray[8]*0.7
        #print(swSteine)

        fl = position()
        fl0 = 0
        fl1 = fl*0.125
        fl2 = fl*0.25
        fl3 = fl*0.375
        fl4 = fl*0.5
        fl5 = fl*0.625
        fl6 = fl*0.75
        fl7 = fl*0.875
        fl8 = fl

    #gelb
    farben(25, 163, 235, 2, "Gelb")

    #rot
    #farben(0, 200, 87, 3, "Rot")

    #blau
    #arben(105, 223, 50, 1, "Blau")


    #weiss
    #farben(15, 95, 123, 5, "Weiss")

    #grau
    #farben(25, 80, 56, 4, "Grau")
    

cv2.waitKey()
   
cv2.destroyAllWindows()