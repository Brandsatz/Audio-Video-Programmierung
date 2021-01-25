let context = new AudioContext();
let sound = new Audio("sound.wav");
let source = context.createMediaElementSource(sound);
let convoler = context.createConvolver();
let isPlaying = false;

sound.loop = true;

loadImpulseResponse("room");


document.querySelector("#selectList").addEventListener("change", function (e) {
    let name = e.target.options[e.target.selectedIndex].value;
    loadImpulseResponse(name);
});





function loadImpulseResponse(name) {
    fetch("/impulseResponses/" + name + ".wav")
        .then(response => response.arrayBuffer())
        .then(undecodedAudio => context.decodeAudioData(undecodedAudio))
        .then(audioBuffer => {
            if (convoler) {convoler.disconnect();}

            convoler = context.createConvolver();
            convoler.buffer = audioBuffer;
            convoler.normalize = true;

            source.connect(convoler);
            convoler.connect(context.destination);
        })
        .catch(console.error);
}






document.querySelector("#playStopButton").addEventListener("click", function (e) {
    if (isPlaying) {
        sound.pause();
        e.target.innerHTML = "Play";
    } else {
        sound.play();
        e.target.innerHTML = "Stop";
    }
    isPlaying = !isPlaying;
});

sound.addEventListener("ended", function (e) {
    isPlaying = false;
    document.querySelector("#playStopButton").innerHTML = "Play";
});
