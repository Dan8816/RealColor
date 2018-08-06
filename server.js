const express = require("express");
var session = require('express-session');
var app = express();
// var ses = express-session();
const path = require("path");
const bodyParser = require('body-parser');
const server = app.listen(8000, function() {
console.log("listening on port 8000");
const io = require('socket.io')(server);

var color;

io.on('connection', function (socket) {
  io.emit('update', {color : color})
  console.log("back at server")
  
  socket.on('color', function(data) { //4
    console.log(data.color);
    
    color = data.color;
    // console.log(data.color+" is the new color");
  io.emit('update', { color: data.color});})

  ;})
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
require("./server/config/routes")(app);