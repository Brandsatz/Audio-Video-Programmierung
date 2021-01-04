let context = new AudioContext();
let convolver = context.createConvolver();
let gain = context.createGain();

let isPlaying = false;
let tempo = 90; //BPM

let bassActive = [0,0,0,0,0,0,0,0];
let tomActive = [0,0,0,0,0,0,0,0];
let snareActive = [0,0,0,0,0,0,0,0];
let clapActive = [0,0,0,0,0,0,0,0];
let crashActive = [0,0,0,0,0,0,0,0];

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
    }
};


document.getElementById('startButton').addEventListener('onclick', startStopLoop());


function startStopLoop(){
    if(isPlaying){
        
    }
};

