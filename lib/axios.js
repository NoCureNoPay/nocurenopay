import axios from "axios";

export default axios.create({
    baseURL: 'http://api.nocurenopay.net/api/',
    // baseURL: 'http://localhost/nocurenopay/api/',
    // baseURL: 'http://localhost:8012/nocurenopay/api/',
    headers: {
        'X-Requested-With':'XMLHttpRequest',
        "content-type": "multipart/form-data",
    },
    withCredentials:true,
});