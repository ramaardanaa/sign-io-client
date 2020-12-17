import axios from "axios";

const urlNiko = "http://192.168.2.61:3000";
const urlRama = "http://192.168.1.143:3005";
const urlNino = "http://192.168.100.2:3000";

const instance = axios.create({
  baseURL: urlNino,
});

export default instance;
