import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://mymanager-1589901391852.firebaseio.com/'
});

export default instance;