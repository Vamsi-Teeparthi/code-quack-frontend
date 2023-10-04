


import Cookies from "js-cookie";

const onRequest = (config) => {
    let token = Cookies.get('token');
    let string = "/auth"
    if (config?.url?.includes(string)) {
        if (config.headers) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
    }
    return config;
};

const onRequestError = (error) => {
    return Promise.reject(error);
};

const onResponse = (response) => {
    return response;
};

// let requestsToRefresh = [];
// let isRefreshRequesting = false;
// let isExpired = false
const onResponseError = (error) => {
    return Promise.reject(error)
}
// const onResponseError = async (error) => {
//     if (error?.response?.status === 403) {
//         if (!isRefreshRequesting) {
//             isRefreshRequesting = true
//             let refreshToken = Cookies.get('refresh-token');
//             axios.post(`${API}/auth/refreshToken`,
//                 { refreshToken }
//             ).then(async (res) => {
//                 if (res?.status === STATUS_CODE.success) {
//                     const { accessToken, refreshToken } = res.data;
//                     Cookies.set("access-token", accessToken, { secure: true })
//                     Cookies.set("refresh-token", refreshToken, { secure: true })
//                     requestsToRefresh.forEach((cb) => cb(accessToken));
//                 } else {
//                     requestsToRefresh.forEach((cb) => cb(null));
//                     removeGameData(res?.response?.data?.message)
//                 }
//             }).catch((error) => {
//                 requestsToRefresh.forEach((cb) => cb(null));
//                 removeGameData(error?.response?.data?.message)
//             }).finally(() => {
//                 requestsToRefresh = [];
//                 isRefreshRequesting = false;
//             });
//         }
//         return new Promise((resolve, reject) => {
//             requestsToRefresh.push((token) => {
//                 if (token) {
//                     error.config._retry = true;
//                     error.config.headers.Authorization = `Bearer ${token}`;
//                     error.config.headers["Content-Type"] = `application/json`;
//                     resolve(axios(error?.config));
//                 }
//                 reject(error);
//             });
//         })
//     }
//     else if (error?.response?.data?.message === "User not authenticated") {
//         if(!isExpired){
//             isExpired = true
//             requestsToRefresh = [];
//             isRefreshRequesting = false;
//             try {
//                 removeGameData()
//                 return;
//             } catch (_error) {
//                 removeGameData()
//                 return;
//             }finally{
//                 isExpired = false
//             }
//         }else{

//             return ""
//         }
//     }
//     return Promise.reject(error);
// };

export const setupInterceptors = (axiosInstance) => {
    axiosInstance.interceptors.request.use(onRequest, onRequestError);
    axiosInstance.interceptors.response.use(onResponse, onResponseError);
    return axiosInstance;
};
