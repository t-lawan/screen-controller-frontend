import { EVideoType } from '../Enums/EVideoType';
import { EScreenType } from '../Enums/EScreenType';
export interface IAddVideoRequestBody {
    title: string;
    uri: string;
    video_type: EVideoType
}

export interface IAddScreenRequestBody {
    local_ip_address: string;
    raspberry_pi_id: number;
    number_of_screens: number;
    video_file_playlist: string[];
    screen_type: EScreenType;
}

export interface IUpdateVideoRequestBody {
    id: string;
    title: string;
    uri: string;
    video_type: EVideoType
}

export interface IUpdateScreenRequestBody {
    id: string; 
    local_ip_address: string;
    raspberry_pi_id: number;
    number_of_screens: number;
    video_file_playlist: string[];
    screen_type: EScreenType;
}