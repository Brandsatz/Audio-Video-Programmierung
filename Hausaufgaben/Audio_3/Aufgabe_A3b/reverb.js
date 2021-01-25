
// let convoler = context.createConvolver();
// let reverbSelectlist = document.querySelector("reverbSelectList");
// let reverbOn = true;

let convoler = context.createConvolver();

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

                distortion.connect(convolver)
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
        let name = document.querySelector("#reverbSelectList").value;
        loadImpulseResponse(name);
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
        case "attackSlider":
            attackValue = (this.value / 1);
            document.querySelector("#attackOutput").innerHTML = (this.value / 1) + " sec";
            break;
        case "releaseSlider":
            releaseValue = (this.value / 1);
            document.querySelector("#releaseOutput").innerHTML = (this.value) + " sec";
            break;
        case "lfoSlider":
            lfo.frequency.value = (this.value / 1);
            document.querySelector("#lfoOutput").innerHTML = (this.value) + " Hz";
            break;
        case "distortionSlider":
            distortion.curve = makeDistortionCurve(this.value);
            document.querySelector("#distortionOutput").innerHTML = (this.value);
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
}

function makeDistortionCurve(amount) {    
    let n_samples = 44100,
        curve = new Float32Array(n_samples);
    
    for (var i = 0; i < n_samples; ++i ) {
        var x = i * 2 / n_samples - 1;
        curve[i] = (Math.PI + amount) * x / (Math.PI + (amount * Math.abs(x)));
    }
    
    return curve;
};
