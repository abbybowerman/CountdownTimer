//variables to hold hours/minutes/seconds for stopwatch
let stopwatchHours = 0, stopwatchMinutes = 0, stopwatchSeconds = 0;

//variables to hold hours/minutes/seconds for timer
let timerHours = 0, timerMinutes = 0, timerSeconds = 0;

//variables to setTimeout/clearTimeout for the stopwatch/timer
let t;
let ti;

//Sets the initial state of the clock to 24 hour format
let is24 = true;
let modeButton = document.getElementById("clockMode");

/**********************************************************************
 * Functions for the clock
 *********************************************************************/

/**Function to get the current time*/
function getTime() {
    let d = new Date();
    //get current hours, minutes and seconds
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let seconds = d.getSeconds();

    //adds zero to front if seconds is less than 10
    if(d.getSeconds() < 10){
        seconds = "0" + seconds;
    }
    //adds zero to front if seconds is less than 10
    if(d.getMinutes() < 10){
        minutes = "0" + minutes;
    }

    //displays time in 24 hour format
    if(is24){
        document.getElementById("time").innerHTML = hours + ":" + minutes + ":" + seconds;
    }else{
        //displays time in AM/PM format
        let dayNight = "AM";
        //checks if it's midnight
        if(hours === 0){
            hours = 12;
        }else if(hours > 12){
            //if hours is greater than 12, subtract 12 and change to PM
            hours -= 12;
            dayNight = "PM";
        }else if(hours === 12){
            //checks if noon, doesn't subtract 12 but changes to PM
            dayNight = "PM"
        }
        //displays time
        document.getElementById("time").innerHTML = hours + ":" + minutes + ":" + seconds + " " + dayNight;
    }
    let t = setTimeout(getTime, 500);
}

/**Function to change format of clock*/
function changeFormat() {
    //Checks if the time is in 24 hour format
    //Changes the text on the button to match what format the time is in
    //The time itself is displayed in the getTime() function
    if(is24){
        is24 = false;
        modeButton.innerText = "AM/PM"
    }else{
        is24 = true;
        modeButton.innerText = "24 Hour"
    }
}

/**Function for when the mode button is pressed*/
function modeChanged(){
    changeFormat(is24);
}

/**********************************************************************
 * Functions for the stopwatch
 *********************************************************************/

/**Function to add a second to the stopwatch*/
function addSecond(){
    stopwatchSeconds++;
    if(stopwatchSeconds >= 60){
        stopwatchSeconds = 0;
        stopwatchMinutes++;
    }
    if(stopwatchMinutes >= 60){
        stopwatchHours++;
        stopwatchMinutes = 0;
    }
    let textSeconds = stopwatchSeconds;
    let textMinutes = stopwatchMinutes;
    let textHours = stopwatchHours;
    //DISPLAY TIME HERE
    if(stopwatchSeconds < 10) textSeconds = "0" + stopwatchSeconds;
    if(stopwatchMinutes < 10) textMinutes = "0" + stopwatchMinutes;
    if(stopwatchHours < 10) textHours = "0" + stopwatchHours;

    document.getElementById("stopwatch").innerHTML = textHours + ":" + textMinutes + ":" + textSeconds;
    timer();
}

//This will cause the timer function to run every 1000 milliseconds (1 second)
function timer() {
    t = setTimeout(addSecond, 1000);
}

/**Function to stop stopwatch*/
function stop() {
    clearTimeout(t);
}

/**Function to clear stopwatch*/
function reset() {
    clearTimeout(t);
    stopwatchHours = 0;
    stopwatchMinutes = 0;
    stopwatchSeconds = 0;
    document.getElementById("stopwatch").innerHTML = "00:00:00";
}

/**********************************************************************
 * Functions for the timer
 *********************************************************************/

function subtractSecond() {
    if(timerSeconds === 0 && timerMinutes === 0 && timerHours === 0){
        alert("Timer is done!");
        clearTimeout(ti);
    }else{
        if(timerMinutes === 0 && timerSeconds === 0 && timerHours > 0){
            timerHours--;
            timerMinutes = 59;
            timerSeconds = 59;
        }else if(timerSeconds === 0 && timerMinutes > 0){
            timerMinutes--;
            timerSeconds = 59;
        }else{
            timerSeconds--;
        }
        displayTimer();
        startTimer();
    }
}

function startTimer(){
    ti = setTimeout(subtractSecond, 1000);
}

function stopTimer(){
    clearTimeout(ti);
}

function clearTimer() {
    clearTimeout(ti);
    timerHours = 0;
    timerMinutes = 0;
    timerSeconds = 0;
    document.getElementById("timer").innerHTML = "00:00:00";
}

function displayTimer() {
    let h = timerHours;
    let m = timerMinutes;
    let s = timerSeconds;
    if(timerHours < 10) h = "0" + timerHours;
    if(timerMinutes < 10) m = "0" + timerMinutes;
    if(timerSeconds < 10) s = "0" + timerSeconds;

    document.getElementById("timer").innerHTML = h + ":" + m + ":" + s;
}

function addHour(){
    timerHours++;
    displayTimer();
}

function subtractHour() {
    if(timerHours !== 0){
        timerHours--;
        displayTimer()
    }
}

function addMinute(){
    if(timerMinutes !== 59) {
        timerMinutes++;
        displayTimer();
    }
}

function subtractMinute() {
    if(timerMinutes !== 0){
        timerMinutes--;
        displayTimer()
    }
}

function addSecondTimer(){
    if(timerSeconds !== 59) {
        timerSeconds++;
        displayTimer();
    }
}

function subtractSecondTimer() {
    if(timerSeconds !== 0){
        timerSeconds--;
        displayTimer()
    }
}