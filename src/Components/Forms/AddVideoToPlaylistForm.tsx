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
  Button,
  List,
  ListItemText,
  ListItem,
  Divider,
  ListItemIcon,
  ListItemSecondaryAction,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell
} from "@material-ui/core";
import { EVideoType } from "../../Enums/EVideoType";
import RequestManager from "../../Utils/RequestManager";
import { EFormStatus } from "../../Enums/EFormStatus";
import { IVideo } from "../../Interfaces/IVideo";
import { IScreen } from "../../Interfaces/IScreen";
import {
  DeleteOutlined
} from "@material-ui/icons";
import { IPlaylistEntry } from "../../Interfaces/IPlaylistEntry";
import styled from "styled-components";
import { updateScreen } from '../../Store/actions';

const InputDiv = styled.div`
  padding: 0.5rem 1rem;
`;
interface IAddVideoToPlaylistFormState {
  [key: string]: any;
  video: string;
  order: number;
  playlist: IPlaylistEntry[]
}
interface IAddVideoToPlaylistFormProps {
  screen: IScreen;
  videos?: IVideo[];
  screens?: IScreen[];
  updateScreen: Function;
}
class AddVideoToPlaylistForm extends React.Component<
  IAddVideoToPlaylistFormProps,
  IAddVideoToPlaylistFormState
> {
  constructor(props: IAddVideoToPlaylistFormProps) {
    super(props);
    this.state = {
      video: "",
      order: 0,
      status: EFormStatus.INIT,
      playlist: []
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
    this.setState({
      [name]: value
    });
  };

  getVideoName = (id: string | undefined): string => {
    let name: string = "Untitled";
    if (this.props.videos && id) {
      let video = this.props.videos.find(vid => {
        return vid.id === id;
      });
      if (video) {
        name = video.title;
      }
    }

    return name;
  };

  handleSelectChange = event => {
    const { name, value } = event.target;
    if (this.props.videos) {
      let video = this.props.videos.find(vid => {
        return (vid.id = value);
      });
      if (video) {
        this.setState({
          video: value
        });
      }
    }
  };

  calculateMaxOrder = () => {
    let orders = this.state.playlist.map(playlistEntry => {
      return playlistEntry.order;
    });
    let max = 10;
    if (orders.length > 0) {
      max = Math.max(...orders) + 10;
    }
    return max;
  };

  orderExists = (order: number) => {
    let i = this.state.playlist.find(playlistEntry => {
      return playlistEntry.order === order;
    });

    return i ? true : false;
  };

  handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (this.state.video) {
      this.setState({
        status: EFormStatus.WAITING
      });
      let order = this.state.order;
      if (order === 0) {
        order = this.calculateMaxOrder();
      }

      if (!this.orderExists(order)) {
        let playlistEntry: IPlaylistEntry = {
          id: this.state.video,
          order: order
        };

        let playlist = [...this.state.playlist, playlistEntry]

        this.setState({
          playlist: playlist
        })

        let screen: IScreen = {
          ...this.props.screen,
          video_file_playlist: playlist
        }
        if (screen.id) {
          await RequestManager.editScreen({
            ...screen,
            id: screen.id,
          })
            .then(response => {
              let screen: IScreen = response.data.data;
              if (screen) {
                // add screen to strore
                this.props.updateScreen(this.props.screens, screen)
              }
              this.setState({
                status: EFormStatus.COMPLETED
              });
            })
            .catch(error => {
              this.formFailed();
            });
        }
      } else {
        this.formFailed();
      }
    }
  };

  removeEntry = async (videoId: string) => {
    let index = this.state.playlist.findIndex((entry) =>{
      return entry.id === videoId; 
    })

    let array: IPlaylistEntry[] = this.state.playlist;
    array.splice(index, 1)
    this.setState({
      playlist: array
    })
  }

  formFailed = () => {
    this.setState({
      status: EFormStatus.FAILED
    });
  };

  setPlaylistState = () => {
    if (
      this.props.screen &&
      this.props.videos &&
      this.state.status === EFormStatus.INIT
    ) {
      console.log('HELLO')
      this.setState({
        playlist: this.props.screen.video_file_playlist
      });
    }

    if (this.state.status === EFormStatus.INIT) {
      this.setState({
        status: EFormStatus.LOADED
      });
    }
  };
  render() {

    let videos: IVideo[] = [];
    if (this.props.videos) {
      videos = this.props.videos.filter(vid => {
        let containsVideo = this.state.playlist.find(
          entry => {
            return entry.id == vid.id;
          }
        );

        return containsVideo ? false : true;
      });
    }
    return (
      <>
        <Typography component="h1"> Video Playlist </Typography>

        {this.state.playlist ? (
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Order</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              {this.state.playlist
                .sort((a, b) => a.order - b.order)
                .map((video, index) => (
                  <>
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {this.getVideoName(video.id)}
                      </TableCell>
                      <TableCell align="right">
                        <InputDiv>
                          <TextField
                            type="number"
                            size="small"
                            margin="normal"
                            value={video.order}
                            defaultValue={video.order}
                          />
                        </InputDiv>
                      </TableCell>
                      <TableCell align="right">
                        <Button onClick={() => this.removeEntry(video.id)}>
                          <DeleteOutlined />
                        </Button>
                      </TableCell>
                    </TableRow>
                  </>
                ))}
            </Table>
          </TableContainer>
        ) : null}

        <Typography component="h3">Add video to playlist</Typography>
        {this.state.status === EFormStatus.LOADED ? (
          <form onSubmit={this.handleSubmit.bind(this)}>
            {this.props.videos ? (
              <>
                <FormControl fullWidth>
                  <InputLabel id="video_type">Videos</InputLabel>
                  <Select
                    labelId="video"
                    value={this.state.video}
                    name="video"
                    onChange={this.handleSelectChange.bind(this)}
                  >
                    {videos.map((vid, index) => (
                      <MenuItem key={index} value={vid.id}>
                        {vid.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    label="order"
                    name="order"
                    type="number"
                    defaultValue={this.calculateMaxOrder()}
                    onChange={this.handleInputChange.bind(this)}
                    fullWidth
                    required
                  />
                </FormControl>
              </>
            ) : null}
            <Button type="submit"> Add Video </Button>
          </form>
        ) : null}
        {this.state.status === EFormStatus.WAITING ? (
          <h2> Please wait </h2>
        ) : null}
        {this.state.status === EFormStatus.FAILED ? (
          <h2> Request Failed </h2>
        ) : null}
        {this.state.status === EFormStatus.COMPLETED ? (
          <h2> {this.state.video} was successfully added </h2>
        ) : null}
      </>
    );
  }
}

const mapStateToProps = (state: IState) => {
  return {
    open: state.modal_open,
    component: state.modal_component,
    videos: state.videos,
    screens: state.screens,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateScreen: (screens: IScreen[], screen: IScreen) => dispatch(updateScreen(screens, screen))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddVideoToPlaylistForm);
