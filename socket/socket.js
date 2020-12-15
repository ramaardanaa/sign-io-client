import io from "socket.io-client";
let socket = io("http://192.168.100.6:3000/");

export default socket;