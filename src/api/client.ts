import axios from 'axios';
import { env } from '../config/env';
import { toApiError } from './errors';

export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 10_000,
  params: {
    appid: env.apiKey,
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }
    return Promise.reject(toApiError(error));
  },
);