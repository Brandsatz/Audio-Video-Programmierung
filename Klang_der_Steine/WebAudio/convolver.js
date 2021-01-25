//Dieser Skript Teil beschäftigt sich mit dem Hall. Es werden verschiedene Reverbs geladen, sobald der Hall aktiv sein soll.

let reverbOn = true;
let reverbSelectList = document.querySelector("#reverbSelectList");

loadImpulseResponse("room");

reverbSelectList.addEventListener("change", function(e){
    if(reverbOn){
        var name = reverbSelectList.options[reverbSelectList.selectedIndex].value;
        loadImpulseResponse(name);
    }else{
        var name = reverbSelectList.options[reverbSelectList.selectedIndex].value;
    }
});

function loadImpulseResponse(name){
    var request = new XMLHttpRequest();
    request.open("GET",  ("impulseResponses/" + name + ".wav"), true);
    request.responseType = "arraybuffer";

    request.onload = function () {
        var undecodedAudio = request.response;
        context.decodeAudioData(undecodedAudio, function (buffer) {
            if (convolver) {convolver.disconnect(); }
            convolver = context.createConvolver();
            convolver.buffer = buffer;
            convolver.normalize = true;
            gainNode.connect(convolver);
            convolver.connect(context.destination);
        });
    };
    request.send();
}

//Der Reverb kann mit Hilfe des Buttons ein und aus gestellt werden.

document.querySelector("#reverbOnOffButton").addEventListener("click", function(e){
    if(reverbOn){
        reverbOn = false;
        convolver.disconnect();
        document.querySelector("#reverbOnOffButton").innerHTML = "Turn on"
    }else{
        reverbOn = true;
        let name = document.querySelector("#reverbSelectList").value;
        loadImpulseResponse(name);
        document.querySelector("#reverbOnOffButton").innerHTML = "Turn off"
    }
});