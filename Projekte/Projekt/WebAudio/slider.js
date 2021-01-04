let sliders = document.getElementsByClassName("slider");

for (let i = 0; i < sliders.length; i++) {
    sliders[i].addEventListener("mousemove", changeParameter)
}

function changeParameter() {
    switch (this.id) {
        case "gainSlider":
            gain.value = (this.value / 100);
            document.querySelector("#gainOutput").innerHTML = (this.value) + "%";
            break;
        case "geschwindigkeitSlider":
            releaseValue = (this.value / 1);
            document.querySelector("#geschwindigkeitOutput").innerHTML = (this.value) + " bpm";
            break;
    }
}