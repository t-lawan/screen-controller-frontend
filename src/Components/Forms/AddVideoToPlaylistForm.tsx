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
import { EFormType } from "../../Enums/EFormType";
import { EVideoType } from "../../Enums/EVideoType";
import RequestManager from "../../Utils/RequestManager";
import {
  IAddVideoRequestBody,
  IUpdateVideoRequestBody
} from "../../Interfaces/IRequestData";
import { EFormStatus } from '../../Enums/EFormStatus';
import { IVideo } from "../../Interfaces/IVideo";
import { IScreen } from "../../Interfaces/IScreen";

interface IAddVideoToPlaylistFormState {
  [key: string]: any;
  video_file_playlist: string[];
}
interface IAddVideoToPlaylistFormProps {
  screen: IScreen;
  videos: IVideo[];
}
class AddVideoToPlaylistForm extends React.Component<
  IAddVideoToPlaylistFormProps,
  IAddVideoToPlaylistFormState
> {
  constructor(props: IAddVideoToPlaylistFormProps) {
    super(props);
    this.state = {
      video_file_playlist: [],
      status: EFormStatus.INIT,
    };
  }

  componentDidMount() {
    this.setPlaylistState();
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


  };

  setPlaylistState = () => {
    if (
      this.props.screen &&
      this.props.videos &&
      this.state.status === EFormStatus.INIT
    ) {
        this.setState({
          video_file_playlist: this.props.screen.video_file_playlist
        })
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
          {/* {this.props.type === EFormType.ADD ? "Add Video" : "Edit Video"} */}
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
)(AddVideoToPlaylistForm);
