import { IVideo } from "../Interfaces/IVideo";
import { IScreen } from "../Interfaces/IScreen";
import { AnyAction } from "redux";
import * as ActionTypes from "./actions";
import { stat } from "fs";
export interface IState {
  screens: IScreen[];
  videos: IVideo[];
}

const initalState: IState = {
  screens: [],
  videos: []
};

export const reducer = (state: IState = initalState, action: AnyAction) => {
  switch (action.type) {
    case ActionTypes.SET_SCREENS:
      return {
        ...state,
        screens: action.screens
      };
    case ActionTypes.SET_VIDEOS:
      return {
        ...state,
        videos: action.videos
      };
    default:
      return state;
  }
};
