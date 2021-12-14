ws = new WebSocket("ws://localhost:8082? "+ window.location.href.split("?")[1]);

const messageDiv = document.getElementById("chat-window");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("send");

ws.onopen = function() {
    console.log("Connected to Server");
};

ws.onmessage = function({data}){
    messageDiv.innerHTML += "<p>" + data + "</p>";
};

ws.onerror = function(event){
    alert("ERROR");
};

ws.onclose = function(event){
    alert("WebSocket closed");
};

sendButton.onclick = function(){
    if(ws.readyState != 1){
        console.log("not connected");
        return;
    }

    message = messageInput.value;

    if(message != ""){
        ws.send(message);
    }
}
