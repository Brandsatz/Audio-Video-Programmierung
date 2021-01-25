// In diesem Teil des Programms werden alle auf der Seite befindlichen Slider abgefragt und auf veränderungen geprüft.

let sliders = document.getElementsByClassName("slider");

for (let i = 0; i < sliders.length; i++) {
    sliders[i].addEventListener("mousemove", changeParameter)
}

function changeParameter() {
    switch (this.id) {
        case "gainSlider":
            gainNode.gain.value = (this.value);
            document.querySelector("#gainOutput").innerHTML = (this.value);
            break;
        case "tempoSlider":
            tempo = (this.value / 1);
            document.querySelector("#tempoOutput").innerHTML = (this.value) + " bpm";
            break;
    }
}