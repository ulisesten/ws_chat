document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
    const messagesDiv = document.getElementById('chat_messages_list');
    const inputMessage = document.getElementById('msg_input');
    
    // Escuchar mensajes del servidor
    socket.on('message', (data) => {
        console.log(data)
        const messageElement = document.createElement('div');
        messageElement.innerHTML = `<strong>${data.fromID}:</strong> ${data.text}`;
        messagesDiv.appendChild(messageElement);
    });
    
    // Ejemplo de envío de mensaje
    document.querySelector('button').addEventListener('click', () => {
        const message = inputMessage.value;
        inputMessage.value = "";
        socket.emit('message', {
            channel: 'support',
            text: message,
            fromID: 'Florindo'
        });
    });
});