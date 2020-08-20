import * as React from "react";
import { connect } from "react-redux";
import { IState } from "../../Store/reducer";
import { Dispatch } from "redux";
import {
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Button
} from "@material-ui/core";
import { EFormType } from '../../Enums/EFormType';
import RequestManager from "../../Utils/RequestManager";
import {
  IAddAudioRequestBody
} from "../../Interfaces/IRequestData";
import { EFormStatus } from "../../Enums/EFormStatus";
import { addAudio } from '../../Store/actions';
import { IAudio } from '../../Interfaces/IAudio';

interface IAudioFormState {
  [key: string]: any;
  id: string;
  title: string;
  uri: string;
  status: EFormStatus;
  errors: {
    title: string;
    uri: string;
  };
}
interface IAudioFormProps {
  type: EFormType;
  id?: string;
  audio?: IAudio[];
  addAudio: Function;
}
class AudioForm extends React.Component<IAudioFormProps, IAudioFormState> {
  constructor(props: IAudioFormProps) {
    super(props);
    this.state = {
      id: "",
      title: "",
      uri: "",
      status: EFormStatus.INIT,
      errors: {
        title: "",
        uri: "",
      }
    };
  }

  componentDidMount() {
    this.setAudioState();
  }

  updateStatusToFilling = () => {
    if (this.state.status !== EFormStatus.FILLING) {
      this.setState({
        status: EFormStatus.FILLING
      });
    }
  };
  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    let errors = this.state.errors;
    this.setState({
      [name]: value
    });
    switch (name) {
      case "title":
        errors.title =
          value.length < 5 ? "Title must be longer than 5 characters" : "";
        break;
      case "uri":
        errors.title =
          value.length < 5 ? "Title must be longer than 5 characters" : "";
        break;
      default:
        break;
    }
    this.setState({
      errors: errors
    });
  };

  handleSelectChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    this.setState({
      status: EFormStatus.WAITING
    });
    if (this.props.type === EFormType.ADD) {
      let data: IAddAudioRequestBody = {
        title: this.state.title,
        uri: this.state.uri
      };

      await RequestManager.addAudio(data)
        .then(response => {
          // Add new Video To Store
          let audio: IAudio = response.data.data;
          if(audio && this.props.audio){
            this.props.addAudio(this.props.audio, audio)
          }
          this.setState({
            status: EFormStatus.COMPLETED
          });
        })
        .catch(error => {
          this.setState({
            status: EFormStatus.FAILED
          });
        });
    }

    if (this.props.type === EFormType.EDIT) {
      let data: IAudio = {
        title: this.state.title,
        uri: this.state.uri,
        id: this.state.id
      };

      await RequestManager.editAudio(data)
        .then(resp => {
          this.setState({
            status: EFormStatus.COMPLETED
          });
        })
        .catch(error => {
          this.setState({
            status: EFormStatus.FAILED
          });
        });
    }
  };

  setAudioState = () => {
    if (
      this.props.type === EFormType.EDIT &&
      this.props.id &&
      this.props.audio &&
      this.state.status === EFormStatus.INIT
    ) {
      let video = this.props.audio.find(vid => {
        return vid.id === this.props.id;
      });

      if (video) {
        this.setState({
          title: video.title,
          uri: video.uri,
          id: video.id ? video.id : ""
        });
      }
    }

    if (this.state.status === EFormStatus.INIT) {
      this.setState({
        status: EFormStatus.LOADED
      });
    }
  };
  render() {
    return (
      <>
        <Typography component="h3">
          {this.props.type === EFormType.ADD ? "Add Audio" : "Edit Audio"}
        </Typography>
        {this.state.status === EFormStatus.LOADED ? (
          <form onSubmit={this.handleSubmit.bind(this)}>
            <FormControl fullWidth>
              <TextField
                onChange={this.handleInputChange.bind(this)}
                defaultValue={this.state.title}
                label="title"
                name="title"
                fullWidth
                required
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                onChange={this.handleInputChange.bind(this)}
                defaultValue={this.state.uri}
                label="uri"
                name="uri"
                required
                fullWidth
              />
              <FormHelperText>
                Please add file name with extension i.e. 'video.mp3'
              </FormHelperText>
            </FormControl>

            <Button type="submit"> Submit </Button>
          </form>
        ) : null}
        {this.state.status === EFormStatus.WAITING ? (
          <h2> Please wait </h2>
        ) : null}
        {this.state.status === EFormStatus.FAILED ? (
          <h2> Request Failed </h2>
        ) : null}
        {this.state.status === EFormStatus.COMPLETED ? (
          <h2> {this.state.title} was successfully added </h2>
        ) : null}
      </>
    );
  }
}

const mapStateToProps = (state: IState) => {
  return {
    open: state.modal_open,
    component: state.modal_component,
    audio: state.audio
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addAudio: (audio_list: IAudio[], audio: IAudio) => dispatch(addAudio(audio_list, audio))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AudioForm);
