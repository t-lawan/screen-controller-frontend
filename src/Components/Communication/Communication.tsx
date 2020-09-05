import * as React from "react";
import { connect } from "react-redux";
import { IState } from "../../Store/reducer";
import { Dispatch } from "redux";
import { sendMessageComplete, sendMessage } from "../../Store/actions";
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
  sendMessage: Function;
  sendMessageComplete: Function;
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
    this.ws.onopen = event => {
      const message: IWebsocketMessage = {
        client_type: EWSClientType.ADMIN,
        message: EWSMessageType.INITIALISE,
        raspberry_pi_id: 0
      };

      let string = JSON.stringify(message);
      this.ws.send(string);
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
        default:
          console.log("NO_ACTION");
          break;
      }
    };
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.ws_message_sent &&
      prevProps.ws_message_sent !== this.props.ws_message_sent
    ) {
      let message: IWebsocketMessage = JSON.parse(this.props.ws_message);
      if(message.message === EWSMessageType.START_SCHEDULE) {
        this.sendMessage();
      }
    }
  }

  sendMessage = () => {
    if (this.ws.OPEN) {
      this.ws.send(this.props.ws_message);
      this.props.sendMessageComplete();
    }
  };

  render() {
    return <> </>;
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
)(Communication);
