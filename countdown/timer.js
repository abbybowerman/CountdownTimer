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

/**Function to add a second to the stopwatch when start button has been pressed*/
function addSecond(){
    //adds one second
    stopwatchSeconds++;
    //Adds 1 minute if seconds = 60, resets seconds to 0
    if(stopwatchSeconds >= 60){
        stopwatchSeconds = 0;
        stopwatchMinutes++;
    }
    //Adds 1 hour is minutes = 60, resets minutes to 0
    if(stopwatchMinutes >= 60){
        stopwatchHours++;
        stopwatchMinutes = 0;
    }
    //strings to hold hours/minutes/seconds for display
    let textSeconds = stopwatchSeconds;
    let textMinutes = stopwatchMinutes;
    let textHours = stopwatchHours;

    //Adds zero to front if hours/minutes/seconds < 10
    if(stopwatchSeconds < 10) textSeconds = "0" + stopwatchSeconds;
    if(stopwatchMinutes < 10) textMinutes = "0" + stopwatchMinutes;
    if(stopwatchHours < 10) textHours = "0" + stopwatchHours;

    //displays current stopwatch time
    document.getElementById("stopwatch").innerHTML = textHours + ":" + textMinutes + ":" + textSeconds;

    //Calls timer function to add second
    timer();
}

/**This will cause the timer function to run every 1000 milliseconds (1 second)*/
function timer() {
    t = setTimeout(addSecond, 1000);
}

/**Function to stop stopwatch*/
function stop() {
    //stops timer from being called
    clearTimeout(t);
}

/**Function to clear stopwatch*/
function reset() {
    //stops timer from being called
    clearTimeout(t);

    //resets stopwatch
    stopwatchHours = 0;
    stopwatchMinutes = 0;
    stopwatchSeconds = 0;
    document.getElementById("stopwatch").innerHTML = "00:00:00";
}

/**********************************************************************
 * Functions for the timer
 *********************************************************************/

/**Function to subtract second when start button is pressed*/
function subtractSecond() {
    //if hours, minutes and seconds equal 0, alert that timer is done
    //and stop it
    if(timerSeconds === 0 && timerMinutes === 0 && timerHours === 0){
        alert("Timer is done!");
        clearTimeout(ti);
    }else{
        //check if minutes and seconds equal 0 to subtract 1 hour
        if(timerMinutes === 0 && timerSeconds === 0 && timerHours > 0){
            timerHours--;
            timerMinutes = 59;
            timerSeconds = 59;
        }else if(timerSeconds === 0 && timerMinutes > 0){
            //check if seconds equals 0 to subtract 1 minute
            timerMinutes--;
            timerSeconds = 59;
        }else{
            //otherwise seconds will decrement by 1
            timerSeconds--;
        }
        //function to display string representation of the timer
        displayTimer();

        //function that causes the timer to run every second
        startTimer();
    }
}

/**Function that starts timer when button is pressed*/
function startTimer(){
    ti = setTimeout(subtractSecond, 1000);
}

/**Function to stop timer but not reset it*/
function stopTimer(){
    clearTimeout(ti);
}

/**Function to stop timer and reset it to 0*/
function clearTimer() {
    clearTimeout(ti);

    //set hours/minutes/seconds to 0
    timerHours = 0;
    timerMinutes = 0;
    timerSeconds = 0;
    document.getElementById("timer").innerHTML = "00:00:00";
}

/**Function to display timer on page*/
function displayTimer() {
    //variables to hold hours/minutes/seconds without changing the global variables
    let h = timerHours;
    let m = timerMinutes;
    let s = timerSeconds;

    //adds 0 to front if hours/minutes/seconds is < 10
    if(timerHours < 10) h = "0" + timerHours;
    if(timerMinutes < 10) m = "0" + timerMinutes;
    if(timerSeconds < 10) s = "0" + timerSeconds;

    //displays timer
    document.getElementById("timer").innerHTML = h + ":" + m + ":" + s;
}

/**Function to add one hour to the timer when button is pressed*/
function addHour(){
    timerHours++;
    displayTimer();
}

/**Function to subtract one hour from the timer when button is pressed*/
function subtractHour() {
    if(timerHours !== 0){
        timerHours--;
        displayTimer()
    }
}

/**Function to add one minute to the timer when button is pressed*/
function addMinute(){
    //I thought quite a bit about this
    //In the end I decided to have nothing happen if the user tries to add more than
    //59 minutes. The alternative being to add one hour if the user tries to one more minute
    //to 59 minutes.
    //Reasoning: what if the minutes = 59, user means to subtract minute but adds instead
    //Then minutes would be set back to 0 and the user would have to add those minutes all
    //over again
    //So I settled on this; I might change it if my reasoning changes
    if(timerMinutes !== 59) {
        timerMinutes++;
        displayTimer();
    }
}

/**Function to subtract one minute from the timer when button is pressed*/
function subtractMinute() {
    if(timerMinutes !== 0){
        timerMinutes--;
        displayTimer()
    }
}

/**Function to add one second to the timer when button is pressed*/
function addSecondTimer(){
    if(timerSeconds !== 59) {
        timerSeconds++;
        displayTimer();
    }
}

/**Function to subtract one second from the timer when button is pressed*/
function subtractSecondTimer() {
    if(timerSeconds !== 0){
        timerSeconds--;
        displayTimer()
    }
}