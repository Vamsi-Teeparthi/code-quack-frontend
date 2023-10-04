import axios from "axios";
import { setupInterceptors } from "./setUpInterceptors";
import { API } from "../../backend";
console.log("PAI", API)

// instance of axios created
export const instance = setupInterceptors(
    axios.create({
        baseURL: API,
        headers: {
            common: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            // 'X-Content-Type-Options': 'nosniff',
            // 'X-Frame-Options': 'DENY',
            // 'Referrer-Policy': 'no-referrer',
            // 'Cache-Control': 'no-cache',
            // You can add more headers here as needed
        },
        withCredentials: false
    })
)


export const cancelTokenSource = axios.CancelToken.source();

/**
 * Module to make a post request.
 * @param {*} url post url
 * @param {*} header 
 * @param {*} data that needs to send to backend
 * @param {*} params 
 */
export const httpPOST = (url, data) => {
    return new Promise((resolve, reject) => {
        instance.post(url, data)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                if (axios.isAxiosError(err)) {
                    if (err?.code === "ERR_NETWORK") {
                        // toasts.info("Sorry for the inconvenience, the server is currently not responding. Please try again later.");
                        err.response.data = {
                            message: "Sorry for the inconvenience, the server is currently not responding. Please try again later."
                        }
                    }
                    reject(err)

                } else {
                    reject(err)
                }
            })
    })
}


/**
 * Module to make a get request.
 * @param {*} url post url
 * @param {*} header 
 * @param {*} data that needs to send to backend
 * @param {*} params 
 */
export const httpGET = (url, data) => {
    return new Promise((resolve, reject) => {
        instance.get(url)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                if (axios.isAxiosError(err)) {
                    if (err?.code === "ERR_NETWORK") {
                        // toasts.info("Sorry for the inconvenience, the server is currently not responding. Please try again later.");
                        err.response.data = {
                            message: "Sorry for the inconvenience, the server is currently not responding. Please try again later."
                        }
                    }
                    reject(err)

                } else {
                    reject(err)
                }
            })
    })
}