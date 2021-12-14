const express = require('express');
const url = require('url');
const WebSocket = require("ws");

const wss = new WebSocket.Server({port: 8082});
const app = express();
const webPort = process.env.PORT || 3000;

app.use(express.static('public'));

app.listen(webPort, () => {
  console.log(`Listening at https://localhost:${webPort}`);
});

wss.on("connection", function connection(ws, req) {
    ws.id = req.url.split("name=")[1].replace("%20", " ");
    console.log("Client connected with id " + ws.id);
  
    if(ws.id == "exit"){
      ws.close();
    }
    
    ws.on("close", ws =>{
      console.log("Client disconected");
    });
  
    ws.on("message", data => {
      console.log("Message Recieved from " + ws.id + ": " + data);

      wss.clients.forEach(element =>{
        element.send(ws.id + ": " + String(data));
      })
    });
  });
  