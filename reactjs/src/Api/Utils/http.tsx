import axios from 'axios'
import { BASE_URL_API } from '../Constant';

export const http = axios.create({
    baseURL: BASE_URL_API,
});