import axios from "axios";

const urlNiko = "http://192.168.2.61:3000";
const urlRama = "http://192.168.1.143:3005";

const instance = axios.create({
  baseURL: urlNiko,
});

export default instance;
