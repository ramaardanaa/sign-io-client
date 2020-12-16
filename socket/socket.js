import io from 'socket.io-client/dist/socket.io';

let socket = io("http://192.168.100.2:3000/", { jsonp: false });

export default socket;