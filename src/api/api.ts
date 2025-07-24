import { SERVER_HOST } from '../utils/env-constants.ts';

const api = axios.create({
  baseURL: SERVER_HOST,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { api };
