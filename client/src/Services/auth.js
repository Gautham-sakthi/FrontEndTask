import API from './config';

const login = (email, password) => {
    return API({
        method: 'POST',
        url: '/user/login',
        data: {
            email,
            password
        }
    });
};

const register = (name, email, password) => {
    return API({
        method: 'POST',
        url: '/user/register',
        data: {
            name,
            email,
            password
        }
    });
};

export const authService = { login, register };