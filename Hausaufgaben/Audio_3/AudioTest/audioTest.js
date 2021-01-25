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
    
    // fetch("Amira Brandt_Multitrack Mix.wav")
    //     .then(response => response.arrayBuffer())
    //     .then(undecodedAudio => context.decodeAudioData(undecodedAudio))
    //     .then(audioBuffer => {
    //         let sourceBufferNode = context.createBufferSource();
    //         sourceBufferNode.buffer = audioBuffer;

    //         sourceBufferNode.connect(context.destination);

    //         sourceBufferNode.start(context.currentTime);
    //     })
    //     .catch(console.error)


    //----------------------------------------------------
    // Panning Node

    // let oscillatorNode = context.createOscillator();
    // let stereoPanner = context.createStereoPanner();

    // stereoPanner.pan.value = -1;

    // oscillatorNode.connect(stereoPanner);
    // stereoPanner.connect(context.destination);

    // oscillatorNode.start(context.currentTime);
    // oscillatorNode.stop(context.currentTime+1);


    //--------------------------------------------------------
    // Delay Node

    // let audio = new Audio("Amira Brandt_Multitrack Mix.wav");
    // let source = context.createMediaElementSource(audio);
    // let delay = context.createDelay(4.0);

    // delay.delayTime.value = 2.0;

    // source.connect(delay);
    // delay.connect(context.destination);

    // audio.play();

    //-------------------------------------------------------
    // Impulse Response (Hall)


    let sound = new Audio ("sound.wav");
    let source = context.createMediaElementSource(sound);
    let convolver = context.createConvolver();

    source.connect(convolver);
    convolver.connect(context.destination);

    fetch("\impulseResponses\church.wav")
        .then(response => response.arrayBuffer())
        .then(undecodedAudio => context.decodeAudioData(undecodedAudio))
        .then(audioBuffer => {
            convolver.buffer = audioBuffer;
            convolver.normalize = true;
        })
        .catch(console.error);

        sound.play();



});

