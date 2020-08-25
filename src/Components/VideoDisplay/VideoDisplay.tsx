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

type TVideoDisplayWrapper = {
  isDisplay: boolean;
};
const VideoDisplayWrapper = styled.div<TVideoDisplayWrapper>`
  display: ${(props) => (props.isDisplay ? "grid" : "block")};
  grid-template-columns: ${(props) =>
    props.isDisplay ? "repeat(3, 1fr)" : "1fr"};
  border: 1px solid black;
  min-height: 85vh;
`;
type TColumn = {
    justifyContent?: string
  };
const Column = styled.div<TColumn>`
  background: "white";
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.justifyContent ? props.justifyContent : 'space-between'};
`;
type TVideoWrapper = {
  background?: string;
  height?: string;
  justifyContent?: string
};
const VideoWrapper = styled.div<TVideoWrapper>`
  height: ${(props) => props.height};
  display: flex;
  flex-direction: column;
`;
const TimeCodeWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

interface IVideoDisplayState {
  wrapperHeight: number;
  wrapperWidth: number;
  showVideos: boolean;
  playVideos: boolean;
}

interface IVideoDisplayProps {
  ws_message: string;
  ws_message_sent: boolean;
  sendMessageComplete: Function;
  sendMessage: Function;
}

interface IScreenInfo {
  height: number;
}

interface IScreenOject {
  height: IScreenInfo;
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
      playVideos: false,
    };
  }
  wrapperRef;
  screens = {
    ONE: {
      height: 0.5,
    },
    TWO: {
      height: 0.3,
    },
    THREE: {
      height: 0.3,
    },
    FOUR: {
      height: 0.2,
    },
    FIVE: {
      height: 0.2,
    },
    SIX: {
      height: 0.4,
    },
    INSTALLATION_CAM: {
      height: 0.3,
    },
  };

  calculateHeight(percent: number): number {
    return percent * this.state.wrapperHeight;
  }

  playVideos = () => {
    if (!this.state.playVideos) {
      this.setState({
        playVideos: true,
      });
    } else {
      this.setState({
        playVideos: false,
      });
    }
  };
  showVideos = () => {
    if (this.state.wrapperHeight === 1) {
      this.setState({
        wrapperHeight: this.wrapperRef.current.offsetHeight - 20,
        wrapperWidth: this.wrapperRef.current.offsetWidth / 3,
        showVideos: true,
      });
    }
  };
  render() {
    return (
      <React.Fragment>
        <VideoDisplayWrapper
          isDisplay={this.state.showVideos}
          ref={this.wrapperRef}
        >
          {this.state.showVideos ? (
            <React.Fragment>
              <Column 
                justifyContent={'space-around'}
                onClick={() => this.playVideos()}>
                {/* SIX */}
                <VideoWrapper
                  height={`${this.screens.SIX.height * 100}%`}
                >
                  {" "}
                  <VideoPlayer
                    isPlaying={this.state.playVideos}
                    width={this.state.wrapperWidth}
                    height={this.calculateHeight(this.screens.SIX.height)}
                  />
                </VideoWrapper>
                {/* TWO */}
                <VideoWrapper
                  height={`${this.screens.TWO.height * 100}%`}
                >
                  {" "}
                  <VideoPlayer
                    isPlaying={this.state.playVideos}
                    width={this.state.wrapperWidth}
                    height={this.calculateHeight(this.screens.TWO.height)}
                  />
                </VideoWrapper>
              </Column>
              <Column
                justifyContent={'flex-end'}
              >
                {/* THREE */}

                <VideoWrapper
                  height={`${this.screens.THREE.height * 100}%`}
                >
                  {" "}
                  <VideoPlayer
                    isPlaying={this.state.playVideos}
                    width={this.state.wrapperWidth}
                    height={this.calculateHeight(this.screens.THREE.height)}
                  />
                </VideoWrapper>
                {/* INSTALLATION */}

                <VideoWrapper
                  height={`${this.screens.INSTALLATION_CAM.height * 100}%`}
                >
                  {" "}
                  <VideoPlayer
                    isPlaying={this.state.playVideos}
                    width={this.state.wrapperWidth}
                    height={this.calculateHeight(
                      this.screens.INSTALLATION_CAM.height
                    )}
                  />
                </VideoWrapper>
              </Column>
              <Column
                justifyContent={'flex-start'}
              >
                {/* FOUR */}

                <VideoWrapper
                  height={`${(this.screens.FOUR.height +  this.screens.FIVE.height)* 100}%`}
                >
                  {" "}
                  <VideoPlayer
                    isLeft={true}
                    isPlaying={this.state.playVideos}
                    width={this.state.wrapperWidth}
                    height={this.calculateHeight(this.screens.FOUR.height)}
                  />
                  <VideoPlayer
                    isPlaying={this.state.playVideos}
                    isLeft={true}
                    width={this.state.wrapperWidth}
                    height={this.calculateHeight(this.screens.FIVE.height)}
                  />
                </VideoWrapper>
                {/* FIVE */}

                {/* <VideoWrapper
                  background="cyan"
                  height={`${this.screens.FIVE.height * 100}%`}
                >
                  {" "}

                </VideoWrapper> */}
                {/* ONE */}

                <VideoWrapper
                  height={`${this.screens.ONE.height * 100}%`}
                >
                  {" "}
                  <VideoPlayer
                    isPlaying={this.state.playVideos}
                    width={this.state.wrapperWidth}
                    height={this.calculateHeight(this.screens.ONE.height)}
                  />
                </VideoWrapper>
              </Column>
            </React.Fragment>
          ) : (
            <Button onClick={() => this.showVideos()} variant="contained">
              {" "}
              Show Video Layout
            </Button>
          )}
        </VideoDisplayWrapper>
        <TimeCodeWrapper>
          <h1> 00: 00</h1>
        </TimeCodeWrapper>
      </React.Fragment>
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
