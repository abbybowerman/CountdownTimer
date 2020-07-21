function getTime() {
    var d = new Date();
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var seconds = d.getSeconds();
    document.getElementById("time").innerHTML = hours + ":" + minutes + ":" + seconds;
    var t = setTimeout(getTime, 500);
}