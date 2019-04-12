import Axios, { AxiosPromise, AxiosRequestConfig } from 'axios';

Axios.defaults.baseURL = "";

export class API {
    
    public static get(path: string, params?: AxiosRequestConfig): AxiosPromise {
        return new Promise((resolve, reject) => {
            Axios.get(path, params).then(res => {
                resolve(res.data);
            }).catch(res => {
                reject(res.response.data.message);
            });
        })
    }

    public static post(path: string, params?: AxiosRequestConfig): AxiosPromise {
        return new Promise((resolve, reject) => {
            Axios.post(path, params).then(res => {
                resolve(res.data);
            }).catch(res => {
                reject(res.response.data.message);
            });
        })
    }
}