import axios from 'axios';

export const getUser = () => {
    if (typeof window !== 'undefined')
        return JSON.parse(localStorage.getItem('user') || '{}');
    return null;
}

const authAxiosClient = axios.create({
    baseURL: 'http://localhost:5000/api/',
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getUser()?.accessToken || ''}`
    }
});

export default authAxiosClient;