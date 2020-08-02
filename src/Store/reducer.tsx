import { IVideo } from "../Interfaces/IVideo";
import { IScreen } from "../Interfaces/IScreen";
import { AnyAction } from "redux";
import { UPDATE_SCREENS } from './actions';
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
  modal_open: boolean;
  modal_component: any;
  hasLoaded: false;
}

const initalState: IState = {
  screens: [],
  videos: [],
  modal_open: false,
  modal_component: null,
  hasLoaded: false
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
    default:
      return state;
  }
};
