import * as React from "react";
import styled from "styled-components";
import "video-react/dist/video-react.css";
import Video from "../../Assets/Video.mp4";
import { Player, ControlBar } from "video-react";
import { EVideoAspectRatio } from "../../Enums/EVideoAspectRatio";

const VideoPlayerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .video-react-big-play-button {
    display: none;
  }
`;

const Text = styled.h5`
  margin: 0;
`

const StyledPlayer = styled(Player)`
  /* align-self: ${props => (props.isLeft ? "self-end" : "center")}; */
`;
type TLabel = {
  marginLeft?: string;
  marginTop?: string;
};

const Label = styled.h1<TLabel>`
  position: absolute;
  align-self: flex-end;
  // color: red;
  // margin-left: ${props => props.marginLeft};
  // margin-top: ${props => props.marginTop};
`;

interface IVideoPlayerState {
  isPlaying: boolean;
}

interface IVideoPlayerProps {
  videoUrl?: string;
  width: number;
  height: number;
  isPlaying: boolean;
  aspectRatio: EVideoAspectRatio;
  isLive?: boolean;
  text?: string;
}

class VideoPlayer extends React.Component<
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

  componentDidUpdate(prevProps) {
    if (this.props.isPlaying !== prevProps.isPlaying) {
      if (this.state.isPlaying) {
        // this.player.pause()
        this.setState({
          isPlaying: false
        });
      } else {
        // this.player.play()

        this.setState({
          isPlaying: true
        });
      }
    }
  }
  "http://admin:false.memory@192.168.0.25/ISAPI/Streaming/channels/102/httpPreview";

  render() {
    let width =
      this.props.height *
      (this.props.aspectRatio === EVideoAspectRatio.LANDSCAPE
        ? 16 / 9
        : 9 / 16);
    return (
      <VideoPlayerWrapper>
        {this.props.isLive ? (
          <img
            height={this.props.height}
            width={width}
            src="http://admin:false.memory@192.168.0.25/ISAPI/Streaming/channels/103/httpPreview"
          />
        ) : null}
        {!this.props.isLive ? (
          <StyledPlayer
            aspectRatio={
              this.props.aspectRatio ? this.props.aspectRatio : "auto"
            }
            ref={player => (this.player = player)}
            muted={true}
            fluid={false}
            height={this.props.height}
            preload={"metadata"}
            src={this.props.videoUrl}
          >
            <ControlBar disableCompletely={true} className="my-class" />
          </StyledPlayer>
        ) : null}
        <Text>{this.props.text ? this.props.text : 'placeholders'}</Text>
      </VideoPlayerWrapper>
    );
  }
}

export default VideoPlayer;
