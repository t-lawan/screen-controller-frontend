import { IVideo } from '../Interfaces/IVideo';
import { IScreen } from '../Interfaces/IScreen';
import { IAudio } from '../Interfaces/IAudio';

export const SET_VIDEOS = 'SET_VIDEOS';
export const UPDATE_VIDEOS = 'UPDATE_VIDEOS';

export const SET_SCREENS = 'SET_SCREENS';
export const UPDATE_SCREENS = 'UPDATE_SCREENS';

export const SET_AUDIO = 'SET_AUDIO';
export const UPDATE_AUDIO = 'UPDATE_AUDIO';



export const HAS_LOADED = 'HAS_LOADED';
export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

// This is for receiving WS MESSAGES
export const SEND_MESSAGE = 'SEND_MESSAGE'
export const SEND_MESSAGE_COMPLETE = 'SEND_MESSAGE_COMPLETE'


// This is for sending WS MESSAGES
export const DISPATCH_MESSAGE = 'DISPATCH_MESSAGE'
export const DISPATCH_MESSAGE_SENT = 'DISPATCH_MESSAGE_SENT'


export const sendMessage = (message: string) => {
    return  {
        type: SEND_MESSAGE,
        ws_message: message,
        ws_message_sent: true

    }
}

export const dispatchMessage = (message: string) => {
    return  {
        type: DISPATCH_MESSAGE,
        dispatched_ws_message: message,
        dispatched_ws_message_sent: true
    }
}

export const dispatchMessageComplete = () => {
    return  {
        type: DISPATCH_MESSAGE_SENT,
        dispatched_ws_message: '',
        dispatched_ws_message_sent: false
    }
}

export const sendMessageComplete = () => {
    return  {
        type: SEND_MESSAGE_COMPLETE,
        ws_message: '',
        ws_message_sent: false
    }
}

export const openModal = (component) => {
    return {
        type: OPEN_MODAL,
        component: component
    }
}

export const closeModal = () => {
    return {
        type: CLOSE_MODAL
    }
}

export const hasLoaded = () => {
    return {
        type: HAS_LOADED
    }
}

export const setVideos = (videos: IVideo[]) => {
    return {
        type: SET_VIDEOS,
        videos: videos
    }
}

export const addVideo = (videos: IVideo[], video: IVideo) => {
    let updatedVideos: IVideo[] = [...videos, video];
    return {
        type: UPDATE_VIDEOS,
        videos: updatedVideos
    } 
}

export const setAudio = (audio: IAudio[]) => {
    return {
        type: SET_AUDIO,
        audio: audio
    }
}

export const addAudio = (audio_list: IAudio[], audio: IAudio) => {
    let updatedVideos: IAudio[] = [...audio_list, audio];
    return {
        type: UPDATE_AUDIO,
        audio: updatedVideos
    } 
}

export const addScreen = (screens: IScreen[], screen: IScreen) => {
    let updatedScreens: IScreen[] = [...screens, screen];
    return {
        type: UPDATE_SCREENS,
        screens: updatedScreens
    } 
}

export const updateScreen = (screens: IScreen[], screen: IScreen) => {
    let updatedScreens: IScreen[] = screens;
    let index = updatedScreens.findIndex((scr) => {
        return scr.id === screen.id
    })
    if(index) {
        updatedScreens.splice(index, 1);
        updatedScreens.push(screen);
    }
    return {
        type: UPDATE_SCREENS,
        screens: updatedScreens
    } 
}

export const setScreens = (screens: IScreen[]) => {
    return {
        type: SET_SCREENS,
        screens: screens
    }
}