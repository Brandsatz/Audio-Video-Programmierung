document.querySelector("#analyseButton").addEventListener("mousedown", function(){
    if (document.getElementById('bass8').getAttribute('class') === 'box') {
        document.getElementById('bass8').setAttribute('class', 'activeBox');      
    } else{
        document.getElementById('bass8').setAttribute('class', 'box');
  };
});