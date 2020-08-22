import * as React from "react";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { sendMessage, sendMessageComplete } from "../../Store/actions";
import { IState } from "../../Store/reducer";
import { IWebsocketMessage } from "../../Interfaces/IRequestData";
import { EWSClientType } from "../../Enums/EWSClientType";
import { EWSMessageType } from "../../Enums/EWSMessageType";
import styled from "styled-components";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import { triggerAsyncId } from "async_hooks";

const VideoDisplayWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  min-height: 90vh;
`;

const Column = styled.div`
  background: pink;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
`;
type TVideoWrapper = {
  background?: string;
  height?: string;
};
const VideoWrapper = styled.div<TVideoWrapper>`
  background: ${(props) => props.background};
  height: ${(props) => props.height};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

interface IVideoDisplayState {
  wrapperHeight: number;
  wrapperWidth: number;
  showVideos: boolean;
}

interface IVideoDisplayProps {
  ws_message: string;
  ws_message_sent: boolean;
  sendMessageComplete: Function;
  sendMessage: Function;
}

class VideoDisplay extends React.Component<
  IVideoDisplayProps,
  IVideoDisplayState
> {
  constructor(props: IVideoDisplayProps) {
    super(props);
    this.wrapperRef = React.createRef();
    this.state = {
      wrapperHeight: 1,
      wrapperWidth: 1,
      showVideos: false,
    };
  }
  wrapperRef;

  calculateHeight(percent: number): number {
    return percent * this.state.wrapperHeight;
  }

  onLoad = () => {
    if (this.state.wrapperHeight === 1) {
      this.setState({
        wrapperHeight: this.wrapperRef.current.offsetHeight - 20,
        wrapperWidth: this.wrapperRef.current.offsetWidth / 3,
      });
    }
  };
  render() {
    return (
      <VideoDisplayWrapper
        onMouseDown={() => this.onLoad()}
        ref={this.wrapperRef}
      >
        {this.state.showVideos ? (
          <React.Fragment>
            <Column>
              <VideoWrapper background="orange" height="35%">
                {" "}
                <VideoPlayer
                  width={this.state.wrapperWidth}
                  height={this.calculateHeight(0.35)}
                />
              </VideoWrapper>
              <VideoWrapper background="yellow" height="65%">
                {" "}
                <VideoPlayer
                  width={this.state.wrapperWidth}
                  height={this.calculateHeight(0.65)}
                />
              </VideoWrapper>
            </Column>
            <Column>
              <VideoWrapper background="pink" height="50%">
                {" "}
                <VideoPlayer
                  width={this.state.wrapperWidth}
                  height={this.calculateHeight(0.5)}
                />
              </VideoWrapper>
              <VideoWrapper background="blue" height="50%">
                {" "}
                <VideoPlayer
                  width={this.state.wrapperWidth}
                  height={this.calculateHeight(0.5)}
                />
              </VideoWrapper>
            </Column>
            <Column>
              <VideoWrapper background="green" height="25%">
                {" "}
                <VideoPlayer
                  width={this.state.wrapperWidth}
                  height={this.calculateHeight(0.25)}
                />
              </VideoWrapper>
              <VideoWrapper background="cyan" height="25%">
                {" "}
                <VideoPlayer
                  width={this.state.wrapperWidth}
                  height={this.calculateHeight(0.25)}
                />
              </VideoWrapper>
              <VideoWrapper background="purple" height="50%">
                {" "}
                <VideoPlayer
                  width={this.state.wrapperWidth}
                  height={this.calculateHeight(0.5)}
                />
              </VideoWrapper>
            </Column>
          </React.Fragment>
        ) : (
          <p> Button</p>
        )}
      </VideoDisplayWrapper>
    );
  }
}

const mapStateToProps = (state: IState) => {
  return {
    ws_message: state.ws_message,
    ws_message_sent: state.ws_message_sent,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    sendMessageComplete: () => dispatch(sendMessageComplete()),
    sendMessage: (message: string) => dispatch(sendMessage(message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoDisplay);
