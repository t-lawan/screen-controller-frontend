import { EVideoType } from '../Enums/EVideoType';
export interface IVideo {
    id: string;
    title: string;
    uri: string;
    type: EVideoType
}