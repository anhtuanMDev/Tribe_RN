import axios from 'axios';
import { appStore } from '../store';
import { API_PATH } from '../config/apiPath';

const api = axios.create({
  baseURL: API_PATH.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// attach token to every request
api.interceptors.request.use(config => {
  const token = appStore.token.get();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// handle 401 and refresh token
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null) => {
  failedQueue.forEach(promise => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token!);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (!error.response) {
      return Promise.reject({
        code: 'NETWORK_ERROR',
        message: 'No internet connection',
      });
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // queue requests while refreshing
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = appStore.refreshToken.get();
        const response = await axios.post(
          `${API_PATH.BASE_URL}${API_PATH.AUTH.REFRESH}`,
          {
            refresh: refreshToken,
          },
        );

        const newToken = response.data.access;
        appStore.token.set(newToken);
        processQueue(null, newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        // refresh failed - logout user
        appStore.token.set(null);
        appStore.refreshToken.set(null);
        appStore.user.set(null);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
