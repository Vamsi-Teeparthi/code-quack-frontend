import { httpGET, httpPOST, httpPUT } from "../axios/axiosInstance";


/**
 * calling login api to log the user
 */
export const login = async ({ data }) => {
    let url = `/user/login`;
    return await httpPOST(url, data)
        .then((res) => {
            return Promise.resolve(res);
        })
        .catch(async (err) => {
            return Promise.reject(err?.response);
        });
};


/**
 * calling login api to log the user
 */
export const signup = async ({ data }) => {
    let url = `/user/signup`;
    return await httpPOST(url, data)
        .then((res) => {
            return Promise.resolve(res);
        })
        .catch(async (err) => {
            return Promise.reject(err?.response);
        });
};



/**
 * calling login api to log the user
 */
export const submitFeedback = async ({ data }) => {
    let url = `/auth/feedback`;
    return await httpPOST(url, data)
        .then((res) => {
            return Promise.resolve(res);
        })
        .catch(async (err) => {
            return Promise.reject(err?.response);
        });
};



export const getProfile = async () => {
    let url = `/auth/user/profile`;
    return await httpGET(url)
        .then((res) => {
            return Promise.resolve(res);
        })
        .catch(async (err) => {
            return Promise.reject(err?.response);
        });
};


export const resetPassword = async ({ data }) => {
    let url = `/auth/user/reset-password`;
    return await httpPUT(url, data)
        .then((res) => {
            return Promise.resolve(res);
        })
        .catch(async (err) => {
            return Promise.reject(err?.response);
        });
};