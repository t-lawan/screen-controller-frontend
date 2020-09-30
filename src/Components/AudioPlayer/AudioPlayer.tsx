import * as React from "react";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { sendMessage, sendMessageComplete } from "../../Store/actions";
import { IState } from "../../Store/reducer";
import { IWebsocketMessage } from "../../Interfaces/IRequestData";
import { EWSClientType } from "../../Enums/EWSClientType";
import { EWSMessageType } from "../../Enums/EWSMessageType";
import Sound from '../../Assets/Laurie.mp3'
interface IAudioPlayerState {
    isPlaying: boolean;
    currentTime: number;
    length: number;
}

interface IAudioPlayerProps {
  ws_message: string;
  ws_message_sent: boolean;
  sendMessageComplete: Function;
  sendMessage: Function;
}

class AudioPlayer extends React.Component<
  IAudioPlayerProps,
  IAudioPlayerState
> {
  audio_tag;
  constructor(props: IAudioPlayerProps) {
    super(props);
    this.audio_tag = React.createRef();
    this.state = {
        isPlaying: false,
        currentTime: 0,
        length: 0,
      }
  }

  componentDidMount() {
    this.play();
  }

  componentDidUpdate(prevProps: IAudioPlayerProps) {
    if( this.props.ws_message_sent && (prevProps.ws_message_sent !== this.props.ws_message_sent)) {
      this.handleWebsocketMessage();
    }
  }

  handleWebsocketMessage() {
    let message: IWebsocketMessage = JSON.parse(this.props.ws_message);
    if(message) {
      switch(message.message) {
        case EWSMessageType.START_AUDIO:
          console.log('START_AUDIO');
          this.play()
          break;
      }
    }

    this.props.sendMessageComplete()
  }

  play = () => {
    this.audio_tag.current.play()
    this.setState({
      isPlaying: true,
    })
  }

  pause = () => {
    this.audio_tag.current.pause()
    this.setState({
      isPlaying: false,
    })
  }

  reset = () => {
    if (this.audio_tag.current.currentTime === this.state.length) {
      this.audio_tag.current.currentTime = 0
    }
  }

  setAudioInfo = () => {
    let audio = this.audio_tag.current
    this.setState({
      currentTime: audio.currentTime,
      length: audio.duration,
    })
  }

  render() {
    return (
      <audio
        preload="metadata"
        ref={this.audio_tag}
        controls
        hidden={true}
      >
        <source src={Sound} />
      </audio>
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
)(AudioPlayer);
