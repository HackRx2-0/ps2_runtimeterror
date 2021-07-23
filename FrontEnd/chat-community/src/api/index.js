import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:9000" });
export const createChannel = (formdata) => API.post("/addchannel", data);
export const getChannel = () => API.get("/getchannel");

export const addMessage = () => API.post("/addmessage", data);
