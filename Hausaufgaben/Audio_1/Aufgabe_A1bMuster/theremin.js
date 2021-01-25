let context = new AudioContext();
let oscillator;
let mousedown = false;
let gainNode = context.createGain();

gainNode.connect(context.destination);

document.addEventListener("mousedown", function (e) {
    mousedown = true;

    oscillator = context.createOscillator();
    oscillator.connect(gainNode);

    calculateFrequencyAndGain(e);

    oscillator.start(context.currentTime);
});

document.addEventListener("mouseup", function (e) {
    mousedown = false;

    if (oscillator) {
        oscillator.stop(context.currentTime);
        oscillator.disconnect();
    }

});

document.addEventListener("mousemove", function (e) {
    if (mousedown) {
        calculateFrequencyAndGain(e);
    }
});

function calculateFrequencyAndGain(e) {
    let maxFrequency = 2000;
    let minFrequency = 20;
    let maxGain = 1;
    let minGain = 0;

    let newFrequency = ((e.clientX / window.innerWidth) * maxFrequency) + minFrequency;
    let newGain = 1 - ((e.clientY / window.innerHeight) * maxGain) + minGain;

    oscillator.frequency.setTargetAtTime(newFrequency, context.currentTime, 0.01);
    gainNode.gain.setTargetAtTime(newGain, context.currentTime, 0.01);

}