import * as React from "react";
import { Dispatch } from "redux";
import { hasLoaded, setVideos } from "../../Store/actions";
import { connect } from "react-redux";
import { IState } from "../../Store/reducer";
import RequestManager from '../../Utils/RequestManager';

interface IStateProps {
    hasLoadedFunc: Function; 
    setVideos: Function; 
    setScreens: Function; 
    hasLoaded: boolean;
}

const State: React.FC<IStateProps> = (props: IStateProps) => {
    if(!props.hasLoaded) {
        RequestManager.getVideos().then((res) => {
            props.setVideos(res.data.data)
        }).finally(() => {
            props.hasLoadedFunc()
        });

    }
  return <></>;
};

const mapStateToProps = (reduxState: IState) => {
  return {
    hasLoaded: reduxState.hasLoaded
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    hasLoadedFunc: () => dispatch(hasLoaded()),
    setVideos: videos => dispatch(setVideos(videos)),
    setScreens: screens => dispatch(setVideos(screens))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(State);
