import { UAT_URL, PRODUCT_URL } from '@env';

export const API_PATH = {
  BASE_URL: __DEV__ ? UAT_URL : PRODUCT_URL,

  AUTH: {
    REGISTER: '/auth/register/',
    VERIFY_EMAIL: '/auth/verify-email/',
    LOGIN: '/auth/login/',
    REQUEST_VERIFICATION: '/auth/request-verification/',
    CONFIRM_VERIFICATION: '/auth/confirm-verification/',
    RESEND_VERIFICATION: '/auth/resend-verification/',
    RESET_PASSWORD: '/auth/reset-password/',
    CHANGE_PASSWORD: '/auth/change-password/',
    DELETE_ACCOUNT: '/auth/delete-account/',
    REFRESH: '/auth/api/token/refresh/',
  },
};