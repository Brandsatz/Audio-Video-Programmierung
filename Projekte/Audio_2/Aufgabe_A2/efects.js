let context = new AudioContext();
let sound = new Audio("guitar.wav");
let source = context.createMediaElementSource(sound);
let gainNode = context.createGain();
let panNode = context.createStereoPanner();
let delayNode = context.createDelay();
let distortion = context.createWaveShaper();
let convoler = context.createConvolver();
let compressor = context.createDynamicsCompressor();
let filter = context.createBiquadFilter();
let isPlaying = false;

let playStopButton = document.querySelector("#playStopButton");
let sliders = document.getElementsByClassName("slider");
let reverbSelectlist = document.querySelector("reverbSelectList");
let filterSelectlist = document.querySelector("filterSelectList");
let reverbOn = true;

sound.loop = true;

source.connect(gainNode);
gainNode.connect(panNode);
panNode.connect(filter);
filter.connect(distortion);
distortion.connect(compressor);
compressor.connect(delayNode);
delayNode.connect(context.destination);

filter.frequency.value = sliders["frequencySlider"].value;



loadImpulseResponse("room");


document.querySelector("#reverbSelectList").addEventListener("change", function (e) {
    let name = e.target.options[e.target.selectedIndex].value;
    loadImpulseResponse(name);
});



function loadImpulseResponse(name) {
    if(reverbOn){
        fetch('impulseResponses/' + name + '.wav')                   //Hier nochmal Dateipfad korrigierenn!!!
            .then(response => response.arrayBuffer())
            .then(undecodedAudio => context.decodeAudioData(undecodedAudio))
            .then(audioBuffer => {
                if (convoler) {convoler.disconnect();}

                convoler = context.createConvolver();
                convoler.buffer = audioBuffer;
                convoler.normalize = true;

                compressor.connect(convoler);
                convoler.connect(context.destination);
            })
            .catch(console.error);
    }
};

document.querySelector("#reverbOnOffButton").addEventListener("click", function(e){
    if(reverbOn){
        reverbOn = false;
        convoler.disconnect();
        document.querySelector("#reverbOnOffButton").innerHTML = "Turn on"
    }else{
        reverbOn = true;
        loadImpulseResponse("room");
        document.querySelector("#reverbOnOffButton").innerHTML = "Turn off"
    }
});



filterSelectList.addEventListener("change", function (e) {
    filter.type = filterSelectList.options[filterSelectList.selectedIndex].value;
});


for (let i = 0; i < sliders.length; i++) {
    sliders[i].addEventListener("mousemove", changeParameter)
}

function changeParameter() {
    switch (this.id) {
        case "gainSlider":
            gainNode.gain.value = (this.value);
            document.querySelector("#gainOutput").innerHTML = (this.value) + " dB";
            break;
        case "panningSlider":
            panNode.pan.value = (this.value);
            document.querySelector("#panningOutput").innerHTML = (this.value) + " LR";
            break;
        case "delaySlider":
            delayNode.delayTime.value = (this.value);
            document.querySelector("#delayOutput").innerHTML = (this.value) + " s";
            break;
        case "distortionSlider":
            distortion.curve = makeDistortionCurve(this.value);
            document.querySelector("#distortionOutput").innerHTML = (this.value);
            break;
        case "thresholdSlider":
            compressor.threshold.value = (this.value);
            document.querySelector("#thresholdOutput").innerHTML = (this.value) + " dB";
            break;
        case "ratioSlider":
            compressor.ratio.value = (this.value);
            document.querySelector("#ratioOutput").innerHTML = (this.value) + " dB";
            break;
        case "kneeSlider":
            compressor.knee.value = (this.value);
            document.querySelector("#kneeOutput").innerHTML = (this.value) + " degree";
            break;
        case "attackSlider":
            compressor.attack.value = (this.value);
            document.querySelector("#attackOutput").innerHTML = (this.value) + " sec";
            break;
        case "releaseSlider":
            compressor.release.value = (this.value);
            document.querySelector("#releaseOutput").innerHTML = (this.value) + " sec";
            break;
        case "frequencySlider":
            filter.frequency.value = (this.value);
            document.querySelector("#frequencyOutput").innerHTML = (this.value) + " Hz";
            break;
        case "detuneSlider":
            filter.detune.value = (this.value);
            document.querySelector("#detuneOutput").innerHTML = (this.value) + " cents";
            break;
        case "qSlider":
            filter.Q.value = (this.value);
            document.querySelector("#qOutput").innerHTML = (this.value) + " ";
            break;
        case "filterGainSlider":
            filter.gain.value = (this.value);
            document.querySelector("#filterGainOutput").innerHTML = (this.value) + " dB";
            break;
            }
    };




function makeDistortionCurve(amount) {    
    let n_samples = 44100,
        curve = new Float32Array(n_samples);
    
    for (var i = 0; i < n_samples; ++i ) {
        var x = i * 2 / n_samples - 1;
        curve[i] = (Math.PI + amount) * x / (Math.PI + (amount * Math.abs(x)));
    }
    
    return curve;
};


playStopButton.addEventListener("click", function (e) {
    if (isPlaying) {
        sound.pause();
        playStopButton.innerHTML = "Play";
    } else {
        sound.play();
        playStopButton.innerHTML = "Stop";
    }
    isPlaying = !isPlaying;
});

sound.addEventListener("ended", function (e) {
    isPlaying = false;
    playStopButton.innerHTML = "Play";
});