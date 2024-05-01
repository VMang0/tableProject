import axios from 'axios';
import { Urls } from '@utils/constants';

export const base_axios = axios.create({
    baseURL: Urls.BASE_URL,
});