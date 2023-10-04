import { httpGET, httpPOST } from "../axios/axiosInstance";



/**
 * calling login api to log the user
 */
export const getVideos = async () => {
    let url = `/auth/videos/all`;
    return await httpGET(url)
        .then((res) => {
            return Promise.resolve(res);
        })
        .catch(async (err) => {
            console.log(err)
            return Promise.reject(err?.response);
        });
};


/**
 * calling login api to log the user
 */
export const uploadVideos = async ({ data }) => {
    let url = `/auth/videos//create`;
    return await httpPOST(url, data)
        .then((res) => {
            return Promise.resolve(res);
        })
        .catch(async (err) => {
            return Promise.reject(err?.response);
        });
};