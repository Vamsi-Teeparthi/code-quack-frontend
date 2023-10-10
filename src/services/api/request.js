import { httpGET, httpPOST } from "../axios/axiosInstance";


/**
 * calling login api to log the user
 */
export const requestVideos = async ({ data }) => {
    let url = `/auth/request/admin`;
    return await httpPOST(url, data)
        .then((res) => {
            return Promise.resolve(res);
        })
        .catch(async (err) => {
            return Promise.reject(err?.response);
        });
};



export const getRequests = async () => {
    let url = `/auth/request/admin`;
    return await httpGET(url)
        .then((res) => {
            return Promise.resolve(res);
        })
        .catch(async (err) => {
            return Promise.reject(err?.response);
        });
};