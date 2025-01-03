import axios from "axios";

const URL_Server = "http://localhost:3000";

const api = axios.create({
  baseURL: URL_Server,
});

export default api;
