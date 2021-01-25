let midiOutput = null;

if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess().then(function (midiAccess) {
        let midi = midiAccess;

        midi.onstatechange = onStateChange;

        var inputs = midi.inputs.values();
        // loop through all inputs
        for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
            // listen for midi messages
            input.value.onmidimessage = onMIDIMessage;
        }

        const outputs = midiAccess.outputs.values();
        console.log(outputs);
        for(const output of outputs){
            console.log(output);
            midiOutput = output;
        }
    });
} else {
    alert("No MIDI support in your browser.");
}

function onMIDIMessage(event) {
    
    switch (event.data[0]) {
    case 144:
        midiZuweisung(event.data[1], event.data[2]);  //Bei erhalt eines Miditons soll der Status der einzelnen Drums erneuert werden.
        break;
    case 145:
        console.log("Midiversendet")  //Eine Sicherung die auf die von JavaScript gesendete Midinote achtet
    }
};

function onStateChange(event) {
    console.log(event.port)
};

function midiSend(){
    midiOutput.send([145, 7, 0]);   //Eine festgelegte Midinote auf die Python reagiert und die Videoanalyse startet.
};


