import * as React from "react";
import { connect } from "react-redux";
import { IState } from "../../Store/reducer";
import CSVFile from "../../Assets/test.csv";
import Papa from "papaparse";
import { EWSMessageType } from "../../Enums/EWSMessageType";
import { Dispatch } from "redux";
import {
  sendMessageComplete,
  dispatchMessageComplete,
  sendMessage,
  scheduleStarted,
  scheduleEnded
} from "../../Store/actions";
import { IWebsocketMessage } from "../../Interfaces/IRequestData";
import { EWSClientType } from "../../Enums/EWSClientType";

interface ISchedulerState {
  [key: string]: any;
}
interface ISchedulerProps {
  [key: string]: any;
  ws_message: string;
  ws_message_sent: boolean;
  dispatched_ws_message: string;
  dispatched_ws_message_sent: boolean;
  sendMessage: Function;
  sendMessageComplete: Function;
  dispatchMessageComplete: Function;
  isConnected: Function;
  isDisconnected: Function;
  scheduleStarted: Function;
  scheduleEnded: Function;
}

class Scheduler extends React.Component<ISchedulerProps, ISchedulerState> {
  screen_actions: any[] = [];
  current_time: number;
  screen_one_index: number;
  clock;
  constructor(props) {
    super(props);
    // this.screen_actions = [];
    this.current_time = 0;
    this.screen_one_index = 0;
  }

  componentDidMount() {
    this.loadCSV();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.ws_message_sent &&
      prevProps.ws_message_sent !== this.props.ws_message_sent
    ) {
      this.handleWebsocketMessage();
    }
  }

  handleWebsocketMessage() {
    let message: IWebsocketMessage = JSON.parse(this.props.ws_message);
    if (message) {
      switch (message.message) {
        case EWSMessageType.START_SCHEDULE:
        this.start()
          console.log("START_SCHEDULE");
          break;
        default:
          console.log("DEFAULT");
          break;
      }
    }

    this.props.sendMessageComplete();
  }

  loadCSV() {
    if (this.screen_actions.length == 0) {
      Papa.parse(CSVFile, {
        download: true,
        header: true,
        delimiter: ",",
        newline: "",
        complete: this.mapCSV.bind(this)
      });
    }
  }

  mapCSV(response) {
    let screenActions = response.data;
    this.screen_actions = screenActions.map(function(screenAction, index) {
      let action = {
        message: screenAction.ACTION,
        payload: screenAction.PAYLOAD,
        timecode: screenAction.TIMECODE,
        raspberry_pi_id: screenAction.RPI_ID
      };

      if (action.message === "STOP_VIDEO") {
        action = {
          ...action,
          payload: "782b91f0-28a2-41a0-8289-8ca8de9ba077",
          message: EWSMessageType.START_VIDEO
        };
      }
      return {
        ...action,
        timecode: parseInt(action.timecode) + 1000
      };
    });

    let timeCodes = this.screen_actions.map(action => {
      return parseInt(action.timecode);
    });

    this.screen_actions.push({
      message: EWSMessageType.STOP_SCHEDULE,
      raspberry_pi_id: 1,
      payload: null,
      timecode: Math.max(...timeCodes) + 1000
    });

    this.screen_actions = this.screen_actions.sort((a,b) => {
        return a.timecode - b.timecode;
    })
    console.log('VID', this.screen_actions)

  }

  start() {
    this.clock = setInterval(this.sendCalls.bind(this), 40)
  }

  sendCalls() {
    // console.log('XXX SEND CALLs', this.screen_actions)
    let currentActions = this.screen_actions.filter(action => {
      return action.timecode == this.current_time;
    });

    if (currentActions.length > 0) {
      currentActions.forEach(action => {
        // this.performAction(action);
        let message: IWebsocketMessage = {
            message: action.message,
            raspberry_pi_id: action.raspberry_pi_id,
            client_type: EWSClientType.DISPLAY,
            payload: action.payload

        }
        this.props.sendMessage(JSON.stringify(message));
        if (action.message === EWSMessageType.STOP_SCHEDULE) {
          this.stop();
          console.log('MESSAGE', action.message)
        }
      });
    }
    this.current_time = this.current_time + 40;
  }

  stop() {
    clearInterval(this.clock);
    this.clock = null;
    this.props.scheduleEnded()
    this.current_time = 0;
  }
  render() {
    return <> </>;
  }
}

const mapStateToProps = (state: IState) => {
  return {
    ws_message: state.ws_message,
    ws_message_sent: state.ws_message_sent,
    dispatched_ws_message: state.dispatched_ws_message,
    dispatched_ws_message_sent: state.dispatched_ws_message_sent
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    sendMessageComplete: () => dispatch(sendMessageComplete()),
    dispatchMessageComplete: () => dispatch(dispatchMessageComplete()),
    sendMessage: (message: string) => dispatch(sendMessage(message)),
    scheduleStarted: () => dispatch(scheduleStarted()),
    scheduleEnded: () => dispatch(scheduleEnded())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Scheduler);
