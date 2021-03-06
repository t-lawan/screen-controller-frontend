import * as React from "react";
import { connect } from "react-redux";
import { IState } from '../../Store/reducer';
import { EScreenType } from '../../Enums/EScreenType';
import { EFormStatus } from '../../Enums/EFormStatus';
import { EFormType } from '../../Enums/EFormType';
import { IScreen } from '../../Interfaces/IScreen';
import { IAddScreenRequestBody, IUpdateScreenRequestBody } from '../../Interfaces/IRequestData';
import RequestManager from "../../Utils/RequestManager";
import { Typography, FormControl, TextField, InputLabel, Select, MenuItem, FormHelperText, Button } from '@material-ui/core';
import { IPlaylistEntry } from '../../Interfaces/IPlaylistEntry';
import { addScreen } from '../../Store/actions';
import { Dispatch } from "redux";
import { IVideo } from '../../Interfaces/IVideo';

interface IScreenFormState {
    [key: string]: any;
    id: string;
    local_ip_address: string;
    raspberry_pi_id: number;
    number_of_screens: number;
    video_file_playlist: IPlaylistEntry[];
    screen_type: EScreenType;
    status: EFormStatus;
    video_id: string;
    errors: {
      local_ip_address: string;
      raspberry_pi_id: string;
      number_of_screens: string;
      video_file_playlist: string;
      screen_type: string;
      video_id: string;
    };
  }
  interface IScreenFormProps {
    type: EFormType;
    id?: string;
    screens?: IScreen[];
    videos?: IVideo[];
    addScreen: Function;
  }
class ScreenForm extends React.Component<IScreenFormProps, IScreenFormState> {
    constructor(props: IScreenFormProps) {
      super(props);
      this.state = {
        id: "",
        local_ip_address: "",
        raspberry_pi_id: 0,
        number_of_screens: 0,
        video_file_playlist: [],
        screen_type: EScreenType.SLAVE,
        status: EFormStatus.INIT,
        video_id: '',
        errors: {
            local_ip_address: "",
            raspberry_pi_id: "",
            number_of_screens: "",
            video_file_playlist: "",
            screen_type: "",
            video_id: ''
        }
      };
    }
  
    componentDidMount() {
      this.setScreenState();
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
        case "local_ip_address":
          errors.local_ip_address =
            value.length < 11 ? "local_ip_address must be longer than 11 characters" : "";
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
        let data: IAddScreenRequestBody = {
          local_ip_address: this.state.local_ip_address,
          raspberry_pi_id: this.state.raspberry_pi_id,
          number_of_screens: this.state.number_of_screens,
          video_file_playlist: this.state.video_file_playlist,
          screen_type: this.state.screen_type, 
          video_id: this.state.video_id
        };

  
        await RequestManager.addScreen(data)
          .then(response => {
            // Add new Screen To Store
            let screen: IScreen = response.data.data;
            if(screen && this.props.screens){
              this.props.addScreen(this.props.screens, screen);
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
        let data: IUpdateScreenRequestBody = {
          local_ip_address: this.state.local_ip_address,
          raspberry_pi_id: this.state.raspberry_pi_id,
          number_of_screens: this.state.number_of_screens,
          video_file_playlist: this.state.video_file_playlist,
          screen_type: this.state.screen_type,
          id: this.state.id,
          video_id: this.state.video_id
        };
  
        await RequestManager.editScreen(data)
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
  
    setScreenState = () => {
      if (
        this.props.type === EFormType.EDIT &&
        this.props.id &&
        this.props.screens &&
        this.state.status === EFormStatus.INIT
      ) {
        let screen = this.props.screens.find(scre => {
          return scre.id === this.props.id;
        });
        console.log('SCREEN', screen)
        if (screen) {
          this.setState({
            id: screen.id ? screen.id : '',
            local_ip_address: screen.local_ip_address,
            raspberry_pi_id: screen.raspberry_pi_id,
            number_of_screens: screen.number_of_screens,
            video_file_playlist: screen.video_file_playlist,
            screen_type: screen.screen_type,
            video_id: screen.video_id
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
            {this.props.type === EFormType.ADD ? "Add Screen" : "Edit Screen"}
          </Typography>
          {this.state.status === EFormStatus.LOADED ? (
            <form onSubmit={this.handleSubmit.bind(this)}>
              <FormControl fullWidth>
                <TextField
                  onChange={this.handleInputChange.bind(this)}
                  defaultValue={this.state.local_ip_address}
                  label="local ip address"
                  name="local_ip_address"
                  fullWidth
                  required
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  onChange={this.handleInputChange.bind(this)}
                  defaultValue={this.state.raspberry_pi_id}
                  label="raspberry pi id"
                  name="raspberry_pi_id"
                  type="number"
                  fullWidth
                  required
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  onChange={this.handleInputChange.bind(this)}
                  defaultValue={this.state.number_of_screens}
                  label="number of screens"
                  name="number_of_screens"
                  type="number"
                  fullWidth
                  required
                />
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="screen_type">Screen Type</InputLabel>
                <Select
                  labelId="screen_type"
                  value={this.state.screen_type}
                  name="screen_type"
                  onChange={this.handleSelectChange.bind(this)}
                  defaultValue={EScreenType.MASTER}
                >
                  <MenuItem value={EScreenType.MASTER}>Master</MenuItem>
                  <MenuItem value={EScreenType.SLAVE}>Slave</MenuItem>
                </Select>
              </FormControl>
              {this.props.videos ? (
              <>
                <FormControl fullWidth>
                  <InputLabel id="video_id">Video</InputLabel>
                  <Select
                    labelId="video_id"
                    value={this.state.video_id}
                    name="video_id"
                    onChange={this.handleSelectChange.bind(this)}
                  >
                    {this.props.videos.map((vid, index) => (
                      <MenuItem key={index} value={vid.id}>
                        {vid.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </>
            ) : null}
  
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
      videos: state.videos,
      screens: state.screens

    };
  };

  const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
      addScreen: (screens: IScreen[], screen: IScreen) => dispatch(addScreen(screens, screen))
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ScreenForm);