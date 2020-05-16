import { EVideoType } from '../Enums/EVideoType';
export interface IVideo {
    id: string;
    title: string;
    filename: string;
    type: EVideoType
}