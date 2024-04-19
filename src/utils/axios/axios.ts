import axios from 'axios';

export const base_axios = axios.create({
    baseURL: BASE_URL
});