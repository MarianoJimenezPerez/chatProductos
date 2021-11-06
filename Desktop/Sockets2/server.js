const express = require ('express');
const { Server: HttpServer} = require('http');
const { Server: IOServer} = require('socket.io');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static('./public'));

let socketGuardado
const mensajes = [];
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname} )
})

io.on('connection', (socket) => {
    console.log("conectado");
    socket.emit('mensajes', mensajes)
    socketGuardado = socket
    socket.on('mensaje' , data => {
        mensajes.push({socketId: socket.id, mensaje: data});
        io.sockets.emit('mensajes', mensajes)
    })
})
httpServer.listen(8080, () => console.log('Server iniciado'));