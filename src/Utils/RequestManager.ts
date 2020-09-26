import axios, { AxiosRequestConfig } from 'axios';
import { IAddVideoRequestBody, IUpdateVideoRequestBody, IAddScreenRequestBody, IUpdateScreenRequestBody, IAddAudioRequestBody } from '../Interfaces/IRequestData';
import { IAudio } from '../Interfaces/IAudio';


export default class RequestManager {
    static baseUrl = 'https://v2lu4dcv0l.execute-api.us-east-1.amazonaws.com/dev/'
    
    static async addVideo(data: IAddVideoRequestBody) {
        return await this.post(`${this.baseUrl}/video/create`, data);
    }

    static async addScreen(data: IAddScreenRequestBody) {
        return await this.post(`${this.baseUrl}/screen/create`, data);
    }

    static async addAudio(data: IAddAudioRequestBody) {
        return await this.post(`${this.baseUrl}/audio/create`, data);
    }

    static async getVideos() {
        return await this.get(`${this.baseUrl}/videos`);
    }

    static async getScreens() {
        return await this.get(`${this.baseUrl}/screens`);
    }

    static async getAudio() {
        return await this.get(`${this.baseUrl}/audio`);
    }

    static async editVideo(data: IUpdateVideoRequestBody) {
        return await this.post(`${this.baseUrl}/video/update`, data);
    }

    static async editAudio(data: IAudio) {
        return await this.post(`${this.baseUrl}/audio/update`, data);
    }

    static async editScreen(data: IUpdateScreenRequestBody) {
        return await this.post(`${this.baseUrl}/screen/update`, data);
    }

    static async deleteVideo(data: IUpdateVideoRequestBody) {
        return await this.post(`${this.baseUrl}/video/delete`, data);
    }

    static async isScheduleActive() {
        return await this.get(`${this.baseUrl}/schedule/is_active`)
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