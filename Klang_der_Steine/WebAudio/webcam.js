
    // The width and height of the captured photo. We will set the
    // width to the value defined here, but the height will be
    // calculated based on the aspect ratio of the input stream.
  
    var width = 320;    // We will scale the photo width to this
    var height = 0;     // This will be computed based on the input stream
  
    // |streaming| indicates whether or not we're currently streaming
    // video from the camera. Obviously, we start at false.
  
    var streaming = false;
  
    // The various HTML elements we need to configure or control. These
    // will be set by the startup() function.
  
    var video = null;

    let camPlaying = true;

  
    function startup() {
      video = document.getElementById('video');
  
      navigator.mediaDevices.getUserMedia({video: true, audio: false})
      .then(function(stream) {
        video.srcObject = stream;
        video.play();
      })
      .catch(function(err) {
        console.log("An error occurred: " + err);
      });
  
      video.addEventListener('canplay', function(ev){
        if (!streaming) {
          height = video.videoHeight / (video.videoWidth/width);
        
          // Firefox currently has a bug where the height can't be read from
          // the video, so we will make assumptions if this happens.
        
          if (isNaN(height)) {
            height = width / (4/3);
          }
        
          video.setAttribute('width', width);
          video.setAttribute('height', height);
          streaming = true;
        }
      }, false);     
    }
  
   
    window.addEventListener('load', startup, false);



    document.querySelector("#analyseButton").addEventListener("click", function(e){
      if (camPlaying){
        camPlaying = !camPlaying;
        //Das Video wird zunächst pausiert um ein Standbild zu speichern. 
        // Danach wird die Webcam von HTML entkoppelt, damit Python auf diese zugreifen kann.
        video.pause();
        video.srcObject.getTracks().forEach( (track) => {track.stop();});
        document.querySelector("#analyseButton").innerHTML = "Einrichten";
        machineLeeren();
        
        //Testwerte falls die Farben in Python nicht erkannt werden.

        // midiZuweisung(1, 1);
        // midiZuweisung(1, 3);
        // midiZuweisung(1, 5);
        // midiZuweisung(1, 7);
        // midiZuweisung(2, 1);
        // midiZuweisung(3, 4);
        // midiZuweisung(4, 5);
        // midiZuweisung(5, 8);

        midiSend();
      

      }else{
        camPlaying = !camPlaying;
        //Der Webcamstream wird erneut eingerichtet
        startup();
        document.querySelector("#analyseButton").innerHTML = "Analysieren";
      }
    });

    
