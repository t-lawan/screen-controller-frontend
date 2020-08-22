import * as React from "react";
import styled from "styled-components";
import "video-react/dist/video-react.css";
import Video from '../../Assets/Video.mp4'
import { Player, BigPlayButton } from "video-react";

const VideoPlayerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

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
}

interface IVideoPlayerProps {
    videoUrl?: string;
    width: number;
    height: number;
}

class VideoPlayer extends React.Component<IVideoPlayerProps, IVideoPlayerState> {
    constructor(props: IVideoPlayerProps) {
        super(props);
    }
  render() {
    return (
      <VideoPlayerWrapper>
        {/* <Player fluid={true} preload={'metadata'} src={this.props.videoUrl}> */}
        <Player fluid={false} width={'90%'} height={this.props.height}  preload={'metadata'} src={Video}>
          <BigPlayButton position="center" />
        </Player>
        <Label> Text </Label>

      </VideoPlayerWrapper>
    );
  }
}

export default VideoPlayer;
