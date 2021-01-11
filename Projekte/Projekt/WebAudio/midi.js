if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess().then(function (midiAccess) {
        let midi = midiAccess;

        midi.onstatechange = onStateChange;

        // var outputs = midi.outputs.values();

        var inputs = midi.inputs.values();
        // loop through all inputs
        for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
            // listen for midi messages
            input.value.onmidimessage = onMIDIMessage;
        }
    });
} else {
    alert("No MIDI support in your browser.");
}

function onMIDIMessage(event) {
    
    switch (event.data[0]) {
    case 144:
        // your function startNote(note, velocity)
        midiZuweisung(event.data[1], event.data[2]);
        break;
    }
};

function onStateChange(event) {
    console.log(event.port)
};

// function midiSend(){
//     // // loop through all outputs
//     // for (var output = outputs.next(); output && !output.done; output = outputs.next()) {
//     //     // listen for midi messages
//     //     input.value.onmidimessage = onMIDIMessage;
        
//     // }
//     MIDI.noteOn(0, 8, 0, 0);
// };


