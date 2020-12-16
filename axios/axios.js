import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.2.61:3000",
});

export default instance;
