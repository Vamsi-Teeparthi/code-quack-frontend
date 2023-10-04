import { httpGET, httpPOST } from "../axios/axiosInstance";


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