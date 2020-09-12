import * as React from "react";
import { connect } from "react-redux";
import { IState } from "../../Store/reducer";
import { Dispatch } from "redux";
import { sendMessageComplete, sendMessage, dispatchMessageComplete, isConnected, isDisconnected } from '../../Store/actions';
import { IWebsocketMessage } from "../../Interfaces/IRequestData";
import { EWSClientType } from "../../Enums/EWSClientType";
import { EWSMessageType } from "../../Enums/EWSMessageType";
interface ICommunicationState {
  [key: string]: any;
}
interface ICommunicationProps {
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
}

class Communication extends React.Component<
  ICommunicationProps,
  ICommunicationState
> {
  ws: WebSocket;
  constructor(props: ICommunicationProps) {
    super(props);
    this.ws = new WebSocket(
      "wss://cs70esocmi.execute-api.us-east-1.amazonaws.com/dev"
    );
  }

  componentDidMount() {
    this.setupWebsocket()
  }

  setupWebsocket() {
    this.ws = new WebSocket(
      "wss://cs70esocmi.execute-api.us-east-1.amazonaws.com/dev"
    );

    this.ws.onopen = event => {
      const message: IWebsocketMessage = {
        client_type: EWSClientType.ADMIN,
        message: EWSMessageType.INITIALISE,
        raspberry_pi_id: 0
      };

      let string = JSON.stringify(message);
      this.ws.send(string);
      this.props.isConnected();
    };

    this.ws.onmessage = event => {
      let message: IWebsocketMessage = JSON.parse(event.data);
      switch (message.message) {
        case EWSMessageType.START_AUDIO:
          this.props.sendMessage(event.data);
          break;
        case EWSMessageType.START_VIDEO:
          this.props.sendMessage(event.data);
          break;
        case EWSMessageType.START_STREAM:
          this.props.sendMessage(event.data);
          break;
        case EWSMessageType.START_SCHEDULE:
          this.props.sendMessage(event.data);
        default:
          console.log("NO_ACTION", event.data);
          break;
      }
    };

    this.ws.onclose = () => {
      this.props.isDisconnected()
      setTimeout(() => {
        this.setupWebsocket()
      }, 3000)
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.dispatched_ws_message_sent &&
      prevProps.dispatched_ws_message_sent !== this.props.dispatched_ws_message_sent
    ) {
      let message: IWebsocketMessage = JSON.parse(this.props.dispatched_ws_message);
      if(message.message === EWSMessageType.START_SCHEDULE || message.message === EWSMessageType.START_ALL_DISPLAYS) {
        this.sendMessage();
      }
    }
  }

  sendMessage = () => {
    if (this.ws.OPEN) {
      this.ws.send(this.props.dispatched_ws_message);
      this.props.dispatchMessageComplete();
    }
  };

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
    isConnected: () => dispatch(isConnected()),
    isDisconnected: () => dispatch(isDisconnected())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Communication);
