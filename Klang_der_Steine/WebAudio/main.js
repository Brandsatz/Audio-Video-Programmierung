let context = new AudioContext();
let convolver = context.createConvolver();
let gainNode = context.createGain();
let audioBuffers = [];

let isPlaying = false;
let tempo = 90; //BPM

let bassActive = [0,0,0,0,0,0,0,0];
let tomActive = [0,0,0,0,0,0,0,0];
let snareActive = [0,0,0,0,0,0,0,0];
let clapActive = [0,0,0,0,0,0,0,0];
let crashActive = [0,0,0,0,0,0,0,0];

let classChangeIndex = 0;
let fehler = false;

gainNode.connect(context.destination);

function machineLeeren(){       //Diese Funktion soll aufgerufen werden, bevor die Drum Machine neu gefüllt wird
    for(let i = 0; i < 8; i++) {

        bassActive[i] = 0;
        tomActive[i] = 0;
        snareActive[i] = 0;
        clapActive[i] = 0;
        crashActive[i] = 0;

        let positionID = i + 1;

        //Anpassung des Boxdesign zu nicht aktiv
        document.getElementById('bass'+positionID).setAttribute('class', 'box');
        document.getElementById('tom'+positionID).setAttribute('class', 'box');
        document.getElementById('snare'+positionID).setAttribute('class', 'box');
        document.getElementById('clap'+positionID).setAttribute('class', 'box');
        document.getElementById('crash'+positionID).setAttribute('class', 'box');
    }
};

function midiZuweisung(sound, positionID){
    let position = positionID - 1;
    switch(sound) {
        case 1:
            bassActive[position] = 1;
            document.getElementById('bass'+positionID).setAttribute('class', 'activeBox');
            break;
        case 2:
            tomActive[position] = 1;
            document.getElementById('tom'+positionID).setAttribute('class', 'activeBox');
            break;
        case 3:
            snareActive[position] = 1;
            document.getElementById('snare'+positionID).setAttribute('class', 'activeBox');
            break;
        case 4:
            clapActive[position] = 1;
            document.getElementById('clap'+positionID).setAttribute('class', 'activeBox');
            break;
        case 5:
            crashActive[position] = 1;
            document.getElementById('crash'+positionID).setAttribute('class', 'activeBox');
            break;
        case 6:
            if (!fehler){
                alert("Fehler bei der Bildanalyse, bitte nochmal versuchen!")
                fehler = true;
            }
            

    }
};

for (let i = 0; i < 5; i++)
    getAudioData(i);

function getAudioData(i) {
    fetch("sounds/sound" + (i + 1) + ".wav")
        .then(response => response.arrayBuffer())
        .then(undecodedAudio => context.decodeAudioData(undecodedAudio))
        .then(audioBuffer => {
            audioBuffers[i] = audioBuffer;
    })
    .catch(console.error);
}


function playSound(buffer, time) {
    let source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(gainNode);
    source.start(time);
}



document.querySelector("#startButton").addEventListener('click', function(e){
    
    if(!isPlaying){
        isPlaying = true; 
        document.querySelector("#startButton").innerHTML = "Stop";
    }else{
        isPlaying = false;
        document.querySelector("#startButton").innerHTML = "Play";
    }
    loop();
});

function loop(){
    if(isPlaying){
        console.log("Test");
        let intervall = (60 / tempo)*8*1000;
        let intervall1 = 0;
        let intervall2 = (intervall/8);
        let intervall3 = (intervall/8) * 2;
        let intervall4 = (intervall/8) * 3;
        let intervall5 = (intervall/8) * 4;
        let intervall6 = (intervall/8) * 5;
        let intervall7 = (intervall/8) * 6;
        let intervall8 = (intervall/8) * 7;

        let quarterNoteTime = (60 / tempo);
        let startTime = context.currentTime;
        let bass = audioBuffers[0];
        let tom = audioBuffers[1];
        let snare = audioBuffers[2];
        let clap = audioBuffers[3];
        let crash = audioBuffers[4];

        for(i=0; i<8; i++) {
            if(bassActive[i]==1){
                playSound(bass, startTime + i * quarterNoteTime);
            }if (tomActive[i]==1) {
                playSound(tom, startTime + i * quarterNoteTime);
            }if (snareActive[i]==1) {
                playSound(snare, startTime + i * quarterNoteTime);
            }if (clapActive[i]==1) {
                playSound(clap, startTime + i * quarterNoteTime);
            }if (crashActive[i]==1) {
                playSound(crash, startTime + i * quarterNoteTime);
            }
        }
        setTimeout(classChange,intervall1);
        setTimeout(classChange,intervall2);
        setTimeout(classChange,intervall3);
        setTimeout(classChange,intervall4);
        setTimeout(classChange,intervall5);
        setTimeout(classChange,intervall6);
        setTimeout(classChange,intervall7);
        setTimeout(classChange,intervall8);

        setTimeout(loop,intervall);
    }else{
        for(i=0; i<8; i++) {
            iID = i + 1;
            if(bassActive[i]==1){
                document.getElementById('bass'+iID).setAttribute('class', 'activeBox');
            }else{
                document.getElementById('bass'+iID).setAttribute('class', 'box');
            }
            if (tomActive[i]==1) {
                document.getElementById('tom'+iID).setAttribute('class', 'activeBox');
            }else{
                document.getElementById('tom'+iID).setAttribute('class', 'box');
            }
            if (snareActive[i]==1) {
                document.getElementById('snare'+iID).setAttribute('class', 'activeBox');
            }else{
                document.getElementById('snare'+iID).setAttribute('class', 'box');
            }
            if (clapActive[i]==1) {
                document.getElementById('clap'+iID).setAttribute('class', 'activeBox');
            }else{
                document.getElementById('clap'+iID).setAttribute('class', 'box');
            }
            if (crashActive[i]==1) {
                document.getElementById('crash'+iID).setAttribute('class', 'activeBox');
            }else{
                document.getElementById('crash'+iID).setAttribute('class', 'box');
            }
        }
    }
};

function classChange(){

 
    if(0 < classChangeIndex && classChangeIndex < 8){
        indexID = classChangeIndex + 1;
        indexArray = classChangeIndex - 1;
        document.getElementById('bass'+indexID).setAttribute('class', 'musicActive');
        document.getElementById('tom'+indexID).setAttribute('class', 'musicActive');
        document.getElementById('snare'+indexID).setAttribute('class', 'musicActive');
        document.getElementById('clap'+indexID).setAttribute('class', 'musicActive');
        document.getElementById('crash'+indexID).setAttribute('class', 'musicActive');

        if(bassActive[indexArray]==1){
            document.getElementById('bass'+classChangeIndex).setAttribute('class', 'activeBox');
        }else{
            document.getElementById('bass'+classChangeIndex).setAttribute('class', 'box');
        }
        if (tomActive[indexArray]==1) {
            document.getElementById('tom'+classChangeIndex).setAttribute('class', 'activeBox');
        }else{
            document.getElementById('tom'+classChangeIndex).setAttribute('class', 'box');
        }
        if (snareActive[indexArray]==1) {
            document.getElementById('snare'+classChangeIndex).setAttribute('class', 'activeBox');
        }else{
            document.getElementById('snare'+classChangeIndex).setAttribute('class', 'box');
        }
        if (clapActive[indexArray]==1) {
            document.getElementById('clap'+classChangeIndex).setAttribute('class', 'activeBox');
        }else{
            document.getElementById('clap'+classChangeIndex).setAttribute('class', 'box');
        }
        if (crashActive[indexArray]==1) {
            document.getElementById('crash'+classChangeIndex).setAttribute('class', 'activeBox');
        }else{
            document.getElementById('crash'+classChangeIndex).setAttribute('class', 'box');
        }
        classChangeIndex = classChangeIndex + 1;
    }
    if(classChangeIndex == 0){
        indexID = classChangeIndex + 1;
        document.getElementById('bass'+indexID).setAttribute('class', 'musicActive');
        document.getElementById('tom'+indexID).setAttribute('class', 'musicActive');
        document.getElementById('snare'+indexID).setAttribute('class', 'musicActive');
        document.getElementById('clap'+indexID).setAttribute('class', 'musicActive');
        document.getElementById('crash'+indexID).setAttribute('class', 'musicActive');

        if(bassActive[7]==1){
            document.getElementById('bass'+"8").setAttribute('class', 'activeBox');
        }else{
            document.getElementById('bass'+"8").setAttribute('class', 'box');
        }
        if (tomActive[7]==1) {
            document.getElementById('tom'+"8").setAttribute('class', 'activeBox');
        }else{
            document.getElementById('tom'+"8").setAttribute('class', 'box');
        }
        if (snareActive[7]==1) {
            document.getElementById('snare'+"8").setAttribute('class', 'activeBox');
        }else{
            document.getElementById('snare'+"8").setAttribute('class', 'box');
        }
        if (clapActive[7]==1) {
            document.getElementById('clap'+"8").setAttribute('class', 'activeBox');
        }else{
            document.getElementById('clap'+"8").setAttribute('class', 'box');
        }
        if (crashActive[7]==1) {
            document.getElementById('crash'+"8").setAttribute('class', 'activeBox');
        }else{
            document.getElementById('crash'+"8").setAttribute('class', 'box');
        }
        classChangeIndex = classChangeIndex + 1;
    }
    
    if(classChangeIndex == 8){ 
        classChangeIndex = 0;
    }



}
