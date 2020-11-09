let context = new AudioContext();


document.querySelector("#startButton").addEventListener("mouseup", function(){
    //Methode 1: Oszillator
    
    /*let oscillatorNode = context.createOscillator();
    let gainNode = context.createGain();

    gainNode.gain.value = 0.8;
    oscillatorNode.frequency.value = 440.0;

    oscillatorNode.connect(gainNode);
    gainNode.connect(context.destination);

    oscillatorNode.start(context.currentTime);
    */

    //-------------------------------------------------------
    // Methode 2 Aus Sounddatei

    /*
    let sound = new Audio("Amira Brandt_Multitrack Mix.wav");
    let soundNode = context.createMediaElementSource(sound);
    let gainNode = context.createGain();

    gainNode.gain.value = 0.8;

    soundNode.connect(gainNode);
    gainNode.connect(context.destination);

    sound.play();
*/

    //------------------------------------------------------
    // Methode 3 Sounddatei in Buffer Node
    
    fetch("Amira Brandt_Multitrack Mix.wav")
        .then(response => response.arrayBuffer())
        .then(undecodedAudio => context.decodeAudioData(undecodedAudio))
        .then(audioBuffer => {
            let sourceBufferNode = context.createBufferSource();
            sourceBufferNode.buffer = audioBuffer;

            sourceBufferNode.connect(context.destination);

            sourceBufferNode.start(context.currentTime);
        })
        .catch(console.error)


});

