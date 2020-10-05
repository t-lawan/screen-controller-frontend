import * as React from "react";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
  sendMessage,
  sendMessageComplete,
  updateScreen
} from "../../Store/actions";
import { IState } from "../../Store/reducer";
import styled from "styled-components";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import LandScapeVideo from "../../Assets/landscape.mp4";
import PortraitVideo from "../../Assets/portrait.mp4";
import { EVideoAspectRatio } from "../../Enums/EVideoAspectRatio";
import { IWebsocketMessage } from "../../Interfaces/IRequestData";
import { EWSMessageType } from "../../Enums/EWSMessageType";
import { IScreen } from "../../Interfaces/IScreen";
import RequestManager from '../../Utils/RequestManager';


type TVideoDisplayWrapper = {
  isDisplay: boolean;
};
const VideoDisplayWrapper = styled.div<TVideoDisplayWrapper>`
  display: ${props => (props.isDisplay ? "grid" : "flex")};
  justify-content: center;
  align-items: center;
  grid-template-columns: ${props =>
    props.isDisplay ? "repeat(3, 1fr)" : "1fr"};
  min-height: 80vh;
  flex-direction: column;
  /* grid-column-gap: 4rem; */
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
  [key: string]: IScreenDisplay;
}

interface IScreenDisplay {
  height: number;
  isLive: boolean;
  text: string;
  aspectRatio: EVideoAspectRatio;
  id?: string;
}
interface IVideoDisplayState {
  wrapperHeight: number;
  wrapperWidth: number;
  showVideos: boolean;
  playVideos: boolean;
  screens: IScreenContainer;
  timeInSeconds: number;
  has_schedule_happened: boolean;
}

interface IVideoDisplayProps {
  ws_message: string;
  ws_message_sent: boolean;
  sendMessageComplete: Function;
  sendMessage: Function;
  is_schedule_running: boolean;
}

interface IColumn {
  justifyContent: string;
  list: EScreenNumber[];
}

const PerformanceText = {
  BEFORE_PERFORMANCE: 'Please wait for the scheduled rehearsal to begin',
  AFTER_PERFORMANCE: 'The scheduled rehearsal has ended'
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
      timeInSeconds: 0,
      has_schedule_happened: false,
      wrapperWidth: 1,
      showVideos: false,
      playVideos: false,
      screens: {
        // H 75 W 133
        ONE: {
          height: 133 / 237,
          isLive: false,
          text: "ONE",
          aspectRatio: EVideoAspectRatio.PORTRAIT
        },
        // H 68 W 122

        TWO: {
          height: 68 / 201,
          isLive: false,
          text: "TWO",
          aspectRatio: EVideoAspectRatio.LANDSCAPE
        },
        // H 75 W 133
        THREE: {
          height: 0.4,
          isLive: false,
          text: "THREE",
          aspectRatio: EVideoAspectRatio.LANDSCAPE
        },
        // H 52 W 93

        FOUR: {
          height: 52 / 237,
          isLive: false,
          text: "FOUR",
          aspectRatio: EVideoAspectRatio.LANDSCAPE
        },
        // H 52 W 93

        FIVE: {
          height: 52 / 237,
          isLive: false,
          text: "FIVE",
          aspectRatio: EVideoAspectRatio.LANDSCAPE
        },
        // H 75 W 133
        SIX: {
          height: 133 / 201,
          isLive: false,
          text: "SIX",
          aspectRatio: EVideoAspectRatio.PORTRAIT
        },

        INSTALLATION_CAM: {
          height: 0.3,
          isLive: false,
          text: "INSTALLATION CAM",
          aspectRatio: EVideoAspectRatio.LANDSCAPE
        }
      }
    };
  }
  wrapperRef;
  timer;
  columns: IColumn[] = [
    {
      justifyContent: "space-around",
      list: [EScreenNumber.SIX, EScreenNumber.TWO]
    },
    {
      justifyContent: "flex-end",
      list: [EScreenNumber.THREE]
    },
    {
      justifyContent: "flex-start",
      list: [EScreenNumber.FOUR, EScreenNumber.FIVE, EScreenNumber.ONE]
    }
  ];

  calculateHeight(percent: number): number {
    return percent * this.state.wrapperHeight;
  }

  async componentDidMount(){
    // let response = await RequestManager.isScheduleActive();
    // if(response.data){
    //   let data = response.data.data
    // }

  }

  componentDidUpdate(prevProps: IVideoDisplayProps) {
    if (
      this.props.ws_message_sent &&
      prevProps.ws_message_sent !== this.props.ws_message_sent
    ) {
      this.handleWebsocketMessage();
    }

    if(this.props.is_schedule_running !== prevProps.is_schedule_running) {
      if(this.props.is_schedule_running) {
        this.startSchedule();
      } else {
        this.stopSchedule()
      }
    }
  }

  startSchedule = () => {
    this.setState({
      has_schedule_happened: false
    })
    this.showVideos();

  }

  stopSchedule = () => {
    this.setState({
      has_schedule_happened: true
    })
    this.hideVideos()

  }
  handleWebsocketMessage() {
    let message: IWebsocketMessage = JSON.parse(this.props.ws_message);
    if (message) {
      switch (message.message) {
        case EWSMessageType.START_VIDEO:
          console.log('ALIEN SCREEN', message.raspberry_pi_id)
          console.log('VID', message.payload)
          this.updateScreen(message);
          break;
        case EWSMessageType.START_STREAM:
          console.log("START_STREAM");
          break;
        case EWSMessageType.START_SCHEDULE:
          console.log("ALIEN START_SCHEDULE");
          break;
        case EWSMessageType.STOP_SCHEDULE:
          console.log("ALIEN START_SCHEDULE");
          break;
        default:
          console.log("DEFAULT");
          break;
      }
    }

    this.props.sendMessageComplete();
  }
  updateScreen(message: IWebsocketMessage) {
    let screens = this.state.screens;
    let screen: IScreenDisplay;
    switch (`${message.raspberry_pi_id}`) {
      case "1":
        screen = {
          ...screens.ONE,
          id: message.payload,
          isLive: false
        };
        screens = {
          ...screens,
          ONE: screen
        };
        this.setState({
          screens: screens
        });
        break;
      case "2":
        screen = {
          ...screens.TWO,
          id: message.payload,
          isLive: false
        };
        screens = {
          ...screens,
          TWO: screen
        };
        this.setState({
          screens: screens
        });
        break;
      case "3":
        screen = {
          ...screens.THREE,
          id: message.payload,
          isLive: false
        };
        screens = {
          ...screens,
          THREE: screen
        };
        this.setState({
          screens: screens
        });
        break;
      case "4":
        screen = {
          ...screens.FOUR,
          id: message.payload,
          isLive: false
        };
        screens = {
          ...screens,
          FOUR: screen
        };
        this.setState({
          screens: screens
        });
        break;
      case "5":
        screen = {
          ...screens.FIVE,
          id: message.payload,
          isLive: false
        };
        screens = {
          ...screens,
          FIVE: screen
        };
        this.setState({
          screens: screens
        });
        break;
      case "6":
        screen = {
          ...screens.SIX,
          id: message.payload,
          isLive: false
        };
        screens = {
          ...screens,
          SIX: screen
        };
        this.setState({
          screens: screens
        });
        break;
    }
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
      });
    }
    
    this.setState({
        showVideos: true
      });

      this.startTimer();
  };

  hideVideos = () => {
    this.setState({
      showVideos: false
    });

    this.stopTimer();

  }
  displayTimecode = (seconds: number) : string => {
    const format = val => `0${Math.floor(val)}`.slice(-2)
    let hours = seconds / 3600;
    let minutes = (seconds % 3600) / 60;
    return [hours, minutes, seconds % 60].map(format).join(':')
  };
  startTimer = () => {
    this.setState({
      timeInSeconds: 0
    })
    this.timer = setInterval(() => {
      this.setState({
        timeInSeconds: this.state.timeInSeconds + 1
      });
    }, 2000);
  };

  stopTimer = () => {
    clearInterval(this.timer);
  }
  render() {
    return (
      <React.Fragment>
        <VideoDisplayWrapper
          isDisplay={this.state.showVideos}
          ref={this.wrapperRef}
          onClick={() => this.showVideos()}
        >
          {this.state.showVideos ? (
            <React.Fragment>
              {this.columns.map((column, index) => (
                <Column
                  key={index}
                  justifyContent={column.justifyContent}
                  onClick={() => this.playVideos()}
                >
                  {column.list.map((screen, i) => (
                    <VideoWrapper
                      height={`${this.state.screens[`${screen}`].height *
                        100}%`}
                      key={i}
                    >
                      {" "}
                      <VideoPlayer
                        isPlaying={this.state.playVideos}
                        width={this.state.wrapperWidth}
                        height={this.calculateHeight(
                          this.state.screens[`${screen}`].height
                        )}
                        videoUrl={
                          this.state.screens[`${screen}`].aspectRatio ===
                          EVideoAspectRatio.PORTRAIT
                            ? "https://dm0cfdicfoqce.cloudfront.net/vid_04.mp4"
                            : "https://dm0cfdicfoqce.cloudfront.net/vid_05.mp4"
                        }
                        aspectRatio={
                          this.state.screens[`${screen}`].aspectRatio
                        }
                        isLive={this.state.screens[`${screen}`].isLive}
                        text={this.state.screens[`${screen}`].text}
                        id={this.state.screens[`${screen}`].id}
                      />
                    </VideoWrapper>
                  ))}
                </Column>
              ))}
            </React.Fragment>
          ) : (
            <>
            <h1> {!this.props.is_schedule_running && this.state.has_schedule_happened  ? PerformanceText.AFTER_PERFORMANCE :  PerformanceText.BEFORE_PERFORMANCE}</h1>
            {/* <Button onClick={() => this.showVideos()} variant="contained">
              {" "}
              Click to view layout
            </Button> */}
            </>
          )}
        </VideoDisplayWrapper>
        <TimeCodeWrapper>
          <h1> {this.displayTimecode(this.state.timeInSeconds)}</h1>
        </TimeCodeWrapper>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: IState) => {
  return {
    ws_message: state.ws_message,
    ws_message_sent: state.ws_message_sent,
    is_schedule_running: state.is_schedule_running
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
