import { IVideo } from "../Interfaces/IVideo";
import { IScreen } from "../Interfaces/IScreen";
import { AnyAction } from "redux";
import {
  UPDATE_SCREENS,
  SEND_MESSAGE,
  SEND_MESSAGE_COMPLETE,
  SET_AUDIO
} from "./actions";
import { IAudio } from "../Interfaces/IAudio";
import { UPDATE_AUDIO, DISPATCH_MESSAGE, DISPATCH_MESSAGE_SENT, IS_CONNECTED, IS_DISCONNECTED } from './actions';
import {
  OPEN_MODAL,
  CLOSE_MODAL,
  SET_VIDEOS,
  SET_SCREENS,
  UPDATE_VIDEOS
} from "./actions";
export interface IState {
  screens: IScreen[];
  videos: IVideo[];
  audio: IAudio[];
  modal_open: boolean;
  modal_component: any;
  hasLoaded: false;
  ws_message: string;
  ws_message_sent: boolean;
  dispatched_ws_message: string;
  dispatched_ws_message_sent: boolean;
  is_connected: boolean;
}

const initalState: IState = {
  screens: [],
  videos: [],
  audio: [],
  modal_open: false,
  modal_component: null,
  hasLoaded: false,
  ws_message: "",
  ws_message_sent: false,
  dispatched_ws_message: "",
  dispatched_ws_message_sent: false,
  is_connected: false
};

export const reducer = (state: IState = initalState, action: AnyAction) => {
  switch (action.type) {
    case SET_SCREENS:
      return {
        ...state,
        screens: action.screens
      };
    case SET_VIDEOS:
      return {
        ...state,
        videos: action.videos
      };
    case SET_AUDIO:
      return {
        ...state,
        audio: action.audio
      };
    case OPEN_MODAL:
      return {
        ...state,
        modal_open: true,
        modal_component: action.component
      };
    case UPDATE_VIDEOS:
      return {
        ...state,
        videos: action.videos
      };
    case UPDATE_AUDIO:
      return {
        ...state,
        audio: action.audio
      };
    case UPDATE_SCREENS:
      return {
        ...state,
        screens: action.screens
      };
    case CLOSE_MODAL:
      return {
        ...state,
        modal_open: false
      };
    case SEND_MESSAGE:
      return {
        ...state,
        ws_message: action.ws_message,
        ws_message_sent: action.ws_message_sent
      };
    case SEND_MESSAGE_COMPLETE:
      return {
        ...state,
        ws_message: action.ws_message,
        ws_message_sent: action.ws_message_sent
      };
    case DISPATCH_MESSAGE:
      return {
        ...state,
        dispatched_ws_message: action.dispatched_ws_message,
        dispatched_ws_message_sent: action.dispatched_ws_message_sent
      };
    case DISPATCH_MESSAGE_SENT:
      return {
        ...state,
        dispatched_ws_message: action.dispatched_ws_message,
        dispatched_ws_message_sent: action.dispatched_ws_message_sent
      };
    case IS_CONNECTED:
      return {
        ...state,
        is_connected: true
      }
    case IS_DISCONNECTED:
      return {
        ...state,
        is_connected: false
      }
    default:
      return state;
  }
};
