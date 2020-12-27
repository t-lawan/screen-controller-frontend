import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IState } from "../../Store/reducer";
import {
  sendMessageComplete,
  sendMessage,
  scheduleStarted
} from "../../Store/actions";
import styled from "styled-components";
import SimpleVideoPlayer from "../SimpleVideoPlayer/SimpleVideoPlayer";
import Landscape from '../../Assets/landscape.mp4'
const SingleVideoDisplayWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ErrorText = styled.p`
    margin: 0.5rem 0;
`

const TimeText = styled.h2`
    margin: 0.5rem 0;

`

const StyledInput = styled.input`
  background: black;
  border: 0;
  border-bottom: 1px solid white;
  color: white;
  padding: 1rem;
`;

interface IVideoDisplayState {
  password: string;
  isLoggedIn: boolean;
  error: boolean;
  timeInSeconds: number;
  [key: string]: any;
}

interface IVideoDisplayProps {}

class SingleVideoDisplay extends React.Component<
  IVideoDisplayProps,
  IVideoDisplayState
> {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      error: false,
      isLoggedIn: false,
      timeInSeconds: 0
    };
  }
  timer;

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

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
    }, 1000);
  };

  stopTimer = () => {
    clearInterval(this.timer);
  }

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if(this.state.password == "echo") {
        this.setState({ isLoggedIn: true });
        this.startTimer()
    } else {
        this.setState({
            error: true
        })
    }
  };
  render() {
    return (
      <SingleVideoDisplayWrapper>
        {this.state.isLoggedIn ? (
            <>
                <SimpleVideoPlayer hasEnded={this.stopTimer.bind(this)} isPlaying={this.state.isLoggedIn}  videoUrl={"https://cecile-videos.s3.amazonaws.com/ACT1_S2.mp4"} />
                <TimeText> {this.displayTimecode(this.state.timeInSeconds)}</TimeText>
            </>
        ) : null}
        {!this.state.isLoggedIn ? (
          <form
            onSubmit={this.handleSubmit.bind(this)}
            noValidate
            autoComplete="off"
          >
            <StyledInput
              onChange={this.handleInputChange.bind(this)}
              defaultValue={this.state.password}
              name={"password"}
              type={"password"}
              required
            />
            {this.state.error ? <ErrorText> incorrect password </ErrorText> : null}
          </form>
        ) : null}
      </SingleVideoDisplayWrapper>
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
    sendMessage: (message: string) => dispatch(sendMessage(message)),
    scheduleStarted: () => dispatch(scheduleStarted())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleVideoDisplay);
