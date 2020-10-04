import * as React from "react";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { sendMessage, sendMessageComplete } from "../../Store/actions";
import { IState } from "../../Store/reducer";
import { IWebsocketMessage } from "../../Interfaces/IRequestData";
import { EWSClientType } from "../../Enums/EWSClientType";
import { EWSMessageType } from "../../Enums/EWSMessageType";
import IntroAudioWav from '../../Assets/1_intro_audio.wav';
import Contagion from '../../Assets/Contagion.mp3';
interface IAudioPlayerState {
    isPlaying: boolean;
    currentTime: number;
    length: number;
    audio_file: string;
}

interface IAudioPlayerProps {
  ws_message: string;
  ws_message_sent: boolean;
  sendMessageComplete: Function;
  sendMessage: Function;
  is_schedule_running: boolean;
}

const AudioMap = {
  'ac02c792-0b72-46a0-a909-c015cbd94be8': IntroAudioWav
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
        audio_file: IntroAudioWav
      }
  }

  componentDidUpdate(prevProps: IAudioPlayerProps) {
    if( this.props.ws_message_sent && (prevProps.ws_message_sent !== this.props.ws_message_sent)) {
      this.handleWebsocketMessage();
    }

    if(this.props.is_schedule_running !== prevProps.is_schedule_running) {
      if(!this.props.is_schedule_running) {
        this.pause();
        this.reset();
      }
    }
  }

  handleWebsocketMessage() {
    let message: IWebsocketMessage = JSON.parse(this.props.ws_message);
    if(message) {
      switch(message.message) {
        case EWSMessageType.START_AUDIO:
          this.play(message.payload ? message.payload : '')
          break;
        case EWSMessageType.STOP_SCHEDULE:
          // this.pause();
          // this.reset();
          break;
      }
    }

    this.props.sendMessageComplete()
  }

  play = (id: string) => {
    this.updateAudio(id)
    this.audio_tag.current.load();
    this.audio_tag.current.play()
    this.setState({
      isPlaying: true,
    })
  }

  updateAudio = (id: string) => {
    console.log('AUDIO', id)
    let audioFile = AudioMap[id];
    console.log('AUDIO FILE', audioFile)

    if(audioFile) {
      this.setState({
        audio_file: audioFile
      })
    }
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
        <source src={this.state.audio_file} />
      </audio>
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
)(AudioPlayer);
