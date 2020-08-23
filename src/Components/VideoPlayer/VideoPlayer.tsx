import * as React from "react";
import styled from "styled-components";
import "video-react/dist/video-react.css";
import Video from '../../Assets/Video.mp4'
import { Player, ControlBar } from "video-react";

const VideoPlayerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .video-react-big-play-button {
    display: none;
  }

`
type TLabel = {
  marginLeft?: string;
  marginTop?: string;
};

const Label = styled.h1<TLabel>`
  position: absolute;
  align-self: flex-end;
  // color: red;
  // margin-left: ${(props) => props.marginLeft};
  // margin-top: ${(props) => props.marginTop};
`

interface IVideoPlayerState {
  isPlaying: boolean
}

interface IVideoPlayerProps {
    videoUrl?: string;
    width: number;
    height: number;
    isPlaying: boolean;
}

class VideoPlayer extends React.Component<IVideoPlayerProps, IVideoPlayerState> {
    player;
    constructor(props: IVideoPlayerProps) {
        super(props);
        this.state = {
          isPlaying: false
        }
        this.player = React.createRef();
    }

    componentDidUpdate(prevProps) {
      if(this.props.isPlaying !== prevProps.isPlaying) {
        if(this.state.isPlaying) {
          this.player.pause()
          this.setState({
            isPlaying: false
          })
        } else {
          this.player.play()

          this.setState({
            isPlaying: true
          })
        }
      }
    }

  render() {
    return (
      <VideoPlayerWrapper>
        <Player ref={(player) => this.player = player} muted={true} fluid={false} width={'90%'} height={this.props.height}  preload={'metadata'} src={Video}>
          <ControlBar disableCompletely={true} className="my-class" />
        </Player>

      </VideoPlayerWrapper>
    );
  }
}

export default VideoPlayer;
