const normalizeError = (error: any) => {
    if (!error.response) {
        return { code: 'NETWORK_ERROR', message: 'No internet connection' };
    }

    const status = error.response.status;
    const serverMessage = error.response.data?.error;

    if (status === 400) {
        return { code: 'BAD_REQUEST', message: serverMessage ?? 'Invalid request' };
    }
    if (status === 401) {
        return { code: 'UNAUTHORIZED', message: serverMessage ?? 'Session expired' };
    }
    if (status === 403) {
        return { code: 'FORBIDDEN', message: 'You don\'t have access to this' };
    }
    if (status === 404) {
        return { code: 'NOT_FOUND', message: 'Resource not found' };
    }
    if (status === 429) {
        return { code: 'RATE_LIMITED', message: 'Too many requests, please wait' };
    }
    if (status >= 500) {
        return { code: 'SERVER_ERROR', message: 'Something went wrong' };
    }

    return { code: 'UNKNOWN', message: 'Something went wrong' };
};