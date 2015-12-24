if(document.addEventListener){
    document.addEventListener("keypress",fireFoxHandler, true);
} else{
    document.attachEvent("onkeypress",ieHandler);
}
//firefox回车
function fireFoxHandler(evt){
    if(evt.keyCode==13) {
        sendMessages()
    }
}
//IE回车
function ieHandler(evt){
    if(evt.keyCode==13) {
        sendMessages()
    }
}
var socket = io('http://115.28.101.251:2333');
var words = document.getElementById("words")
socket.on('news', function (data) {
    words.innerHTML = words.innerHTML + "<p><span class='times'>" + data.times + "<span class='nicks'>" + data.nick + ":<span class='words'>" + data.words +"</p>"
    words.scrollTop = words.scrollHeight;
});
function  sendMessages (){
    var word = document.getElementById("texts").value
    var nick = document.getElementById("nicks").value
    if (word && (!(nick=="nick") && nick )){
        socket.emit('sends',{nick:nick,words:word})
        words.innerHTML = words.innerHTML + "<p class='mytext'><span class='nicks'>我<span class='words'>" + word +"</p>"
        words.scrollTop = words.scrollHeight;
        document.getElementById("texts").value = ""
    }else {
        alert ("nick or messages is error! ")
    }

}