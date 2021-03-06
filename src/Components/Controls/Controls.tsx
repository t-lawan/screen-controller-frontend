import * as React from "react";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
  sendMessage,
  sendMessageComplete,
  dispatchMessage
} from "../../Store/actions";
import { IState } from "../../Store/reducer";
import { IWebsocketMessage } from "../../Interfaces/IRequestData";
import { EWSClientType } from "../../Enums/EWSClientType";
import { EWSMessageType } from "../../Enums/EWSMessageType";
import styled from "styled-components";

type TConnectedText = {
  isConnected: boolean;
};
const ConnectedText = styled.p<TConnectedText>`
  color: ${props => (props.isConnected ? "green" : "red")};
`;

const ControlsWrapper = styled.div`
  display: flex;
`;
interface IControlState {}

interface IControlProps {
  ws_message: string;
  ws_message_sent: boolean;
  dispatchMessage: Function;
  is_connected: boolean;
}

class Controls extends React.Component<IControlProps, IControlState> {
  constructor(props: IControlProps) {
    super(props);
  }

  startSchedule() {
    if (!this.props.ws_message_sent) {
      let message: IWebsocketMessage = {
        client_type: EWSClientType.MASTER,
        message: EWSMessageType.START_SCHEDULE,
        raspberry_pi_id: 1
      };
      let stringMessage = JSON.stringify(message);
      this.props.dispatchMessage(stringMessage);
    }
  }

  stopSchedule() {
    if (!this.props.ws_message_sent) {
      let message: IWebsocketMessage = {
        client_type: EWSClientType.MASTER,
        message: EWSMessageType.STOP_SCHEDULE,
        raspberry_pi_id: 1
      };
      let stringMessage = JSON.stringify(message);
      this.props.dispatchMessage(stringMessage);
    }
  }

  startAllDisplays() {
    if (!this.props.ws_message_sent) {
      let message: IWebsocketMessage = {
        client_type: EWSClientType.ADMIN,
        message: EWSMessageType.START_ALL_DISPLAYS,
        raspberry_pi_id: 0
      };
      let stringMessage = JSON.stringify(message);
      this.props.dispatchMessage(stringMessage);
    }
  }
  render() {
    return (
      <>
        <ConnectedText isConnected={this.props.is_connected}>
          {" "}
          {this.props.is_connected ? "CONNECTED" : "CONNECTING"}{" "}
        </ConnectedText>
        <ControlsWrapper>
          <Button
            onClick={() => this.startSchedule()}
            variant="contained"
            disabled={!this.props.is_connected}
          >
            Start Schedule
          </Button>
          <Button
            onClick={() => this.stopSchedule()}
            variant="contained"
            disabled={!this.props.is_connected}
          >
            Stop Schedule
          </Button>
          <Button
            onClick={() => this.startAllDisplays()}
            variant="contained"
            disabled={!this.props.is_connected}
          >
            Start All Displays
          </Button>

          
        </ControlsWrapper>
      </>
    );
  }
}

const mapStateToProps = (state: IState) => {
  return {
    ws_message: state.ws_message,
    ws_message_sent: state.ws_message_sent,
    is_connected: state.is_connected
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    dispatchMessage: (message: string) => dispatch(dispatchMessage(message))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Controls);
