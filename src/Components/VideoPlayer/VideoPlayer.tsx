import * as React from "react";
import styled from "styled-components";
import "video-react/dist/video-react.css";

import { Player, BigPlayButton } from "video-react";
const VideoPlayerWrapper = styled.div`

`

interface IVideoPlayerState {
}

interface IVideoPlayerProps {
    videoUrl: string;
}

class VideoPlayer extends React.Component<IVideoPlayerProps, IVideoPlayerState> {
    constructor(props: IVideoPlayerProps) {
        super(props);
    }
  render() {
    return (
      <VideoPlayerWrapper>
        <Player fluid={true} preload={'metadata'} src={this.props.videoUrl}>
          <BigPlayButton position="center" />
        </Player>
      </VideoPlayerWrapper>
    );
  }
}

export default VideoPlayer;
