import axios from "axios";

const instance = axios.create({

  baseURL: "https://myblockbot-api.herokuapp.com"
});

export default instance;