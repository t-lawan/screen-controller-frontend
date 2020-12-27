import * as React from "react";
import styled from "styled-components";
import "../../video.css";
import Video from "../../Assets/Video.mp4";
import { Player, ControlBar, LoadingSpinner } from "video-react";
import { EVideoAspectRatio } from "../../Enums/EVideoAspectRatio";
import { IState } from "../../Store/reducer";
import { connect } from "react-redux";
import { IVideo } from "../../Interfaces/IVideo";

const VideoPlayerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;

  .video-react-big-play-button {
    display: none;
  }
`;

const Text = styled.h5`
  margin: 0;
`;

const StyledPlayer = styled(Player)`
  /* align-self: ${props => (props.isLeft ? "self-end" : "center")}; */
`;

interface IVideoPlayerState {
  isPlaying: boolean;
  videoUrl?: string;
}

const HiddenSpinner = styled(LoadingSpinner)`
  display: none !important;
`

interface IVideoPlayerProps {
  videoUrl?: string;
  isPlaying: boolean;
  hasEnded: Function;
}

class SimpleVideoPlayer extends React.Component<
  IVideoPlayerProps,
  IVideoPlayerState
> {
  player;
  constructor(props: IVideoPlayerProps) {
    super(props);
    this.state = {
      isPlaying: false
    };
    this.player = React.createRef();
  }

  componentDidMount() {
    // subscribe state change
    this.player.subscribeToStateChange(this.handleStateChange.bind(this));
  }

  handleStateChange = (state, prevState) => {
    if(state.ended) {
        this.props.hasEnded();
    }
  }

//   componentDidUpdate(prevProps: IVideoPlayerProps) {
//     if (this.props.isPlaying !== prevProps.isPlaying) {
//       if (this.state.isPlaying) {
//         this.player.pause();
//         this.setState({
//           isPlaying: false
//         });
//       } else {
//         this.player.play();
//         this.setState({
//           isPlaying: true
//         });
//       }
//     }
//   }
  render() {

    return (
      <VideoPlayerWrapper> 

          <StyledPlayer

            ref={player => (this.player = player)}
            muted={false}
            // fluid={false}
            preload={"metadata"}
            src={this.props.videoUrl}
            loop={false}
            autoPlay={true}

          >
            <ControlBar disableCompletely={true} className="my-class" />
            <HiddenSpinner />
          </StyledPlayer>
      </VideoPlayerWrapper>
    );
  }
}
const mapStateToProps = (state: IState) => {
  return {
    videos: state.videos
  };
};

export default connect(
  mapStateToProps,
  null
)(SimpleVideoPlayer);
