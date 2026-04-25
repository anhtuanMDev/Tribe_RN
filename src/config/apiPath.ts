import { UAT_URL, PRODUCT_URL } from '@env';

export const API_PATH = {
  BASE_URL: __DEV__ ? UAT_URL : PRODUCT_URL,

  AUTH: {
    REGISTER: '/auth/register/',
    VERIFY_EMAIL: '/auth/verify-email/',
    LOGIN: '/auth/login/',
    FORGOT_PASSWORD: '/auth/forgot-password/',
    RESET_PASSWORD: '/auth/reset-password/',
    REFRESH: '/auth/api/token/refresh/',
    REQUEST_CODE: '/auth/request-code/',
  },
};
