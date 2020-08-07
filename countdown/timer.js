var start = document.getElementById("start");
var stop = document.getElementById("stop");
var timerHours = 0, timerMinutes = 0, timerSeconds = 0;

function getTime() {
    var d = new Date();
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var seconds = d.getSeconds();
    if(d.getSeconds() < 10){
        seconds = "0" + seconds;
    }
    if(d.getMinutes() < 10){
        minutes = "0" + minutes;
    }
    document.getElementById("time").innerHTML = hours + ":" + minutes + ":" + seconds;
    var t = setTimeout(getTime, 500);
}

function addSecond(){
    timerSeconds++;
    if(timerSeconds >= 60){
        timerSeconds = 0;
        timerMinutes++;
    }
    if(timerMinutes >= 60){
        timerHours++;
        timerMinutes = 0;
    }
    //DISPLAY TIME HERE
    timer();
}

//This will cause the timer function to run every 1000 milliseconds (1 second)
function timer() {
    var t = setTimeout(addSecond, 1000);
}