import axios from "axios";

const instance = axios.create({
    baseURL: "http://3.141.203.3:90/api/",
});

export default instance;
 