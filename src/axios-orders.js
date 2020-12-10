import axios from 'axios';

const instance = axios.create({
    baseURL:'https://r-app-14752-default-rtdb.firebaseio.com/'
});

export default instance;