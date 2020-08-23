import * as React from "react";
import { Dispatch } from "redux";
import { hasLoaded, setVideos, setScreens, setAudio } from '../../Store/actions';
import { connect } from "react-redux";
import { IState } from "../../Store/reducer";
import RequestManager from '../../Utils/RequestManager';
import { IAudio } from '../../Interfaces/IAudio';

interface IStateProps {
    hasLoadedFunc: Function; 
    setVideos: Function; 
    setScreens: Function; 
    setAudio: Function; 
    hasLoaded: boolean;
}

class State extends React.Component<IStateProps, {}> {

    async componentDidMount() {
      if(!this.props.hasLoaded) {
        let videos;
        let screens;
        let audio
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

        response = await RequestManager.getAudio();
        if(response && response.data.data) {
          audio = response.data.data
          this.props.setAudio(audio);
        }

        if(videos && screens && audio) {
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
    setScreens: screens => dispatch(setScreens(screens)),
    setAudio: (audio: IAudio[]) => dispatch(setAudio(audio))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(State);
