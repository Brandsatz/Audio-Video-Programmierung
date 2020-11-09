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

sound.loop = true;

source.connect(gainNode);
gainNode.connect(panNode);
panNode.connect(filter);
filter.connect(distortion);
distortion.connect(convoler);
convoler.connect(compressor);
compressor.connect(delayNode);
delayNode.connect(context.destination);


for (let i = 0; i < sliders.length; i++) {
    sliders[i].addEventListener("mousemove", changeParameter)
}

function changeParameter() {
    switch (this.id) {
        case "gainSlider":
            gainNode.gain.value = (this.value);
            document.querySelector("#tgainOutput").innerHTML = (this.value) + " dB";
            break;
        case "panningSlider":
            panNode.pan.value = (this.value);
            document.querySelector("#panningOutput").innerHTML = (this.value) + " dB";
            break;
        case "delaySlider":
            delayNode.delayTime.value = (this.value);
            document.querySelector("#delayOutput").innerHTML = (this.value) + " dB";
            break;
        case "distortionSlider":
            distortion.curve = makeDistortionCurve(this.value);
            document.querySelector("#distortionOutput").innerHTML = (this.value) + " dB";
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
            document.querySelector("#gainOutput").innerHTML = (this.value) + " dB";
            break;
            }
    }
}