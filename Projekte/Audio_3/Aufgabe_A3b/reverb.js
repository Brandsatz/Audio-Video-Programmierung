
let convoler = context.createConvolver();
let reverbSelectlist = document.querySelector("reverbSelectList");
let reverbOn = true;

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

