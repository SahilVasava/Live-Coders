import axios from "axios";

const token = localStorage.getItem("token") || "";

const instance = axios.create({
  headers: { token },
});

export default instance;
