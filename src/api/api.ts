import { SERVER_HOST } from '../utils/env-constants.ts';
import axios from 'axios';

const api = axios.create({
  withCredentials: true,
  baseURL: SERVER_HOST,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { api };
