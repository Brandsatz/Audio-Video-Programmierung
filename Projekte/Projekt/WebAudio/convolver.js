let reverbOn = true;
let reverbSelectList = document.querySelector("#reverbSelectList");

loadImpulseResponse("room");

reverbSelectList.addEventListener("change", function(e){
    var name = reverbSelectList.options[reverbSelectList.selectedIndex].value;
    loadImpulseResponse(name);
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

            gain.connect(convolver);
            convolver.connect(context.destination);
        });
    };
    request.send();
}


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