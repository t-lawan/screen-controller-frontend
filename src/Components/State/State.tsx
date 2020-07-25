import * as React from "react";
import { Dispatch } from "redux";
import { hasLoaded, setVideos, setScreens } from '../../Store/actions';
import { connect } from "react-redux";
import { IState } from "../../Store/reducer";
import RequestManager from '../../Utils/RequestManager';

interface IStateProps {
    hasLoadedFunc: Function; 
    setVideos: Function; 
    setScreens: Function; 
    hasLoaded: boolean;
}

class State extends React.Component<IStateProps, {}> {

    async componentDidMount() {
      if(!this.props.hasLoaded) {
        let videos;
        let screens;
        let response = await RequestManager.getVideos();
        if(response && response.data.data) {
          videos = response.data.data
          this.props.setVideos(videos);
        }

        response = await RequestManager.getScreens();
        if(response && response.data.data) {
          screens = response.data.data
          this.props.setScreens(screens);
        }

        if(videos && screens) {
          this.props.hasLoadedFunc()
        }
     }
    }
    render() {
      return <></>;

    }
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
    setScreens: screens => dispatch(setScreens(screens))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(State);
