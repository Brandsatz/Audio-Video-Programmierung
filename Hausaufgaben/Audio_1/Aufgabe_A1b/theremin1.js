let context = new AudioContext();
let oscillatorNode = context.createOscillator();
let gainNode = context.createGain()

oscillatorNode.connect(gainNode);
gainNode.connect(context.destination);

document.body.addEventListener('mousemove', function(e){
    
    gain = 1-e.clientY/969;
    frequency = e.clientX*1.3

    gainNode.gain.value = gain;
    oscillatorNode.frequency.value = frequency;
    
    //console.log(window.innerWidth); 1920
    //console.log(window.innerHeight); 969
});

document.body.addEventListener("mousedown", function() {
    oscillatorNode.start(context.currentTime);
});

document.body.addEventListener("mouseup", function() {
    oscillatorNode.stop(context.currentTime);
});
