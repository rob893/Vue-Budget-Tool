import axios from 'axios';

export class API {
    
    public static get(path: string, params?: any): Promise<any> {
        return new Promise((resolve, reject) => {
            axios.get(path, { params: params }).then(res => {
                resolve(res.data);
            }).catch(res => {
                reject(res.response.data.message);
            });
        })
    }

    public static post(path: string, params?: any): Promise<any> {
        return new Promise((resolve, reject) => {
            axios.post(path, params).then(res => {
                resolve(res.data);
            }).catch(res => {
                reject(res.response.data.message);
            });
        })
    }
}