import axios from 'axios';

// const API_URL = https://desolate-wildwood-45837.herokuapp.com/
const API_URL = process.env.VUE_APP_SERVICES; 
const PREFIX_AUTH = 'authentication/';

class AuthService {

    async login(payload) {
        return axios.post(API_URL + PREFIX_AUTH, payload);
    }

}

export default new AuthService();