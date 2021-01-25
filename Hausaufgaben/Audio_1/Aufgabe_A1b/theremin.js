let context = new AudioContext();
let oscillatorNode = context.createOscillator();
let gainNode = context.createGain()

oscillatorNode.connect(gainNode);
gainNode.connect(context.destination);
gainNode.gain.value = 0

document.body.addEventListener("mousedown", function(e) {
    
    gainNode.gain.value = gainBerechnung(e.clientY);
    console.info("click");
});

document.body.addEventListener("mouseup", function() {
    gainNode.gain.value = 0;
});

document.body.addEventListener('mousemove', function(e){
    oscillatorNode.frequency.value = e.clientX;
    

    //console.log(window.innerWidth); 1920
    //console.log(window.innerHeight); 969
});

oscillatorNode.start(context.currentTime);
    
function gainBerechnung(yWert){
    gain = 1-yWert/969;
    return;
};