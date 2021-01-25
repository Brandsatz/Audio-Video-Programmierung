let context = new AudioContext();
var audioBuffers = [];

for (let i = 0; i < 3; i++)
    getAudioData(i);

function getAudioData(i) {
    fetch("sounds/sound" + (i + 1) + ".wav")
        .then(response => response.arrayBuffer())
        .then(undecodedAudio => context.decodeAudioData(undecodedAudio))
        .then(audioBuffer => {
            audioBuffers[i] = audioBuffer;
    })
    .catch(console.error);
}

function playSound(buffer, time) {
    let source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.start(time);
}

function playBeat() {
    let tempo = 90; // BPM (beats per minute)
    let eighthNoteTime = (60 / tempo) / 2;
    let startTime = context.currentTime;
    let bassdrum = audioBuffers[0];
    let snaredrum = audioBuffers[1];
    let hihat = audioBuffers[2];

    for (let takt = 0; takt < 2; takt++) {
        let time = startTime + (takt * 8 * eighthNoteTime);

        playSound(bassdrum, time + 0 * eighthNoteTime);
        playSound(bassdrum, time + 1 * eighthNoteTime);
        playSound(bassdrum, time + 4 * eighthNoteTime);

        playSound(snaredrum, time + 2 * eighthNoteTime);
        playSound(snaredrum, time + 3.5 * eighthNoteTime);
        playSound(snaredrum, time + 4.5 * eighthNoteTime);
        playSound(snaredrum, time + 6 * eighthNoteTime);

        for (let j = 0; j < 8; j++) {
            playSound(hihat, time + j * eighthNoteTime);
        }
    }


}

document.querySelector("#playPauseButton").addEventListener("click", function(e) {
    playBeat();
});