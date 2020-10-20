var timerHours = 0, timerMinutes = 0, timerSeconds = 0;
//variable to setTimeout/clearTimeout
var t;
var is24 = true;
var modeButton = document.getElementById("clockMode");

/**Function to get the current time*/
function getTime() {
    var d = new Date();
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var seconds = d.getSeconds();
    //adds zero if seconds is less than 10
    if(d.getSeconds() < 10){
        seconds = "0" + seconds;
    }
    if(d.getMinutes() < 10){
        minutes = "0" + minutes;
    }
    if(is24){
        document.getElementById("time").innerHTML = hours + ":" + minutes + ":" + seconds;
    }else{
        var dayNight = "AM";
        if(hours == 0){
            hours = 12;
        }else if(hours > 12){
            hours -= 12;
            dayNight = "PM";
        }
        document.getElementById("time").innerHTML = hours + ":" + minutes + ":" + seconds + " " + dayNight;
    }
    var t = setTimeout(getTime, 500);
}

/**Function to change format of clock*/
function changeFormat() {
    if(is24){
        is24 = false;
        modeButton.innerText = "AM/PM"
    }else{
        is24 = true;
        modeButton.innerText = "24 Hour"
    }
}

function modeChanged(){
    changeFormat(is24);
}

/**Function to add a second to the stopwatch*/
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
    var textSeconds = timerSeconds;
    var textMinutes = timerMinutes;
    var textHours = timerHours;
    //DISPLAY TIME HERE
    if(timerSeconds < 10) textSeconds = "0" + timerSeconds;
    if(timerMinutes < 10) textMinutes = "0" + timerMinutes;
    if(timerHours < 10) textHours = "0" + timerHours;

    document.getElementById("stopwatch").innerHTML = textHours + ":" + textMinutes + ":" + textSeconds;
    timer();
}

//This will cause the timer function to run every 1000 milliseconds (1 second)
function timer() {
    t = setTimeout(addSecond, 1000);
}

//Function to stop stopwatch
function stop() {
    clearTimeout(t);
}

//Function to clear stopwatch
function reset() {
    clearTimeout(t);
    timerHours = 0;
    timerMinutes = 0;
    timerSeconds = 0;
    document.getElementById("stopwatch").innerHTML = "00:00:00";
}