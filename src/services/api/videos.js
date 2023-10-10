import { httpGET, httpPOST, httpPUT } from "../axios/axiosInstance";



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
export const getFavoriteVideos = async () => {
    let url = `/auth/videos/favorites/all`;
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
export const getNotifications = async () => {
    let url = `/auth/notifications`;
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


export const getVideo = async ({videoID}) => {
    let url = `/auth/videos/${videoID}`;
    return await httpGET(url)
        .then((res) => {
            return Promise.resolve(res);
        })
        .catch(async (err) => {
            console.log(err)
            return Promise.reject(err?.response);
        });
};


export const getQuiz = async ({videoID}) => {
    let url = `/auth/videos/quiz/${videoID}`;
    return await httpGET(url)
        .then((res) => {
            return Promise.resolve(res);
        })
        .catch(async (err) => {
            console.log(err)
            return Promise.reject(err?.response);
        });
};

export const submitQuiz = async ({videoID, data}) => {
    let url = `/auth/videos/quiz/${videoID}`;
    return await httpPOST(url, data)
        .then((res) => {
            return Promise.resolve(res);
        })
        .catch(async (err) => {
            console.log(err)
            return Promise.reject(err?.response);
        });
};


export const updateFavoriteVideo = async ({data}) => {
    let url = `/auth/videos/favorite`;
    return await httpPUT(url, data)
        .then((res) => {
            return Promise.resolve(res);
        })
        .catch(async (err) => {
            console.log(err)
            return Promise.reject(err?.response);
        });
};