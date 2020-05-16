import axios, { AxiosRequestConfig } from 'axios';
import { IAddVideoRequestBody, IUpdateVideoRequestBody } from '../Interfaces/IRequestData';


export default class RequestManager {
    static baseUrl = 'http://localhost:3000/dev'
    
    static async addVideo(data: IAddVideoRequestBody) {
        return await this.post(`${this.baseUrl}/video/create`, data);
    }

    static async getVideos() {
        return await this.get(`${this.baseUrl}/videos`);
    }

    static async editVideo(data: IUpdateVideoRequestBody) {
        return await this.post(`${this.baseUrl}/video/update`, data);
    }

    static async deleteVideo(data: IUpdateVideoRequestBody) {
        return await this.post(`${this.baseUrl}/video/delete`, data);
    }
    private static get = async (url: string) => {
        let config: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }       
        return await axios.get(url, config);
    }

    private static post = async (url: string, data: object ) => {
        const d = JSON.stringify(data); 
        let config: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }                                                                                      
        return await axios.post(url, d, config);
    }
}