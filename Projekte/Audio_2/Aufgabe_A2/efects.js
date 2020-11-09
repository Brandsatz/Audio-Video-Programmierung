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
            compressor.threshold.value = (this.value - 100);
            document.querySelector("#thresholdOutput").innerHTML = (this.value - 100) + " dB";
            break;
        case "thresholdSlider":
            compressor.threshold.value = (this.value - 100);
            document.querySelector("#thresholdOutput").innerHTML = (this.value - 100) + " dB";
            break;
        case "thresholdSlider":
            compressor.threshold.value = (this.value - 100);
            document.querySelector("#thresholdOutput").innerHTML = (this.value - 100) + " dB";
            break;
        case "thresholdSlider":
            compressor.threshold.value = (this.value - 100);
            document.querySelector("#thresholdOutput").innerHTML = (this.value - 100) + " dB";
            break;
        case "thresholdSlider":
            compressor.threshold.value = (this.value - 100);
            document.querySelector("#thresholdOutput").innerHTML = (this.value - 100) + " dB";
            break;
        case "ratioSlider":
            compressor.ratio.value = (this.value / 5);
            document.querySelector("#ratioOutput").innerHTML = (this.value / 5) + " dB";
            break;
        case "kneeSlider":
            compressor.knee.value = (this.value / 2.5);
            document.querySelector("#kneeOutput").innerHTML = (this.value / 2.5) + " degree";
            break;
        case "attackSlider":
            compressor.attack.value = (this.value / 1000);
            document.querySelector("#attackOutput").innerHTML = (this.value / 1000) + " sec";
            break;
        case "releaseSlider":
            compressor.release.value = (this.value / 1000);
            document.querySelector("#releaseOutput").innerHTML = (this.value - 100) + " sec";
            break;
    }
}