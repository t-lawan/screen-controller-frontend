import * as React from "react";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { sendMessage, sendMessageComplete } from "../../Store/actions";
import { IState } from "../../Store/reducer";
import styled from "styled-components";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import LandScapeVideo from "../../Assets/landscape.mp4";
import PortraitVideo from "../../Assets/portrait.mp4";
import { EVideoAspectRatio } from "../../Enums/EVideoAspectRatio";
type TVideoDisplayWrapper = {
  isDisplay: boolean;
};
const VideoDisplayWrapper = styled.div<TVideoDisplayWrapper>`
  display: ${props => (props.isDisplay ? "grid" : "block")};
  grid-template-columns: ${props =>
    props.isDisplay ? "repeat(3, 1fr)" : "1fr"};
  min-height: 80vh;
  grid-column-gap: 4rem;
`;
type TColumn = {
  justifyContent?: string;
};
const Column = styled.div<TColumn>`
  background: "white";
  display: flex;
  flex-direction: column;
  justify-content: ${props =>
    props.justifyContent ? props.justifyContent : "space-between"};
`;
type TVideoWrapper = {
  background?: string;
  height?: string;
  justifyContent?: string;
};

enum EScreenNumber {
  ONE = "ONE",
  TWO = "TWO",
  THREE = "THREE",
  FOUR = "FOUR",
  FIVE = "FIVE",
  SIX = "SIX",
  INSTALLATION_CAM = "INSTALLATION_CAM"
}
const VideoWrapper = styled.div<TVideoWrapper>`
  height: ${props => props.height};
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;
const TimeCodeWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
interface IScreenContainer {
  [key: string]: {
    height: number;
    isLive: boolean;
    text: string;
    aspectRatio: EVideoAspectRatio;
  };
}
interface IVideoDisplayState {
  wrapperHeight: number;
  wrapperWidth: number;
  showVideos: boolean;
  playVideos: boolean;
  screens: IScreenContainer;
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



interface IColumn {
  justifyContent: string,
  list: EScreenNumber[]
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
      screens: {
        ONE: {
          height: 0.5,
          isLive: false,
          text: "ONE",
          aspectRatio: EVideoAspectRatio.PORTRAIT
        },
        TWO: {
          height: 0.3,
          isLive: false,
          text: "TWO",
          aspectRatio: EVideoAspectRatio.LANDSCAPE
        },
        THREE: {
          height: 0.3,
          isLive: false,
          text: "FOUR",
          aspectRatio: EVideoAspectRatio.LANDSCAPE
        },
        FOUR: {
          height: 0.5,
          isLive: false,
          text: "FOUR",
          aspectRatio: EVideoAspectRatio.PORTRAIT
        },
        FIVE: {
          height: 0.25,
          isLive: false,
          text: "FIVE",
          aspectRatio: EVideoAspectRatio.LANDSCAPE

        },
        SIX: {
          height: 0.5,
          isLive: false,
          text: "SIX",
          aspectRatio: EVideoAspectRatio.PORTRAIT

        },
        INSTALLATION_CAM: {
          height: 0.3,
          isLive: true,
          text: "INSTALLATION CAM",
          aspectRatio: EVideoAspectRatio.LANDSCAPE
        }
      }
    };
  }
  wrapperRef;
  columns: IColumn[] = [
    {
      justifyContent: "space-around",
      list: [EScreenNumber.SIX, EScreenNumber.TWO]
    },
    {
      justifyContent: "flex-end",
      list: [EScreenNumber.THREE, EScreenNumber.INSTALLATION_CAM]
    },
    {
      justifyContent: "flex-start",
      list: [EScreenNumber.FOUR, EScreenNumber.ONE]
    }
  ];

  calculateHeight(percent: number): number {
    return percent * this.state.wrapperHeight;
  }

  playVideos = () => {
    if (!this.state.playVideos) {
      this.setState({
        playVideos: true
      });
    } else {
      this.setState({
        playVideos: false
      });
    }
  };
  showVideos = () => {
    if (this.state.wrapperHeight === 1) {
      this.setState({
        wrapperHeight: this.wrapperRef.current.offsetHeight - 20,
        wrapperWidth: this.wrapperRef.current.offsetWidth / 3,
        showVideos: true
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
              {this.columns.map((column, index) => (
                <Column
                  justifyContent={column.justifyContent}
                  onClick={() => this.playVideos()}
                >
                  {column.list.map((screen, i) => (
                    <VideoWrapper
                      height={`${this.state.screens[`${screen}`].height * 100}%`}
                    >
                      {" "}
                      <VideoPlayer
                        isPlaying={this.state.playVideos}
                        width={this.state.wrapperWidth}
                        height={this.calculateHeight(
                          this.state.screens[`${screen}`].height
                        )}
                        videoUrl={this.state.screens[`${screen}`].aspectRatio === EVideoAspectRatio.PORTRAIT ?  PortraitVideo : LandScapeVideo}
                        aspectRatio={this.state.screens[`${screen}`].aspectRatio}
                        isLive={this.state.screens[`${screen}`].isLive}
                        text={this.state.screens[`${screen}`].text}
                      />
                    </VideoWrapper>
                  ))}
                </Column>
              ))}

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
    ws_message_sent: state.ws_message_sent
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    sendMessageComplete: () => dispatch(sendMessageComplete()),
    sendMessage: (message: string) => dispatch(sendMessage(message))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoDisplay);
