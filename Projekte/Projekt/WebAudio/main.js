let context = new AudioContext();
let convolver = context.createConvolver();
let gain = context.createGain();

let bassActive = [];
let tomActive = [];
let snareActive = [];
let clapActive = [];
let crashActive = [];