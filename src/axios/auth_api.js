//auth api calls
import api from "../config/axios.config";
const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response;
}

export { login }