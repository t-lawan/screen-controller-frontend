import { IVideo } from '../Interfaces/IVideo';
import { IScreen } from '../Interfaces/IScreen';
export const SET_VIDEOS = 'SET_VIDEOS';
export const SET_SCREENS = 'SET_SCREENS';

export const setVideos = (videos: IVideo[]) => {
    return {
        type: SET_VIDEOS,
        videos: videos
    }
}

export const setScreens = (screens: IScreen[]) => {
    return {
        type: SET_SCREENS,
        screens: screens
    }
}