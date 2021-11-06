const socket = io()
const chat = document.getElementById('chat');
const botonEnviar = document.getElementById('boton-enviar');
botonEnviar.addEventListener('click', () => {
    socket.emit('mensaje', chat.value);
})

socket.on('mensajes' , data => {
    const mensajesHTML = data
        .map(msj => `SocketId: ${msj.socketId} -> Mensaje : ${msj.mensaje}` )
        .join('<br>')
    const chatHistory = document.getElementById('chat-history');
    chatHistory.innerHTML = mensajesHTML;
})