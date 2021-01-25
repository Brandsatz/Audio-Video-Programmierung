let context = new AudioContext();


document.querySelector("#bass").addEventListener("mousedown", function(){
    console.info("#Bass");
    let bassSound = new Audio("sound1.wav");
    let bassSoundNode = context.createMediaElementSource(bassSound);

    bassSoundNode.connect(context.destination);
    bassSound.play();
});

document.querySelector("#snare").addEventListener("mousedown", function(){
    console.info("Snare");
    let snareSound = new Audio("sound2.wav");
    let snareSoundNode = context.createMediaElementSource(snareSound);

    snareSoundNode.connect(context.destination);
    snareSound.play();
});

document.querySelector("#clap").addEventListener("mousedown", function(){
    console.info("Clap");
    let clapSound = new Audio("sound3.wav");
    let clapSoundNode = context.createMediaElementSource(clapSound);

    clapSoundNode.connect(context.destination);
    clapSound.play();
});

document.querySelector("#crash").addEventListener("mousedown", function(){
    console.info("Crash");
    let crashSound = new Audio("sound4.wav");
    let crashSoundNode = context.createMediaElementSource(crashSound);

    crashSoundNode.connect(context.destination);
    crashSound.play();
});