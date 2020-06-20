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
import { EVideoFormType } from "../../Enums/EVideoFormType";
import { EVideoType } from "../../Enums/EVideoType";
import RequestManager from "../../Utils/RequestManager";
import {
  IAddVideoRequestBody,
  IUpdateVideoRequestBody
} from "../../Interfaces/IRequestData";
import { EFormStatus } from "../../Enums/EFormStatus";
import { IVideo } from "../../Interfaces/IVideo";

interface IVideoFormState {
  [key: string]: any;
  id: string;
  title: string;
  uri: string;
  video_type: EVideoType;
  status: EFormStatus;
  errors: {
    title: string;
    uri: string;
    video_type: string;
  };
}
interface IVideoFormProps {
  type: EVideoFormType;
  id?: string;
  videos?: IVideo[];
}
class VideoForm extends React.Component<IVideoFormProps, IVideoFormState> {
  constructor(props: IVideoFormProps) {
    super(props);
    this.state = {
      id: "",
      title: "",
      uri: "",
      video_type: EVideoType.FILE,
      status: EFormStatus.INIT,
      errors: {
        title: "",
        uri: "",
        video_type: ""
      }
    };
  }

  componentDidMount() {
    this.setVideoState();
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
    if (this.props.type === EVideoFormType.ADD) {
      let data: IAddVideoRequestBody = {
        title: this.state.title,
        video_type: this.state.video_type,
        uri: this.state.uri
      };

      await RequestManager.addVideo(data)
        .then(response => {
          // Add new Video To Store

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

    if (this.props.type === EVideoFormType.EDIT) {
      let data: IUpdateVideoRequestBody = {
        title: this.state.title,
        video_type: this.state.video_type,
        uri: this.state.uri,
        id: this.state.id
      };

      await RequestManager.editVideo(data)
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

  setVideoState = () => {
    if (
      this.props.type === EVideoFormType.EDIT &&
      this.props.id &&
      this.props.videos &&
      this.state.status === EFormStatus.INIT
    ) {
      let video = this.props.videos.find(vid => {
        return vid.id === this.props.id;
      });

      if (video) {
        this.setState({
          title: video.title,
          video_type: video.video_type,
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
          {this.props.type === EVideoFormType.ADD ? "Add Video" : "Edit Video"}
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
              <InputLabel id="video_type">Video Type</InputLabel>
              <Select
                labelId="video_type"
                value={this.state.type}
                name="video_type"
                onChange={this.handleSelectChange.bind(this)}
              >
                <MenuItem value={EVideoType.FILE}>Video File</MenuItem>
                <MenuItem value={EVideoType.STREAM}>Video Stream</MenuItem>
              </Select>
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
                Please add file name with extension i.e. 'video.mp4' if video
                file is selected as a type and add full stream url if stream is
                chosen
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
    videos: state.videos
  };
};

export default connect(
  mapStateToProps,
  null
)(VideoForm);
