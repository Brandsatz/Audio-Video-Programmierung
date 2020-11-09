let play = false;
let buttonText = document.querySelector("#startStopButton");

let context = new AudioContext();
let gainNode = context.createGain();
let panNode = context.createStereoPanner();
let delayNode = context.createDelay();

panNode.connect(gainNode);
gainNode.connect(delayNode);
delayNode.connect(context.destination);


let gain = 1;
let pan = 0;
let delay = 0;


outputAnzeige(gain, pan, delay);

fetch("sound.wav")
    .then(response => response.arrayBuffer())
    .then(undecodedAudio => context.decodeAudioData(undecodedAudio))
    .then(audioBuffer => {
        buffer = audioBuffer;
    })
    .catch(console.error);


document.querySelector("#gainSlider").addEventListener("input", function(){
    gain = document.querySelector("#gainSlider").value;
    gainNode.gain.value = gain;
    outputAnzeige(gain, pan, delay);
});

document.querySelector("#panSlider").addEventListener("input", function(){
    pan = document.querySelector("#panSlider").value;
    panNode.pan.value = pan;
    outputAnzeige(gain, pan, delay);
});

document.querySelector("#delaySlider").addEventListener("input", function(){
    delay = document.querySelector("#delaySlider").value;
    delayNode.delayTime.value = delay;
    outputAnzeige(gain, pan, delay);
});

document.querySelector("#startStopButton").addEventListener("click", function(){
    if(!play) {

        bufferSourceNode = context.createBufferSource()
        bufferSourceNode.buffer = buffer;
        bufferSourceNode.connect(panNode);
        bufferSourceNode.start();

        buttonText.innerHTML = "Stop";
        play = true;
    } else{
        bufferSourceNode.stop(context.currentTime);

        buttonText.innerHTML = "Play";
        play = false;
    }
});

bufferSourceNode.addEventListener("ended", function(){
    play = false;
    buttonText.innerHTML = "Play";
});



function outputAnzeige(gainWer, panWer, delayWer){
    let outputGain = document.querySelector("#gainAnzeige");
    let outputPan = document.querySelector("#panAnzeige");
    let outputDelay = document.querySelector("#delayAnzeige");

    
    outputGain.innerHTML = gainWer + " dB";
    outputPan.innerHTML = panWer + " LR";
    outputDelay.innerHTML = delayWer + " s";  
    
}