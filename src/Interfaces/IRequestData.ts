import { EVideoType } from '../Enums/EVideoType';
export interface IAddVideoRequestBody {
    title: string;
    uri: string;
    type: EVideoType
}
export interface IUpdateVideoRequestBody {
    id: string;
    title: string;
    uri: string;
    type: EVideoType
}