import * as React from "react";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { sendMessage, sendMessageComplete, dispatchMessage } from '../../Store/actions';
import { IState } from '../../Store/reducer';
import { IWebsocketMessage } from '../../Interfaces/IRequestData';
import { EWSClientType } from "../../Enums/EWSClientType";
import { EWSMessageType } from "../../Enums/EWSMessageType";

interface IControlState {}

interface IControlProps {
    ws_message: string,
    ws_message_sent: boolean,
    dispatchMessage: Function
}

class Controls extends React.Component<IControlProps, IControlState> {
  constructor(props: IControlProps) {
    super(props);
  }

  startSchedule() {
      if(!this.props.ws_message_sent) {
        let message: IWebsocketMessage = {
            client_type: EWSClientType.MASTER,
            message: EWSMessageType.START_SCHEDULE,
            raspberry_pi_id: 1
        }
        let stringMessage = JSON.stringify(message);
        this.props.dispatchMessage(stringMessage);
      }
  }
  render() {
    return <Button onClick={() => this.startSchedule()} variant="contained">Start Schedule</Button>;
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
      dispatchMessage: (message: string) => dispatch(dispatchMessage(message))
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Controls);

