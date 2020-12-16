import io from 'socket.io-client/dist/socket.io';

let socket = io("http://192.168.1.143:3005/", { jsonp: false });

export default socket;