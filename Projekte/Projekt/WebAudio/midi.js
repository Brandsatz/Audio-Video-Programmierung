if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess().then(function (midiAccess) {
        midi = midiAccess;

        midi.onstatechange = onStateChange;

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


