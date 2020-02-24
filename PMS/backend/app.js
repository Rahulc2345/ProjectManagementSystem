var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');
var routes = require('./routes/route')
var socket = require('socket.io')
var chat = require('./model/chat')
const Cryptr = require('cryptr');
const cryptr = new Cryptr('thisIsASecretKeyForEncryption');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(bodyParser.json())
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
app.use(logger('dev'));
//app.use(express.json());
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append("Access-Control-Allow-Headers", "Origin, Accept,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  res.append('Access-Control-Allow-Credentials', true);
  next();
});

app.use(cors());
mongoose.connect('mongodb://localhost:27017/PMSDatabase', { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.connection.on('connected', () => {
  console.log("Connected to Database");
});
mongoose.connection.on('error', () => {
  console.log("Error connecting to Database");
});

var server = app.listen(3000, () => {
  console.log("Server started");
})

//const io = socket.listen(server);
// io.sockets.on('connection', (socket)=>{
//   console.log('socket connected')
//   console.log(socket);
//   socket.on('send message', data=>{
//     io.sockets.emit('new message', data);
//   })
// })

//var server = http.createServer(app);

var io = socket.listen(server);

io.on('connection', (socket) => {
  console.log('new connection made.');
  socket.on('join', function (data) {
    socket.join(data.room);
    //console.log(data.user + ' joined the room : ' + data.room);
    //console.log(data.user);
    socket.broadcast.to(data.room).emit('new user joined', { user: data.user, message: "is online." });
  });

  socket.on('leave', function (data) {
    console.log(data.user + 'left the room : ' + data.room);
    socket.broadcast.to(data.room).emit('left room', { user: data.user, message: 'is offline.' });
    socket.leave(data.room);
  });

  socket.on('message', function (data) {
    //console.log(data)
    const encryptedMessage = cryptr.encrypt(data.message);
    console.log(data.message + " ------> " + encryptedMessage)
    var newMessage = new chat({
      //userIds: req.body.userIds,
      from: data.from,
      to: data.to,
      username: data.user,
      message: encryptedMessage,
      timestamp: data.timestamp,
      groupId: data.group
    });
    newMessage.save((err, data) => {
      if (err) {
        console.log(err)
        //resp.json("could not add chat" + err)
      }
      else {
        //console.log(data);
        //resp.json("chat inserted successfully")
        const desryptedMessage = cryptr.decrypt(data.message)
        io.sockets.emit('new message', { user: data.username, from: data.from, to: data.to, message: desryptedMessage })
      }
    })
  })

  socket.on('group message', function (data) {
    console.log("group")
    const encryptedMessage = cryptr.encrypt(data.message);
    console.log(data.message + " ------> " + encryptedMessage)
    var newMessage = new chat({
      //userIds: req.body.userIds,
      from: data.from,
      to: data.to,
      username: data.user,
      message: encryptedMessage,
      timestamp: data.timestamp,
      groupId: data.group
    });
    newMessage.save((err, data) => {
      if (err) {
        console.log(err)
        //resp.json("could not add chat" + err)
      }
      else {
        //console.log(data);
        //resp.json("chat inserted successfully")
        const desryptedMessage = cryptr.decrypt(data.message)
        io.sockets.emit('new group message', { user: data.username, from: data.from, to: data.to, message: desryptedMessage })
      }
    })
  })

  socket.on('typing', (data) => {
    console.log(data)
    socket.broadcast.in(data.room).emit('istyping', { username:data.user, data: data, isTyping: true });
  });

  socket.on('not typing', (data) => {
    console.log(data)
    socket.broadcast.in(data.room).emit('stoppedtyping', { data: data, isTyping: false });
  });

  //   socket.on('ids', function (data) {
  //     var username = data.user
  //     var m1 = [];
  //     var m2 = [];
  //     console.log(data)
  //     chat.find({ from: data.from, to: data.to }, (err, docs) => {
  //       if (err) {
  //         console.log(err)
  //       }
  //       else {
  //         m1 = docs;
  //         console.log(111111)
  //         console.log(m1)
  //         chat.find({ from: data.to, to: data.from }, (err, docs) => {
  //           if (err) {
  //             console.log(err)
  //           }
  //           else {
  //             m2 = docs;
  //             console.log(222)
  //             console.log(m2)
  //             var m3 = m1.concat(m2);
  //             console.log(333)
  //             console.log(m3)
  //             var message = m3.sort((a, b) => {
  //               return a.timestamp.localeCompare(b.timestamp)
  //             })
  //              console.log("after sort")
  //             console.log(message)
  //             socket.emit('old message', { user: username, obj: message })
  //           }
  //         })
  //       }
  //     })
  //   })
});

app.use('/routes', routes);

module.exports = app;
