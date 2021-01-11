let context = new AudioContext();
let convolver = context.createConvolver();
let gain = context.createGain();
let audioBuffers = [];

let isPlaying = false;
let tempo = 90; //BPM

let bassActive = [0,0,0,0,0,0,0,0];
let tomActive = [0,0,0,0,0,0,0,0];
let snareActive = [0,0,0,0,0,0,0,0];
let clapActive = [0,0,0,0,0,0,0,0];
let crashActive = [0,0,0,0,0,0,0,0];

gain.connect(context.destination);

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
        case 6;
            alert("Fehler bei der Bildanalyse, bitte nochmal versuchen!")

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
    source.connect(gain);
    source.start(time);
}



document.querySelector("#startButton").addEventListener('click', startStopLoop);


function startStopLoop(){
    if(!isPlaying){
        isPlaying = !isPlaying;
        document.querySelector("#startButton").innerHTML = "Stop";
        
        let intervall = (60 / tempo)*8*1000;
        
        let drumloop = setInterval(loop,intervall);
        

    }else{
        isPlaying = !isPlaying;
        document.querySelector("#startButton").innerHTML = "Play";
        clearInterval(drumloop);
    }
};

function loop(){
    document.querySelector("#startButton").addEventListener('click',function(e){
        
    })
    
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
    
    
}
