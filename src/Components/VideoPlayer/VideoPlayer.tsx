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

const StyledPlayer = styled(Player)`
align-self: ${(props) => (props.isLeft ? "self-end" : "center")};

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
    isLeft?: boolean;
}

class VideoPlayer extends React.Component<IVideoPlayerProps, IVideoPlayerState> {
    player;
    isLeft;
    constructor(props: IVideoPlayerProps) {
        super(props);
        this.state = {
          isPlaying: false
        }
        this.player = React.createRef();
        this.isLeft = props.isLeft ? props.isLeft : false
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
        <StyledPlayer isLeft={this.isLeft} ref={(player) => this.player = player} muted={true} fluid={false} width={'90%'} height={this.props.height}  preload={'metadata'} src={Video}>
          <ControlBar disableCompletely={true} className="my-class" />
        </StyledPlayer>

      </VideoPlayerWrapper>
    );
  }
}

export default VideoPlayer;
