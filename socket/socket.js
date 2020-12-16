import io from 'socket.io-client/dist/socket.io';

let socket = io("http://192.168.100.6:3000/", {
  transports: ['websocket'],
  reconnectionAttempts: 15
});

export default socket;