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