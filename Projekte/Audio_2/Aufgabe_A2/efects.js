let context = new AudioContext();
let sound = new Audio("sound.wav");
let source = context.createMediaElementSource(sound);
let convoler = context.createConvolver();
let isPlaying = false;

sound.loop = true;