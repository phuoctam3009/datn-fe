import axios from 'axios';
import { baseUrl } from '../api/request.js'
//const API_URL = 'http://localhost:8080/api/auth/';
const API_URL = baseUrl + 'api/auth/';
class AuthService {
    login(user) {
        return axios
            .post(API_URL + 'signin', {
                username: user.username,
                password: user.password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data;
            });
    }
    logout() {
        localStorage.removeItem('user');
    }
    register(user) {
        return axios.post(API_URL + 'signup', {
            username: user.username,
            email: user.email,
            password: user.password,
            role: user.role
        });
    }
}
export default new AuthService();